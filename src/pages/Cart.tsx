import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { toast } from "sonner";

const Cart = () => {
  const { cart, setCart, products, paymentGateways, appearance } = useStore();
  const navigate = useNavigate();

  const cartItems = cart.map(c => {
    const product = products.find(p => p.id === c.productId);
    return { ...c, product };
  }).filter(c => c.product);

  const parsePrice = (price: string) => parseFloat(price.replace("R$", "").replace(".", "").replace(",", "."));

  const updateQty = (productId: number, size: string, color: string, delta: number) => {
    setCart(cart.map(c => (c.productId === productId && c.size === size && c.color === color) ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const removeItem = (productId: number, size: string, color: string) => {
    setCart(cart.filter(c => !(c.productId === productId && c.size === size && c.color === color)));
    toast.success("Item removido do carrinho!");
  };

  const total = cartItems.reduce((sum, c) => sum + parsePrice(c.product!.price) * c.qty, 0);
  const pixTotal = total * 0.9;

  const handleFinalize = () => {
    toast.success("Pedido realizado com sucesso!");
    setCart([]);
    navigate("/");
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-8">Carrinho de Compras</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <Link to="/"><Button variant="shop">CONTINUAR COMPRANDO</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border border-border p-4 rounded-sm">
                  <img src={item.product!.image} alt={item.product!.name} className="w-24 h-24 object-cover rounded-sm" />
                  <div className="flex-1">
                    <Link to={`/produto/${item.productId}`} className="font-medium text-sm hover:text-primary">{item.product!.name}</Link>
                    <p className="text-xs text-muted-foreground mt-1">Tamanho: {item.size} {item.color && `| Cor: ${item.color}`}</p>
                    <p className="font-bold mt-2">R${(parsePrice(item.product!.price) * item.qty).toFixed(2).replace(".", ",")}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.productId, item.size, item.color)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQty(item.productId, item.size, item.color, -1)} className="p-1 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.productId, item.size, item.color, 1)} className="p-1 hover:bg-muted"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-border p-6 rounded-sm h-fit">
              <h3 className="font-bold mb-4">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R${total.toFixed(2).replace(".", ",")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span className="text-primary font-medium">Grátis</span></div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>R${total.toFixed(2).replace(".", ",")}</span>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Forma de pagamento:</p>
                <div className="space-y-2">
                  {paymentGateways.filter(g => g.connected).map((g) => (
                    <label key={g.name} className="flex items-center gap-2 text-sm border border-border p-3 rounded-sm cursor-pointer hover:border-primary transition-colors">
                      <input type="radio" name="payment" className="accent-primary" defaultChecked={g.name === paymentGateways.find(gw => gw.connected)?.name} />
                      {g.name}
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="shop" size="lg" className="w-full py-6" onClick={handleFinalize}>FINALIZAR COMPRA</Button>
              <p className="text-xs font-medium text-center mt-2" style={{ color: appearance.primaryColor }}>R${pixTotal.toFixed(2).replace(".", ",")} no PIX (10% desconto)</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
