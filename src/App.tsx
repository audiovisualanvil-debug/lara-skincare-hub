import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import CartDrawer from "@/components/shop/CartDrawer";
import CompareBar from "@/components/shop/CompareBar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CompareProvider } from "@/contexts/CompareContext";
import { ReviewsProvider } from "@/contexts/ReviewsContext";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import BuildRoutine from "./pages/BuildRoutine";
import Consultation from "./pages/Consultation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import SkinQuiz from "./pages/SkinQuiz";
import Auth from "./pages/Auth";
import TulipiaPage from "./pages/TulipiaPage";
import MezzoPage from "./pages/MezzoPage";
import ExtratosPage from "./pages/ExtratosPage";
import SmartGRPage from "./pages/SmartGRPage";
import AdminImageProcessor from "./pages/AdminImageProcessor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <FavoritesProvider>
          <CompareProvider>
            <ReviewsProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/loja" element={<Shop />} />
                  <Route path="/tulipia" element={<TulipiaPage />} />
                  <Route path="/mezzo" element={<MezzoPage />} />
                  <Route path="/extratos-da-terra" element={<ExtratosPage />} />
                  <Route path="/smart-gr" element={<SmartGRPage />} />
                  <Route path="/produto/:id" element={<ProductDetail />} />
                  <Route path="/favoritos" element={<Favorites />} />
                  <Route path="/comparar" element={<Compare />} />
                  <Route path="/monte-sua-rotina" element={<BuildRoutine />} />
                  <Route path="/quiz-pele" element={<SkinQuiz />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/consultoria" element={<Consultation />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/contato" element={<Contact />} />
                  <Route path="/admin/processar-imagens" element={<AdminImageProcessor />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <MobileBottomNav />
                <WhatsAppFloat />
                <CartDrawer />
                <CompareBar />
              </BrowserRouter>
            </ReviewsProvider>
          </CompareProvider>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;