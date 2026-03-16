import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Clothing", icon: "👕" },
    { name: "Books", icon: "📚" },
    { name: "Home & Garden", icon: "🏠" },
    { name: "Sports", icon: "⚽" },
    { name: "Toys", icon: "🧸" },
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
    { name: "Shipping Info", path: "/shipping" },
    { name: "Returns", path: "/returns" },
  ];

  const customerService = [
    { name: "My Account", path: "/profile" },
    { name: "Order Tracking", path: "/track-order" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Customer Support", path: "/support" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: "📘", 
      url: "https://facebook.com",
      color: "hover:text-blue-600"
    },
    { 
      name: "Twitter", 
      icon: "🐦", 
      url: "https://twitter.com",
      color: "hover:text-sky-500"
    },
    { 
      name: "Instagram", 
      icon: "📷", 
      url: "https://instagram.com",
      color: "hover:text-pink-600"
    },
    { 
      name: "Pinterest", 
      icon: "📌", 
      url: "https://pinterest.com",
      color: "hover:text-red-600"
    },
    { 
      name: "YouTube", 
      icon: "▶️", 
      url: "https://youtube.com",
      color: "hover:text-red-600"
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">


      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">ShopEase</span>
            </div>
            <p className="text-sm mb-4">
              Your one-stop shop for everything you need. Quality products at affordable prices with fast shipping worldwide.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-sm mt-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@shopease.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <span className="text-blue-400">›</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <span className="text-blue-400">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Shop by Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/?category=${category.name.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links & Payment Methods */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors text-xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Payment Methods:</span>
              <div className="flex space-x-2">
                <span className="bg-gray-800 px-3 py-1 rounded text-sm">Visa</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-sm">Mastercard</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-sm">PayPal</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-sm">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} ShopEase. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/terms" className="hover:text-white mx-2">Terms of Service</Link>
            |
            <Link to="/privacy" className="hover:text-white mx-2">Privacy Policy</Link>
            |
            <Link to="/sitemap" className="hover:text-white mx-2">Sitemap</Link>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}