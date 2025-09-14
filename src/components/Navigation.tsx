import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Coffee, Heart, PawPrint, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useUser, useClerk, SignInButton, UserButton } from "@clerk/clerk-react";
import { useAdmin } from "@/hooks/useAdmin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Cafe", href: "/cafe" },
    { name: "Pet Shop", href: "/pet-shop" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error('Error signing out:', error);
      // Fallback: just navigate to home page
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-card-border shadow-soft">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-accent-gradient rounded-lg">
              <PawPrint className="w-4 h-4 sm:w-6 sm:h-6 text-accent-foreground" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl font-bold text-primary">Bark & Brew</h1>
              <p className="text-xs text-muted-foreground -mt-1">Café & Pet Care</p>
            </div>
            <div className="xs:hidden">
              <h1 className="text-lg font-bold text-primary">B&B</h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-accent transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth & Book Now Button & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isLoaded && isSignedIn ? (
              <>
                {!isAdmin && (
                  <Link to="/booking">
                    <Button variant="book" size="sm" className="hidden sm:flex text-sm">
                      <Heart className="w-4 h-4" />
                      <span className="hidden lg:inline">Book Now</span>
                      <span className="lg:hidden">Book</span>
                    </Button>
                  </Link>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
                    <div className="px-4 py-3 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</p>
                      <p className="text-xs text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="hover:bg-gray-100">
                      <Link to="/dashboard" className="w-full flex items-center px-4 py-2 text-gray-900 hover:text-gray-900">
                        <User className="w-4 h-4 mr-2 text-gray-700" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {!isAdmin && (
                      <DropdownMenuItem asChild className="hover:bg-gray-100">
                        <Link to="/booking" className="w-full flex items-center px-4 py-2 text-gray-900 hover:text-gray-900">
                          <Heart className="w-4 h-4 mr-2 text-gray-700" />
                          Book Now
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isAdmin && (
                      <DropdownMenuItem asChild className="hover:bg-gray-100">
                        <Link to="/admin" className="w-full flex items-center px-4 py-2 text-gray-900 hover:text-gray-900">
                          <Settings className="w-4 h-4 mr-2 text-gray-700" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2 text-gray-700" />
                      <span className="text-gray-900 hover:text-red-600">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/booking">
                  <Button variant="book" size="sm" className="hidden sm:flex text-sm">
                    <Heart className="w-4 h-4" />
                    <span className="hidden lg:inline">Book Now</span>
                    <span className="lg:hidden">Book</span>
                  </Button>
                </Link>
                <SignInButton mode="modal" afterSignInUrl="/dashboard">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-card-border shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-foreground hover:text-accent transition-colors font-medium px-4 py-3 rounded-lg hover:bg-accent/10 touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isLoaded && isSignedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-foreground hover:text-accent transition-colors font-medium px-4 py-3 rounded-lg hover:bg-accent/10 touch-manipulation"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-foreground hover:text-accent transition-colors font-medium px-4 py-3 rounded-lg hover:bg-accent/10 touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div className="px-4 pt-2 space-y-2">
                    {!isAdmin && (
                      <Link to="/booking" className="w-full">
                        <Button variant="book" size="lg" className="w-full touch-manipulation">
                          <Heart className="w-4 h-4" />
                          Book Now
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full touch-manipulation"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="px-4 pt-2">
                  <SignInButton mode="modal" afterSignInUrl="/dashboard">
                    <Button variant="book" size="lg" className="w-full touch-manipulation">
                      Sign In
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;