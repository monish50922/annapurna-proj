import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
            <Heart className="h-5 w-5 fill-primary" />
            ANNAPURNA
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Connecting surplus food with those who need it most. Reducing waste, fighting hunger.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
            <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Platform</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>For Donors</span>
            <span>For NGOs</span>
            <span>Impact Report</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Annapurna. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
