import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, Truck, Shield, RefreshCw, ShoppingBag } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import ProductShowcase from "@/components/home/ProductShowcase";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cart, setCart, appearance } = useStore();
  const product = products.find(p => p.id === Number(id)) || products[0];
  
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || { name: "", hex: "" });
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isZooming, setIsZooming] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  if (!product) return <Layout><div className="container py-16 text-center"><p>Produto não encontrado</p></div></Layout>;

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

  const addToCart = () => {
    const existing = cart.find(c => c.productId === product.id && c.size === selectedSize && c.color === selectedColor.name);
    if (existing) {
      setCart(cart.map(c => (c.productId === product.id && c.size === selectedSize && c.color === selectedColor.name) ? { ...c, qty: c.qty + qty } : c));
    } else {
      setCart([...cart, { productId: product.id, qty, size: selectedSize, color: selectedColor.name }]);
    }
    toast.success("Produto adicionado ao carrinho!");
  };

  const buyNow = () => {
    addToCart();
    navigate("/carrinho");
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> / <span>{product.category}</span> / <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            ref={imgRef}
            className="bg-muted rounded-sm overflow-hidden cursor-crosshair"
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
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-xs text-muted-foreground mb-4">{product.category} / {product.subcategory}</p>
            <div className="mb-4">
              <span className="text-muted-foreground text-sm line-through mr-3">De {product.oldPrice}</span>
              <span className="text-3xl font-bold">Por {product.price}</span>
            </div>
            <p className="font-semibold mb-1" style={{ color: appearance.primaryColor }}>{product.pixPrice} no PIX</p>
            <p className="text-sm text-muted-foreground mb-6">{product.installment}</p>

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Cor: <span className="font-normal text-muted-foreground">{selectedColor.name}</span></p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
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
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[40px] h-10 px-2 border text-sm font-medium transition-colors ${s === selectedSize ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {product.stock > 0 ? (
              <p className="text-sm text-green-600 mb-4">✓ Em estoque ({product.stock} unidades)</p>
            ) : (
              <p className="text-sm text-destructive mb-4">✗ Produto indisponível</p>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 hover:bg-muted"><Plus className="w-4 h-4" /></button>
              </div>
              <Button variant="shop" size="lg" className="flex-1 py-6 gap-2" onClick={buyNow} disabled={product.stock === 0}>
                <ShoppingBag className="w-5 h-5" /> COMPRAR
              </Button>
              <button className="p-3 border border-border hover:border-primary hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <Button variant="shop-outline" size="lg" className="w-full mb-6" onClick={addToCart} disabled={product.stock === 0}>
              ADICIONAR AO CARRINHO
            </Button>

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
