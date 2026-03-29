import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="mt-auto">
    {/* Back to top */}
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="w-full nav-secondary py-3 text-center text-sm text-white/80 hover:text-white transition-colors font-medium">
      Back to top
    </button>

    {/* Links */}
    <div className="nav-bg">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white hover:underline transition-colors">About QuickCart</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white hover:underline transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Shop With Us</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/products" className="hover:text-white hover:underline transition-colors">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="hover:text-white hover:underline transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=fashion" className="hover:text-white hover:underline transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=home" className="hover:text-white hover:underline transition-colors">Home & Kitchen</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Help</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/faq" className="hover:text-white hover:underline transition-colors">Returns & Replacements</Link></li>
              <li><Link to="/faq" className="hover:text-white hover:underline transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline transition-colors">Customer Service</Link></li>
              <li><Link to="/faq" className="hover:text-white hover:underline transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Contact Info</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>support@quickcart.in</li>
              <li>+91 9876543210</li>
              <li>Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="gradient-dark">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="font-display font-extrabold text-lg text-white">Quick</span>
          <span className="font-display font-extrabold text-lg text-accent">Cart</span>
          <span className="text-white/50 text-[10px] ml-0.5">.in</span>
        </div>
        <p className="text-xs text-white/50">© {new Date().getFullYear()} QuickCart. All rights reserved.</p>
        <p className="text-xs text-white/70 font-medium">This website is owned by Madhuri Sontakke</p>
      </div>
    </div>
  </footer>
);
