import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import ProductShowcase from "@/components/home/ProductShowcase";

const colorOptions = [
  { name: "Branco", hex: "#FFFFFF" },
  { name: "Preto", hex: "#222222" },
  { name: "Azul", hex: "#2563EB" },
  { name: "Vermelho", hex: "#DC2626" },
];

const productMap: Record<string, { name: string; image: string; oldPrice: string; price: string; pixPrice: string; installment: string; description: string }> = {
  "1": { name: "Tênis Casual Branco Confort", image: product1, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Tênis casual branco de alta qualidade, perfeito para o dia a dia. Feito com materiais premium e design moderno, proporciona conforto e estilo. Solado em borracha antiderrapante, palmilha anatômica removível e forro respirável. Ideal para combinar com looks casuais e esportivos." },
  "2": { name: "Bolsa Couro Premium Elegance", image: product2, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Bolsa em couro legítimo com acabamento premium. Design elegante e sofisticado, ideal para diversas ocasiões. Forro interno em tecido de alta qualidade com compartimentos organizadores. Alça ajustável e fecho magnético seguro." },
  "3": { name: "Óculos de Sol Gold Edition", image: product3, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Óculos de sol com armação dourada e lentes polarizadas. Proteção UV400 com design clássico e atemporal. Armação resistente em metal com hastes flexíveis. Acompanha case protetora e flanela de limpeza." },
  "4": { name: "Camiseta Básica Premium Algodão", image: product4, oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$199,90", installment: "5x de R$39,98 sem juros", description: "Camiseta básica em algodão premium 100%. Modelagem confortável e durável, peça essencial para seu guarda-roupa. Tecido macio com toque suave, costuras reforçadas e acabamento impecável. Disponível em várias cores." },
};

const sizes = ["P", "M", "G", "GG"];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productMap[id || "1"] || productMap["1"];
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isZooming, setIsZooming] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2)" });
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
    setIsZooming(false);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> / <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            ref={imgRef}
            className="bg-shop-gray rounded-sm overflow-hidden cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover transition-transform duration-200"
              style={isZooming ? zoomStyle : {}}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <div className="mb-4">
              <span className="text-shop-price-old text-sm line-through mr-3">De {product.oldPrice}</span>
              <span className="text-3xl font-bold">Por {product.price}</span>
            </div>
            <p className="text-primary font-semibold mb-1">{product.pixPrice} no PIX</p>
            <p className="text-sm text-muted-foreground mb-6">{product.installment}</p>

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Cor: <span className="font-normal text-muted-foreground">{selectedColor.name}</span></p>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${color.name === selectedColor.name ? "border-primary scale-110 ring-2 ring-primary/30" : "border-border hover:border-foreground"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

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
              <Link to="/carrinho" className="flex-1">
                <Button variant="shop" size="lg" className="w-full py-6">COMPRAR</Button>
              </Link>
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
