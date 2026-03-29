import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard = ({ product, compact }: ProductCardProps) => {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
    toast({ title: wishlisted ? "Removed from wishlist" : "Added to wishlist" });
  };

  if (compact) {
    return (
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elevated transition-all duration-200">
          <div className="relative aspect-square overflow-hidden bg-white">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                {discount}% off
              </span>
            )}
          </div>
          <div className="p-3">
            <p className="text-xs text-foreground line-clamp-2 mb-1.5 leading-snug font-medium">{product.name}</p>
            <div className="flex items-center gap-1 mb-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-2.5 w-2.5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">{product.reviews.toLocaleString()}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-[10px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elevated transition-all duration-200">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-white">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          {discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-destructive text-destructive-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {discount}% off
            </span>
          )}
          <button onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card transition-all opacity-0 group-hover:opacity-100 shadow-sm">
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3.5">
          {product.brand && (
            <p className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">{product.brand}</p>
          )}
          <h3 className="text-sm text-foreground line-clamp-2 leading-snug mb-2 group-hover:text-accent transition-colors font-medium">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">{product.reviews.toLocaleString()}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground">M.R.P: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span></span>
            )}
          </div>
          {discount > 0 && (
            <p className="text-xs text-destructive font-semibold mb-1">Save {discount}%</p>
          )}

          <p className="text-[11px] text-success font-medium mb-2.5">FREE delivery</p>

          <button onClick={handleAdd}
            className="w-full gradient-accent text-accent-foreground py-2 rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-sm">
            <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};
