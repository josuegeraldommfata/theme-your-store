import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { toast } from "sonner";
import { CreditCard, QrCode, FileText, Check, Loader2 } from "lucide-react";

type Step = "address" | "shipping" | "payment" | "review" | "processing" | "done";

const Checkout = () => {
  const { cart, setCart, products, orders, setOrders, currentUser, paymentGateways, appearance } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("address");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [address, setAddress] = useState({ name: currentUser?.name || "", cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "" });
  const [shippingOption, setShippingOption] = useState("sedex");

  const cartItems = cart.map(c => {
    const product = products.find(p => p.id === c.productId);
    return { ...c, product };
  }).filter(c => c.product);

  const parsePrice = (price: string) => parseFloat(price.replace("R$", "").replace(".", "").replace(",", "."));
  const formatPrice = (v: number) => `R$${v.toFixed(2).replace(".", ",")}`;

  const subtotal = cartItems.reduce((sum, c) => sum + parsePrice(c.product!.price) * c.qty, 0);
  const shippingCost = shippingOption === "sedex" ? 0 : 0; // Free shipping
  const discount = paymentMethod === "pix" ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discount;

  const processPayment = () => {
    setStep("processing");
    setTimeout(() => {
      const orderId = `#${1235 + orders.length}`;
      const newOrder = {
        id: orderId,
        customer: address.name || currentUser?.name || "Cliente",
        email: currentUser?.email || "guest@email.com",
        total: formatPrice(total),
        status: "Processando" as const,
        date: new Date().toLocaleDateString("pt-BR"),
        items: cartItems.map(c => ({
          name: c.product!.name,
          qty: c.qty,
          price: formatPrice(parsePrice(c.product!.price) * c.qty),
        })),
      };
      setOrders([newOrder, ...orders]);
      setCart([]);
      setStep("done");
    }, 3000);
  };

  if (cartItems.length === 0 && step !== "done") {
    navigate("/carrinho");
    return null;
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { key: "address", label: "Endereço" },
            { key: "shipping", label: "Entrega" },
            { key: "payment", label: "Pagamento" },
            { key: "review", label: "Revisão" },
          ].map((s, i) => {
            const steps: Step[] = ["address", "shipping", "payment", "review"];
            const currentIdx = steps.indexOf(step === "processing" || step === "done" ? "review" : step);
            const stepIdx = i;
            const isActive = stepIdx <= currentIdx;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? "text-white" : "bg-muted text-muted-foreground"}`} style={isActive ? { backgroundColor: appearance.primaryColor } : {}}>
                  {stepIdx < currentIdx ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${isActive ? "font-semibold" : "text-muted-foreground"}`}>{s.label}</span>
                {i < 3 && <div className={`w-8 h-0.5 ${isActive ? "bg-primary" : "bg-muted"}`} />}
              </div>
            );
          })}
        </div>

        {step === "processing" && (
          <div className="text-center py-20">
            <Loader2 className="w-16 h-16 mx-auto animate-spin text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-2">Processando Pagamento...</h2>
            <p className="text-muted-foreground">Aguarde enquanto confirmamos sua compra</p>
          </div>
        )}

        {step === "done" && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#22c55e" }}>
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pedido Confirmado! 🎉</h2>
            <p className="text-muted-foreground mb-2">Seu pedido foi realizado com sucesso e já aparece no painel do admin.</p>
            <p className="text-sm text-muted-foreground mb-8">Pedido: <strong>{orders[0]?.id}</strong> • {formatPrice(total)}</p>
            <div className="flex gap-4 justify-center">
              <Button variant="shop" onClick={() => navigate("/")}>CONTINUAR COMPRANDO</Button>
              {currentUser && <Button variant="shop-outline" onClick={() => navigate("/minha-conta")}>MEUS PEDIDOS</Button>}
            </div>
          </div>
        )}

        {step === "address" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium block mb-1">Nome Completo</label>
                  <input value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">CEP</label>
                  <input value={address.cep} onChange={e => setAddress({ ...address, cep: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="00000-000" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Estado</label>
                  <select value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm">
                    <option value="">Selecione</option>
                    {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium block mb-1">Rua/Avenida</label>
                  <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="Nome da rua" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Número</label>
                  <input value={address.number} onChange={e => setAddress({ ...address, number: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="123" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Complemento</label>
                  <input value={address.complement} onChange={e => setAddress({ ...address, complement: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="Apto, bloco..." />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Bairro</label>
                  <input value={address.neighborhood} onChange={e => setAddress({ ...address, neighborhood: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="Bairro" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Cidade</label>
                  <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="Cidade" />
                </div>
              </div>
              <Button variant="shop" size="lg" className="w-full py-6 mt-4" onClick={() => {
                if (!address.name || !address.cep || !address.street || !address.number || !address.city || !address.state) {
                  toast.error("Preencha todos os campos obrigatórios!"); return;
                }
                setStep("shipping");
              }}>CONTINUAR</Button>
            </div>
            <OrderSummary cartItems={cartItems} subtotal={subtotal} discount={0} total={subtotal} parsePrice={parsePrice} formatPrice={formatPrice} />
          </div>
        )}

        {step === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold mb-4">Opções de Entrega</h2>
              {[
                { id: "sedex", name: "SEDEX", days: "3-5 dias úteis", price: "Grátis", desc: "Entrega rápida pelos Correios" },
                { id: "pac", name: "PAC", days: "7-12 dias úteis", price: "Grátis", desc: "Entrega econômica pelos Correios" },
                { id: "express", name: "Entrega Express", days: "1-2 dias úteis", price: "Grátis", desc: "Entrega ultra rápida" },
              ].map(opt => (
                <label key={opt.id} className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-colors ${shippingOption === opt.id ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={shippingOption === opt.id} onChange={() => setShippingOption(opt.id)} className="accent-primary" />
                    <div>
                      <p className="font-medium text-sm">{opt.name}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc} • {opt.days}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-primary">{opt.price}</span>
                </label>
              ))}
              <div className="flex gap-4 mt-4">
                <Button variant="outline" size="lg" className="flex-1 py-6" onClick={() => setStep("address")}>VOLTAR</Button>
                <Button variant="shop" size="lg" className="flex-1 py-6" onClick={() => setStep("payment")}>CONTINUAR</Button>
              </div>
            </div>
            <OrderSummary cartItems={cartItems} subtotal={subtotal} discount={0} total={subtotal} parsePrice={parsePrice} formatPrice={formatPrice} />
          </div>
        )}

        {step === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "pix"} onChange={() => setPaymentMethod("pix")} className="accent-primary" />
                  <QrCode className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">PIX</p>
                    <p className="text-xs text-muted-foreground">10% de desconto • Aprovação imediata</p>
                  </div>
                  <span className="ml-auto font-bold text-sm text-primary">{formatPrice(subtotal * 0.9)}</span>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === "credit" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "credit"} onChange={() => setPaymentMethod("credit")} className="accent-primary" />
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">Cartão de Crédito</p>
                    <p className="text-xs text-muted-foreground">Parcele em até 12x sem juros</p>
                  </div>
                  <span className="ml-auto font-bold text-sm">{formatPrice(subtotal)}</span>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === "boleto" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "boleto"} onChange={() => setPaymentMethod("boleto")} className="accent-primary" />
                  <FileText className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">Boleto Bancário</p>
                    <p className="text-xs text-muted-foreground">Vencimento em 3 dias úteis</p>
                  </div>
                  <span className="ml-auto font-bold text-sm">{formatPrice(subtotal)}</span>
                </label>
              </div>

              {paymentMethod === "credit" && (
                <div className="border border-border rounded-sm p-4 space-y-4">
                  <h3 className="font-semibold text-sm">Dados do Cartão</h3>
                  <div>
                    <label className="text-xs font-medium block mb-1">Número do Cartão</label>
                    <input value={cardData.number} onChange={e => setCardData({ ...cardData, number: e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim() })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1">Nome no Cartão</label>
                    <input value={cardData.name} onChange={e => setCardData({ ...cardData, name: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="NOME COMO NO CARTÃO" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium block mb-1">Validade</label>
                      <input value={cardData.expiry} onChange={e => setCardData({ ...cardData, expiry: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">CVV</label>
                      <input value={cardData.cvv} onChange={e => setCardData({ ...cardData, cvv: e.target.value })} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="123" maxLength={4} type="password" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "pix" && (
                <div className="border border-border rounded-sm p-4 text-center">
                  <p className="text-sm text-muted-foreground">O QR Code PIX será gerado após a confirmação do pedido.</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1 py-6" onClick={() => setStep("shipping")}>VOLTAR</Button>
                <Button variant="shop" size="lg" className="flex-1 py-6" onClick={() => {
                  if (paymentMethod === "credit" && (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv)) {
                    toast.error("Preencha todos os dados do cartão!"); return;
                  }
                  setStep("review");
                }}>REVISAR PEDIDO</Button>
              </div>
            </div>
            <OrderSummary cartItems={cartItems} subtotal={subtotal} discount={discount} total={total} parsePrice={parsePrice} formatPrice={formatPrice} paymentMethod={paymentMethod} />
          </div>
        )}

        {step === "review" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold mb-4">Revisão do Pedido</h2>

              <div className="border border-border rounded-sm p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">Endereço de Entrega</h3>
                  <button onClick={() => setStep("address")} className="text-xs text-primary hover:underline">Editar</button>
                </div>
                <p className="text-sm">{address.name}</p>
                <p className="text-xs text-muted-foreground">{address.street}, {address.number} {address.complement && `- ${address.complement}`}</p>
                <p className="text-xs text-muted-foreground">{address.neighborhood} - {address.city}/{address.state} • CEP: {address.cep}</p>
              </div>

              <div className="border border-border rounded-sm p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">Entrega</h3>
                  <button onClick={() => setStep("shipping")} className="text-xs text-primary hover:underline">Editar</button>
                </div>
                <p className="text-sm">{shippingOption === "sedex" ? "SEDEX (3-5 dias)" : shippingOption === "pac" ? "PAC (7-12 dias)" : "Express (1-2 dias)"} • <span className="text-primary font-medium">Frete Grátis</span></p>
              </div>

              <div className="border border-border rounded-sm p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">Pagamento</h3>
                  <button onClick={() => setStep("payment")} className="text-xs text-primary hover:underline">Editar</button>
                </div>
                <p className="text-sm">{paymentMethod === "pix" ? "PIX (10% desconto)" : paymentMethod === "credit" ? `Cartão •••• ${cardData.number.slice(-4)}` : "Boleto Bancário"}</p>
              </div>

              <div className="border border-border rounded-sm p-4">
                <h3 className="font-semibold text-sm mb-3">Itens do Pedido</h3>
                {cartItems.map(item => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <img src={item.product!.image} alt={item.product!.name} className="w-12 h-12 object-cover rounded-sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product!.name}</p>
                      <p className="text-xs text-muted-foreground">Tam: {item.size} {item.color && `• Cor: ${item.color}`} • Qtd: {item.qty}</p>
                    </div>
                    <span className="font-bold text-sm">{formatPrice(parsePrice(item.product!.price) * item.qty)}</span>
                  </div>
                ))}
              </div>

              <Button variant="shop" size="lg" className="w-full py-6 text-lg" onClick={processPayment}>
                CONFIRMAR E PAGAR {formatPrice(total)}
              </Button>
              <p className="text-xs text-center text-muted-foreground">Ao clicar, você concorda com nossos Termos de Uso e Política de Privacidade</p>
            </div>
            <OrderSummary cartItems={cartItems} subtotal={subtotal} discount={discount} total={total} parsePrice={parsePrice} formatPrice={formatPrice} paymentMethod={paymentMethod} />
          </div>
        )}
      </div>
    </Layout>
  );
};

const OrderSummary = ({ cartItems, subtotal, discount, total, parsePrice, formatPrice, paymentMethod }: any) => (
  <div className="border border-border p-6 rounded-sm h-fit sticky top-4">
    <h3 className="font-bold mb-4">Resumo do Pedido</h3>
    <div className="space-y-2 text-sm mb-4">
      {cartItems.map((item: any) => (
        <div key={`${item.productId}-${item.size}`} className="flex justify-between">
          <span className="text-muted-foreground truncate mr-2">{item.qty}x {item.product.name}</span>
          <span>{formatPrice(parsePrice(item.product.price) * item.qty)}</span>
        </div>
      ))}
    </div>
    <div className="border-t border-border pt-3 space-y-2 text-sm">
      <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span className="text-primary font-medium">Grátis</span></div>
      {discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Desconto PIX (10%)</span><span className="text-primary font-medium">-{formatPrice(discount)}</span></div>}
    </div>
    <div className="border-t border-border pt-4 mt-3 flex justify-between font-bold text-lg">
      <span>Total</span>
      <span>{formatPrice(total)}</span>
    </div>
    {paymentMethod === "pix" && <p className="text-xs text-primary font-medium text-center mt-2">Economize {formatPrice(discount)} pagando com PIX!</p>}
  </div>
);

export default Checkout;
