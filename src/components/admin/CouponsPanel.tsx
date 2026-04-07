import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Info, Tag, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const CouponsPanel = () => {
  const { coupons, setCoupons } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [minValue, setMinValue] = useState("");

  const openForm = (idx?: number) => {
    if (idx !== undefined) {
      const c = coupons[idx];
      setEditIdx(idx); setCode(c.code); setDiscount(String(c.discount));
      setType(c.type); setMinValue(String(c.minValue));
    } else {
      setEditIdx(null); setCode(""); setDiscount(""); setType("percent"); setMinValue("0");
    }
    setShowForm(true);
  };

  const save = () => {
    if (!code || !discount) { toast.error("Preencha código e desconto"); return; }
    const coupon = { code: code.toUpperCase(), discount: Number(discount), type, active: true, minValue: Number(minValue) || 0 };
    if (editIdx !== null) {
      setCoupons(coupons.map((c, i) => i === editIdx ? coupon : c));
      toast.success("Cupom atualizado!");
    } else {
      if (coupons.some(c => c.code.toLowerCase() === code.toLowerCase())) { toast.error("Código já existe!"); return; }
      setCoupons([...coupons, coupon]);
      toast.success("Cupom criado!");
    }
    setShowForm(false);
  };

  const remove = (idx: number) => {
    setCoupons(coupons.filter((_, i) => i !== idx));
    toast.success("Cupom removido!");
  };

  const toggle = (idx: number) => {
    setCoupons(coupons.map((c, i) => i === idx ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2"><Tag className="w-5 h-5" /> Cupons de Desconto</h2>
          <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Cupons são aplicados pelo cliente na página de checkout</p>
        </div>
        <Button variant="shop" size="sm" className="gap-1" onClick={() => openForm()}><Plus className="w-4 h-4" /> NOVO CUPOM</Button>
      </div>

      {showForm && (
        <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{editIdx !== null ? "Editar" : "Novo"} Cupom</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Código</label>
              <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} className="w-full border border-border rounded-sm p-2 text-sm uppercase" placeholder="EX: FLEX10" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Desconto</label>
              <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" placeholder="10" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Tipo</label>
              <select value={type} onChange={e => setType(e.target.value as any)} className="w-full border border-border rounded-sm p-2 text-sm">
                <option value="percent">Percentual (%)</option>
                <option value="fixed">Valor Fixo (R$)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Valor Mínimo (R$)</label>
              <input type="number" value={minValue} onChange={e => setMinValue(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" placeholder="0" />
            </div>
          </div>
          <Button variant="shop" size="sm" onClick={save}>SALVAR CUPOM</Button>
        </div>
      )}

      <div className="space-y-3">
        {coupons.map((coupon, i) => (
          <div key={coupon.code} className={`flex items-center justify-between p-4 border rounded-lg transition-all ${coupon.active ? "border-border" : "border-border opacity-50"}`}>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-lg px-4 py-2">
                <span className="font-bold text-primary text-lg">{coupon.code}</span>
              </div>
              <div>
                <p className="font-medium text-sm">{coupon.type === "percent" ? `${coupon.discount}% OFF` : `R$${coupon.discount} OFF`}</p>
                <p className="text-xs text-muted-foreground">{coupon.minValue > 0 ? `Pedido mínimo: R$${coupon.minValue}` : "Sem valor mínimo"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={coupon.active ? "shop" : "outline"} size="sm" className="text-xs h-8" onClick={() => toggle(i)}>
                {coupon.active ? "Ativo" : "Inativo"}
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => openForm(i)}>Editar</Button>
              <Button variant="outline" size="sm" className="text-xs h-8 text-destructive" onClick={() => remove(i)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponsPanel;
