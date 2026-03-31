import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info } from "lucide-react";

const PaymentsPanel = () => {
  const { paymentGateways, setPaymentGateways } = useStore();

  const toggleConnection = (name: string) => {
    const gw = paymentGateways.find(g => g.name === name);
    setPaymentGateways(paymentGateways.map(g => g.name === name ? { ...g, connected: !g.connected } : g));
    toast.success(gw?.connected ? `${name} desconectado` : `${name} conectado!`);
  };

  const updateKey = (name: string, field: "apiKey" | "secretKey", value: string) => {
    setPaymentGateways(paymentGateways.map(g => g.name === name ? { ...g, [field]: value } : g));
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="font-bold text-lg">Integrações de Pagamento</h2>
        <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Gateways conectados aparecem como opções no checkout (página do carrinho)</p>
      </div>
      {paymentGateways.map((g) => (
        <div key={g.name} className="border border-border rounded-sm overflow-hidden">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">{g.name}</h3>
              <p className="text-sm text-muted-foreground">{g.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-3 py-1 rounded-full ${g.connected ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"}`}>
                {g.connected ? "Conectado" : "Desconectado"}
              </span>
              <Button variant={g.connected ? "outline" : "shop"} size="sm" onClick={() => toggleConnection(g.name)}>
                {g.connected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </div>
          {g.connected && (
            <div className="border-t border-border p-6 bg-muted/30 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">API Key / Token</label>
                  <input value={g.apiKey} onChange={e => updateKey(g.name, "apiKey", e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Secret Key</label>
                  <input type="password" value={g.secretKey} onChange={e => updateKey(g.name, "secretKey", e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
                </div>
              </div>
              <Button variant="shop" size="sm" onClick={() => toast.success(`Configurações de ${g.name} salvas!`)}>Salvar</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentsPanel;
