import { Truck, CreditCard, Shield, RefreshCw } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";

const BenefitsBar = () => {
  const { appearance } = useStore();

  const benefits = [
    { icon: Truck, title: "Enviamos para todo Brasil", desc: "Via transportadora ou Correios." },
    { icon: CreditCard, title: "Pague em até 10x", desc: "Todos os cartões de crédito" },
    { icon: Shield, title: "Segurança Garantida", desc: "Site 100% seguro" },
    { icon: RefreshCw, title: "Troque Grátis", desc: "7 dias de garantia" },
  ];

  return (
    <div className="border-b border-border py-6 bg-background">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `${appearance.primaryColor}15` }}>
              <b.icon className="w-5 h-5" style={{ color: appearance.primaryColor }} />
            </div>
            <div>
              <p className="font-semibold text-sm">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsBar;
