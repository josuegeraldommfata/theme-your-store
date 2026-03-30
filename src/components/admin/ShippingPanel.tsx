import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShippingProvider {
  name: string;
  desc: string;
  connected: boolean;
}

const initialProviders: ShippingProvider[] = [
  { name: "Correios", desc: "PAC, SEDEX, Mini Envios", connected: true },
  { name: "Melhor Envio", desc: "Cotação com múltiplas transportadoras", connected: false },
  { name: "Jadlog", desc: "Encomendas e cargas", connected: false },
];

const ShippingPanel = () => {
  const [providers, setProviders] = useState(initialProviders);
  const [configuring, setConfiguring] = useState<string | null>(null);
  const [cepOrigem, setCepOrigem] = useState("");
  const [cepDestino, setCepDestino] = useState("");
  const [calcResult, setCalcResult] = useState<{ method: string; price: string; days: string }[] | null>(null);

  const toggleConnection = (name: string) => {
    setProviders(providers.map(s => s.name === name ? { ...s, connected: !s.connected } : s));
    const prov = providers.find(s => s.name === name);
    toast.success(prov?.connected ? `${name} desconectado` : `${name} conectado!`);
  };

  const handleCalc = () => {
    if (!cepOrigem || !cepDestino) { toast.error("Preencha ambos os CEPs"); return; }
    setCalcResult([
      { method: "PAC", price: "R$18,90", days: "5-8 dias úteis" },
      { method: "SEDEX", price: "R$32,50", days: "2-3 dias úteis" },
      { method: "Mini Envios", price: "R$12,90", days: "8-12 dias úteis" },
    ]);
    toast.success("Frete calculado!");
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <h2 className="font-bold text-lg">Integrações de Envio</h2>
      {providers.map((s) => (
        <div key={s.name} className="border border-border rounded-sm overflow-hidden">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-3 py-1 rounded-full ${s.connected ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"}`}>
                {s.connected ? "Conectado" : "Desconectado"}
              </span>
              {s.connected && (
                <Button variant="shop-outline" size="sm" onClick={() => setConfiguring(configuring === s.name ? null : s.name)}>Configurar</Button>
              )}
              <Button variant={s.connected ? "outline" : "shop"} size="sm" onClick={() => toggleConnection(s.name)}>
                {s.connected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </div>
          {configuring === s.name && (
            <div className="border-t border-border p-6 bg-muted/30 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Token de Acesso</label>
                  <input className="w-full border border-border rounded-sm p-2 text-sm" placeholder="Insira o token" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">CEP de Origem Padrão</label>
                  <input className="w-full border border-border rounded-sm p-2 text-sm" placeholder="00000-000" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="shop" size="sm" onClick={() => { setConfiguring(null); toast.success("Configurações salvas!"); }}>Salvar</Button>
                <Button variant="outline" size="sm" onClick={() => setConfiguring(null)}>Cancelar</Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="border-t border-border pt-6">
        <h3 className="font-semibold mb-3">Calcular Frete</h3>
        <div className="flex gap-3">
          <input placeholder="CEP de origem" value={cepOrigem} onChange={e => setCepOrigem(e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          <input placeholder="CEP de destino" value={cepDestino} onChange={e => setCepDestino(e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          <Button variant="shop" onClick={handleCalc}>CALCULAR</Button>
        </div>
        {calcResult && (
          <div className="mt-4 space-y-2">
            {calcResult.map(r => (
              <div key={r.method} className="flex items-center justify-between p-3 border border-border rounded-sm">
                <span className="font-medium text-sm">{r.method}</span>
                <div className="text-right">
                  <span className="font-bold text-sm">{r.price}</span>
                  <span className="text-xs text-muted-foreground ml-2">{r.days}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingPanel;
