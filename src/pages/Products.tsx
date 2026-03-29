import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "reviews") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange, minRating]);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set("category", cat);
    else params.delete("category");
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              {activeCategory ? categories.find((c) => c.id === activeCategory)?.name || "Products" : searchQuery ? `Results for "${searchQuery}"` : "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-2">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 rounded-lg bg-secondary border border-border text-foreground">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? "fixed inset-0 z-40 bg-card p-4 overflow-y-auto" : "hidden"} md:block md:static md:w-56 shrink-0`}>
            {showFilters && (
              <div className="flex justify-between mb-4 md:hidden">
                <h3 className="font-display font-bold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="h-5 w-5 text-foreground" /></button>
              </div>
            )}
            <div className="mb-6">
              <h4 className="font-display font-semibold text-sm mb-3 text-foreground">Category</h4>
              <div className="space-y-1">
                <button onClick={() => setCategory("")}
                  className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${!activeCategory ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                  All
                </button>
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setCategory(cat.id)}
                    className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${activeCategory === cat.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-display font-semibold text-sm mb-3 text-foreground">Price Range</h4>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={priceRange[0] || ""} onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-2 py-1.5 rounded-md bg-secondary border border-border text-sm text-foreground" />
                <input type="number" placeholder="Max" value={priceRange[1] === 10000 ? "" : priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 10000])}
                  className="w-full px-2 py-1.5 rounded-md bg-secondary border border-border text-sm text-foreground" />
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-display font-semibold text-sm mb-3 text-foreground">Customer Rating</h4>
              <div className="space-y-1">
                {[0, 3, 4, 4.5].map((r) => (
                  <button key={r} onClick={() => setMinRating(r)}
                    className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${minRating === r ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                    {r === 0 ? "All Ratings" : `${r}+ ⭐`}
                  </button>
                ))}
              </div>
            </div>
            {showFilters && (
              <button onClick={() => setShowFilters(false)}
                className="w-full gradient-hero text-primary-foreground py-2.5 rounded-lg font-semibold text-sm md:hidden">
                Apply Filters
              </button>
            )}
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
