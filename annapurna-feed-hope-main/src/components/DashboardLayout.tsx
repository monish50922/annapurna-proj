import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Search,
  Users,
  BarChart3,
} from 'lucide-react';
import type { UserRole } from '@/types';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const roleMenus: Record<UserRole, NavItem[]> = {
  DONOR: [
    { to: '/donor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/donor/new-donation', label: 'New Donation', icon: PlusCircle },
  ],
  NGO: [
    { to: '/ngo/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/ngo/browse', label: 'Browse Donations', icon: Search },
  ],
 ADMIN: [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/donations', label: 'Donations', icon: BarChart3 },
],
};

const DashboardLayout = () => {
  const { user } = useAuth();
  if (!user) return null;

  const menu = roleMenus[user.role];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-sidebar p-4 md:block min-h-[calc(100vh-4rem)]">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {user.role} Panel
            </p>
          </div>
          <nav className="flex flex-col gap-1">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-card p-2 md:hidden">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-4 pb-20 md:p-8 md:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
