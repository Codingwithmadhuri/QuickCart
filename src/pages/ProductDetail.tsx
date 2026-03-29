import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Zap, ArrowLeft, Truck, Shield, RotateCcw, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Product not found</p>
            <Link to="/products" className="text-accent hover:underline text-sm">Browse all products</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const allImages = product.images?.length ? product.images : [product.image];
  const categoryName = categories.find(c => c.id === product.category)?.name || product.category;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4 flex-1">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/products?category=${product.category}`} className="hover:text-accent transition-colors">{categoryName}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground line-clamp-1">{product.name.slice(0, 40)}...</span>
        </nav>

        <div className="grid md:grid-cols-[1fr_1.2fr_auto] gap-6 mb-10">
          {/* Image Gallery */}
          <div className="space-y-3">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-6 border border-border flex items-center justify-center aspect-square"
            >
              <img src={allImages[selectedImage]} alt={product.name} className="max-h-[350px] object-contain" />
            </motion.div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden bg-white p-1 transition-all ${i === selectedImage ? "border-accent shadow-glow" : "border-border hover:border-muted-foreground"}`}>
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.brand && (
              <Link to={`/products?search=${product.brand}`} className="text-xs text-accent hover:underline mb-1 inline-block">
                Visit the {product.brand} Store
              </Link>
            )}
            <h1 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-accent">{product.rating}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-accent hover:underline cursor-pointer">{product.reviews.toLocaleString()} ratings</span>
            </div>

            <div className="border-t border-border pt-3 mb-3">
              {discount > 0 && (
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
                  <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                </div>
              )}
              {!discount && (
                <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground mt-0.5">M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span></p>
              )}
              <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
            </div>

            <p className="text-sm text-foreground mb-4 leading-relaxed">{product.description}</p>

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-bold text-foreground mb-2">Key Features</h3>
                <ul className="space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Delivery info */}
            <div className="space-y-2 mb-4 p-3 bg-secondary/50 rounded-lg">
              {[
                { icon: Truck, text: "FREE delivery on this item", sub: "Delivered within 2-3 business days" },
                { icon: RotateCcw, text: "10 days return policy", sub: "Easy returns & full refund" },
                { icon: Shield, text: "Secure transaction", sub: "Your data is protected" },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <f.icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{f.text}</span>
                    <p className="text-[11px] text-muted-foreground">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="bg-card border border-border rounded-xl p-5 h-fit md:w-[240px] space-y-3 shadow-card">
            <p className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</p>
            <p className="text-xs text-success font-medium">FREE delivery</p>
            <p className={`text-sm font-bold ${product.inStock ? "text-success" : "text-destructive"}`}>
              {product.inStock ? "In stock" : "Currently unavailable"}
            </p>

            <button
              onClick={() => { addItem(product); toast({ title: "Added to cart", description: `${product.name} added to your cart.` }); }}
              disabled={!product.inStock}
              className="w-full gradient-accent text-accent-foreground py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => { addItem(product); navigate("/checkout"); }}
              disabled={!product.inStock}
              className="w-full bg-accent/80 text-accent-foreground py-2.5 rounded-full font-bold text-sm hover:bg-accent transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <Zap className="h-4 w-4" /> Buy Now
            </button>

            <div className="border-t border-border pt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Ships from</span><span className="text-foreground font-medium">QuickCart</span></div>
              <div className="flex justify-between"><span>Sold by</span><span className="text-foreground font-medium">{product.brand || "QuickCart"}</span></div>
              <div className="flex justify-between"><span>Returns</span><span className="text-foreground font-medium">10-day policy</span></div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display font-bold text-lg mb-4 text-foreground">Products related to this item</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
