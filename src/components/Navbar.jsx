import { 
  Search, Heart, User, ShoppingCart, ChevronDown, Phone, X, 
  Plus, Minus, Trash2 
} from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = ({ onCheckout }) => {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const { 
    cartItems,
    cartTotal,
    cartCount, 
    message, 
    clearMessage, 
    isCartOpen, 
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useContext(CartContext);

  // Auto-hide cart message
  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        clearMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setCurrencyOpen(false);
      setLanguageOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCheckout = () => {
    toggleCart();
    onCheckout();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const categories = [
    "Smart Phone", "iPad & Tablet", "Smart Watch", "Computer",
    "Home Appliances", "PC Accessories", "Apple Accessories", "Phone Accessories"
  ];

  return (
    <div className="w-full sticky top-0 z-50">
      {/* ===== TOP BAR ===== */}
      <div className="bg-gray-50 border-b text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-10 relative">
          {/* Phone */}
          <div className="flex items-center gap-2 text-gray-700">
            <Phone size={14} />
            <span className="font-medium">+855 61 809 260</span>
          </div>

          {/* Cart Message Notification */}
          {showMessage && message && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg animate-slideDown flex items-center gap-2">
              <ShoppingCart size={16} />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {/* Currency & Language */}
          <div className="flex items-center gap-6">
            {/* Currency Dropdown */}
            <div className="relative" onClick={stopPropagation}>
              <button 
                className="flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none"
                onClick={() => setCurrencyOpen(!currencyOpen)}
              >
                <span>USD $</span>
                <ChevronDown size={14} />
              </button>
              
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg w-28 z-50 overflow-hidden">
                  <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors">USD $</div>
                  <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors border-t">KHR (៛)</div>
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative" onClick={stopPropagation}>
              <button 
                className="flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <span>English</span>
                <ChevronDown size={14} />
              </button>
              
              {languageOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg w-28 z-50 overflow-hidden">
                  <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors">English</div>
                  <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors border-t">Khmer</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-max">
            <div className="w-10 h-10 bg-blue-600 text-white font-bold flex items-center justify-center rounded-lg">
              VB
            </div>
            <span className="font-bold text-lg text-gray-800">VB Computer</span>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search for items..." 
              className="w-full h-11 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-5 text-gray-700">
            <button className="hover:text-blue-600 transition-colors focus:outline-none">
              <Heart size={20} />
            </button>
            <button className="hover:text-blue-600 transition-colors focus:outline-none">
              <User size={20} />
            </button>
            <button 
              className="relative hover:text-blue-600 transition-colors focus:outline-none"
              onClick={toggleCart}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== MENU BAR ===== */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-8">
          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white text-blue-600 px-4 h-9 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:outline-none">
              Categories
              <ChevronDown size={16} />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-1 hidden group-hover:block hover:block bg-white text-gray-700 w-64 shadow-xl border rounded-lg z-50 overflow-hidden">
              {categories.map((item) => (
                <a
                  key={item}
                  href={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors"
                >
                  <span className="text-sm">{item}</span>
                  <ChevronDown size={14} className="text-gray-400 -rotate-90" />
                </a>
              ))}
              <div className="border-t">
                <a href="/categories" className="px-4 py-2.5 text-blue-600 font-medium hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors">
                  <span>View All Categories</span>
                  <ChevronDown size={14} className="text-blue-400 -rotate-90" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 font-medium">
            <a href="/" className="hover:underline hover:text-blue-100 transition-colors">Home</a>
            <a href="/brand" className="hover:underline hover:text-blue-100 transition-colors">Brand</a>
            <a href="/discount" className="hover:underline hover:text-blue-100 transition-colors">Discounted Products</a>
            <a href="/shops" className="hover:underline hover:text-blue-100 transition-colors">All Shops</a>
          </div>
        </div>
      </div>

      {/* ===== CART DRAWER ===== */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={toggleCart}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 animate-slideInRight flex flex-col">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                  <p className="text-sm text-gray-500">
                    {cartCount} item{cartCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button 
                onClick={toggleCart}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors focus:outline-none"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Drawer Content - Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
                  <button 
                    onClick={toggleCart}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 animate-slideUp">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.images?.[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200"} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {item.brand || 'Nika Computer'}
                            </p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors focus:outline-none"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors focus:outline-none"
                            >
                              <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                          <span className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer - Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-700">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 mb-4">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Proceed to Checkout
                  <span className="text-lg">→</span>
                </button>
                
                {/* Clear Cart */}
                <button 
                  onClick={clearCart}
                  className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Navbar;