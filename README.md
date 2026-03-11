# Freeman Mobile Cleaning

Professional cleaning services booking application with admin panel.

![Freeman Mobile Cleaning](https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=800)

## Live Demo

**Vercel Deployment**: https://freeman-cleaning.vercel.app

## Features

- **22 Cleaning Services**: Mobile CarWash, Home Cleaning, Office Cleaning, LandScaping, and more
- **Professional Theme**: Yellow and black theme on cream background
- **Mobile-First Design**: Optimized for Android and all mobile devices
- **Multi-Step Booking**: Easy booking flow with image upload
- **Admin Panel**: Manage all bookings with status updates
- **SMS Notifications**: Sends SMS when booking is approved or cancelled (requires Twilio)

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **SMS**: Twilio (optional)

## Deployment (Vercel)

### Quick Deploy

1. Fork this repository
2. Import to Vercel
3. Add environment variables:

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID (optional) |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token (optional) |
| `TWILIO_PHONE_NUMBER` | Twilio phone number (optional) |

### Supabase Setup

Create a `bookings` table with this SQL:

```sql
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  service_type TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  description TEXT,
  images TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON bookings FOR ALL USING (true) WITH CHECK (true);
```

## Admin Access

- **Email**: acemayeson8@gmail.com
- **Password**: acemayeson8@gmail.com

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings` | List all bookings |
| GET | `/api/bookings/[id]` | Get booking by ID |
| PATCH | `/api/bookings/[id]` | Update booking status (sends SMS) |

## SMS Notifications

When a booking status is changed to **approved** or **cancelled**, an SMS is automatically sent to the customer's phone number (if Twilio is configured).

**Approved SMS**: "Hi {name}! Your {service} booking for {date} at {time} has been APPROVED. We'll see you soon! - Freeman Mobile Cleaning"

**Cancelled SMS**: "Hi {name}, your {service} booking for {date} has been CANCELLED. Contact us to reschedule. - Freeman Mobile Cleaning"

## Services Available

1. Mobile CarWash
2. CarWash
3. LandScaping
4. Laundry
5. Home Cleaning
6. Office Cleaning
7. Lawn Care
8. Garbage Collection
9. Smart Home Repair
10. Environment Cleaning
11. Farm Work
12. Garden Work
13. Toilet Cleaning
14. Yard Cleaning
15. Guest House Cleaning
16. Hotel Cleaning
17. Building Cleaning
18. Carpet Cleaning
19. Sofa Cleaning
20. Mattress Cleaning
21. Car Engine Cleaning
22. Window Cleaning

## License

MIT License - Feel free to use and modify for your projects.
