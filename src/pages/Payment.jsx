import { useState, useContext } from "react";
import { 
  X, MapPin, Home, Building, CheckCircle, 
  CreditCard, Wallet, Truck, Shield,
  ArrowLeft, ChevronRight
} from "lucide-react";
import { CartContext } from "../context/CartContext";
import telegramService from "../service/telegramService";

const Payment = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const { 
    cartItems, 
    cartTotal, 
    cartCount, 
    clearCart
  } = useContext(CartContext);
  
  // Address state
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    commune: '',
    village: '',
    street: '',
    houseNo: '',
    addressType: 'home',
    notes: ''
  });
  
  const [provinces] = useState([
    'Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 
    'Kampong Cham', 'Kandal', 'Takeo', 'Kampot', 'Pursat',
    'Kampong Chhnang', 'Kampong Speu', 'Prey Veng', 'Svay Rieng'
  ]);

  // Payment methods
  const paymentMethods = [
    { 
      id: 'aba', 
      name: 'ABA Pay', 
      icon: '🏦', 
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-200',
      description: 'Pay with ABA mobile app'
    },
    { 
      id: 'wing', 
      name: 'Wing', 
      icon: '💰', 
      color: 'bg-pink-50 text-pink-600',
      borderColor: 'border-pink-200',
      description: 'Pay with Wing app'
    },
    { 
      id: 'khqr', 
      name: 'KHQR / Bakong', 
      icon: '📱', 
      color: 'bg-red-50 text-red-600',
      borderColor: 'border-red-200',
      description: 'Scan QR code with Bakong'
    },
    { 
      id: 'credit', 
      name: 'Credit Card', 
      icon: '💳', 
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-200',
      description: 'Visa, Mastercard, JCB'
    },
    { 
      id: 'debit', 
      name: 'Debit Card', 
      icon: '💳', 
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-200',
      description: 'Local bank cards'
    },
    { 
      id: 'cash', 
      name: 'Cash on Delivery', 
      icon: '💵', 
      color: 'bg-gray-50 text-gray-600',
      borderColor: 'border-gray-200',
      description: 'Pay when you receive'
    }
  ];

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = () => {
    // Validate required fields
    if (!address.fullName?.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!address.phone?.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!address.email?.trim()) {
      alert('Please enter your email address');
      return;
    }
    if (!address.province) {
      alert('Please select a province');
      return;
    }
    if (!address.district?.trim()) {
      alert('Please enter your district');
      return;
    }
    if (!address.commune?.trim()) {
      alert('Please enter your commune');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(address.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Cambodia phone number validation
    const phoneRegex = /^(?:\+855|0)[1-9][0-9]{7,8}$/;
    if (!phoneRegex.test(address.phone.replace(/\s/g, ''))) {
      alert('Please enter a valid Cambodia phone number');
      return;
    }
    
    setStep(2);
  };

  const handleEditAddress = () => {
    setStep(1);
  };

  const handlePaymentMethodSelect = (methodId) => {
    setPaymentMethod(methodId);
  };

  const handleContinueToReview = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    setStep(3);
  };

  const handlePayment = async () => {
    setOrderPlaced(true);

    try {
      const orderNumber = Math.floor(1000 + Math.random() * 9000);
      
      const orderData = {
        orderNumber: orderNumber,
        orderDate: new Date().toISOString(),
        customer: {
          fullName: address.fullName,
          email: address.email,
          phone: address.phone,
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          brand: item.brand || 'Nika Computer',
          total: item.price * item.quantity
        })),
        subtotal: cartTotal,
        shipping: 0,
        tax: 0,
        total: cartTotal,
        paymentMethod: paymentMethods.find(m => m.id === paymentMethod)?.name,
        address: {
          fullName: address.fullName,
          phone: address.phone,
          province: address.province,
          district: address.district,
          commune: address.commune,
          village: address.village || '',
          street: address.street || '',
          houseNo: address.houseNo || '',
          addressType: address.addressType,
          notes: address.notes || ''
        },
        formattedAddress: formatAddress()
      };

      await telegramService.sendOrderNotification(orderData);
    } catch (error) {
      console.error('❌ Error sending order:', error);
    }
  };

  const handleClose = () => {
    setStep(1);
    setPaymentMethod('');
    setOrderPlaced(false);
    setAddress({
      fullName: '',
      email: '',
      phone: '',
      province: '',
      district: '',
      commune: '',
      village: '',
      street: '',
      houseNo: '',
      addressType: 'home',
      notes: ''
    });
    onClose();
  };

  const handleContinueShopping = () => {
    clearCart();
    handleClose();
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Format address display
  const formatAddress = () => {
    const parts = [
      address.houseNo && `#${address.houseNo}`,
      address.street,
      address.village,
      address.commune,
      address.district,
      address.province
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm animate-fadeIn">
      <div className="fixed right-0 top-0 h-full w-full max-w-3xl bg-white shadow-2xl animate-slideInRight flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {step > 1 && !orderPlaced && (
              <button
                onClick={goBack}
                className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {orderPlaced ? 'Order Confirmed' : 'Checkout'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {orderPlaced 
                  ? 'Thank you for your purchase' 
                  : `${cartCount} item${cartCount !== 1 ? 's' : ''} · $${cartTotal.toFixed(2)}`
                }
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Progress Bar */}
        {!orderPlaced && (
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {[
                { number: 1, label: 'Address' },
                { number: 2, label: 'Payment' },
                { number: 3, label: 'Review' }
              ].map((item) => (
                <div key={item.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step > item.number 
                        ? 'bg-green-500 text-white' 
                        : step === item.number
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step > item.number ? '✓' : item.number}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      step >= item.number ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.number < 3 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      step > item.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {!orderPlaced ? (
            <>
              {/* Step 1: Address */}
              {step === 1 && (
                <div className="max-w-2xl mx-auto animate-slideUp">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="grid grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={address.fullName}
                          onChange={handleAddressChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={address.email}
                          onChange={handleAddressChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                      
                      {/* Phone Number */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={address.phone}
                          onChange={handleAddressChange}
                          placeholder="012 345 678"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* Province/City */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Province/City <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="province"
                          value={address.province}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                        >
                          <option value="">Select province</option>
                          {provinces.map(prov => (
                            <option key={prov} value={prov}>{prov}</option>
                          ))}
                        </select>
                      </div>

                      {/* District/Khan */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          District/Khan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="district"
                          value={address.district}
                          onChange={handleAddressChange}
                          placeholder="e.g. Chamkarmon"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* Commune/Sangkat */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Commune/Sangkat <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="commune"
                          value={address.commune}
                          onChange={handleAddressChange}
                          placeholder="e.g. Tonle Bassac"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* Village */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Village
                        </label>
                        <input
                          type="text"
                          name="village"
                          value={address.village}
                          onChange={handleAddressChange}
                          placeholder="e.g. Phsar Kandal"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* Street/Building */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Street/Building
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={address.street}
                          onChange={handleAddressChange}
                          placeholder="Street name or building"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* House No. */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          House/Apt No.
                        </label>
                        <input
                          type="text"
                          name="houseNo"
                          value={address.houseNo}
                          onChange={handleAddressChange}
                          placeholder="#123"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* Address Type */}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                          <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                            address.addressType === 'home' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="addressType"
                              value="home"
                              checked={address.addressType === 'home'}
                              onChange={handleAddressChange}
                              className="w-4 h-4 text-blue-600 hidden"
                            />
                            <Home className={`w-4 h-4 ${
                              address.addressType === 'home' ? 'text-blue-600' : 'text-gray-500'
                            }`} />
                            <span className={`text-sm font-medium ${
                              address.addressType === 'home' ? 'text-blue-600' : 'text-gray-700'
                            }`}>
                              Home
                            </span>
                          </label>
                          <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                            address.addressType === 'work' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="addressType"
                              value="work"
                              checked={address.addressType === 'work'}
                              onChange={handleAddressChange}
                              className="w-4 h-4 text-blue-600 hidden"
                            />
                            <Building className={`w-4 h-4 ${
                              address.addressType === 'work' ? 'text-blue-600' : 'text-gray-500'
                            }`} />
                            <span className={`text-sm font-medium ${
                              address.addressType === 'work' ? 'text-blue-600' : 'text-gray-700'
                            }`}>
                              Work
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                          name="notes"
                          value={address.notes}
                          onChange={handleAddressChange}
                          placeholder="e.g. Landmark, directions, or special instructions"
                          rows="2"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveAddress}
                      className="w-full mt-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="max-w-2xl mx-auto animate-slideUp">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                  </div>

                  {/* Saved Address Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{address.fullName}</span>
                        {address.addressType === 'home' ? ' (Home)' : ' (Work)'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formatAddress()}</p>
                      <p className="text-sm text-gray-500 mt-1">📞 {address.phone}</p>
                      <button 
                        onClick={handleEditAddress}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2"
                      >
                        Change address
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        className={`relative p-5 rounded-xl border-2 transition-all ${
                          paymentMethod === method.id
                            ? `border-blue-500 bg-blue-50/50`
                            : `border-gray-200 hover:border-gray-300 bg-white`
                        }`}
                      >
                        <div className="flex flex-col items-start">
                          <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mb-3`}>
                            <span className="text-2xl">{method.icon}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{method.name}</span>
                          <span className="text-xs text-gray-500 mt-1 text-left">
                            {method.description}
                          </span>
                        </div>
                        {paymentMethod === method.id && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'khqr' && (
                    <div className="mt-6 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=KHQR|NikaComputer|${cartTotal}|${Date.now()}`}
                            alt="KHQR Code"
                            className="w-44 h-44 mx-auto mb-4"
                          />
                          <p className="font-medium text-gray-900">Scan with Bakong or KHQR app</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Amount: <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'aba' && (
                    <div className="mt-6 bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                          <span className="text-3xl">🏦</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">ABA Pay</p>
                          <p className="text-sm text-gray-600 mt-1">
                            You will be redirected to ABA's secure payment page
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={goBack}
                      className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinueToReview}
                      disabled={!paymentMethod}
                      className={`flex-1 py-3.5 font-semibold rounded-lg transition-colors ${
                        paymentMethod
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Pay */}
              {step === 3 && (
                <div className="max-w-2xl mx-auto animate-slideUp">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Review & Pay</h2>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                    {/* Items */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={item.images?.[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200"} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                                  <p className="text-xs text-gray-500 mt-0.5">{item.brand || 'Nika Computer'}</p>
                                </div>
                                <span className="font-medium text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                        </div>
                        <button 
                          onClick={handleEditAddress}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-medium">{address.fullName}</span>
                        {address.addressType === 'home' ? ' (Home)' : ' (Work)'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formatAddress()}</p>
                      <p className="text-sm text-gray-500 mt-1">📞 {address.phone}</p>
                    </div>

                    {/* Payment Method */}
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <h3 className="font-semibold text-gray-900">Payment Method</h3>
                        </div>
                        <button 
                          onClick={() => setStep(2)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className={`w-8 h-8 ${paymentMethods.find(m => m.id === paymentMethod)?.color} rounded-full flex items-center justify-center`}>
                          <span className="text-lg">{paymentMethods.find(m => m.id === paymentMethod)?.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {paymentMethods.find(m => m.id === paymentMethod)?.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-blue-50 rounded-xl p-5 mt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <div className="border-t border-blue-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">Total</span>
                          <span className="text-xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={goBack}
                      className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePayment}
                      className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Wallet className="w-4 h-4" />
                      Pay ${cartTotal.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Order Success Screen */
            <div className="flex flex-col items-center justify-center min-h-[500px] text-center animate-scaleIn">
              <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-14 h-14 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Thank you for your purchase. We've sent a confirmation email to {address.email}
              </p>

              <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-lg mb-8 text-left">
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                  <Truck className="w-5 h-5" />
                  <span className="font-semibold">Delivery Details</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{address.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">{formatAddress()}</p>
                    <p className="text-sm text-gray-600 mt-1">📞 {address.phone}</p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Order #:</span> NK-{Math.floor(Math.random() * 10000)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Payment:</span> {paymentMethods.find(m => m.id === paymentMethod)?.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Total:</span> ${cartTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleContinueShopping}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={handleClose}
                  className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.3s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Payment;