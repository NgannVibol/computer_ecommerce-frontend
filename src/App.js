import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureProduct from "./components/FeatureProduct";
import BannerDiscount from "./components/BannerDiscount";
import Footer from "./components/Footer";
import Payment from "./pages/Payment";
import { CartProvider } from './context/CartContext';

function App() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const openPayment = () => setIsPaymentOpen(true);
  const closePayment = () => setIsPaymentOpen(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onCheckout={openPayment} />
        <HeroSection />
        <FeatureProduct />
        <BannerDiscount />
        <Footer />
        {isPaymentOpen && <Payment onClose={closePayment} />}
      </div>
    </CartProvider>
  );
}

export default App;