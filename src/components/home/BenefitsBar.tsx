import { Truck, CreditCard, Shield, RefreshCw } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Enviamos para todo Brasil", desc: "Via transportadora ou Correios.", color: "text-primary" },
  { icon: CreditCard, title: "Pague em até 10x", desc: "Todos os cartões de crédito", color: "text-primary" },
  { icon: Shield, title: "Segurança Garantida", desc: "Site 100% seguro", color: "text-primary" },
  { icon: RefreshCw, title: "Troque Grátis", desc: "7 dias de garantia", color: "text-primary" },
];

const BenefitsBar = () => (
  <div className="border-b border-border py-6">
    <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
      {benefits.map((b) => (
        <div key={b.title} className="flex items-center gap-3">
          <b.icon className="w-8 h-8 shrink-0" />
          <div>
            <p className="font-semibold text-sm">{b.title}</p>
            <p className={`text-xs ${b.color}`}>{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BenefitsBar;
