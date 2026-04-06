import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { toast } from "sonner";
import { CreditCard, QrCode, FileText, Check, Loader2, Tag, Shield, Lock } from "lucide-react";

type Step = "address" | "shipping" | "payment" | "review" | "processing" | "done";

const Checkout = () => {
  const { cart, setCart, products, orders, setOrders, currentUser, appearance, coupons } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("address");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [address, setAddress] = useState({ name: currentUser?.name || "", cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "" });
  const [shippingOption, setShippingOption] = useState("sedex");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: "percent" | "fixed" } | null>(null);

  const cartItems = cart.map(c => {
    const product = products.find(p => p.id === c.productId);
    return { ...c, product };
  }).filter(c => c.product);

  const parsePrice = (price: string) => parseFloat(price.replace("R$", "").replace(".", "").replace(",", "."));
  const formatPrice = (v: number) => `R$${v.toFixed(2).replace(".", ",")}`;

  const subtotal = cartItems.reduce((sum, c) => sum + parsePrice(c.product!.price) * c.qty, 0);
  const pixDiscount = paymentMethod === "pix" ? subtotal * 0.1 : 0;
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percent" ? subtotal * (appliedCoupon.discount / 100) : appliedCoupon.discount
    : 0;
  const total = subtotal - pixDiscount - couponDiscount;

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase() && c.active);
    if (!coupon) { toast.error("Cupom inválido ou expirado"); return; }
    if (subtotal < coupon.minValue) { toast.error(`Valor mínimo: ${formatPrice(coupon.minValue)}`); return; }
    setAppliedCoupon({ code: coupon.code, discount: coupon.discount, type: coupon.type });
    toast.success(`Cupom ${coupon.code} aplicado! ${coupon.type === "percent" ? `${coupon.discount}% OFF` : formatPrice(coupon.discount) + " OFF"}`);
  };

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
        paymentMethod: paymentMethod === "pix" ? "PIX" : paymentMethod === "credit" ? "Cartão" : "Boleto",
        shippingMethod: shippingOption === "sedex" ? "SEDEX" : shippingOption === "pac" ? "PAC" : "Express",
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

  const OrderSummaryBlock = () => (
    <div className="border border-border p-6 rounded-lg h-fit sticky top-24">
      <h3 className="font-bold mb-4">Resumo do Pedido</h3>
      <div className="space-y-2 mb-4">
        {cartItems.map(c => (
          <div key={`${c.productId}-${c.size}`} className="flex gap-2 text-sm">
            <img src={c.product!.image} alt="" className="w-10 h-10 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs">{c.product!.name}</p>
              <p className="text-xs text-muted-foreground">{c.qty}x • {c.size}</p>
            </div>
            <span className="text-xs font-medium whitespace-nowrap">{formatPrice(parsePrice(c.product!.price) * c.qty)}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-sm border-t border-border pt-3">
        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span className="text-primary font-medium">Grátis</span></div>
        {pixDiscount > 0 && <div className="flex justify-between text-primary"><span>Desconto PIX (10%)</span><span>-{formatPrice(pixDiscount)}</span></div>}
        {couponDiscount > 0 && <div className="flex justify-between text-primary"><span>Cupom ({appliedCoupon?.code})</span><span>-{formatPrice(couponDiscount)}</span></div>}
      </div>
      <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      
      {/* Coupon */}
      {step !== "review" && step !== "processing" && step !== "done" && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs font-medium mb-2 flex items-center gap-1"><Tag className="w-3 h-3" /> Cupom de desconto</p>
          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={e => setCouponCode(e.target.value.toUpperCase())}
              placeholder="FLEX10"
              className="border border-border rounded px-3 py-2 text-xs flex-1 uppercase"
            />
            <Button variant="shop-outline" size="sm" onClick={applyCoupon} className="text-xs">Aplicar</Button>
          </div>
          {appliedCoupon && <p className="text-xs text-primary mt-1">✓ {appliedCoupon.code} aplicado</p>}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="w-3 h-3" /> Compra 100% segura
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container py-8 max-w-5xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { key: "address", label: "Endereço" },
            { key: "shipping", label: "Entrega" },
            { key: "payment", label: "Pagamento" },
            { key: "review", label: "Revisão" },
          ].map((s, i) => {
            const steps: Step[] = ["address", "shipping", "payment", "review"];
            const currentIdx = steps.indexOf(step === "processing" || step === "done" ? "review" : step);
            const isActive = i <= currentIdx;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isActive ? "text-white" : "bg-muted text-muted-foreground"}`} style={isActive ? { backgroundColor: appearance.primaryColor } : {}}>
                  {i < currentIdx ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${isActive ? "font-semibold" : "text-muted-foreground"}`}>{s.label}</span>
                {i < 3 && <div className={`w-8 h-0.5 ${isActive && i < currentIdx ? "bg-primary" : "bg-muted"}`} />}
              </div>
            );
          })}
        </div>

        {step === "processing" && (
          <div className="text-center py-20">
            <Loader2 className="w-16 h-16 mx-auto animate-spin text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-2">Processando Pagamento...</h2>
            <p className="text-muted-foreground">Aguarde enquanto confirmamos sua compra</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" /> Transação protegida com criptografia SSL
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pedido Confirmado! 🎉</h2>
            <p className="text-muted-foreground mb-2">Seu pedido foi realizado com sucesso.</p>
            <p className="text-sm text-muted-foreground mb-2">O pedido já aparece no painel administrativo.</p>
            <p className="text-sm mb-8">Pedido: <strong>{orders[0]?.id}</strong> • <strong>{formatPrice(total)}</strong></p>
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
                  <label className="text-sm font-medium block mb-1">Nome Completo *</label>
                  <input value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">CEP *</label>
                  <input value={address.cep} onChange={e => setAddress({ ...address, cep: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" placeholder="00000-000" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Estado *</label>
                  <select value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all">
                    <option value="">Selecione</option>
                    {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium block mb-1">Rua/Avenida *</label>
                  <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Número *</label>
                  <input value={address.number} onChange={e => setAddress({ ...address, number: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Complemento</label>
                  <input value={address.complement} onChange={e => setAddress({ ...address, complement: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Bairro *</label>
                  <input value={address.neighborhood} onChange={e => setAddress({ ...address, neighborhood: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Cidade *</label>
                  <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all" />
                </div>
              </div>
              <Button variant="shop" size="lg" className="w-full py-6 mt-4" onClick={() => {
                if (!address.name || !address.cep || !address.street || !address.number || !address.city || !address.state) {
                  toast.error("Preencha todos os campos obrigatórios!"); return;
                }
                setStep("shipping");
              }}>CONTINUAR</Button>
            </div>
            <OrderSummaryBlock />
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
                <label key={opt.id} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${shippingOption === opt.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary"}`}>
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
            <OrderSummaryBlock />
          </div>
        )}

        {step === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
              <div className="space-y-3">
                {[
                  { id: "pix", icon: QrCode, name: "PIX", desc: "10% de desconto • Aprovação imediata", price: formatPrice(subtotal * 0.9 - couponDiscount) },
                  { id: "credit", icon: CreditCard, name: "Cartão de Crédito", desc: "Parcele em até 12x sem juros", price: formatPrice(subtotal - couponDiscount) },
                  { id: "boleto", icon: FileText, name: "Boleto Bancário", desc: "Vencimento em 3 dias úteis", price: formatPrice(subtotal - couponDiscount) },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === opt.id ? "border-primary bg-primary/5 shadow-sm" : "border-border"}`}>
                    <input type="radio" name="payment" checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} className="accent-primary" />
                    <opt.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{opt.name}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                    <span className={`font-bold text-sm ${opt.id === "pix" ? "text-primary" : ""}`}>{opt.price}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === "credit" && (
                <div className="border border-border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-sm">Dados do Cartão</h3>
                  <div>
                    <label className="text-xs font-medium block mb-1">Número do Cartão</label>
                    <input value={cardData.number} onChange={e => setCardData({ ...cardData, number: e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim() })} className="w-full border border-border rounded-lg p-3 text-sm" placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1">Nome no Cartão</label>
                    <input value={cardData.name} onChange={e => setCardData({ ...cardData, name: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm" placeholder="NOME COMO NO CARTÃO" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium block mb-1">Validade</label>
                      <input value={cardData.expiry} onChange={e => setCardData({ ...cardData, expiry: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">CVV</label>
                      <input value={cardData.cvv} onChange={e => setCardData({ ...cardData, cvv: e.target.value })} className="w-full border border-border rounded-lg p-3 text-sm" placeholder="123" maxLength={4} type="password" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "pix" && (
                <div className="border border-border rounded-lg p-6 text-center bg-muted/50">
                  <QrCode className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p className="text-sm font-medium">O QR Code PIX será gerado após a confirmação</p>
                  <p className="text-xs text-muted-foreground mt-1">Pagamento via PIX é aprovado instantaneamente</p>
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
            <OrderSummaryBlock />
          </div>
        )}

        {step === "review" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold mb-4">Revisão do Pedido</h2>

              <div className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">📍 Endereço de Entrega</h3>
                  <button onClick={() => setStep("address")} className="text-xs text-primary hover:underline">Editar</button>
                </div>
                <p className="text-sm font-medium">{address.name}</p>
                <p className="text-xs text-muted-foreground">{address.street}, {address.number} {address.complement && `- ${address.complement}`}</p>
                <p className="text-xs text-muted-foreground">{address.neighborhood} - {address.city}/{address.state} • CEP: {address.cep}</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">🚚 Entrega</h3>
                  <button onClick={() => setStep("shipping")} className="text-xs text-primary hover:underline">Editar</button>
                </div>
                <p className="text-sm">{shippingOption === "sedex" ? "SEDEX (3-5 dias)" : shippingOption === "pac" ? "PAC (7-12 dias)" : "Express (1-2 dias)"} • <span className="text-primary font-medium">Frete Grátis</span></p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">💳 Pagamento</h3>
                  <button onClick={() => setStep("payment")} className="text-xs text-primary hover:underline">Editar</button>
                </div>
                <p className="text-sm">
                  {paymentMethod === "pix" ? "PIX (10% desconto)" : paymentMethod === "credit" ? `Cartão •••• ${cardData.number.slice(-4)}` : "Boleto Bancário"}
                </p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-3">📦 Itens do Pedido</h3>
                {cartItems.map(c => (
                  <div key={`${c.productId}-${c.size}`} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <img src={c.product!.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{c.product!.name}</p>
                      <p className="text-xs text-muted-foreground">{c.qty}x • Tam: {c.size} {c.color && `• ${c.color}`}</p>
                    </div>
                    <span className="font-bold text-sm">{formatPrice(parsePrice(c.product!.price) * c.qty)}</span>
                  </div>
                ))}
              </div>

              <Button variant="shop" size="lg" className="w-full py-6 text-base" onClick={processPayment}>
                CONFIRMAR E PAGAR {formatPrice(total)}
              </Button>
            </div>
            <OrderSummaryBlock />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
