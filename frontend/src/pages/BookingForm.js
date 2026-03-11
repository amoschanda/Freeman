import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { 
  Loader2, Upload, Check, ChevronLeft, ChevronRight, X,
  User, MapPin, Calendar, Camera, FileCheck, Car, Home as HomeIcon, 
  Building2, Leaf, Trash2, Wrench, TreeDeciduous, Tractor, 
  Flower2, Bath, Hotel, Building, Sofa, BedDouble, Settings
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

const SERVICES = [
  { id: "mobile-carwash", name: "Mobile CarWash", icon: Car },
  { id: "carwash", name: "CarWash", icon: Car },
  { id: "landscaping", name: "LandScaping", icon: TreeDeciduous },
  { id: "laundry", name: "Laundry", icon: Settings },
  { id: "home-cleaning", name: "Home Cleaning", icon: HomeIcon },
  { id: "office-cleaning", name: "Office Cleaning", icon: Building2 },
  { id: "lawn-care", name: "Lawn Care", icon: Leaf },
  { id: "garbage-collection", name: "Garbage Collection", icon: Trash2 },
  { id: "smart-home-repair", name: "Smart Home Repair", icon: Wrench },
  { id: "environment-cleaning", name: "Environment Cleaning", icon: Leaf },
  { id: "farm-work", name: "Farm Work", icon: Tractor },
  { id: "garden-work", name: "Garden Work", icon: Flower2 },
  { id: "toilet-cleaning", name: "Toilet Cleaning", icon: Bath },
  { id: "yard-cleaning", name: "Yard Cleaning", icon: TreeDeciduous },
  { id: "guest-house-cleaning", name: "Guest House Cleaning", icon: Hotel },
  { id: "hotel-cleaning", name: "Hotel Cleaning", icon: Hotel },
  { id: "building-cleaning", name: "Building Cleaning", icon: Building },
  { id: "carpet-cleaning", name: "Carpet Cleaning", icon: Sofa },
  { id: "sofa-cleaning", name: "Sofa Cleaning", icon: Sofa },
  { id: "mattress-cleaning", name: "Mattress Cleaning", icon: BedDouble },
  { id: "car-engine-cleaning", name: "Car Engine Cleaning", icon: Settings },
  { id: "window-cleaning", name: "Window Cleaning", icon: Building2 },
];

const STEPS = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Service", icon: Settings },
  { id: 3, name: "Schedule", icon: Calendar },
  { id: 4, name: "Photos", icon: Camera },
  { id: 5, name: "Confirm", icon: FileCheck },
];

