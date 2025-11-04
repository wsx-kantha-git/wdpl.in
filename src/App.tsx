import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // <-- Use HashRouter
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Team from "./pages/Team";
import Culture from "./pages/Culture";
import Careers from "./pages/Careers";
import GalleryPreviewPage from "./pages/GalleryPreviewPage";
import EventGalleryPage from "./pages/EventGalleryPage";
import EventPreviewPage from "./pages/EventPreviewPage";
import Contact from "./pages/Contact";
import ApplyJob from "./pages/ApplyJob";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import AdminTestimonialsDashboard from "./pages/admin/AdminTestimonialsDashboard";
import AdminContactDashboard from "./pages/admin/AdminContactDashboard";
import Gallery from "./pages/Gallery";
import AdminGalleryDashboard from "./pages/admin/GalleryAdminPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/apply/:jobId" element={<ApplyJob />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} /> 
          
          {/* Gallery Routes */}
          <Route path="/gallery-main" element={<GalleryPreviewPage />} />
          <Route path="/gallery/:categoryId" element={<EventGalleryPage />} />
          <Route path="/gallery/event/:eventId" element={<EventPreviewPage />} />

          {/* Admin & Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonialsDashboard /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminContactDashboard /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><AdminGalleryDashboard /></ProtectedRoute>} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
