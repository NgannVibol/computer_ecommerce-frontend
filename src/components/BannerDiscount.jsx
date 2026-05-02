import { useState, useEffect } from 'react';

const BannerDiscount = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const [claimed, setClaimed] = useState(false);
  const [countdownActive, setCountdownActive] = useState(true);

  useEffect(() => {
    if (!countdownActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          setCountdownActive(false);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownActive]);

  const handleClaimDiscount = () => {
    setClaimed(true);
    setTimeout(() => {
      setClaimed(false);
    }, 3000);
  };

  const discounts = [
    { id: 1, code: 'GAMING40', discount: '40% OFF', category: 'Gaming PCs', expires: 'Today Only' },
    { id: 2, code: 'RTX30', discount: '30% OFF', category: 'Graphics Cards', expires: '24H Left' },
    { id: 3, code: 'PCBUILD20', discount: '20% OFF', category: 'Complete Builds', expires: '48H Left' },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-rose-50 to-orange-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-200 to-amber-300 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
      
      {/* Confetti Effect */}
      {claimed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                background: `hsl(${Math.random() * 360}, 100%, 60%)`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl">
          {/* Main Banner */}
          <div className="relative p-8 lg:p-12">
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Left Content */}
                <div className="text-center lg:text-left lg:max-w-xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 mb-6 px-5 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur animate-pulse"></div>
                      <div className="relative w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-white">
                      FLASH SALE • LIMITED TIME
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                      ))}
                    </div>
                  </div>

                  {/* Main Heading */}
                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                    UP TO <span className="text-yellow-300">40% OFF</span>
                    <br />
                    ON GAMING PCs
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-white/90 mb-8">
                    Don't miss this exclusive flash sale! Upgrade your gaming setup 
                    with premium components at unbeatable prices. Offer ends soon!
                  </p>

                  {/* Countdown Timer */}
                  <div className="mb-8">
                    <div className="text-sm font-medium text-white/80 mb-3">
                      ⏰ OFFER ENDS IN:
                    </div>
                    <div className="flex gap-3">
                      {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="text-center">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                              {value.toString().padStart(2, '0')}
                            </span>
                          </div>
                          <div className="text-xs text-white/70 mt-1 uppercase">
                            {unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Claim Button */}
                  <button
                    onClick={handleClaimDiscount}
                    disabled={claimed}
                    className={`group relative px-8 py-4 font-bold rounded-xl text-lg transition-all duration-300 ${claimed ? 'bg-green-500' : 'bg-white hover:bg-gray-100'} shadow-lg hover:shadow-xl flex items-center gap-3`}
                  >
                    {claimed ? (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>DISCOUNT CLAIMED!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                        </svg>
                        <span>CLAIM YOUR DISCOUNT NOW</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {/* Right Content - Discount Cards */}
                <div className="lg:w-96">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-bold text-white mb-4">ACTIVE DISCOUNTS</h3>
                    
                    <div className="space-y-4">
                      {discounts.map((discount) => (
                        <div
                          key={discount.id}
                          className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-all duration-300 group hover:scale-[1.02] cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                                <span className="text-lg">🎯</span>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-white">{discount.discount}</div>
                                <div className="text-sm text-white/70">{discount.category}</div>
                              </div>
                            </div>
                            <div className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                              {discount.expires}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <div className="px-3 py-1.5 bg-white/20 rounded-lg">
                                <code className="text-sm font-mono font-bold text-white">{discount.code}</code>
                              </div>
                              <button
                                onClick={() => navigator.clipboard.writeText(discount.code)}
                                className="text-sm text-white/70 hover:text-white transition-colors"
                              >
                                📋 Copy
                              </button>
                            </div>
                            <button className="px-4 py-1.5 bg-white text-pink-600 hover:bg-gray-100 font-semibold rounded-lg text-sm transition-all duration-300">
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Extra Info */}
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <div className="flex items-center gap-2">
                          <span>🔥</span>
                          <span>Limited Stock</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🚚</span>
                          <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🏆</span>
                          <span>Premium Builds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner Strip */}
          <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-medium">FLASH SALE IN PROGRESS</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-white/80">👥</span>
                  <span className="text-white font-bold">342</span>
                  <span className="text-white/80 text-sm">people viewing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/80">🛒</span>
                  <span className="text-white font-bold">189</span>
                  <span className="text-white/80 text-sm">sold today</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-white/80">⭐</span>
                <span className="text-white font-bold">4.9/5</span>
                <span className="text-white/80 text-sm">customer rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Offers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { 
              title: "Custom PC Builder", 
              description: "Build your own PC & get extra 10% off", 
              icon: "⚙️",
              gradient: "from-blue-500 to-cyan-500"
            },
            { 
              title: "Bundle Deals", 
              description: "Save up to $500 on complete setups", 
              icon: "🎁",
              gradient: "from-purple-500 to-pink-500"
            },
            { 
              title: "Student Discount", 
              description: "Extra 15% off for students", 
              icon: "🎓",
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((offer, index) => (
            <div key={index} className={`bg-gradient-to-r ${offer.gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-2">{offer.icon}</div>
                  <h4 className="text-lg font-bold mb-1">{offer.title}</h4>
                  <p className="text-white/90 text-sm">{offer.description}</p>
                </div>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors duration-300">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </section>
  );
};

export default BannerDiscount;