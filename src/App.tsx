import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import HospitalsPage from "./pages/admin/Hospitals";
import DoctorsPage from "./pages/admin/Doctors";
import SchoolsPage from "./pages/admin/Schools";
import BloodDonorsPage from "./pages/admin/BloodDonors";
import GovtOfficesPage from "./pages/admin/GovtOffices";
import BusinessesPage from "./pages/admin/Businesses";
import CitizensPage from "./pages/admin/Citizens";
import EmergencyPage from "./pages/admin/Emergency";
import CategoriesPage from "./pages/admin/Categories";
import UsersPage from "./pages/admin/Users";
import AnalyticsPage from "./pages/admin/Analytics";
import SettingsPage from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="hospitals" element={<HospitalsPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="schools" element={<SchoolsPage />} />
            <Route path="blood-donors" element={<BloodDonorsPage />} />
            <Route path="govt-offices" element={<GovtOfficesPage />} />
            <Route path="businesses" element={<BusinessesPage />} />
            <Route path="citizens" element={<CitizensPage />} />
            <Route path="emergency" element={<EmergencyPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
