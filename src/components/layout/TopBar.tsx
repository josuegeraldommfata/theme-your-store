import { Phone, Mail, Clock } from "lucide-react";

const TopBar = () => (
  <div className="bg-primary text-primary-foreground text-xs py-2">
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> (00) 00000.0000</span>
        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> contato@dominio.com.br</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Seg a sex das 9 às 12h | 14-18h</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:underline">Sobre Nós</a>
        <a href="#" className="hover:underline">Fale Conosco</a>
      </div>
    </div>
  </div>
);

export default TopBar;
