import { supabase } from './lib/supabase.js';

// Twilio setup (optional - only if credentials provided)
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let twilioClient = null;
if (twilioAccountSid && twilioAuthToken) {
  const twilio = require('twilio');
  twilioClient = twilio(twilioAccountSid, twilioAuthToken);
}

async function sendSMS(to, message) {
  if (!twilioClient || !twilioPhoneNumber) {
    console.log('SMS not configured, skipping:', message);
    return null;
  }
  
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to
    });
    return result;
  } catch (error) {
    console.error('SMS Error:', error.message);
    return null;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.status(200).json(data);
  }

  if (req.method === 'PATCH') {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Get booking first to get phone number
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Update status
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Send SMS for approved or cancelled status
    if (status === 'approved' || status === 'cancelled') {
      const serviceName = data.service_type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      let smsMessage = '';
      
      if (status === 'approved') {
        smsMessage = `Hi ${data.name}! Your ${serviceName} booking for ${data.date} at ${data.time} has been APPROVED. We'll see you soon! - Freeman Mobile Cleaning`;
      } else if (status === 'cancelled') {
        smsMessage = `Hi ${data.name}, your ${serviceName} booking for ${data.date} has been CANCELLED. Contact us to reschedule. - Freeman Mobile Cleaning`;
      }
      
      await sendSMS(data.phone, smsMessage);
    }

    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
