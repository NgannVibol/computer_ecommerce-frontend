// components/ProductDetail.jsx
import { useState, useContext } from 'react';
import { Star, ShoppingBag, Heart, Truck, Shield, RotateCcw, CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Use product's images or fallback to a default image
  const productImages = product?.images || [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop"
  ];

  // Payment methods
  const paymentMethods = [
    { id: 'credit', name: 'Credit Card', icon: CreditCard, color: 'text-blue-600' },
    { id: 'debit', name: 'Debit Card', icon: CreditCard, color: 'text-green-600' },
    { id: 'paypal', name: 'PayPal', icon: Wallet, color: 'text-indigo-600' },
    { id: 'khqr', name: 'KHQR / Bakong', icon: Banknote, color: 'text-red-600' },
    { id: 'aba', name: 'ABA Pay', icon: Banknote, color: 'text-yellow-600' },
    { id: 'wing', name: 'Wing', icon: Banknote, color: 'text-pink-600' },
    { id: 'cash', name: 'Cash on Delivery', icon: Banknote, color: 'text-gray-600' }
  ];

  // Calculate discounted price for the original price display
  const calculateOriginalPrice = () => {
    if (product?.originalPrice) {
      return product.originalPrice;
    }
    return product?.price ? product.price * 1.15 : 1114.35;
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const calculateTotal = () => {
    const price = product?.price || 0;
    return (price * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    setOrderPlaced(true);
    addToCart(product, quantity);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setOrderPlaced(false);
      setShowPayment(false);
      setPaymentMethod('');
      onClose();
    }, 3000);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setPaymentMethod('');
  };

  return (
    <>
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-20 overflow-y-auto"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div 
          className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!showPayment ? (
            /* Product Details */
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Left Column - Images */}
              <div className="space-y-6">
                {/* Main Image */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                  <img
                    src={productImages[selectedImage]}
                    alt={product?.name || 'Product'}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop";
                    }}
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4">
                  {productImages.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product?.name || 'Product'} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop";
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Product Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">2 Year Warranty</p>
                      <p className="text-xs text-gray-600">Comprehensive Protection</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Truck className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                      <p className="text-xs text-gray-600">2-3 Business Days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="space-y-6">
                {/* Brand */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-blue-600 uppercase tracking-wider">
                    {product?.brand || "MSI"}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {product?.name || "Product Name"}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product?.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{product?.rating || 0}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>☆☆☆☆☆ ({product?.reviews || 0} Reviews)</span>
                    <span>•</span>
                    <span>{product?.orders || 0} Orders</span>
                    <span>•</span>
                    <span>{product?.wishlistCount || 0} Wish Listed</span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${product?.price?.toFixed(2) || "0.00"}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${calculateOriginalPrice().toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      {product?.discount || "15% OFF"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes</p>
                </div>

                {/* Color Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Options:</h3>
                  <div className="flex gap-4">
                    {(product?.colors || ["#1F2937", "#3B82F6", "#DC2626"]).map((color, index) => (
                      <button
                        key={index}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-gray-600">Option {index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {product?.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description:</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                )}

                {/* Specifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications:</h3>
                  <div className="space-y-2">
                    {product?.specifications ? (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Display: {product.specifications.display}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Processor: {product.specifications.processor}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">RAM: {product.specifications.ram}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Storage: {product.specifications.storage}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Camera: {product.specifications.camera}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">Battery: {product.specifications.battery}</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500">No specifications available.</p>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity:</h3>
                  <div className="flex items-center gap-4 max-w-xs">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors ${
                        quantity <= 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-3xl font-bold text-gray-900">{quantity}</span>
                    </div>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">Total Price:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        ${calculateTotal()}
                      </span>
                      <p className="text-sm text-gray-500">Tax: $0.00</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg text-lg transition-colors flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`px-4 py-4 rounded-lg flex items-center justify-center transition-colors ${
                      wishlisted 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${wishlisted ? 'fill-red-600' : ''}`} />
                  </button>
                </div>

                {/* Return Policy */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">30-Day Return Policy</p>
                      <p className="text-xs text-gray-600">Easy returns within 30 days of purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Payment Section */
            <div className="p-8">
              {!orderPlaced ? (
                <>
                  {/* Payment Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Payment Method</h2>
                    <p className="text-gray-600">Choose your preferred payment option</p>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-lg p-2">
                        <img
                          src={productImages[0]}
                          alt={product?.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{product?.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                        <p className="text-sm text-gray-600">Price: ${product?.price?.toFixed(2)} each</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${calculateTotal()}</p>
                        <p className="text-xs text-gray-500">Incl. taxes</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            paymentMethod === method.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {paymentMethod === method.id && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="w-5 h-5 text-blue-500" />
                            </div>
                          )}
                          <Icon className={`w-8 h-8 ${method.color}`} />
                          <span className="text-sm font-medium text-gray-900">{method.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Details Form */}
                  {paymentMethod && ['credit', 'debit'].includes(paymentMethod) && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 animate-slideUp">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'khqr' && (
                    <div className="bg-gray-50 rounded-xl p-8 mb-8 text-center animate-slideUp">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KHQR+Payment"
                        alt="KHQR Code"
                        className="w-48 h-48 mx-auto mb-4"
                      />
                      <p className="text-gray-700">Scan with Bakong or any KHQR app</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleClosePayment}
                      className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={!paymentMethod}
                      className={`flex-1 px-6 py-4 font-bold rounded-lg text-lg transition-colors flex items-center justify-center gap-3 ${
                        paymentMethod
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      Pay ${calculateTotal()}
                    </button>
                  </div>
                </>
              ) : (
                /* Order Success Message */
                <div className="text-center py-12 animate-scaleIn">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                  <p className="text-xl text-gray-600 mb-2">Thank you for your purchase</p>
                  <p className="text-gray-500 mb-8">Order confirmation has been sent to your email</p>
                  <div className="bg-blue-50 rounded-xl p-6 max-w-md mx-auto">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Order Summary</p>
                    <p className="text-sm text-gray-600">{product?.name} x {quantity}</p>
                    <p className="text-sm text-gray-600">Total: ${calculateTotal()}</p>
                    <p className="text-sm text-gray-600">Payment: {paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ProductDetail;