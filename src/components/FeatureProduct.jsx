import { useState, useContext } from 'react';
import { Star, ShoppingCart, Eye, Heart, Cpu, HardDrive, Zap, Shield, Monitor } from 'lucide-react';
import ProductDetail from './ProductDetail';
import AllProducts from './AllProducts';
import { CartContext } from '../context/CartContext';

const FeatureProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Computer & Laptop Products
  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 16\" M3 Max",
      brand: "Apple",
      price: 3499.00,
      originalPrice: 3799.00,
      discount: "8% OFF",
      rating: 4.9,
      reviews: 234,
      category: "Laptop",
      subCategory: "MacBook",
      specifications: {
        processor: "Apple M3 Max (16-core)",
        ram: "48GB Unified",
        storage: "1TB SSD",
        graphics: "40-core GPU",
        display: "16.2-inch Liquid Retina XDR",
        battery: "22 hours",
        os: "macOS Sonoma"
      },
      description: "The ultimate pro laptop with M3 Max chip, 48GB memory, and stunning Liquid Retina XDR display",
      features: [
        "16-core CPU, 40-core GPU",
        "48GB Unified Memory",
        "1TB SSD Storage",
        "16.2-inch Liquid Retina XDR",
        "1080p FaceTime HD camera",
        "Six-speaker sound system"
      ],
      colors: ["#1F2937", "#6B7280"],
      tags: ["PROFESSIONAL", "M3 MAX", "BESTSELLER"],
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Dell XPS 15 OLED",
      brand: "Dell",
      price: 2199.00,
      originalPrice: 2499.00,
      discount: "12% OFF",
      rating: 4.8,
      reviews: 567,
      category: "Laptop",
      subCategory: "Windows Ultrabook",
      specifications: {
        processor: "Intel Core i9-13900H",
        ram: "32GB DDR5",
        storage: "1TB NVMe SSD",
        graphics: "NVIDIA RTX 4070",
        display: "15.6-inch 3.5K OLED",
        battery: "8 hours",
        os: "Windows 11 Pro"
      },
      description: "Premium Windows laptop with stunning OLED display and powerful RTX graphics",
      features: [
        "Intel i9-13900H processor",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "3.5K OLED Touch Display",
        "NVIDIA RTX 4070 8GB",
        "Thunderbolt 4 ports"
      ],
      colors: ["#1F2937", "#FFFFFF"],
      tags: ["ULTRABOOK", "OLED", "CREATOR"],
      images: [
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 3,
      name: "ROG Zephyrus G16",
      brand: "ASUS ROG",
      price: 2499.00,
      originalPrice: 2799.00,
      discount: "11% OFF",
      rating: 4.7,
      reviews: 189,
      category: "Gaming Laptop",
      subCategory: "Gaming",
      specifications: {
        processor: "Intel Core i9-14900HX",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD",
        graphics: "NVIDIA RTX 4090",
        display: "16-inch QHD+ 240Hz",
        battery: "6 hours",
        os: "Windows 11 Home"
      },
      description: "Ultimate gaming laptop with RTX 4090 and 240Hz display",
      features: [
        "Intel i9-14900HX (24-cores)",
        "32GB DDR5-5600MHz",
        "2TB PCIe 4.0 SSD",
        "16-inch QHD+ 240Hz G-Sync",
        "NVIDIA RTX 4090 16GB",
        "RGB per-key keyboard"
      ],
      colors: ["#1F2937", "#6B21A8"],
      tags: ["GAMING", "RTX 4090", "240Hz"],
      images: [
    "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&auto=format&fit=crop"
  ]
    },
    {
      id: 4,
      name: "ThinkPad X1 Carbon Gen 11",
      brand: "Lenovo",
      price: 1899.00,
      originalPrice: 2199.00,
      discount: "14% OFF",
      rating: 4.8,
      reviews: 423,
      category: "Business Laptop",
      subCategory: "Ultrabook",
      specifications: {
        processor: "Intel Core i7-1365U",
        ram: "16GB LPDDR5",
        storage: "512GB NVMe SSD",
        graphics: "Intel Iris Xe",
        display: "14-inch WUXGA IPS",
        battery: "15 hours",
        os: "Windows 11 Pro"
      },
      description: "Business-class ultrabook with carbon fiber build and enterprise security",
      features: [
        "Intel vPro i7-1365U",
        "16GB LPDDR5 RAM",
        "512GB PCIe SSD",
        "14-inch WUXGA 400 nits",
        "Carbon fiber chassis",
        "Fingerprint reader"
      ],
      colors: ["#1F2937"],
      tags: ["BUSINESS", "ULTRABOOK", "THINKPAD"],
      images: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 5,
      name: "iMac 24\" M3",
      brand: "Apple",
      price: 1499.00,
      originalPrice: 1699.00,
      discount: "12% OFF",
      rating: 4.9,
      reviews: 312,
      category: "Desktop",
      subCategory: "All-in-One",
      specifications: {
        processor: "Apple M3 (8-core)",
        ram: "16GB Unified",
        storage: "512GB SSD",
        graphics: "10-core GPU",
        display: "24-inch 4.5K Retina",
        os: "macOS Sonoma"
      },
      description: "Stunning all-in-one desktop with M3 chip and 7 vibrant colors",
      features: [
        "Apple M3 chip",
        "16GB Unified Memory",
        "512GB SSD",
        "24-inch 4.5K Retina display",
        "1080p FaceTime HD camera",
        "Studio-quality mics"
      ],
      colors: ["#3B82F6", "#EF4444", "#F59E0B", "#10B981", "#8B5CF6"],
      tags: ["DESKTOP", "ALL-IN-ONE", "IMAC"],
      images: [
        "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 6,
      name: "Surface Laptop Studio 2",
      brand: "Microsoft",
      price: 2399.00,
      originalPrice: 2699.00,
      discount: "11% OFF",
      rating: 4.7,
      reviews: 156,
      category: "2-in-1 Laptop",
      subCategory: "Convertible",
      specifications: {
        processor: "Intel Core i7-13700H",
        ram: "32GB LPDDR5x",
        storage: "1TB NVMe SSD",
        graphics: "NVIDIA RTX 4060",
        display: "14.4-inch 120Hz Touch",
        battery: "18 hours",
        os: "Windows 11 Pro"
      },
      description: "Versatile 2-in-1 laptop with dynamic woven hinge and studio mode",
      features: [
        "Intel i7-13700H",
        "32GB LPDDR5x RAM",
        "1TB NVMe SSD",
        "14.4-inch 120Hz PixelSense",
        "NVIDIA RTX 4060 8GB",
        "Dynamic woven hinge"
      ],
      colors: ["#6B7280", "#1F2937"],
      tags: ["2-IN-1", "CREATOR", "SURFACE"],
      images: [
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 7,
      name: "HP Spectre x360 14",
      brand: "HP",
      price: 1599.00,
      originalPrice: 1799.00,
      discount: "11% OFF",
      rating: 4.6,
      reviews: 278,
      category: "2-in-1 Laptop",
      subCategory: "Convertible",
      specifications: {
        processor: "Intel Core i7-1355U",
        ram: "16GB LPDDR5",
        storage: "1TB NVMe SSD",
        graphics: "Intel Iris Xe",
        display: "13.5-inch 3K OLED",
        battery: "13 hours",
        os: "Windows 11 Home"
      },
      description: "Premium convertible laptop with stunning OLED display and gem-cut design",
      features: [
        "Intel i7-1355U",
        "16GB LPDDR5 RAM",
        "1TB NVMe SSD",
        "13.5-inch 3K OLED Touch",
        "HP Pen included",
        "Gem-cut design"
      ],
      colors: ["#6B7280", "#F59E0B"],
      tags: ["CONVERTIBLE", "OLED", "PREMIUM"],
      images: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 8,
      name: "Mac Studio M2 Ultra",
      brand: "Apple",
      price: 3999.00,
      originalPrice: 4499.00,
      discount: "11% OFF",
      rating: 4.9,
      reviews: 98,
      category: "Desktop",
      subCategory: "Workstation",
      specifications: {
        processor: "Apple M2 Ultra (24-core)",
        ram: "64GB Unified",
        storage: "1TB SSD",
        graphics: "60-core GPU",
        display: "Up to 8K support",
        os: "macOS Sonoma"
      },
      description: "Revolutionary desktop workstation with M2 Ultra chip for pros",
      features: [
        "M2 Ultra with 24-core CPU",
        "64GB Unified Memory",
        "1TB SSD Storage",
        "60-core GPU",
        "32-core Neural Engine",
        "6 Thunderbolt 4 ports"
      ],
      colors: ["#6B7280"],
      tags: ["WORKSTATION", "M2 ULTRA", "PRO"],
      images: [
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop"
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: 8, icon: <Monitor className="w-4 h-4" /> },
    { id: 'laptop', name: 'Laptops', count: 4, icon: <Cpu className="w-4 h-4" /> },
    { id: 'gaming', name: 'Gaming', count: 1, icon: <Zap className="w-4 h-4" /> },
    { id: 'business', name: 'Business', count: 1, icon: <Shield className="w-4 h-4" /> },
    { id: 'desktop', name: 'Desktops', count: 2, icon: <Monitor className="w-4 h-4" /> },
    { id: '2-in-1', name: '2-in-1', count: 2, icon: <HardDrive className="w-4 h-4" /> }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => {
        if (activeCategory === 'laptop') 
          return product.category === 'Laptop';
        if (activeCategory === 'gaming') 
          return product.category === 'Gaming Laptop';
        if (activeCategory === 'business') 
          return product.category === 'Business Laptop';
        if (activeCategory === 'desktop') 
          return product.category === 'Desktop';
        if (activeCategory === '2-in-1') 
          return product.category === '2-in-1 Laptop';
        return product.category.toLowerCase().includes(activeCategory.toLowerCase());
      });

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleViewAll = () => {
    setShowAllProducts(true);
  };

  if (showAllProducts) {
    return <AllProducts onBack={() => setShowAllProducts(false)} products={featuredProducts} />;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-full">
            <Cpu className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-600">FEATURED COMPUTERS</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Premium Computers & Laptops
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully selected computers with the latest processors, 
            stunning displays, and professional-grade performance
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-xl">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                }`}
              >
                {category.icon}
                {category.name}
                <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-200">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 text-xs font-bold bg-red-500 text-white rounded-lg shadow-lg">
                      {product.discount}
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                  {product.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className={`px-2 py-1 text-xs font-bold rounded-lg shadow-lg ${
                      tag.includes('GAMING') ? 'bg-purple-500 text-white' :
                      tag.includes('PRO') ? 'bg-blue-500 text-white' :
                      tag.includes('BUSINESS') ? 'bg-green-500 text-white' :
                      'bg-gray-900 text-white'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-16 right-3 z-10 flex flex-col gap-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all hover:scale-110">
                    <Heart className="w-4 h-4 text-gray-700 hover:text-red-500" />
                  </button>
                </div>

                {/* Product Image */}
                <div 
                  className="w-full h-full flex items-center justify-center p-6 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop";
                    }}
                  />
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <div className="flex gap-2 w-full">
                    <button 
                      className="flex-1 px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="w-4 h-4" />
                      Quick View
                    </button>
                    <button 
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-full">
                    {product.brand}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.subCategory || product.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                    <Cpu className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs text-gray-700 truncate">
                      {product.specifications.processor.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                    <HardDrive className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs text-gray-700 truncate">
                      {product.specifications.ram} RAM
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg col-span-2">
                    <Zap className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-xs text-gray-700 truncate">
                      {product.specifications.storage} • {product.specifications.graphics}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="flex gap-1">
                    {product.colors?.slice(0, 2).map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.colors?.length > 2 && (
                      <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                        <span className="text-[10px] font-medium text-gray-600">+{product.colors.length - 2}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            View All Computers & Laptops
            <Monitor className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default FeatureProduct;