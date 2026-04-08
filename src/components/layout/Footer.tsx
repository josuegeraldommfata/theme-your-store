import { useState } from "react";
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Youtube, Twitter, CreditCard, Shield, Lock, Send } from "lucide-react";
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

const securityLogos: Record<string, { icon: typeof Shield; color: string }> = {
  "SSL 256 Bits": { icon: Lock, color: "#22C55E" },
  "Google Safe Browsing": { icon: Shield, color: "#4285F4" },
  "Norton Secured": { icon: Shield, color: "#FFCB05" },
};

const Footer = () => {
  const { appearance, settings, paymentBadges, securityBadges, menus } = useStore();
  const [nlEmail, setNlEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) { toast.error("Informe seu e-mail"); return; }
    toast.success("Cadastrado com sucesso! Você receberá nossas novidades.");
    setNlEmail("");
  };

  return (
    <footer>
      {/* Newsletter */}
      <div className="py-12 text-center" style={{ backgroundColor: appearance.primaryColor }}>
        <div className="container">
          <h3 className="text-white text-2xl font-bold mb-2">Receba nossas novidades</h3>
          <p className="text-white/80 text-sm mb-6">Cadastre-se e ganhe 10% OFF na primeira compra</p>
          <form onSubmit={handleNewsletter} className="flex max-w-md mx-auto gap-2">
            <input
              placeholder="Seu melhor e-mail"
              value={nlEmail}
              onChange={e => setNlEmail(e.target.value)}
              className="flex-1 rounded-full px-5 py-3 text-sm focus:outline-none"
              type="email"
            />
            <button type="submit" className="bg-foreground text-background font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" /> CADASTRAR
            </button>
          </form>
        </div>
      </div>

      {/* Instagram */}
      <div className="bg-muted py-8 text-center">
        <Instagram className="w-8 h-8 mx-auto mb-2" />
        <p className="text-muted-foreground text-sm">Siga-nos no Instagram</p>
        <p className="text-lg font-bold">{settings.instagram}</p>
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
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Categorias</h4>
              <ul className="space-y-2 text-sm opacity-70">
                {menus.slice(0, 5).map(m => (
                  <li key={m.id}><Link to={m.link} className="hover:opacity-100 transition-opacity">{m.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Institucional</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><Link to="/quem-somos" className="hover:opacity-100 transition-opacity">Quem Somos</Link></li>
                <li><Link to="/trocas-devolucoes" className="hover:opacity-100 transition-opacity">Trocas e Devoluções</Link></li>
                <li><Link to="/politica-privacidade" className="hover:opacity-100 transition-opacity">Política de Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Ajuda</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><Link to="/ajuda" className="hover:opacity-100 transition-opacity">Central de Ajuda</Link></li>
                <li><Link to="/fale-conosco" className="hover:opacity-100 transition-opacity">Fale Conosco</Link></li>
                <li><Link to="/login" className="hover:opacity-100 transition-opacity">Minha Conta</Link></li>
                <li><Link to="/carrinho" className="hover:opacity-100 transition-opacity">Meu Carrinho</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Atendimento</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.whatsapp || settings.phone}</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.email}</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.hours}</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: appearance.primaryColor }} /> {settings.address}</li>
              </ul>
            </div>
          </div>

          {/* Payment & Security Badges with images */}
          <div className="flex flex-wrap items-start justify-between gap-8 border-t border-current/20 pt-8">
            <div>
              <h4 className="font-bold mb-3 text-xs uppercase tracking-wider">Formas de Pagamento</h4>
              <div className="flex items-center gap-2 flex-wrap">
                {paymentBadges.filter(b => b.active).map((badge) => {
                  const style = paymentLogos[badge.name] || { bg: "#666", text: "#fff" };
                  return (
                    <span key={badge.id} className="text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 h-9" style={{ backgroundColor: style.bg, color: style.text }}>
                      {badge.image ? (
                        <img src={badge.image} alt={badge.name} className="h-5 w-auto object-contain" />
                      ) : (
                        <CreditCard className="w-3.5 h-3.5" />
                      )}
                      {!badge.image && badge.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-xs uppercase tracking-wider">Segurança</h4>
              <div className="flex items-center gap-3">
                {securityBadges.filter(b => b.active).map((badge) => {
                  const info = securityLogos[badge.name] || { icon: Shield, color: "#22C55E" };
                  const Icon = info.icon;
                  return (
                    <span key={badge.id} className="text-[10px] font-bold px-3 py-2 rounded flex items-center gap-1.5 bg-background text-foreground h-10">
                      {badge.image ? (
                        <img src={badge.image} alt={badge.name} className="h-6 w-auto object-contain" />
                      ) : (
                        <Icon className="w-4 h-4" style={{ color: info.color }} />
                      )}
                      {!badge.image && badge.name}
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
