import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Lock, ChevronLeft } from "lucide-react";

const ADMIN_EMAIL = "acemayeson8@gmail.com";
const ADMIN_PASSWORD = "acemayeson8@gmail.com";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("freeman_admin_auth", JSON.stringify({
          email: ADMIN_EMAIL,
          isAdmin: true,
          loginTime: new Date().toISOString()
        }));
        
        toast.success("Login successful!");
        navigate("/admin-dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#18181B] flex flex-col">
      <header className="bg-[#18181B] border-b border-gray-800 py-4">
        <div className="max-w-md mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            data-testid="back-to-home-btn"
          >
            <ChevronLeft size={20} />
            <span className="text-sm uppercase tracking-wide">Home</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFC107] rounded-sm flex items-center justify-center">
              <span className="text-[#1A1A1A] font-bold" style={{ fontFamily: 'Barlow Condensed' }}>F</span>
            </div>
            <span className="text-white font-bold tracking-tight uppercase" style={{ fontFamily: 'Barlow Condensed' }}>FREEMAN</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden bg-white">
          <div className="bg-[#18181B] text-white p-8 text-center">
            <div className="w-16 h-16 bg-[#FFC107] rounded-sm flex items-center justify-center mx-auto mb-4">
              <Lock className="text-[#1A1A1A]" size={32} />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
              Admin Portal
            </h1>
            <p className="text-gray-400 text-sm mt-1">Freeman Management System</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full h-12 border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                disabled={isLoading}
                required
                data-testid="admin-email-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 border-gray-300 focus:border-[#FFC107] focus:ring-[#FFC107]"
                disabled={isLoading}
                required
                data-testid="admin-password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#FFC107] text-[#1A1A1A] hover:bg-[#F59E0B] font-bold uppercase tracking-wider"
              data-testid="admin-login-submit-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Card>
      </main>

      <footer className="py-4 text-center">
        <p className="text-gray-500 text-sm">© 2026 Freeman Mobile Cleaning</p>
      </footer>
    </div>
  );
}
