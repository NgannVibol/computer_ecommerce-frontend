import { useEffect, useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  // State for automatic computer model carousel
  const [currentModel, setCurrentModel] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Array of 4 computer models with reliable, high-quality Unsplash images
  const computerModels = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&auto=format&fit=crop",
      fallbackSrc: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&auto=format",
      alt: "Modern Silver Monitor",
      name: "UltraSharp 4K"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop",
      fallbackSrc: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format",
      alt: "RGB Gaming Desktop",
      name: "Predator Orion"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200&auto=format&fit=crop",
      fallbackSrc: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&auto=format",
      alt: "Professional Workstation",
      name: "ThinkStation P7"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1200&auto=format&fit=crop",
      fallbackSrc: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format",
      alt: "Sleek All-in-One Desktop",
      name: "iMac Pro"
    }
  ];

  // Reliable background image
  const backgroundImage = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop";

  // Initial load animation trigger
  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  // Automatic carousel effect: change model every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModel((prev) => (prev + 1) % computerModels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [computerModels.length]);

  // Handle image error - use fallback
  const handleImageError = (modelId) => {
    setImageErrors(prev => ({ ...prev, [modelId]: true }));
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      
      {/* Static gradient background (no broken image risk) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/90 to-indigo-900/90"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, 
        backgroundSize: '40px 40px' 
      }}></div>

      {/* Purple Gradient Overlay - enhanced */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT TEXT - slide in animation */}
          <div
            className={`space-y-6 transform transition-all duration-1000 ${
              loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <span className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-5 py-2 rounded-full text-sm backdrop-blur-md border border-white/30 shadow-lg">
              ⚡ AI-Powered Performance
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300">Computing</span>
              <br />For Creators & Gamers
            </h1>

            <p className="text-gray-100 text-lg max-w-xl drop-shadow-md leading-relaxed">
              Experience the next generation of power and design. From ultra-slim workstations to 
              high-FPS gaming rigs — engineered for those who demand the best.
            </p>

            {/* Buttons with hover glow */}
            <div className="flex gap-4 pt-4 flex-wrap">
              <button className="bg-white text-purple-900 font-semibold px-8 py-3.5 rounded-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all duration-300 shadow-lg">
                Explore Models →
              </button>
              <button className="border-2 border-white/80 px-8 py-3.5 rounded-lg hover:bg-white hover:text-purple-900 hover:border-white transition-all duration-300 backdrop-blur-sm font-semibold">
                Compare All
              </button>
            </div>

            {/* Bottom Specs - refined with glass effect */}
            <div className="flex gap-8 pt-8 text-sm flex-wrap">
              <div className="backdrop-blur-sm bg-white/10 px-5 py-3 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">32GB</h3>
                <p className="text-gray-300 text-xs uppercase tracking-wider">Unified Memory</p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 px-5 py-3 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">24‑Core</h3>
                <p className="text-gray-300 text-xs uppercase tracking-wider">CPU/GPU</p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 px-5 py-3 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">8TB</h3>
                <p className="text-gray-300 text-xs uppercase tracking-wider">SSD Storage</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - AUTOMATIC 4 MODEL ANIMATION - NO ERRORS */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            {/* Main carousel card with premium glassmorphism */}
            <div className="relative bg-gradient-to-br from-purple-600/30 via-purple-700/20 to-transparent backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-1">
              
              {/* Inner content with better contrast */}
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                
                {/* Rotating model image with fade transition - FIXED IMAGES */}
                <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl ring-2 ring-white/20">
                  {computerModels.map((model, index) => (
                    <img
                      key={model.id}
                      src={imageErrors[model.id] ? model.fallbackSrc : model.src}
                      alt={model.alt}
                      onError={() => handleImageError(model.id)}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                        index === currentModel
                          ? "opacity-100 scale-100 rotate-0"
                          : "opacity-0 scale-95 -rotate-1"
                      }`}
                      loading="eager"
                    />
                  ))}
                  
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Floating badge - current model name with glass effect */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/30 text-sm font-medium shadow-lg">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      {computerModels[currentModel].name} • 4K HDR
                    </span>
                  </div>
                  
                  {/* Animated glowing ring */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-xl opacity-50 blur-xl -z-10 animate-pulse"></div>
                </div>
                
                {/* Carousel indicators - interactive & show 4 models */}
                <div className="flex justify-center mt-6 gap-3">
                  {computerModels.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentModel(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentModel
                          ? "w-10 bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                          : "w-2.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`View model ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Model specs strip - dynamic based on current model */}
                <div className="flex justify-between mt-5 text-xs text-gray-200 px-2 bg-white/5 py-3 rounded-lg backdrop-blur-sm border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> 
                    {currentModel === 0 ? '27" 5K' : currentModel === 1 ? '32" 4K 240Hz' : currentModel === 2 ? 'Dual 4K' : '24" 4.5K'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span> 
                    {currentModel === 0 ? 'M3 Max' : currentModel === 1 ? 'RTX 5090' : currentModel === 2 ? 'Xeon W' : 'M3 Ultra'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> 
                    {currentModel === 0 ? 'Wi‑Fi 7' : currentModel === 1 ? '2.5GbE' : currentModel === 2 ? '10GbE' : 'Wi‑Fi 7'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements - floating orbs */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          </div>
        </div>
      </div>
      
      {/* Additional subtle animated gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </section>
  );
};

export default HeroSection;

/* 
  Add these custom animations to your global CSS:
  
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
*/