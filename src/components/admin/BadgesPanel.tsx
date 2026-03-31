import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info, CreditCard, Shield } from "lucide-react";

const BadgesPanel = () => {
  const { paymentBadges, setPaymentBadges, securityBadges, setSecurityBadges } = useStore();

  const togglePayment = (id: number) => {
    setPaymentBadges(paymentBadges.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const toggleSecurity = (id: number) => {
    setSecurityBadges(securityBadges.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const addPaymentBadge = () => {
    const name = prompt("Nome da bandeira de pagamento:");
    if (!name) return;
    setPaymentBadges([...paymentBadges, { id: Date.now(), name, active: true }]);
    toast.success(`Bandeira "${name}" adicionada!`);
  };

  const addSecurityBadge = () => {
    const name = prompt("Nome do selo de segurança:");
    if (!name) return;
    setSecurityBadges([...securityBadges, { id: Date.now(), name, active: true }]);
    toast.success(`Selo "${name}" adicionado!`);
  };

  const removePayment = (id: number) => {
    setPaymentBadges(paymentBadges.filter(b => b.id !== id));
    toast.success("Bandeira removida!");
  };

  const removeSecurity = (id: number) => {
    setSecurityBadges(securityBadges.filter(b => b.id !== id));
    toast.success("Selo removido!");
  };

  return (
    <div className="space-y-6">
      {/* Payment Badges */}
      <div className="bg-background border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2"><CreditCard className="w-5 h-5" /> Bandeiras de Pagamento</h2>
            <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Exibidas na seção "Pagamento" do rodapé da loja</p>
          </div>
          <Button variant="shop" size="sm" onClick={addPaymentBadge}>+ NOVA BANDEIRA</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {paymentBadges.map(badge => (
            <div key={badge.id} className={`border rounded-lg p-4 text-center transition-all ${badge.active ? "border-primary bg-primary/5" : "border-border opacity-50"}`}>
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-sm">{badge.name}</p>
              <div className="flex gap-1 mt-2 justify-center">
                <Button variant={badge.active ? "shop" : "outline"} size="sm" className="text-xs h-7" onClick={() => togglePayment(badge.id)}>
                  {badge.active ? "Ativo" : "Inativo"}
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7 text-destructive" onClick={() => removePayment(badge.id)}>×</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badges */}
      <div className="bg-background border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2"><Shield className="w-5 h-5" /> Selos de Segurança</h2>
            <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Exibidos na seção "Segurança" do rodapé da loja</p>
          </div>
          <Button variant="shop" size="sm" onClick={addSecurityBadge}>+ NOVO SELO</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {securityBadges.map(badge => (
            <div key={badge.id} className={`border rounded-lg p-4 text-center transition-all ${badge.active ? "border-primary bg-primary/5" : "border-border opacity-50"}`}>
              <Shield className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-sm">{badge.name}</p>
              <div className="flex gap-1 mt-2 justify-center">
                <Button variant={badge.active ? "shop" : "outline"} size="sm" className="text-xs h-7" onClick={() => toggleSecurity(badge.id)}>
                  {badge.active ? "Ativo" : "Inativo"}
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7 text-destructive" onClick={() => removeSecurity(badge.id)}>×</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesPanel;
