import { useState, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, Truck, Shield, RefreshCw, ShoppingBag, Star, Share2 } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import ProductShowcase from "@/components/home/ProductShowcase";
import { toast } from "sonner";

const getColorFilter = (hex: string): React.CSSProperties => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r + g + b) / 3;
  if (brightness > 230 || brightness < 30) return {};
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  const sat = Math.max(0.3, (max - min) / (max || 1));
  return {
    filter: `sepia(0.4) hue-rotate(${Math.round(h - 50)}deg) saturate(${(1.2 + sat).toFixed(1)})`,
    transition: "filter 0.4s ease",
  };
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cart, setCart, appearance, wishlist, setWishlist } = useStore();
  const product = products.find(p => p.id === Number(id));
  
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || { name: "", hex: "" });
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isZooming, setIsZooming] = useState(false);
  const [activeTab, setActiveTab] = useState("descricao");
  const imgRef = useRef<HTMLDivElement>(null);

  const isFavorite = wishlist.includes(product?.id || 0);

  const colorFilter = useMemo(() => {
    if (!selectedColor.hex || !product) return {};
    if (product.colors[0]?.hex === selectedColor.hex) return {};
    return getColorFilter(selectedColor.hex);
  }, [selectedColor.hex, product?.colors]);

  if (!product) return <Layout><div className="container py-16 text-center"><p className="text-lg">Produto não encontrado</p><Link to="/" className="text-primary hover:underline mt-4 inline-block">Voltar para a loja</Link></div></Layout>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2.5)" });
    setIsZooming(true);
  };

  const handleMouseLeave = () => { setZoomStyle({}); setIsZooming(false); };

  const addToCart = () => {
    const existing = cart.find(c => c.productId === product.id && c.size === selectedSize && c.color === selectedColor.name);
    if (existing) {
      setCart(cart.map(c => (c.productId === product.id && c.size === selectedSize && c.color === selectedColor.name) ? { ...c, qty: c.qty + qty } : c));
    } else {
      setCart([...cart, { productId: product.id, qty, size: selectedSize, color: selectedColor.name }]);
    }
    toast.success("Produto adicionado ao carrinho!");
  };

  const buyNow = () => { addToCart(); navigate("/carrinho"); };

  const toggleFav = () => {
    if (isFavorite) {
      setWishlist(wishlist.filter(id => id !== product.id));
      toast.success("Removido dos favoritos");
    } else {
      setWishlist([...wishlist, product.id]);
      toast.success("Adicionado aos favoritos!");
    }
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado!");
  };

  const discount = (() => {
    const old = parseFloat(product.oldPrice.replace("R$", "").replace(".", "").replace(",", "."));
    const cur = parseFloat(product.price.replace("R$", "").replace(".", "").replace(",", "."));
    return old > cur ? Math.round(((old - cur) / old) * 100) : 0;
  })();

  return (
    <Layout>
      <div className="container py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/categoria/${product.category}`} className="hover:text-primary">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div
              ref={imgRef}
              className="bg-muted rounded-lg overflow-hidden cursor-crosshair aspect-square relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                style={{ ...(isZooming ? zoomStyle : {}), ...colorFilter }}
              />
              {discount > 0 && (
                <span className="absolute top-3 left-3 text-sm font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: appearance.primaryColor }}>
                  -{discount}%
                </span>
              )}
              {!isZooming && (
                <span className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                  🔍 Passe o mouse para zoom
                </span>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${color.name === selectedColor.name ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-foreground"}`}
                >
                  <img
                    src={product.image}
                    alt={color.name}
                    className="w-full h-full object-cover"
                    style={product.colors[0].hex === color.hex ? {} : getColorFilter(color.hex)}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold flex-1">{product.name}</h1>
              <div className="flex gap-2 ml-4">
                <button onClick={shareProduct} className="p-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFav}
                  className={`p-2 border rounded-lg transition-colors ${isFavorite ? "border-primary text-primary bg-primary/5" : "border-border hover:border-primary hover:text-primary"}`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-primary" : ""}`} />
                </button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">{product.category} / {product.subcategory}</p>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating!) ? "fill-shop-star text-shop-star" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews} avaliações)</span>
              </div>
            )}

            <div className="mb-4">
              <span className="text-muted-foreground text-sm line-through mr-3">De {product.oldPrice}</span>
              {discount > 0 && <span className="text-xs font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: appearance.primaryColor }}>-{discount}%</span>}
            </div>
            <span className="text-3xl font-bold block mb-1">{product.price}</span>
            <p className="font-semibold mb-1 text-lg" style={{ color: appearance.primaryColor }}>{product.pixPrice} no PIX</p>
            <p className="text-sm text-muted-foreground mb-6">{product.installment}</p>

            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Cor: <span className="font-normal text-muted-foreground">{selectedColor.name}</span></p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${color.name === selectedColor.name ? "border-primary scale-110 ring-2 ring-primary/30" : "border-border hover:border-foreground"}`}
                    style={{ backgroundColor: color.hex, boxShadow: color.hex === "#FFFFFF" ? "inset 0 0 0 1px #ddd" : undefined }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Tamanho:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[42px] h-10 px-3 border text-sm font-medium transition-all rounded-lg ${s === selectedSize ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {product.stock > 0 ? (
              <p className="text-sm text-green-600 mb-4 flex items-center gap-1">✓ Em estoque <span className="text-muted-foreground">({product.stock} unidades)</span></p>
            ) : (
              <p className="text-sm text-destructive mb-4">✗ Produto indisponível</p>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-3 hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <Button variant="shop" size="lg" className="flex-1 py-6 gap-2 text-base" onClick={buyNow} disabled={product.stock === 0}>
                <ShoppingBag className="w-5 h-5" /> COMPRAR AGORA
              </Button>
            </div>

            <Button variant="shop-outline" size="lg" className="w-full mb-6 py-5" onClick={addToCart} disabled={product.stock === 0}>
              ADICIONAR AO CARRINHO
            </Button>

            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm"><Truck className="w-5 h-5 text-primary" /> <div><span className="font-medium">Frete grátis</span><p className="text-xs text-muted-foreground">para todo o Brasil</p></div></div>
              <div className="flex items-center gap-3 text-sm"><Shield className="w-5 h-5 text-primary" /> <div><span className="font-medium">Compra segura</span><p className="text-xs text-muted-foreground">Site 100% protegido</p></div></div>
              <div className="flex items-center gap-3 text-sm"><RefreshCw className="w-5 h-5 text-primary" /> <div><span className="font-medium">Troca grátis</span><p className="text-xs text-muted-foreground">Em até 7 dias após o recebimento</p></div></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border border-border rounded-lg overflow-hidden">
          <div className="flex border-b border-border">
            {[
              { key: "descricao", label: "Descrição" },
              { key: "especificacoes", label: "Especificações" },
              { key: "avaliacoes", label: `Avaliações (${product.reviews || 0})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab.key ? "bg-background border-b-2 border-primary text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "descricao" && (
              <div className="prose max-w-none">
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted rounded-lg p-4">
                    <p className="font-medium text-sm">Material Premium</p>
                    <p className="text-xs text-muted-foreground mt-1">Fabricado com materiais de alta qualidade para garantir durabilidade e conforto.</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="font-medium text-sm">Garantia de Qualidade</p>
                    <p className="text-xs text-muted-foreground mt-1">Todos os produtos passam por rigoroso controle de qualidade antes do envio.</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "especificacoes" && (
              <div className="space-y-2">
                <div className="flex border-b border-border py-2"><span className="text-sm font-medium w-40">Categoria</span><span className="text-sm text-muted-foreground">{product.category}</span></div>
                <div className="flex border-b border-border py-2"><span className="text-sm font-medium w-40">Subcategoria</span><span className="text-sm text-muted-foreground">{product.subcategory}</span></div>
                <div className="flex border-b border-border py-2"><span className="text-sm font-medium w-40">Tamanhos</span><span className="text-sm text-muted-foreground">{product.sizes.join(", ")}</span></div>
                <div className="flex border-b border-border py-2"><span className="text-sm font-medium w-40">Cores</span><span className="text-sm text-muted-foreground">{product.colors.map(c => c.name).join(", ")}</span></div>
                <div className="flex border-b border-border py-2"><span className="text-sm font-medium w-40">Estoque</span><span className="text-sm text-muted-foreground">{product.stock} unidades</span></div>
              </div>
            )}
            {activeTab === "avaliacoes" && (
              <div className="space-y-4">
                {[
                  { name: "Carlos M.", rating: 5, text: "Produto excelente! Qualidade incrível e entrega rápida.", date: "01/04/2026" },
                  { name: "Patricia L.", rating: 4, text: "Gostei muito, material de boa qualidade. Recomendo!", date: "28/03/2026" },
                  { name: "Roberto S.", rating: 5, text: "Superou minhas expectativas. Acabamento perfeito.", date: "25/03/2026" },
                ].map((review, i) => (
                  <div key={i} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{review.name[0]}</div>
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-shop-star text-shop-star" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground ml-auto">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductShowcase title="Produtos Relacionados" subtitle="Você também pode gostar" category={product.category} />
    </Layout>
  );
};

export default ProductDetail;
