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
    ? user.role === 'DONOR' ? '/donor/dashboard'
    : user.role === 'NGO' ? '/ngo/dashboard'
    : '/admin/dashboard'
    : null;

  const isLanding = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LOGO TEXT ONLY */}
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          ANNAPURNA
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {isLanding && (
            <>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            </>
          )}
          {user ? (
            <>
              <Link to={dashboardLink!}>
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm"><LogIn className="mr-1 h-4 w-4" />Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm"><UserPlus className="mr-1 h-4 w-4" />Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass border-t md:hidden animate-fade-in-up">
          <div className="flex flex-col gap-2 p-4">
            {user ? (
              <>
                <Link to={dashboardLink!} onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => { logout(); setMobileOpen(false); }}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start"><LogIn className="mr-2 h-4 w-4" />Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full"><UserPlus className="mr-2 h-4 w-4" />Register</Button>
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