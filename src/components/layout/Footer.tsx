import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    {/* Instagram Section */}
    <div className="bg-shop-gray py-10 text-center">
      <Instagram className="w-10 h-10 mx-auto mb-3" />
      <p className="text-muted-foreground text-sm">Siga-nos no Instagram</p>
      <p className="text-xl font-bold">@flexmoda</p>
    </div>

    {/* Main Footer */}
    <div className="bg-foreground text-background">
      <div className="container py-10">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
          <div className="text-2xl font-extrabold tracking-wider">
            FLEX<span className="text-primary text-base font-medium tracking-[0.3em] ml-1">MODA</span>
          </div>
          <div className="flex items-center gap-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Seu nome" className="bg-transparent border border-background/30 px-4 py-2 text-sm rounded-sm" />
            <input placeholder="Seu e-mail" className="bg-transparent border border-background/30 px-4 py-2 text-sm rounded-sm" />
            <button className="bg-background text-foreground font-semibold px-6 py-2 text-sm hover:bg-background/90 transition-colors">CADASTRAR</button>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h4 className="font-bold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-background">Masculino</Link></li>
              <li><Link to="/" className="hover:text-background">Feminino</Link></li>
              <li><Link to="/" className="hover:text-background">Calçados</Link></li>
              <li><Link to="/" className="hover:text-background">Acessórios</Link></li>
              <li><Link to="/" className="hover:text-background">Marcas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Ajuda e Suporte</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background">Quem Somos</a></li>
              <li><a href="#" className="hover:text-background">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-background">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-background">Fale Conosco</a></li>
              <li><Link to="/login" className="hover:text-background">Minha Conta</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Central de Atendimento</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> (00) 00000.0000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> contato@dominio.com.br</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Seg a sex das 9 às 12h | 14-18h</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Cidade/Estado</li>
            </ul>
          </div>
        </div>

        {/* Payment & Security */}
        <div className="flex flex-wrap items-start justify-between gap-8 border-t border-background/20 pt-8">
          <div>
            <h4 className="font-bold mb-3 text-sm">Pagamento</h4>
            <div className="flex items-center gap-2 flex-wrap">
              {["VISA", "MC", "AMEX", "ELO", "HIPER", "DISC", "BOLETO", "PIX"].map((m) => (
                <span key={m} className="bg-background text-foreground text-[10px] font-bold px-2 py-1 rounded-sm">{m}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">Segurança</h4>
            <div className="flex items-center gap-3">
              <span className="bg-background text-foreground text-[10px] font-bold px-3 py-2 rounded-sm">SSL 256 BITS</span>
              <span className="bg-background text-foreground text-[10px] font-bold px-3 py-2 rounded-sm">GOOGLE SAFE</span>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-xs text-background/50 text-center">
          © 2025 Flex Moda - Todos os direitos reservados. CNPJ 00.000.000/0001-00
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
