import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/contexts/StoreContext";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Login from "./pages/Login.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import Admin from "./pages/Admin.tsx";
import ClientDashboard from "./pages/ClientDashboard.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import ExchangePolicy from "./pages/ExchangePolicy.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import HelpSupport from "./pages/HelpSupport.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/minha-conta" element={<ClientDashboard />} />
            <Route path="/quem-somos" element={<AboutUs />} />
            <Route path="/trocas-devolucoes" element={<ExchangePolicy />} />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/fale-conosco" element={<ContactUs />} />
            <Route path="/ajuda" element={<HelpSupport />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </StoreProvider>
  </QueryClientProvider>
);

export default App;
