import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, Check } from "lucide-react";

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "general-cleaning",
    date: "",
    time: "",
    description: "",
  });

  const createBooking = trpc.bookings.create.useMutation({
    onSuccess: () => {
      toast.success("Booking submitted successfully!");
      setStep(4);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          serviceType: "general-cleaning",
          date: "",
          time: "",
          description: "",
        });
        setImages([]);
        setImagePreviews([]);
        setStep(1);
      }, 2000);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setImagePreviews((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    // For now, we'll submit without image URLs (would need file upload endpoint)
    createBooking.mutate({
      ...formData,
      images: imagePreviews,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">SparkleClean</h1>
          <p className="text-sm opacity-90">Professional Cleaning Services</p>
        </div>

        {/* Progress */}
        <div className="px-6 pt-6">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  s <= step
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {s < step ? <Check size={20} /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Your Information</h2>
              <Input
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full"
              />
              <Input
                placeholder="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
              <Input
                placeholder="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full"
              />
              <Textarea
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full"
              />
              <Button
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </Button>
            </div>
          )}

          {/* Step 2: Service Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Service Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="general-cleaning">General Cleaning</option>
                  <option value="deep-cleaning">Deep Cleaning</option>
                  <option value="office-cleaning">Office Cleaning</option>
                  <option value="hospital-cleaning">Hospital Cleaning</option>
                  <option value="post-construction">Post-Construction Cleaning</option>
                </select>
              </div>
              <Input
                placeholder="Preferred Date (YYYY-MM-DD)"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full"
              />
              <Input
                placeholder="Preferred Time (HH:MM)"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full"
              />
              <Textarea
                placeholder="Additional Description (Optional)"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Photo Upload */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Upload Photos</h2>
              <p className="text-sm text-gray-600">
                Upload up to 5 photos of the area to be cleaned
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-600 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload images
                  </p>
                  <p className="text-xs text-gray-500">
                    {images.length}/5 images selected
                  </p>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && !createBooking.isPending && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Review Booking</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Name:</span> {formData.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {formData.phone}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {formData.address}
                </p>
                <p>
                  <span className="font-semibold">Service:</span> {formData.serviceType}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {formData.date}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {formData.time}
                </p>
                <p>
                  <span className="font-semibold">Photos:</span> {images.length}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={createBooking.isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {createBooking.isPending ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={16} />
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {createBooking.isPending && (
            <div className="text-center space-y-4">
              <Loader2 className="mx-auto animate-spin text-indigo-600" size={40} />
              <p className="text-gray-700 font-medium">Submitting your booking...</p>
            </div>
          )}

          {step === 4 && !createBooking.isPending && createBooking.isSuccess && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="text-green-600" size={32} />
              </div>
              <p className="text-gray-700 font-medium">Booking submitted successfully!</p>
              <p className="text-sm text-gray-600">
                We'll contact you soon to confirm your booking.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
