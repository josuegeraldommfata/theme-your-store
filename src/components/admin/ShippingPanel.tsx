import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info } from "lucide-react";

const ShippingPanel = () => {
  const { shippingProviders, setShippingProviders } = useStore();
  const [cepOrigem, setCepOrigem] = useState("");
  const [cepDestino, setCepDestino] = useState("");
  const [calcResult, setCalcResult] = useState<{ method: string; price: string; days: string }[] | null>(null);

  const toggleConnection = (name: string) => {
    const prov = shippingProviders.find(s => s.name === name);
    setShippingProviders(shippingProviders.map(s => s.name === name ? { ...s, connected: !s.connected } : s));
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
      <div>
        <h2 className="font-bold text-lg">Integrações de Envio</h2>
        <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Configurações de frete e transportadoras para a loja</p>
      </div>
      {shippingProviders.map((s) => (
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
              <Button variant={s.connected ? "outline" : "shop"} size="sm" onClick={() => toggleConnection(s.name)}>
                {s.connected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold mb-3">Calcular Frete (teste)</h3>
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
