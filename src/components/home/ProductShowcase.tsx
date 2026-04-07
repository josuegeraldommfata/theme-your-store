import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useStore } from "@/contexts/StoreContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  category?: string;
  sort?: "featured" | "newest" | "bestseller";
}

const ProductShowcase = ({ title, subtitle, category, sort = "featured" }: Props) => {
  const { products } = useStore();
  const [page, setPage] = useState(0);
  
  const displayProducts = useMemo(() => {
    let filtered = products.filter(p => p.active);
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    switch (sort) {
      case "newest": return [...filtered].sort((a, b) => b.id - a.id);
      case "bestseller": return [...filtered].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      default: return filtered;
    }
  }, [products, category, sort]);

  const perPage = 4;
  const totalPages = Math.ceil(displayProducts.length / perPage);
  const currentProducts = displayProducts.slice(page * perPage, (page + 1) * perPage);

  if (currentProducts.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>}
          <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        </div>
        <div className="relative">
          {totalPages > 1 && page > 0 && (
            <button onClick={() => setPage(p => p - 1)} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-border rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {totalPages > 1 && page < totalPages - 1 && (
            <button onClick={() => setPage(p => p + 1)} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-border rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === page ? "bg-primary" : "bg-border hover:bg-muted-foreground"}`} />
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to={category ? `/categoria/${category}` : "/categoria/Feminino"}>
            <Button variant="shop-outline" size="lg">VER MAIS PRODUTOS</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
