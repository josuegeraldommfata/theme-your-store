import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Gateway {
  name: string;
  desc: string;
  connected: boolean;
  apiKey: string;
  secretKey: string;
}

const initialGateways: Gateway[] = [
  { name: "Mercado Pago", desc: "Receba pagamentos via Pix, cartão, boleto", connected: true, apiKey: "APP_USP-****-1234", secretKey: "****" },
  { name: "PagSeguro", desc: "Pagamentos com PagSeguro/PagBank", connected: false, apiKey: "", secretKey: "" },
  { name: "Pagar.me", desc: "Gateway de pagamento completo", connected: false, apiKey: "", secretKey: "" },
];

const PaymentsPanel = () => {
  const [gateways, setGateways] = useState(initialGateways);
  const [configuring, setConfiguring] = useState<string | null>(null);

  const toggleConnection = (name: string) => {
    setGateways(gateways.map(g => g.name === name ? { ...g, connected: !g.connected } : g));
    const gw = gateways.find(g => g.name === name);
    toast.success(gw?.connected ? `${name} desconectado` : `${name} conectado!`);
  };

  const updateKey = (name: string, field: "apiKey" | "secretKey", value: string) => {
    setGateways(gateways.map(g => g.name === name ? { ...g, [field]: value } : g));
  };

  const handleSaveConfig = (name: string) => {
    setConfiguring(null);
    toast.success(`Configurações de ${name} salvas!`);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <h2 className="font-bold text-lg">Integrações de Pagamento</h2>
      {gateways.map((g) => (
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
              {g.connected && (
                <Button variant="shop-outline" size="sm" onClick={() => setConfiguring(configuring === g.name ? null : g.name)}>Configurar</Button>
              )}
              <Button variant={g.connected ? "outline" : "shop"} size="sm" onClick={() => toggleConnection(g.name)}>
                {g.connected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </div>
          {configuring === g.name && (
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
              <div className="flex gap-2">
                <Button variant="shop" size="sm" onClick={() => handleSaveConfig(g.name)}>Salvar</Button>
                <Button variant="outline" size="sm" onClick={() => setConfiguring(null)}>Cancelar</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentsPanel;
