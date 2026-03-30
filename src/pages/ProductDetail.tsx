import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import ProductShowcase from "@/components/home/ProductShowcase";

const productMap: Record<string, { name: string; image: string; oldPrice: string; price: string; pixPrice: string; installment: string; description: string }> = {
  "1": { name: "Tênis Casual Branco Confort", image: product1, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Tênis casual branco de alta qualidade, perfeito para o dia a dia. Feito com materiais premium e design moderno, proporciona conforto e estilo." },
  "2": { name: "Bolsa Couro Premium Elegance", image: product2, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Bolsa em couro legítimo com acabamento premium. Design elegante e sofisticado, ideal para diversas ocasiões." },
  "3": { name: "Óculos de Sol Gold Edition", image: product3, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Óculos de sol com armação dourada e lentes polarizadas. Proteção UV400 com design clássico e atemporal." },
  "4": { name: "Camiseta Básica Premium Algodão", image: product4, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Camiseta básica em algodão premium 100%. Modelagem confortável e durável, peça essencial para seu guarda-roupa." },
};

const sizes = ["P", "M", "G", "GG"];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productMap[id || "1"] || productMap["1"];
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <Layout>
      <div className="container py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> / <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-shop-gray rounded-sm overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <div className="mb-4">
              <span className="text-shop-price-old text-sm line-through mr-3">De {product.oldPrice}</span>
              <span className="text-3xl font-bold">Por {product.price}</span>
            </div>
            <p className="text-primary font-semibold mb-1">{product.pixPrice} no PIX</p>
            <p className="text-sm text-muted-foreground mb-6">{product.installment}</p>

            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Tamanho:</p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 border text-sm font-medium transition-colors ${s === selectedSize ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-muted"><Plus className="w-4 h-4" /></button>
              </div>
              <Button variant="shop" size="lg" className="flex-1 py-6">COMPRAR</Button>
              <button className="p-3 border border-border hover:border-primary hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm"><Truck className="w-5 h-5 text-primary" /> Frete grátis para todo o Brasil</div>
              <div className="flex items-center gap-3 text-sm"><Shield className="w-5 h-5 text-primary" /> Compra 100% segura</div>
              <div className="flex items-center gap-3 text-sm"><RefreshCw className="w-5 h-5 text-primary" /> Troca grátis em até 7 dias</div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-3">Descrição</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <ProductShowcase title="Produtos Relacionados" subtitle="Você também pode gostar" />
    </Layout>
  );
};

export default ProductDetail;
