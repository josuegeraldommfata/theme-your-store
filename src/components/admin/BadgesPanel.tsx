import { useRef } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info, CreditCard, Shield, Upload, X } from "lucide-react";

const BadgesPanel = () => {
  const { paymentBadges, setPaymentBadges, securityBadges, setSecurityBadges } = useStore();
  const paymentFileRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const securityFileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const togglePayment = (id: number) => {
    setPaymentBadges(paymentBadges.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const toggleSecurity = (id: number) => {
    setSecurityBadges(securityBadges.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const addPaymentBadge = () => {
    const name = prompt("Nome da bandeira de pagamento:");
    if (!name) return;
    setPaymentBadges([...paymentBadges, { id: Date.now(), name, image: "", active: true }]);
    toast.success(`Bandeira "${name}" adicionada!`);
  };

  const addSecurityBadge = () => {
    const name = prompt("Nome do selo de segurança:");
    if (!name) return;
    setSecurityBadges([...securityBadges, { id: Date.now(), name, image: "", active: true }]);
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

  const handlePaymentImage = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPaymentBadges(paymentBadges.map(b => b.id === id ? { ...b, image: e.target?.result as string } : b));
      toast.success("Imagem da bandeira atualizada!");
    };
    reader.readAsDataURL(file);
  };

  const handleSecurityImage = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSecurityBadges(securityBadges.map(b => b.id === id ? { ...b, image: e.target?.result as string } : b));
      toast.success("Imagem do selo atualizada!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Payment Badges */}
      <div className="bg-background border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2"><CreditCard className="w-5 h-5" /> Bandeiras de Pagamento</h2>
            <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Exibidas na seção "Pagamento" do rodapé da loja. Adicione imagens para exibir logos reais.</p>
          </div>
          <Button variant="shop" size="sm" onClick={addPaymentBadge}>+ NOVA BANDEIRA</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {paymentBadges.map(badge => (
            <div key={badge.id} className={`border rounded-lg p-4 text-center transition-all ${badge.active ? "border-primary bg-primary/5" : "border-border opacity-50"}`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={el => { paymentFileRefs.current[badge.id] = el; }}
                onChange={e => { if (e.target.files?.[0]) handlePaymentImage(badge.id, e.target.files[0]); }}
              />
              <div
                className="w-full h-16 mb-2 rounded border border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
                onClick={() => paymentFileRefs.current[badge.id]?.click()}
              >
                {badge.image ? (
                  <img src={badge.image} alt={badge.name} className="h-full w-full object-contain p-1" />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Upload className="w-5 h-5" />
                    <span className="text-[10px] mt-1">Upload</span>
                  </div>
                )}
              </div>
              <p className="font-semibold text-sm">{badge.name}</p>
              <div className="flex gap-1 mt-2 justify-center">
                <Button variant={badge.active ? "shop" : "outline"} size="sm" className="text-xs h-7" onClick={() => togglePayment(badge.id)}>
                  {badge.active ? "Ativo" : "Inativo"}
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7 text-destructive" onClick={() => removePayment(badge.id)}>
                  <X className="w-3 h-3" />
                </Button>
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
            <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Exibidos na seção "Segurança" do rodapé da loja. Adicione imagens dos selos.</p>
          </div>
          <Button variant="shop" size="sm" onClick={addSecurityBadge}>+ NOVO SELO</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {securityBadges.map(badge => (
            <div key={badge.id} className={`border rounded-lg p-4 text-center transition-all ${badge.active ? "border-primary bg-primary/5" : "border-border opacity-50"}`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={el => { securityFileRefs.current[badge.id] = el; }}
                onChange={e => { if (e.target.files?.[0]) handleSecurityImage(badge.id, e.target.files[0]); }}
              />
              <div
                className="w-full h-16 mb-2 rounded border border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
                onClick={() => securityFileRefs.current[badge.id]?.click()}
              >
                {badge.image ? (
                  <img src={badge.image} alt={badge.name} className="h-full w-full object-contain p-1" />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Upload className="w-5 h-5" />
                    <span className="text-[10px] mt-1">Upload</span>
                  </div>
                )}
              </div>
              <p className="font-semibold text-sm">{badge.name}</p>
              <div className="flex gap-1 mt-2 justify-center">
                <Button variant={badge.active ? "shop" : "outline"} size="sm" className="text-xs h-7" onClick={() => toggleSecurity(badge.id)}>
                  {badge.active ? "Ativo" : "Inativo"}
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7 text-destructive" onClick={() => removeSecurity(badge.id)}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesPanel;
