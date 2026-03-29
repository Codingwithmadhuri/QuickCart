import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, Clock, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, testimonials } from "@/data/products";

const heroSlides = [
  { title: "Great Indian Sale", subtitle: "Up to 70% off on Electronics, Fashion & more", cta: "Shop Now", category: "electronics", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80" },
  { title: "New Fashion Arrivals", subtitle: "Levi's, Nike, Ray-Ban & trending styles for every season", cta: "Shop Fashion", category: "fashion", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" },
  { title: "Home Essentials", subtitle: "Hawkins, Pigeon, Wipro & more — starting ₹399", cta: "Shop Home", category: "home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80" },
];

const categoryCards = [
  { title: "Up to 70% off | Electronics", items: [
    { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80", category: "electronics" },
    { name: "Smartwatches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80", category: "electronics" },
    { name: "Speakers", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&q=80", category: "electronics" },
    { name: "Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&q=80", category: "electronics" },
  ]},
  { title: "Best of Fashion", items: [
    { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80", category: "fashion" },
    { name: "Jackets", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=200&q=80", category: "fashion" },
    { name: "Sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&q=80", category: "fashion" },
    { name: "Wallets", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80", category: "fashion" },
  ]},
  { title: "Home & Kitchen Essentials", items: [
    { name: "Cookware", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&q=80", category: "home" },
    { name: "Smart Lights", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=200&q=80", category: "home" },
    { name: "Cups & Mugs", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&q=80", category: "home" },
    { name: "Cutting Boards", image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=200&q=80", category: "home" },
  ]},
  { title: "Beauty & Personal Care", items: [
    { name: "Skincare", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80", category: "beauty" },
    { name: "Essential Oils", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&q=80", category: "beauty" },
    { name: "Hair Styling", image: "https://images.unsplash.com/photo-1522338242992-e1a54f0e2b49?w=200&q=80", category: "beauty" },
    { name: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&q=80", category: "books" },
  ]},
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Unique product sets – no overlaps
  const dealProducts = products.filter((p) => p.originalPrice && ((p.originalPrice - p.price) / p.originalPrice) > 0.4).slice(0, 4);
  const dealIds = new Set(dealProducts.map(p => p.id));
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).filter(p => !dealIds.has(p.id)).slice(0, 4);
  const usedIds = new Set([...dealIds, ...bestSellers.map(p => p.id)]);
  const featuredProducts = products.filter(p => !usedIds.has(p.id)).slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden h-[280px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slide.image}
            alt={slide.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <motion.div key={`text-${currentSlide}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg">
            <span className="inline-block bg-accent/90 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3">
              Limited Time Offer
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-2 leading-tight drop-shadow-lg">{slide.title}</h1>
            <p className="text-base md:text-lg text-white/90 mb-5">{slide.subtitle}</p>
            <Link to={`/products?category=${slide.category}`}
              className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-7 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg">
              {slide.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-8" : "bg-white/40 w-2"}`} />
          ))}
        </div>
        <button onClick={() => setCurrentSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white z-10 hidden md:block transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={() => setCurrentSlide((s) => (s + 1) % heroSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white z-10 hidden md:block transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Amazon-style 4-up Category Cards */}
      <section className="container mx-auto px-4 -mt-12 md:-mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryCards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-4 shadow-card hover:shadow-elevated transition-shadow">
              <h3 className="font-display font-bold text-sm md:text-base text-foreground mb-3">{card.title}</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {card.items.map((item, j) => (
                  <Link key={j} to={`/products?category=${item.category}`} className="group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-1">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                    </div>
                    <p className="text-[11px] text-muted-foreground group-hover:text-accent transition-colors leading-tight">{item.name}</p>
                  </Link>
                ))}
              </div>
              <Link to={`/products?category=${card.items[0].category}`} className="text-xs font-medium text-accent hover:underline">
                See more →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features bar */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Truck, title: "Free Delivery", desc: "On orders over ₹499" },
            { icon: RotateCcw, title: "10 Day Returns", desc: "Easy return policy" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected" },
            { icon: Clock, title: "Fast Shipping", desc: "2-3 business days" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3.5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="p-2.5 rounded-lg bg-accent/10">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{f.title}</p>
                <p className="text-[11px] text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals of the Day */}
      {dealProducts.length > 0 && (
        <section className="container mx-auto px-4 py-4">
          <div className="bg-card rounded-xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-display font-bold text-xl text-foreground">Today's Deals</h2>
                <span className="text-[10px] font-bold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
              </div>
              <Link to="/products" className="text-xs font-medium text-accent hover:underline">See all deals →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dealProducts.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-4">
        <div className="bg-card rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-foreground">Best Sellers</h2>
            <Link to="/products" className="text-xs font-medium text-accent hover:underline">See more →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">Featured Products</h2>
          <Link to="/products" className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="font-display font-bold text-xl mb-5 text-foreground">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((t) => (
            <motion.div key={t.id} whileHover={{ y: -2 }} className="p-5 rounded-xl bg-card shadow-card border border-border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-foreground mb-3 leading-relaxed">"{t.text}"</p>
              <p className="text-xs font-bold text-muted-foreground">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Browse by category */}
      <section className="container mx-auto px-4 py-6 mb-4">
        <h2 className="font-display font-bold text-xl mb-4 text-foreground">Browse by Category</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all group">
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-[11px] font-medium text-foreground text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
