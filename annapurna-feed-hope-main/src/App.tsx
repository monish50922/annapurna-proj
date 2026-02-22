import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import NewDonation from "./pages/NewDonation";
import NgoDashboard from "./pages/NgoDashboard";
import NgoBrowse from "./pages/NgoBrowse";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdminUsers from "./pages/AdminUsers";
import AdminDonations from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Donor routes */}
            <Route element={<ProtectedRoute allowedRoles={['DONOR']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/donor/dashboard" element={<DonorDashboard />} />
              <Route path="/donor/new-donation" element={<NewDonation />} />
            </Route>

            {/* NGO routes */}
            <Route element={<ProtectedRoute allowedRoles={['NGO']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/ngo/dashboard" element={<NgoDashboard />} />
              <Route path="/ngo/browse" element={<NgoBrowse />} />
            </Route>

            {/* Admin routes */}
<Route
  element={
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/users" element={<AdminUsers />} />
  <Route path="/admin/donations" element={<AdminDonations />} />
</Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
