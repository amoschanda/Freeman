import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { 
  Loader2, LogOut, Eye, EyeOff, ChevronRight, 
  Calendar, Clock, MapPin, Phone, Mail, User,
  CheckCircle, XCircle, AlertCircle, ClipboardList, X, Image
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-blue-100 text-blue-800 border-blue-300", icon: CheckCircle },
  completed: { label: "Completed", color: "bg-green-100 text-green-800 border-green-300", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-300", icon: XCircle },
};

const SERVICE_NAMES = {
  "mobile-carwash": "Mobile CarWash",
  "carwash": "CarWash",
  "landscaping": "LandScaping",
  "laundry": "Laundry",
  "home-cleaning": "Home Cleaning",
  "office-cleaning": "Office Cleaning",
  "lawn-care": "Lawn Care",
  "garbage-collection": "Garbage Collection",
  "smart-home-repair": "Smart Home Repair",
  "environment-cleaning": "Environment Cleaning",
  "farm-work": "Farm Work",
  "garden-work": "Garden Work",
  "toilet-cleaning": "Toilet Cleaning",
  "yard-cleaning": "Yard Cleaning",
  "guest-house-cleaning": "Guest House Cleaning",
  "hotel-cleaning": "Hotel Cleaning",
  "building-cleaning": "Building Cleaning",
  "carpet-cleaning": "Carpet Cleaning",
  "sofa-cleaning": "Sofa Cleaning",
  "mattress-cleaning": "Mattress Cleaning",
  "car-engine-cleaning": "Car Engine Cleaning",
  "window-cleaning": "Window Cleaning",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authData = localStorage.getItem("freeman_admin_auth");
    if (!authData) {
      navigate("/admin-login");
      return;
    }
    try {
      const parsed = JSON.parse(authData);
      if (parsed.isAdmin) {
        setIsAuthed(true);
        fetchBookings();
      } else {
        navigate("/admin-login");
      }
    } catch {
      navigate("/admin-login");
    }
  }, [navigate]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.patch(`${API}/bookings/${bookingId}`, { status: newStatus });
      toast.success("Status updated successfully");
      fetchBookings();
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("freeman_admin_auth");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getServiceName = (id) => SERVICE_NAMES[id] || id;

  const parseImages = (imagesStr) => {
    if (!imagesStr) return [];
    try {
      return JSON.parse(imagesStr);
    } catch {
      return [];
    }
  };

  const filteredBookings = bookings.filter(b => 
    statusFilter === "all" ? true : b.status === statusFilter
  );

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    approved: bookings.filter(b => b.status === "approved").length,
    completed: bookings.filter(b => b.status === "completed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-[#18181B] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFC107] rounded-sm flex items-center justify-center">
                <span className="text-[#1A1A1A] font-bold text-xl" style={{ fontFamily: 'Barlow Condensed' }}>F</span>
              </div>
              <div>
                <span className="font-bold text-lg uppercase tracking-tight block" style={{ fontFamily: 'Barlow Condensed' }}>FREEMAN</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Admin Portal</span>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] font-bold uppercase text-sm"
              data-testid="admin-logout-btn"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 min-w-max">
            {["all", "pending", "approved", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-all flex items-center gap-2 ${
                  statusFilter === status
                    ? status === "all"
                      ? "bg-[#18181B] text-white"
                      : STATUS_CONFIG[status].color.replace('100', '500').replace('800', 'white')
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                data-testid={`filter-${status}`}
              >
                {status === "all" ? "All" : STATUS_CONFIG[status].label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  statusFilter === status ? "bg-white/20" : "bg-gray-200"
                }`}>
                  {statusCounts[status]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <Loader2 className="animate-spin text-[#FFC107] mx-auto" size={40} />
              <p className="text-gray-600 mt-4">Loading bookings...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1A1A1A] uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                  Booking Requests
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredBookings.length} booking(s)
                </span>
              </div>

              {filteredBookings.length > 0 ? (
                <div className="space-y-3">
                  {filteredBookings.map((booking) => {
                    const StatusIcon = STATUS_CONFIG[booking.status]?.icon || AlertCircle;
                    const images = parseImages(booking.images);
                    return (
                      <Card
                        key={booking.id}
                        className={`p-4 cursor-pointer transition-all hover:shadow-md border-l-4 ${
                          selectedBooking?.id === booking.id
                            ? "border-l-[#FFC107] bg-[#FFC107]/5"
                            : "border-l-transparent hover:border-l-gray-300"
                        }`}
                        onClick={() => { setSelectedBooking(booking); setShowImages(false); }}
                        data-testid={`booking-card-${booking.id}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="font-bold text-[#1A1A1A] truncate">{booking.name}</h3>
                              <Badge className={`${STATUS_CONFIG[booking.status]?.color} border text-xs`}>
                                <StatusIcon size={12} className="mr-1" />
                                {STATUS_CONFIG[booking.status]?.label}
                              </Badge>
                              {images.length > 0 && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Image size={12} />
                                  {images.length}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <ClipboardList size={14} className="text-[#FFC107]" />
                                {getServiceName(booking.service_type)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {booking.time}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <ClipboardList className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">No bookings found</p>
                </Card>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-1">
              {selectedBooking ? (
                <Card className="sticky top-24 overflow-hidden" data-testid="booking-details-panel">
                  <div className="bg-[#18181B] text-white p-4 flex items-center justify-between">
                    <h3 className="font-bold uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                      Booking Details
                    </h3>
                    <button 
                      onClick={() => setSelectedBooking(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFC107] rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="text-[#1A1A1A]" size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-[#1A1A1A]">{selectedBooking.name}</p>
                          <Badge className={`${STATUS_CONFIG[selectedBooking.status]?.color} border text-xs mt-1`}>
                            {STATUS_CONFIG[selectedBooking.status]?.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid gap-2 text-sm">
                        <a href={`mailto:${selectedBooking.email}`} className="flex items-center gap-2 text-gray-600 hover:text-[#FFC107]">
                          <Mail size={14} />
                          <span className="break-all">{selectedBooking.email}</span>
                        </a>
                        <a href={`tel:${selectedBooking.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-[#FFC107]">
                          <Phone size={14} />
                          {selectedBooking.phone}
                        </a>
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                          <span>{selectedBooking.address}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Service</h4>
                      <p className="font-bold text-[#FFC107]">{getServiceName(selectedBooking.service_type)}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {selectedBooking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {selectedBooking.time}
                        </span>
                      </div>
                      {selectedBooking.description && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-2">
                          {selectedBooking.description}
                        </p>
                      )}
                    </div>

                    {parseImages(selectedBooking.images).length > 0 && (
                      <>
                        <hr className="border-gray-200" />
                        <div>
                          <button
                            onClick={() => setShowImages(!showImages)}
                            className="flex items-center gap-2 text-[#FFC107] font-medium text-sm hover:underline"
                            data-testid="toggle-images-btn"
                          >
                            {showImages ? <EyeOff size={16} /> : <Eye size={16} />}
                            {showImages ? "Hide" : "View"} Photos ({parseImages(selectedBooking.images).length})
                          </button>
                          {showImages && (
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              {parseImages(selectedBooking.images).map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`Booking photo ${idx + 1}`}
                                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(img, '_blank')}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <hr className="border-gray-200" />

                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Update Status</h4>
                      <select
                        value={selectedBooking.status}
                        onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
                        data-testid="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <Button
                      onClick={() => setSelectedBooking(null)}
                      variant="outline"
                      className="w-full border-2 font-bold uppercase text-sm"
                    >
                      Close
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="sticky top-24 p-8 text-center bg-gray-50">
                  <ClipboardList className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">Select a booking to view details</p>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
