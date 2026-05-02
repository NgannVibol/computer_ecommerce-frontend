import { useState, useContext } from 'react';
import { 
  Star, ShoppingCart, Eye, Cpu, HardDrive, Zap, Shield, Monitor,
  ArrowLeft, Search, Filter, X, ChevronDown
} from 'lucide-react';
import ProductDetail from './ProductDetail';
import { CartContext } from '../context/CartContext';

const AllProducts = ({ onBack, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const { addToCart } = useContext(CartContext);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length, icon: <Monitor className="w-4 h-4" /> },
    { id: 'laptop', name: 'Laptops', count: products.filter(p => p.category === 'Laptop').length, icon: <Cpu className="w-4 h-4" /> },
    { id: 'gaming', name: 'Gaming', count: products.filter(p => p.category === 'Gaming Laptop').length, icon: <Zap className="w-4 h-4" /> },
    { id: 'business', name: 'Business', count: products.filter(p => p.category === 'Business Laptop').length, icon: <Shield className="w-4 h-4" /> },
    { id: 'desktop', name: 'Desktops', count: products.filter(p => p.category === 'Desktop').length, icon: <Monitor className="w-4 h-4" /> },
    { id: '2-in-1', name: '2-in-1', count: products.filter(p => p.category === '2-in-1 Laptop').length, icon: <HardDrive className="w-4 h-4" /> }
  ];

  const brands = [...new Set(products.map(p => p.brand))];

  // Handle brand selection
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all');
    setPriceRange([0, 5000]);
    setSearchQuery('');
    setSortBy('featured');
    setSelectedBrands([]);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'laptop') return product.category === 'Laptop';
        if (activeCategory === 'gaming') return product.category === 'Gaming Laptop';
        if (activeCategory === 'business') return product.category === 'Business Laptop';
        if (activeCategory === 'desktop') return product.category === 'Desktop';
        if (activeCategory === '2-in-1') return product.category === '2-in-1 Laptop';
      }
      return true;
    })
    .filter(product => {
      // Price filter
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    })
    .filter(product => {
      // Brand filter
      if (selectedBrands.length === 0) return true;
      return selectedBrands.includes(product.brand);
    })
    .filter(product => {
      // Search filter
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) ||
             product.brand.toLowerCase().includes(query) ||
             product.category.toLowerCase().includes(query) ||
             product.specifications.processor.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      // Sorting
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Get processor short name
  const getProcessorShort = (processor) => {
    if (processor.includes('M3')) return 'Apple M3';
    if (processor.includes('i9')) return 'Core i9';
    if (processor.includes('i7')) return 'Core i7';
    if (processor.includes('Ultra')) return 'M2 Ultra';
    return processor.split(' ').slice(0, 2).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Computers & Laptops</h1>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-blue-600">{filteredProducts.length}</span> products found
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, brand, or processor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Sort & Filter Buttons */}
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden px-4 py-3 border rounded-xl flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                showFilters ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 hover:bg-gray-50'
              }`}
              aria-label="Toggle filters"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Filters</span>
              {selectedBrands.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  {selectedBrands.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(activeCategory !== 'all' || priceRange[1] < 5000 || selectedBrands.length > 0 || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-gray-500">Active filters:</span>
            
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                {categories.find(c => c.id === activeCategory)?.name}
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {priceRange[1] < 5000 && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                Under ${priceRange[1].toLocaleString()}
                <button 
                  onClick={() => setPriceRange([0, 5000])}
                  className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {selectedBrands.map(brand => (
              <span key={brand} className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                {brand}
                <button 
                  onClick={() => handleBrandToggle(brand)}
                  className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            <button
              onClick={resetFilters}
              className="text-xs text-gray-500 hover:text-red-500 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all ${
                        activeCategory === category.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {category.icon}
                        {category.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Min: $0</span>
                    <span className="text-xs text-gray-500">Max: ${priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Selected: <span className="text-blue-600">${priceRange[1].toLocaleString()}</span>
                    </span>
                    {priceRange[1] < 5000 && (
                      <span className="text-xs text-green-600">Under budget</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Brands</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {brands.map((brand) => (
                    <label 
                      key={brand} 
                      className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {brand}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {products.filter(p => p.brand === brand).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center animate-fadeIn">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                  </p>
                  <p className="text-xs text-gray-500">
                    Sort by: <span className="font-medium text-gray-700">{sortBy.split('-').join(' ')}</span>
                  </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        {/* Discount Badge */}
                        {product.discount && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg">
                              {product.discount}
                            </span>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                          {product.tags.slice(0, 1).map((tag, index) => (
                            <span 
                              key={index} 
                              className={`px-2 py-1 text-xs font-bold rounded-lg shadow-lg ${
                                tag.includes('GAMING') ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                                tag.includes('PRO') ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                                tag.includes('BUSINESS') ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                                tag.includes('ULTRABOOK') ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white' :
                                'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
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
                            loading="lazy"
                          />
                        </div>

                        {/* Hover Overlay - Quick Actions */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4 transition-all duration-300 ${
                          hoveredProduct === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}>
                          <div className="flex gap-2 w-full">
                            <button 
                              className="flex-1 py-2.5 bg-white hover:bg-gray-100 text-gray-900 rounded-lg transition-colors text-xs font-medium flex items-center justify-center gap-1.5 shadow-lg"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Quick View
                            </button>
                            <button 
                              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium flex items-center justify-center gap-1.5 shadow-lg"
                              onClick={(e) => handleAddToCart(product, e)}
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        {/* Brand & Rating */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                            {product.brand}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < Math.floor(product.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-medium text-gray-700 ml-1">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        {/* Product Name */}
                        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Quick Specs */}
                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                          <Cpu className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <span className="truncate">
                            {getProcessorShort(product.specifications.processor)}
                          </span>
                          <span className="text-gray-300 mx-1">•</span>
                          <HardDrive className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <span className="truncate">
                            {product.specifications.ram}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AllProducts;