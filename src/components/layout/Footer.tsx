import { useState } from "react";
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Youtube, Twitter, CreditCard, Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { toast } from "sonner";

const paymentLogos: Record<string, { bg: string; text: string }> = {
  "Visa": { bg: "#1A1F71", text: "#FFFFFF" },
  "Mastercard": { bg: "#EB001B", text: "#FFFFFF" },
  "Amex": { bg: "#006FCF", text: "#FFFFFF" },
  "Elo": { bg: "#FFCB05", text: "#000000" },
  "Hipercard": { bg: "#822124", text: "#FFFFFF" },
  "Discover": { bg: "#FF6600", text: "#FFFFFF" },
  "Boleto": { bg: "#333333", text: "#FFFFFF" },
  "Pix": { bg: "#32BCAD", text: "#FFFFFF" },
};

const securityLogos: Record<string, { icon: any; color: string }> = {
  "SSL 256 Bits": { icon: Lock, color: "#22C55E" },
  "Google Safe Browsing": { icon: Shield, color: "#4285F4" },
  "Norton Secured": { icon: Shield, color: "#FFCB05" },
};

const Footer = () => {
  const { appearance, settings, paymentBadges, securityBadges, menus } = useStore();
  const [nlName, setNlName] = useState("");
  const [nlEmail, setNlEmail] = useState("");

  const handleNewsletter = () => {
    if (!nlEmail) { toast.error("Informe seu e-mail"); return; }
    toast.success("Cadastrado com sucesso! Você receberá nossas novidades.");
    setNlName(""); setNlEmail("");
  };

  return (
    <footer>
      <div className="bg-muted py-10 text-center">
        <Instagram className="w-10 h-10 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">Siga-nos no Instagram</p>
        <p className="text-xl font-bold">{settings.instagram}</p>
      </div>

      <div style={{ backgroundColor: appearance.footerBgColor, color: appearance.footerTextColor }}>
        <div className="container py-10">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
            {appearance.logo ? (
              <img src={appearance.logo} alt={appearance.storeName} className="h-10 object-contain" />
            ) : (
              <div className="text-2xl font-extrabold tracking-wider">
                {appearance.storeName.split(" ")[0] || "FLEX"}
                <span className="text-base font-medium tracking-[0.3em] ml-1" style={{ color: appearance.primaryColor }}>
                  {appearance.storeName.split(" ").slice(1).join(" ") || "MODA"}
                </span>
              </div>
            )}
            <div className="flex items-center gap-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
              <Instagram className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
              <Youtube className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
              <Twitter className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
            </div>
            <div className="flex items-center gap-3">
              <input placeholder="Seu nome" value={nlName} onChange={e => setNlName(e.target.value)} className="bg-transparent border border-current/30 px-4 py-2 text-sm rounded-sm" />
              <input placeholder="Seu e-mail" value={nlEmail} onChange={e => setNlEmail(e.target.value)} className="bg-transparent border border-current/30 px-4 py-2 text-sm rounded-sm" />
              <button onClick={handleNewsletter} className="font-semibold px-6 py-2 text-sm transition-colors" style={{ backgroundColor: appearance.footerTextColor, color: appearance.footerBgColor }}>CADASTRAR</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <h4 className="font-bold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm opacity-70">
                {menus.slice(0, 5).map(m => (
                  <li key={m.id}><Link to={m.link} className="hover:opacity-100">{m.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ajuda e Suporte</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><Link to="/quem-somos" className="hover:opacity-100">Quem Somos</Link></li>
                <li><Link to="/ajuda" className="hover:opacity-100">Ajuda e Suporte</Link></li>
                <li><Link to="/trocas-devolucoes" className="hover:opacity-100">Trocas e Devoluções</Link></li>
                <li><Link to="/politica-privacidade" className="hover:opacity-100">Política de Privacidade</Link></li>
                <li><Link to="/fale-conosco" className="hover:opacity-100">Fale Conosco</Link></li>
                <li><Link to="/login" className="hover:opacity-100">Minha Conta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Central de Atendimento</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.phone}</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.email}</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.hours}</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.address}</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-8 border-t border-current/20 pt-8">
            <div>
              <h4 className="font-bold mb-3 text-sm">Pagamento</h4>
              <div className="flex items-center gap-2 flex-wrap">
                {paymentBadges.filter(b => b.active).map((badge) => {
                  const style = paymentLogos[badge.name] || { bg: "#666", text: "#fff" };
                  return (
                    <span key={badge.id} className="text-[10px] font-bold px-3 py-1.5 rounded-sm flex items-center gap-1" style={{ backgroundColor: style.bg, color: style.text }}>
                      <CreditCard className="w-3 h-3" />
                      {badge.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm">Segurança</h4>
              <div className="flex items-center gap-3">
                {securityBadges.filter(b => b.active).map((badge) => {
                  const style = securityLogos[badge.name] || { icon: Shield, color: "#22C55E" };
                  const Icon = style.icon;
                  return (
                    <span key={badge.id} className="text-[10px] font-bold px-3 py-2 rounded-sm flex items-center gap-1.5 bg-background text-foreground">
                      <Icon className="w-4 h-4" style={{ color: style.color }} />
                      {badge.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-current/20 mt-8 pt-6 text-xs opacity-50 text-center">
            © 2026 {appearance.storeName} - Todos os direitos reservados. CNPJ {settings.cnpj}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
