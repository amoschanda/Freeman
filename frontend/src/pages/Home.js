import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Car, Home as HomeIcon, Building2, Leaf, Trash2, Wrench, 
  TreeDeciduous, Tractor, Flower2, Bath, Hotel, Building, 
  Sofa, BedDouble, Settings, ChevronRight, Phone, Mail, MapPin,
  Clock, Shield, Star, Menu, X
} from "lucide-react";
import { useState } from "react";

const SERVICES = [
  { id: "mobile-carwash", name: "Mobile CarWash", icon: Car, image: "https://images.unsplash.com/photo-1760827797819-4361cd5cd353?w=400" },
  { id: "carwash", name: "CarWash", icon: Car, image: "https://images.unsplash.com/photo-1760827797819-4361cd5cd353?w=400" },
  { id: "landscaping", name: "LandScaping", icon: TreeDeciduous, image: "https://images.unsplash.com/photo-1683316924890-6a8c5ab10d29?w=400" },
  { id: "laundry", name: "Laundry", icon: Settings, image: "https://images.unsplash.com/photo-1746240126295-64b0028593b6?w=400" },
  { id: "home-cleaning", name: "Home Cleaning", icon: HomeIcon, image: "https://images.unsplash.com/photo-1742483359033-13315b247c74?w=400" },
  { id: "office-cleaning", name: "Office Cleaning", icon: Building2, image: "https://images.unsplash.com/photo-1730701878011-a423ec61c328?w=400" },
  { id: "lawn-care", name: "Lawn Care", icon: Leaf, image: "https://images.unsplash.com/photo-1683316924890-6a8c5ab10d29?w=400" },
  { id: "garbage-collection", name: "Garbage Collection", icon: Trash2, image: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?w=400" },
  { id: "smart-home-repair", name: "Smart Home Repair", icon: Wrench, image: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?w=400" },
  { id: "environment-cleaning", name: "Environment Cleaning", icon: Leaf, image: "https://images.unsplash.com/photo-1683316924890-6a8c5ab10d29?w=400" },
  { id: "farm-work", name: "Farm Work", icon: Tractor, image: "https://images.unsplash.com/photo-1683316924890-6a8c5ab10d29?w=400" },
  { id: "garden-work", name: "Garden Work", icon: Flower2, image: "https://images.unsplash.com/photo-1683316924890-6a8c5ab10d29?w=400" },
  { id: "toilet-cleaning", name: "Toilet Cleaning", icon: Bath, image: "https://images.unsplash.com/photo-1589824783837-6169889fa20f?w=400" },
  { id: "yard-cleaning", name: "Yard Cleaning", icon: TreeDeciduous, image: "https://images.unsplash.com/photo-1683316924890-6a8c5ab10d29?w=400" },
  { id: "guest-house-cleaning", name: "Guest House Cleaning", icon: Hotel, image: "https://images.unsplash.com/photo-1580842402762-6f5868c17412?w=400" },
  { id: "hotel-cleaning", name: "Hotel Cleaning", icon: Hotel, image: "https://images.unsplash.com/photo-1580842402762-6f5868c17412?w=400" },
  { id: "building-cleaning", name: "Building Cleaning", icon: Building, image: "https://images.unsplash.com/photo-1730701878011-a423ec61c328?w=400" },
  { id: "carpet-cleaning", name: "Carpet Cleaning", icon: Sofa, image: "https://images.unsplash.com/photo-1742483359033-13315b247c74?w=400" },
  { id: "sofa-cleaning", name: "Sofa Cleaning", icon: Sofa, image: "https://images.unsplash.com/photo-1742483359033-13315b247c74?w=400" },
  { id: "mattress-cleaning", name: "Mattress Cleaning", icon: BedDouble, image: "https://images.unsplash.com/photo-1691703028663-c5ff8cbb07c4?w=400" },
  { id: "car-engine-cleaning", name: "Car Engine Cleaning", icon: Settings, image: "https://images.unsplash.com/photo-1760827797819-4361cd5cd353?w=400" },
  { id: "window-cleaning", name: "Window Cleaning", icon: Building2, image: "https://images.unsplash.com/photo-1730701878011-a423ec61c328?w=400" },
];

export default function Home() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-[#18181B] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FFC107] rounded-sm flex items-center justify-center">
                <span className="text-[#1A1A1A] font-bold text-xl" style={{ fontFamily: 'Barlow Condensed' }}>F</span>
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight uppercase" style={{ fontFamily: 'Barlow Condensed' }}>
                FREEMAN
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium uppercase tracking-wide hover:text-[#FFC107] transition-colors">Services</a>
              <a href="#about" className="text-sm font-medium uppercase tracking-wide hover:text-[#FFC107] transition-colors">About</a>
              <a href="#contact" className="text-sm font-medium uppercase tracking-wide hover:text-[#FFC107] transition-colors">Contact</a>
              <Button
                onClick={() => navigate("/admin-login")}
                variant="outline"
                className="border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-[#1A1A1A] uppercase text-sm font-bold"
                data-testid="admin-login-btn"
              >
                Admin
              </Button>
            </nav>

            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-700 space-y-4">
              <a href="#services" className="block text-sm font-medium uppercase tracking-wide hover:text-[#FFC107]" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#about" className="block text-sm font-medium uppercase tracking-wide hover:text-[#FFC107]" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#contact" className="block text-sm font-medium uppercase tracking-wide hover:text-[#FFC107]" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <Button
                onClick={() => { navigate("/admin-login"); setMobileMenuOpen(false); }}
                className="w-full bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] uppercase text-sm font-bold"
              >
                Admin Portal
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[#18181B] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=1600')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#FFC107] text-[#1A1A1A] px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6">
              Professional Cleaning Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Barlow Condensed' }}>
              YOUR TRUSTED<br />
              <span className="text-[#FFC107]">CLEANING PARTNER</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              From homes to offices, vehicles to gardens — we deliver spotless results with professional care. Book your service today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/booking")}
                className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] text-base md:text-lg px-8 py-6 rounded-sm font-bold uppercase tracking-wider shadow-lg"
                data-testid="book-now-hero-btn"
              >
                Book Now
                <ChevronRight className="ml-2" size={20} />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] text-base md:text-lg px-8 py-6 rounded-sm font-bold uppercase tracking-wider"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "22", label: "Services Offered" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFC107]" style={{ fontFamily: 'Barlow Condensed' }}>{stat.number}</div>
                <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 md:py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#FFC107] text-xs font-bold uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-2 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
              Our Services
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Comprehensive cleaning and maintenance solutions for all your needs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {SERVICES.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="card-service group"
                  onClick={() => navigate(`/booking?service=${service.id}`)}
                  data-testid={`service-card-${service.id}`}
                >
                  <div className="relative h-32 md:h-40 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFC107] rounded-sm flex items-center justify-center">
                        <IconComponent className="text-[#1A1A1A]" size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base text-[#1A1A1A] group-hover:text-[#FFC107] transition-colors uppercase tracking-wide" style={{ fontFamily: 'Barlow Condensed' }}>
                      {service.name}
                    </h3>
                    <div className="flex items-center mt-2 text-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-medium uppercase">Book Now</span>
                      <ChevronRight size={14} className="ml-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#FFC107] text-xs font-bold uppercase tracking-widest">Why Freeman</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-2 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Shield, title: "Trusted & Reliable", desc: "Fully insured team with background checks and professional training" },
              { icon: Clock, title: "Flexible Scheduling", desc: "Book at your convenience - we work around your schedule" },
              { icon: Star, title: "Quality Guaranteed", desc: "100% satisfaction guaranteed or we'll make it right" },
            ].map((item, i) => (
              <div key={i} className="bg-[#FAFAF9] border-l-4 border-[#FFC107] p-6 md:p-8">
                <div className="w-12 h-12 bg-[#FFC107] rounded-sm flex items-center justify-center mb-4">
                  <item.icon className="text-[#1A1A1A]" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] uppercase tracking-wide mb-2" style={{ fontFamily: 'Barlow Condensed' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-[#18181B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-4" style={{ fontFamily: 'Barlow Condensed' }}>
            Ready to Get <span className="text-[#FFC107]">Started?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Book your cleaning service today and experience the Freeman difference
          </p>
          <Button
            onClick={() => navigate("/booking")}
            className="bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] text-lg px-10 py-6 rounded-sm font-bold uppercase tracking-wider shadow-lg"
            data-testid="book-now-cta-btn"
          >
            Book Your Service
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#FFC107] text-xs font-bold uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-2 uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
              Contact Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
              { icon: Mail, title: "Email", info: "info@freemanclean.com" },
              { icon: MapPin, title: "Location", info: "123 Clean Street, City" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-[#FAFAF9] rounded-lg">
                <div className="w-12 h-12 bg-[#FFC107] rounded-sm flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-[#1A1A1A]" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] uppercase text-sm tracking-wide">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#18181B] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FFC107] rounded-sm flex items-center justify-center">
                <span className="text-[#1A1A1A] font-bold text-lg" style={{ fontFamily: 'Barlow Condensed' }}>F</span>
              </div>
              <span className="text-lg font-bold tracking-tight uppercase" style={{ fontFamily: 'Barlow Condensed' }}>
                FREEMAN
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center">
              © 2026 Freeman Mobile Cleaning. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