export default function BookingForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: preselectedService,
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (images.length + newFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviews((prev) => [...prev, event.target?.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        if (!formData.serviceType) {
          toast.error("Please select a service");
          return false;
        }
        return true;
      case 3:
        if (!formData.date || !formData.time) {
          toast.error("Please select date and time");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/bookings`, {
        ...formData,
        images: imagePreviews,
      });
      toast.success("Booking submitted successfully!");
      setStep(6);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.detail || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceName = (id) => {
    return SERVICES.find(s => s.id === id)?.name || id;
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-[#18181B] text-white py-4">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            data-testid="back-to-home-btn"
          >
            <ChevronLeft size={20} />
            <span className="text-sm uppercase tracking-wide">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFC107] rounded-sm flex items-center justify-center">
              <span className="text-[#1A1A1A] font-bold" style={{ fontFamily: 'Barlow Condensed' }}>F</span>
            </div>
            <span className="font-bold tracking-tight uppercase" style={{ fontFamily: 'Barlow Condensed' }}>FREEMAN</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Progress */}
      {step < 6 && (
        <div className="bg-white border-b border-gray-200 py-4 overflow-x-auto">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex justify-between min-w-[480px]">
              {STEPS.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      s.id < step
                        ? "bg-[#10B981] text-white"
                        : s.id === step
                        ? "bg-[#FFC107] text-[#1A1A1A]"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {s.id < step ? <Check size={18} /> : <s.icon size={18} />}
                    </div>
                    <span className={`text-xs mt-2 uppercase tracking-wide ${
                      s.id <= step ? "text-[#1A1A1A] font-medium" : "text-gray-400"
                    }`}>
                      {s.name}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-12 sm:w-16 h-0.5 mx-2 ${
                      s.id < step ? "bg-[#10B981]" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <Card className="shadow-lg border-0 overflow-hidden">
          {/* Step 1 */}
          {step === 1 && (
            <div className="p-6 md:p-8" data-testid="step-personal-info">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                Your Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Full Name *</label>
                  <Input
                    placeholder="John Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full h-12 border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Email *</label>
                  <Input
                    placeholder="john@example.com"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Phone *</label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-12 border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Address *</label>
                  <Textarea
                    placeholder="123 Main Street, City, State"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full min-h-[80px] border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                    data-testid="input-address"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={nextStep}
                  className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] h-12 px-8 font-bold uppercase tracking-wider"
                  data-testid="next-step-btn"
                >
                  Next
                  <ChevronRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="p-6 md:p-8" data-testid="step-service-selection">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                Select Service
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES.map((service) => {
                  const IconComponent = service.icon;
                  const isSelected = formData.serviceType === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, serviceType: service.id }))}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-[#FFC107] bg-[#FFC107]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-testid={`service-option-${service.id}`}
                    >
                      <IconComponent 
                        className={`mb-2 ${isSelected ? "text-[#FFC107]" : "text-gray-500"}`} 
                        size={24} 
                      />
                      <span className={`text-sm font-medium block ${
                        isSelected ? "text-[#1A1A1A]" : "text-gray-700"
                      }`}>
                        {service.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-300 font-bold uppercase tracking-wider"
                >
                  <ChevronLeft className="mr-2" size={18} />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] h-12 px-8 font-bold uppercase tracking-wider"
                  data-testid="next-step-btn"
                >
                  Next
                  <ChevronRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="p-6 md:p-8" data-testid="step-schedule">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                Select Date & Time
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Preferred Date *</label>
                  <Input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full h-12 border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                    data-testid="input-date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Preferred Time *</label>
                  <Input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full h-12 border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                    data-testid="input-time"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Additional Notes</label>
                  <Textarea
                    placeholder="Any special instructions or requirements..."
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full min-h-[100px] border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                    data-testid="input-description"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-300 font-bold uppercase tracking-wider"
                >
                  <ChevronLeft className="mr-2" size={18} />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] h-12 px-8 font-bold uppercase tracking-wider"
                  data-testid="next-step-btn"
                >
                  Next
                  <ChevronRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="p-6 md:p-8" data-testid="step-photos">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                Upload Photos
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Upload up to 5 photos of the area to be cleaned (optional)
              </p>

              <div 
                className="border-2 border-dashed border-gray-300 hover:border-[#FFC107] bg-gray-50 rounded-lg p-8 text-center cursor-pointer transition-colors"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  data-testid="image-upload-input"
                />
                <Upload className="mx-auto mb-3 text-gray-400" size={40} />
                <p className="text-base font-medium text-gray-700">
                  Tap to upload images
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {images.length}/5 images selected
                </p>
              </div>

              {imagePreviews.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-300 font-bold uppercase tracking-wider"
                >
                  <ChevronLeft className="mr-2" size={18} />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] h-12 px-8 font-bold uppercase tracking-wider"
                  data-testid="next-step-btn"
                >
                  Review
                  <ChevronRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="p-6 md:p-8" data-testid="step-confirmation">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                Review Your Booking
              </h2>
              
              <div className="bg-[#FAFAF9] rounded-lg p-4 md:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Name</span>
                    <p className="font-medium text-[#1A1A1A]">{formData.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Email</span>
                    <p className="font-medium text-[#1A1A1A] break-all">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Phone</span>
                    <p className="font-medium text-[#1A1A1A]">{formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Service</span>
                    <p className="font-medium text-[#FFC107]">{getServiceName(formData.serviceType)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Date</span>
                    <p className="font-medium text-[#1A1A1A]">{formData.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Time</span>
                    <p className="font-medium text-[#1A1A1A]">{formData.time}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-xs tracking-wide">Address</span>
                  <p className="font-medium text-[#1A1A1A]">{formData.address}</p>
                </div>
                {formData.description && (
                  <div>
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Notes</span>
                    <p className="font-medium text-[#1A1A1A]">{formData.description}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 uppercase text-xs tracking-wide">Photos</span>
                  <p className="font-medium text-[#1A1A1A]">{images.length} image(s) attached</p>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-300 font-bold uppercase tracking-wider"
                >
                  <ChevronLeft className="mr-2" size={18} />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#10B981] text-white hover:bg-[#059669] h-12 px-8 font-bold uppercase tracking-wider"
                  data-testid="submit-booking-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Booking
                      <Check className="ml-2" size={18} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Success */}
          {step === 6 && (
            <div className="p-8 md:p-12 text-center" data-testid="booking-success">
              <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-white" size={40} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                Booking Submitted!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for choosing Freeman Mobile Cleaning. We'll contact you shortly to confirm your booking.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] h-12 px-8 font-bold uppercase tracking-wider"
                data-testid="back-home-btn"
              >
                Back to Home
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
