import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, User, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";

const Navigation = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { user } = useAuth();
  const navigate = useNavigate();

  /**
   * The handleLogin function and handleSignUp function opens the login and sign up card 
   * we use useState if user is logged in or signed up we remove the login-signup button if they are not 
   * we show the log in and sign up button.
   */
  const handleLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const handleSignup = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const goToProfile = () => navigate("/profile");
  const goToAddTool = () => navigate("/submit");

  return (
    <>
      <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg"><a href="/">CyberDirectory</a></span>
          </div>

          <nav className="flex items-center space-x-6">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/providers" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Find Providers
            </a>
            <a href="/osint" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              OSINT
            </a>
            <a href="/google-dork" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Google Dork
            </a>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={goToAddTool} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Tool
                </Button>
                <Button variant="outline" size="sm" onClick={goToProfile} className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleLogin}>
                  Login
                </Button>
                <Button size="sm" onClick={handleSignup}>
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navigation;
