import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ProductDisplay {
  id: number;
  name: string;
  image: string;
  oldPrice: string;
  price: string;
  pixPrice: string;
  installment: string;
  stock?: number;
}

const ProductCard = ({ product }: { product: ProductDisplay }) => {
  const { appearance, cart, setCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const existing = cart.find(c => c.productId === product.id);
    if (existing) {
      setCart(cart.map(c => c.productId === product.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { productId: product.id, qty: 1, size: "M", color: "" }]);
    }
    toast.success("Adicionado ao carrinho!");
  };

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(!isFav);
    toast.success(isFav ? "Removido dos favoritos" : "Adicionado aos favoritos!");
  };

  const discount = product.oldPrice && product.price ? (() => {
    const old = parseFloat(product.oldPrice.replace("R$", "").replace(".", "").replace(",", "."));
    const cur = parseFloat(product.price.replace("R$", "").replace(".", "").replace(",", "."));
    return old > cur ? Math.round(((old - cur) / old) * 100) : 0;
  })() : 0;

  return (
    <div
      className="border border-border rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/produto/${product.id}`} className="relative block">
        <div className="aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        </div>
        {discount > 0 && (
          <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-sm text-white" style={{ backgroundColor: appearance.primaryColor }}>
            -{discount}%
          </span>
        )}
        <button
          onClick={toggleFav}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${isFav ? "bg-primary/10" : "bg-white/80 backdrop-blur-sm"} ${isHovered || isFav ? "opacity-100" : "opacity-0"}`}
        >
          <Heart className={`w-4 h-4 ${isFav ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
      </Link>
      <div className="p-4 text-center">
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-sm font-medium mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">{product.name}</h3>
        </Link>
        <div className="mb-1">
          <span className="text-muted-foreground text-xs line-through mr-2">{product.oldPrice}</span>
          <span className="font-bold text-base">{product.price}</span>
        </div>
        <p className="text-xs font-semibold mb-0.5" style={{ color: appearance.primaryColor }}>{product.pixPrice} no PIX</p>
        <p className="text-xs text-muted-foreground mb-3">{product.installment}</p>
        <div className="flex gap-2">
          <Link to={`/produto/${product.id}`} className="flex-1">
            <Button variant="shop-outline" className="w-full text-xs h-9">VER DETALHES</Button>
          </Link>
          <Button variant="shop" className="text-xs h-9 px-3" onClick={addToCart}>
            <ShoppingBag className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
