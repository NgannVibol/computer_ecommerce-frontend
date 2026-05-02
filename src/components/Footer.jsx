import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import logo from "../images/logo.png"; // Correct import path

const Footer = () => {
  return (
    <footer className="bg-[#1e4b6b] text-gray-200">

      {/* ===== TOP FOOTER ===== */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* LOGO + APP */}
        <div>
          <div className="mb-6">
            <img 
              src={logo} // Use the imported logo
              alt="Nika"
              className="h-10 mb-4"
            />
            <h4 className="text-lg font-semibold mb-4">DOWNLOAD OUR APP</h4>
            <div className="flex gap-3">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-12"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-12"
              />
            </div>
          </div>
        </div>

        {/* SPECIAL */}
        <div>
          <h3 className="text-white font-semibold mb-4">SPECIAL</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">Featured Products</li>
            <li className="hover:text-white cursor-pointer">Latest Products</li>
            <li className="hover:text-white cursor-pointer">Best Selling Products</li>
            <li className="hover:text-white cursor-pointer">Top Rated Products</li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="text-white font-semibold mb-4">ACCOUNT & SHIPPING INFO</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">Profile Info</li>
            <li className="hover:text-white cursor-pointer">Wish List</li>
            <li className="hover:text-white cursor-pointer">Track Order</li>
            <li className="hover:text-white cursor-pointer">Refund Policy</li>
            <li className="hover:text-white cursor-pointer">Return Policy</li>
            <li className="hover:text-white cursor-pointer">Cancellation Policy</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">NEWSLETTER</h3>
          <p className="text-sm mb-4">
            Subscribe to our new channel to get latest updates
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-4 py-3 rounded-l-md bg-[#2a5f84] placeholder-gray-300 focus:outline-none"
            />
            <button className="bg-white text-[#1e4b6b] px-6 font-semibold rounded-r-md hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ===== CONTACT ROW ===== */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">

          <div className="flex items-center gap-3">
            <Phone size={18} />
            <span>+855 17 935 151</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>info@nika2u.com</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={18} />
            <span>Street 310, #450 BKK3, Phnom Penh</span>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">

          <span>©Computer E-commerce 2026</span>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;