import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, Sun, Moon, User, MapPin, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";
import { CartDrawer } from "./CartDrawer";
import { products, categories } from "@/data/products";

export const Navbar = () => {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = searchQuery.length > 0
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.tags?.some(t => t.toLowerCase().includes(q))
        );
      }).slice(0, 7)
    : [];

  useEffect(() => { setSelectedIndex(-1); }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
      setMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(prev => Math.max(prev - 1, -1)); }
    else if (e.key === "Enter" && selectedIndex >= 0) { e.preventDefault(); navigate(`/product/${suggestions[selectedIndex].id}`); setSearchQuery(""); setShowSuggestions(false); }
    else if (e.key === "Escape") { setShowSuggestions(false); }
  };

  return (
    <>
      {/* Main Nav - Amazon dark style */}
      <header className="sticky top-0 z-50">
        <div className="nav-bg">
          <div className="container mx-auto flex items-center gap-3 h-[60px] px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 shrink-0 border border-transparent hover:border-white/30 rounded px-1 py-1 transition-colors">
              <span className="font-display font-extrabold text-xl text-white tracking-tight">Quick</span>
              <span className="font-display font-extrabold text-xl text-accent tracking-tight">Cart</span>
              <span className="text-white/60 text-[10px] ml-0.5">.in</span>
            </Link>

            {/* Deliver to */}
            <button className="hidden lg:flex items-center gap-1 text-white/80 hover:border-white/30 border border-transparent rounded px-2 py-1 transition-colors shrink-0">
              <MapPin className="h-4 w-4 text-white/60" />
              <div className="text-left">
                <p className="text-[10px] text-white/60 leading-none">Deliver to</p>
                <p className="text-xs font-bold text-white leading-tight">India</p>
              </div>
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 relative">
              <div className="flex w-full rounded-md overflow-hidden">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search QuickCart.in"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-2.5 bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent rounded-l-md"
                />
                <button type="submit" className="gradient-accent px-4 hover:brightness-110 transition-all rounded-r-md">
                  <Search className="h-5 w-5 text-foreground" />
                </button>
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevated overflow-hidden z-50">
                  {suggestions.map((p, idx) => (
                    <button key={p.id} type="button"
                      onMouseDown={() => { navigate(`/product/${p.id}`); setSearchQuery(""); setShowSuggestions(false); }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-secondary text-sm text-foreground flex items-center gap-3 transition-colors ${idx === selectedIndex ? "bg-secondary" : ""}`}>
                      <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand} · ₹{p.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-0.5 ml-auto md:ml-0">
              <button onClick={toggleTheme} className="flex flex-col items-center px-2 py-1 border border-transparent hover:border-white/30 rounded transition-colors" aria-label="Toggle theme">
                {theme === "light" ? <Moon className="h-5 w-5 text-white" /> : <Sun className="h-5 w-5 text-white" />}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center">
                  <button onClick={logout} className="flex flex-col items-center px-2 py-1 border border-transparent hover:border-white/30 rounded transition-colors" aria-label="Logout">
                    <p className="text-[10px] text-white/60 leading-none hidden md:block">Hello, {user?.name}</p>
                    <p className="text-xs font-bold text-white leading-tight hidden md:block">Account</p>
                    <LogOut className="h-5 w-5 text-white md:hidden" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="flex flex-col items-center px-2 py-1 border border-transparent hover:border-white/30 rounded transition-colors" aria-label="Login">
                  <p className="text-[10px] text-white/60 leading-none hidden md:block">Hello, sign in</p>
                  <p className="text-xs font-bold text-white leading-tight hidden md:block">Account</p>
                  <User className="h-5 w-5 text-white md:hidden" />
                </button>
              )}

              <Link to="/faq" className="hidden lg:flex flex-col items-center px-2 py-1 border border-transparent hover:border-white/30 rounded transition-colors">
                <p className="text-[10px] text-white/60 leading-none">Returns</p>
                <p className="text-xs font-bold text-white leading-tight">& Orders</p>
              </Link>

              <button onClick={() => setCartOpen(true)} className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white/30 rounded transition-colors relative" aria-label="Cart">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-white" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1 text-accent text-xs font-extrabold">{totalItems}</span>
                  )}
                </div>
                <span className="text-xs font-bold text-white hidden md:inline">Cart</span>
              </button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white" aria-label="Menu">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Category strip - Amazon sub-nav */}
        <div className="nav-secondary border-b border-white/10">
          <div className="container mx-auto px-4 flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
            <Link to="/products" className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white/90 hover:text-white border border-transparent hover:border-white/30 rounded transition-colors">
              <Menu className="h-3.5 w-3.5" /> All
            </Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.id}`}
                className="shrink-0 px-3 py-1.5 text-xs text-white/80 hover:text-white border border-transparent hover:border-white/30 rounded transition-colors whitespace-nowrap">
                {cat.name}
              </Link>
            ))}
            <Link to="/about" className="shrink-0 px-3 py-1.5 text-xs text-white/80 hover:text-white border border-transparent hover:border-white/30 rounded transition-colors">
              About
            </Link>
            <Link to="/contact" className="shrink-0 px-3 py-1.5 text-xs text-white/80 hover:text-white border border-transparent hover:border-white/30 rounded transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-b border-border px-4 py-3 space-y-2 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input type="text" placeholder="Search QuickCart.in" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md bg-white border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </form>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.id}`} onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded">
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};
