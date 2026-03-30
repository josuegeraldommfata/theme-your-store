import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

const initialCart = [
  { id: 1, name: "Tênis Casual Branco Confort", size: "M", image: product1, price: 199.9, qty: 1 },
  { id: 2, name: "Bolsa Couro Premium Elegance", size: "Único", image: product2, price: 199.9, qty: 1 },
];

const Cart = () => {
  const [items, setItems] = useState(initialCart);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-8">Carrinho de Compras</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <Link to="/"><Button variant="shop">CONTINUAR COMPRANDO</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border border-border p-4 rounded-sm">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-sm" />
                  <div className="flex-1">
                    <Link to={`/produto/${item.id}`} className="font-medium text-sm hover:text-primary">{item.name}</Link>
                    <p className="text-xs text-muted-foreground mt-1">Tamanho: {item.size}</p>
                    <p className="font-bold mt-2">R${(item.price * item.qty).toFixed(2).replace(".", ",")}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-muted"><Plus className="w-3 h-3" /></button>
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
                  {["Mercado Pago", "PagSeguro", "Pagar.me"].map((m) => (
                    <label key={m} className="flex items-center gap-2 text-sm border border-border p-3 rounded-sm cursor-pointer hover:border-primary transition-colors">
                      <input type="radio" name="payment" className="accent-primary" defaultChecked={m === "Mercado Pago"} />
                      {m}
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="shop" size="lg" className="w-full py-6">FINALIZAR COMPRA</Button>
              <p className="text-xs text-primary font-medium text-center mt-2">R${total.toFixed(2).replace(".", ",")} no PIX</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
