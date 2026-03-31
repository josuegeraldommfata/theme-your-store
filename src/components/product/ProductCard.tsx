import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";

interface ProductDisplay {
  id: number;
  name: string;
  image: string;
  oldPrice: string;
  price: string;
  pixPrice: string;
  installment: string;
}

const ProductCard = ({ product }: { product: ProductDisplay }) => {
  const { appearance, cart, setCart } = useStore();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const existing = cart.find(c => c.productId === product.id);
    if (existing) {
      setCart(cart.map(c => c.productId === product.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { productId: product.id, qty: 1, size: "M", color: "" }]);
    }
  };

  return (
    <div className="border border-border rounded-sm overflow-hidden group hover:shadow-lg transition-shadow">
      <Link to={`/produto/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
      </Link>
      <div className="p-4 text-center">
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-sm font-medium mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="mb-1">
          <span className="text-muted-foreground text-xs line-through mr-2">De {product.oldPrice}</span>
          <span className="font-bold text-base">Por {product.price}</span>
        </div>
        <p className="text-xs font-medium" style={{ color: appearance.primaryColor }}>{product.pixPrice} no PIX</p>
        <p className="text-xs text-muted-foreground mb-3">{product.installment}</p>
        <div className="flex gap-2">
          <Link to={`/produto/${product.id}`} className="flex-1">
            <Button variant="shop-outline" className="w-full text-xs h-9">VER DETALHES</Button>
          </Link>
          <Button variant="shop" className="text-xs h-9 px-3" onClick={addToCart}>COMPRAR</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
