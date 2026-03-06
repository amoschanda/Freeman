import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, LogOut, Eye, EyeOff } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showImages, setShowImages] = useState(false);

  const { data: bookings, isLoading, refetch } = trpc.bookings.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  const updateStatus = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Status updated successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      setLocation("/admin-login");
    }
  }, [user, setLocation]);

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    updateStatus.mutate({
      id: bookingId,
      status: newStatus as "pending" | "approved" | "completed" | "cancelled",
    });
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">SparkleClean Admin</h1>
            <p className="text-sm opacity-90">Booking Management Dashboard</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bookings List */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="bg-indigo-50 p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-800">
                    Booking Requests ({bookings?.length || 0})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings && bookings.length > 0 ? (
                        bookings.map((booking: any) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {booking.name}
                            </td>
                            <td className="px-4 py-3 text-gray-600">{booking.email}</td>
                            <td className="px-4 py-3 text-gray-600">
                              {booking.serviceType}
                            </td>
                            <td className="px-4 py-3 text-gray-600">{booking.date}</td>
                            <td className="px-4 py-3">
                              <Badge
                                className={`${
                                  booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.status === "approved"
                                    ? "bg-blue-100 text-blue-800"
                                    : booking.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                onClick={() => setSelectedBooking(booking)}
                                size="sm"
                                variant="outline"
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                            No bookings found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Details Panel */}
            <div>
              {selectedBooking ? (
                <Card className="sticky top-6">
                  <div className="bg-indigo-50 p-4 border-b">
                    <h3 className="font-bold text-gray-800">Booking Details</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Name
                      </p>
                      <p className="text-gray-900 font-medium">{selectedBooking.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Email
                      </p>
                      <p className="text-gray-900 font-medium break-all">
                        {selectedBooking.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Phone
                      </p>
                      <p className="text-gray-900 font-medium">{selectedBooking.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Address
                      </p>
                      <p className="text-gray-900 font-medium text-sm">
                        {selectedBooking.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Service Type
                      </p>
                      <p className="text-gray-900 font-medium">
                        {selectedBooking.serviceType}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Date
                        </p>
                        <p className="text-gray-900 font-medium">
                          {selectedBooking.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Time
                        </p>
                        <p className="text-gray-900 font-medium">
                          {selectedBooking.time}
                        </p>
                      </div>
                    </div>
                    {selectedBooking.description && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Description
                        </p>
                        <p className="text-gray-900 text-sm">
                          {selectedBooking.description}
                        </p>
                      </div>
                    )}

                    {/* Images Section */}
                    {selectedBooking.images && (
                      <div>
                        <button
                          onClick={() => setShowImages(!showImages)}
                          className="flex items-center gap-2 text-indigo-600 font-medium text-sm hover:text-indigo-700"
                        >
                          {showImages ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                          {showImages ? "Hide" : "View"} Photos
                        </button>
                        {showImages && (
                          <div className="mt-3 space-y-2">
                            {JSON.parse(selectedBooking.images || "[]").map(
                              (img: string, idx: number) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`Booking photo ${idx + 1}`}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Status Update */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Update Status
                      </p>
                      <select
                        value={selectedBooking.status}
                        onChange={(e) =>
                          handleStatusChange(selectedBooking.id, e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                      className="w-full"
                    >
                      Close
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="sticky top-6 p-8 text-center">
                  <p className="text-gray-500">Select a booking to view details</p>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
