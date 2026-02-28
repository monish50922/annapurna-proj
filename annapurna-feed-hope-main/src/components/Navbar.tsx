import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardLink = user
    ? user.role === 'DONOR'
      ? '/donor/dashboard'
      : user.role === 'NGO'
      ? '/ngo/dashboard'
      : '/admin/dashboard'
    : null;

  const isLanding = location.pathname === '/';

  return (
    <nav className="relative z-50 px-6 pt-6">
      {/* Floating Rounded Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-[#EFE6DA] px-8 py-4 shadow-md">

        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-wide text-[#E76F51]"
        >
          ANNAPURNA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          {isLanding && (
  <>
    <a href="#about" className="text-sm font-medium text-[#5B4A42] hover:text-[#E76F51] transition-colors">
      About
    </a>

    <a href="#how-it-works" className="text-sm font-medium text-[#5B4A42] hover:text-[#E76F51] transition-colors">
      How it Works
    </a>

    <a href="#donate" className="text-sm font-medium text-[#5B4A42] hover:text-[#E76F51] transition-colors">
      Donate Food
    </a>

    <a href="#impact" className="text-sm font-medium text-[#5B4A42] hover:text-[#E76F51] transition-colors">
      Impact Stories
    </a>

    <a href="#involved" className="text-sm font-medium text-[#5B4A42] hover:text-[#E76F51] transition-colors">
      Get Involved
    </a>

    <a href="#faq" className="text-sm font-medium text-[#5B4A42] hover:text-[#E76F51] transition-colors">
      FAQs
    </a>

    <a href="#contact" className="text-sm font-medium text-[#5B4A42] hover:text-[#E76F51] transition-colors">
      Contact
    </a>
  </>
)}

          {user ? (
            <>
              <Link to={dashboardLink!}>
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>

              <span className="text-sm text-[#5B4A42]">
                Hi, {user.name}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-[#E76F51] text-[#E76F51] hover:bg-[#E76F51] hover:text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="mr-1 h-4 w-4" />
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  size="sm"
                  className="bg-[#E76F51] hover:bg-[#d45f3f] text-white"
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#5B4A42]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mx-6 mt-4 rounded-2xl bg-[#EFE6DA] p-4 shadow-md md:hidden">
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to={dashboardLink!}
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    Dashboard
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full border-[#E76F51] text-[#E76F51] hover:bg-[#E76F51] hover:text-white"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full bg-[#E76F51] hover:bg-[#d45f3f] text-white">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;