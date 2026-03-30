import ProductCard from "@/components/product/ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  { id: 1, name: "Tênis Casual Branco Confort", image: product1, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros" },
  { id: 2, name: "Bolsa Couro Premium Elegance", image: product2, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros" },
  { id: 3, name: "Óculos de Sol Gold Edition", image: product3, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros" },
  { id: 4, name: "Camiseta Básica Premium Algodão", image: product4, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros" },
];

interface Props {
  title: string;
  subtitle?: string;
}

const ProductShowcase = ({ title, subtitle }: Props) => (
  <section className="py-12">
    <div className="container">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>}
        <div className="w-12 h-0.5 bg-border mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductShowcase;
