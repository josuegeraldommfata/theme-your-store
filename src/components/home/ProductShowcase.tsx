import ProductCard from "@/components/product/ProductCard";
import { useStore } from "@/contexts/StoreContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  subtitle?: string;
  category?: string;
}

const ProductShowcase = ({ title, subtitle, category }: Props) => {
  const { products } = useStore();
  
  let displayProducts = products.filter(p => p.active);
  if (category) {
    displayProducts = displayProducts.filter(p => p.category === category);
  }
  // Show max 4, shuffle for variety per section
  const shuffled = [...displayProducts].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>}
          <div className="w-12 h-0.5 bg-border mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shuffled.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="shop-outline" size="lg">VER MAIS PRODUTOS</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
