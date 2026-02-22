import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  Users,
  BarChart3,
} from "lucide-react";
import type { UserRole } from "@/types";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const roleMenus: Record<UserRole, NavItem[]> = {
  DONOR: [
    { to: "/donor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/donor/new-donation", label: "New Donation", icon: PlusCircle },
  ],
  NGO: [
    { to: "/ngo/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/ngo/browse", label: "Browse Donations", icon: Search },
  ],
  ADMIN: [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/donations", label: "Donations", icon: BarChart3 },
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
        <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar min-h-[calc(100vh-4rem)] p-5">

          {/* User Info */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {user.role} Panel
            </p>
            <p className="text-lg font-semibold mt-1">{user.name}</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted hover:translate-x-1"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-around border-t bg-card p-2">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;