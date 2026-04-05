import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info, ChevronUp } from "lucide-react";

const ShippingPanel = () => {
  const { shippingProviders, setShippingProviders } = useStore();
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [tempCredentials, setTempCredentials] = useState<Record<string, { token: string; apiKey: string }>>({});
  const [cepOrigem, setCepOrigem] = useState("");
  const [cepDestino, setCepDestino] = useState("");
  const [calcResult, setCalcResult] = useState<{ method: string; price: string; days: string }[] | null>(null);
  const [calculating, setCalculating] = useState(false);

  const toggleExpand = (name: string) => {
    setExpandedProvider(prev => prev === name ? null : name);
    const prov = shippingProviders.find(s => s.name === name);
    if (prov) {
      setTempCredentials(prev => ({ ...prev, [name]: { token: prov.token, apiKey: prov.apiKey } }));
    }
  };

  const handleConnect = (name: string) => {
    const creds = tempCredentials[name];
    if (!creds?.token && !creds?.apiKey) { toast.error("Preencha pelo menos um campo de credencial"); return; }
    setShippingProviders(shippingProviders.map(s => s.name === name ? { ...s, connected: true, token: creds.token, apiKey: creds.apiKey } : s));
    toast.success(`${name} conectado com sucesso!`);
    setExpandedProvider(null);
  };

  const handleDisconnect = (name: string) => {
    setShippingProviders(shippingProviders.map(s => s.name === name ? { ...s, connected: false, token: "", apiKey: "" } : s));
    toast.success(`${name} desconectado`);
  };

  const handleCalc = () => {
    if (!cepOrigem || !cepDestino) { toast.error("Preencha ambos os CEPs"); return; }
    if (cepOrigem.length < 8 || cepDestino.length < 8) { toast.error("CEP deve ter 8 dígitos"); return; }

    setCalculating(true);
    // Simulate real freight calculation based on CEP distance
    setTimeout(() => {
      const orig = parseInt(cepOrigem.slice(0, 2));
      const dest = parseInt(cepDestino.slice(0, 2));
      const dist = Math.abs(orig - dest);
      const basePac = 12.90 + dist * 0.8;
      const baseSedex = 22.50 + dist * 1.5;
      const baseMini = 8.90 + dist * 0.4;
      
      const connected = shippingProviders.filter(s => s.connected);
      const results: { method: string; price: string; days: string }[] = [];

      if (connected.some(s => s.name === "Correios")) {
        results.push(
          { method: "PAC (Correios)", price: `R$${basePac.toFixed(2).replace(".", ",")}`, days: `${5 + Math.floor(dist / 10)}-${8 + Math.floor(dist / 10)} dias úteis` },
          { method: "SEDEX (Correios)", price: `R$${baseSedex.toFixed(2).replace(".", ",")}`, days: `${1 + Math.floor(dist / 20)}-${3 + Math.floor(dist / 20)} dias úteis` },
          { method: "Mini Envios (Correios)", price: `R$${baseMini.toFixed(2).replace(".", ",")}`, days: `${8 + Math.floor(dist / 8)}-${12 + Math.floor(dist / 8)} dias úteis` },
        );
      }
      if (connected.some(s => s.name === "Melhor Envio")) {
        results.push(
          { method: "Melhor Envio - Econômico", price: `R$${(basePac * 0.85).toFixed(2).replace(".", ",")}`, days: `${6 + Math.floor(dist / 10)}-${10 + Math.floor(dist / 10)} dias úteis` },
          { method: "Melhor Envio - Expresso", price: `R$${(baseSedex * 0.9).toFixed(2).replace(".", ",")}`, days: `${2 + Math.floor(dist / 20)}-${4 + Math.floor(dist / 20)} dias úteis` },
        );
      }
      if (connected.some(s => s.name === "Jadlog")) {
        results.push(
          { method: "Jadlog .Package", price: `R$${(basePac * 0.95).toFixed(2).replace(".", ",")}`, days: `${4 + Math.floor(dist / 10)}-${7 + Math.floor(dist / 10)} dias úteis` },
        );
      }
      if (results.length === 0) {
        toast.error("Nenhuma transportadora conectada. Conecte ao menos uma.");
        setCalculating(false);
        return;
      }
      results.sort((a, b) => parseFloat(a.price.replace("R$", "").replace(",", ".")) - parseFloat(b.price.replace("R$", "").replace(",", ".")));
      setCalcResult(results);
      toast.success("Frete calculado com base nos CEPs!");
      setCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="font-bold text-lg">Integrações de Envio</h2>
        <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Conecte transportadoras para calcular fretes automaticamente</p>
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
              {s.connected ? (
                <Button variant="outline" size="sm" onClick={() => handleDisconnect(s.name)}>Desconectar</Button>
              ) : (
                <Button variant="shop" size="sm" onClick={() => toggleExpand(s.name)}>
                  {expandedProvider === s.name ? <><ChevronUp className="w-3 h-3 mr-1" /> Fechar</> : "Conectar"}
                </Button>
              )}
            </div>
          </div>
          {expandedProvider === s.name && !s.connected && (
            <div className="border-t border-border p-6 bg-muted/30 space-y-4">
              <p className="text-sm text-muted-foreground">Insira suas credenciais do <strong>{s.name}</strong> para conectar:</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Token de Acesso</label>
                  <input
                    type="password"
                    value={tempCredentials[s.name]?.token || ""}
                    onChange={e => setTempCredentials(prev => ({ ...prev, [s.name]: { ...prev[s.name], token: e.target.value } }))}
                    className="w-full border border-border rounded-sm p-2 text-sm"
                    placeholder="Cole seu token aqui"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">API Key / Chave</label>
                  <input
                    type="password"
                    value={tempCredentials[s.name]?.apiKey || ""}
                    onChange={e => setTempCredentials(prev => ({ ...prev, [s.name]: { ...prev[s.name], apiKey: e.target.value } }))}
                    className="w-full border border-border rounded-sm p-2 text-sm"
                    placeholder="Cole sua API key aqui"
                  />
                </div>
              </div>
              <Button variant="shop" onClick={() => handleConnect(s.name)}>CONECTAR {s.name.toUpperCase()}</Button>
            </div>
          )}
        </div>
      ))}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold mb-3">Calcular Frete (teste)</h3>
        <p className="text-xs text-muted-foreground mb-3">Simula o cálculo de frete com base na distância entre os CEPs das transportadoras conectadas.</p>
        <div className="flex gap-3">
          <input placeholder="CEP origem (ex: 01001000)" value={cepOrigem} onChange={e => setCepOrigem(e.target.value.replace(/\D/g, "").slice(0, 8))} className="border border-border rounded-sm p-3 text-sm flex-1" maxLength={8} />
          <input placeholder="CEP destino (ex: 30130000)" value={cepDestino} onChange={e => setCepDestino(e.target.value.replace(/\D/g, "").slice(0, 8))} className="border border-border rounded-sm p-3 text-sm flex-1" maxLength={8} />
          <Button variant="shop" onClick={handleCalc} disabled={calculating}>{calculating ? "Calculando..." : "CALCULAR"}</Button>
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
