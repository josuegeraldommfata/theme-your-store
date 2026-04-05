import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useStore } from "@/contexts/StoreContext";
import ProductCard from "@/components/product/ProductCard";

const CategoryPage = () => {
  const { name } = useParams();
  const { products } = useStore();

  const filtered = products.filter(p => p.active && (
    p.category.toLowerCase() === (name || "").toLowerCase() ||
    p.subcategory.toLowerCase() === (name || "").toLowerCase()
  ));

  return (
    <Layout>
      <div className="container py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-foreground">{name}</span>
        </div>
        <h1 className="text-2xl font-bold mb-6">{name}</h1>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
            <Link to="/" className="text-primary hover:underline mt-4 inline-block">Voltar para a loja</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
