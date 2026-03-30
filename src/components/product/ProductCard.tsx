import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  image: string;
  oldPrice: string;
  price: string;
  pixPrice: string;
  installment: string;
}

const ProductCard = ({ product }: { product: Product }) => (
  <div className="border border-border rounded-sm overflow-hidden group hover:shadow-lg transition-shadow">
    <Link to={`/produto/${product.id}`}>
      <div className="aspect-square overflow-hidden bg-shop-gray">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
    </Link>
    <div className="p-4 text-center">
      <Link to={`/produto/${product.id}`}>
        <h3 className="text-sm font-medium mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
      </Link>
      <div className="mb-1">
        <span className="text-shop-price-old text-xs line-through mr-2">De {product.oldPrice}</span>
        <span className="font-bold text-base">Por {product.price}</span>
      </div>
      <p className="text-xs text-primary font-medium">{product.pixPrice} no PIX</p>
      <p className="text-xs text-muted-foreground mb-3">{product.installment}</p>
      <Link to={`/produto/${product.id}`}>
        <Button variant="shop" className="w-full text-xs h-9">VER DETALHES</Button>
      </Link>
    </div>
  </div>
);

export default ProductCard;
