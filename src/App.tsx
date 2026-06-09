import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import FoodSupplementsChecklist from "./pages/FoodSupplementsChecklist.tsx";
import MedicalDevicesChecklist from "./pages/MedicalDevicesChecklist.tsx";
import PharmaceuticalsChecklist from "./pages/PharmaceuticalsChecklist.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import Privacy from "./pages/Privacy.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import EmailTest from "./pages/EmailTest.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register/food-supplements" element={<FoodSupplementsChecklist />} />
          <Route path="/register/medical-devices" element={<MedicalDevicesChecklist />} />
          <Route path="/register/pharmaceuticals" element={<PharmaceuticalsChecklist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/email-test" element={<EmailTest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
