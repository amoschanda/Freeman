import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Sparkles, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">SparkleClean</h1>
          </div>
          <Button
            onClick={() => setLocation("/admin-login")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Shield size={16} />
            Admin
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-5xl font-bold mb-6">Professional Cleaning Services</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Book expert cleaning services for your home, office, or healthcare facility.
          Fast, reliable, and affordable solutions.
        </p>
        <Button
          onClick={() => setLocation("/booking")}
          className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg font-bold flex items-center gap-2 mx-auto"
        >
          Start Booking
          <ArrowRight size={20} />
        </Button>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose SparkleClean?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-indigo-600" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Professional Team</h4>
              <p className="text-gray-600">
                Trained and certified cleaning professionals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Fully Insured</h4>
              <p className="text-gray-600">
                Complete coverage and peace of mind
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="text-pink-600" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Quick Booking</h4>
              <p className="text-gray-600">
                Easy online scheduling with instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
        <p className="text-lg mb-8 opacity-90">Book your cleaning service today</p>
        <Button
          onClick={() => setLocation("/booking")}
          className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg font-bold"
        >
          Book Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>&copy; 2026 SparkleClean. All rights reserved.</p>
      </footer>
    </div>
  );
}
