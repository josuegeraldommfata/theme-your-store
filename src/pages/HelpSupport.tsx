import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { HelpCircle, Package, RefreshCw, CreditCard, Truck, Shield, ChevronDown, ChevronUp, MessageCircle, Search } from "lucide-react";
import { toast } from "sonner";

const faqData = [
  {
    category: "Pedidos",
    icon: Package,
    items: [
      { q: "Como faço um pedido?", a: "Basta escolher o produto, selecionar tamanho e cor, adicionar ao carrinho e finalizar a compra com seu método de pagamento preferido." },
      { q: "Posso cancelar meu pedido?", a: "Sim, desde que o pedido ainda esteja com status 'Processando'. Acesse Meus Pedidos na sua conta ou entre em contato conosco." },
      { q: "Como acompanho meu pedido?", a: "Acesse 'Minha Conta' > 'Meus Pedidos' e clique em 'Rastrear'. Você também receberá atualizações por e-mail." },
      { q: "Posso alterar meu pedido após a compra?", a: "Alterações podem ser feitas enquanto o pedido estiver 'Processando'. Entre em contato pelo nosso chat ou e-mail." },
    ],
  },
  {
    category: "Pagamento",
    icon: CreditCard,
    items: [
      { q: "Quais formas de pagamento são aceitas?", a: "Aceitamos cartões Visa, Mastercard, Elo, Amex, Hipercard, boleto bancário e Pix. No Pix, você ganha 10% de desconto!" },
      { q: "O pagamento é seguro?", a: "Sim! Utilizamos criptografia SSL 256 bits e somos certificados pelo Google Safe Browsing. Seus dados estão 100% protegidos." },
      { q: "Posso parcelar minha compra?", a: "Sim, oferecemos parcelamento em até 6x sem juros no cartão de crédito." },
    ],
  },
  {
    category: "Entregas",
    icon: Truck,
    items: [
      { q: "Qual o prazo de entrega?", a: "O prazo varia de 3 a 12 dias úteis dependendo da região. Oferecemos frete grátis para todo o Brasil!" },
      { q: "Como calcular o frete?", a: "Na página do produto ou no carrinho, informe seu CEP para ver as opções e prazos de entrega disponíveis." },
      { q: "Entregam em todo o Brasil?", a: "Sim! Entregamos em todas as regiões do Brasil através dos Correios e transportadoras parceiras." },
    ],
  },
  {
    category: "Trocas e Devoluções",
    icon: RefreshCw,
    items: [
      { q: "Como faço uma troca?", a: "Você tem até 7 dias após o recebimento para solicitar a troca. Acesse 'Fale Conosco' ou envie um e-mail com o número do pedido." },
      { q: "A troca é gratuita?", a: "Sim! A primeira troca é totalmente gratuita. Enviamos uma etiqueta de postagem para sua comodidade." },
      { q: "Posso devolver e receber reembolso?", a: "Sim, respeitando o prazo de 7 dias. O reembolso é processado em até 10 dias úteis após o recebimento do produto." },
    ],
  },
  {
    category: "Conta e Segurança",
    icon: Shield,
    items: [
      { q: "Como crio uma conta?", a: "Clique em 'Minha Conta' no topo da página e selecione 'Cadastre-se'. Preencha seus dados e pronto!" },
      { q: "Esqueci minha senha, o que faço?", a: "Na página de login, clique em 'Esqueceu a senha?' e siga as instruções para redefinir." },
      { q: "Meus dados estão seguros?", a: "Sim, seguimos rigorosas políticas de privacidade e proteção de dados conforme a LGPD." },
    ],
  },
];

const HelpSupport = () => {
  const { settings } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (key: string) => {
    setOpenItems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const filteredFaq = searchTerm
    ? faqData.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter(cat => cat.items.length > 0)
    : faqData;

  return (
    <Layout>
      <div className="container py-12 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-3">Ajuda e Suporte</h1>
          <p className="text-muted-foreground">Encontre respostas para suas dúvidas ou entre em contato conosco</p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar nas perguntas frequentes..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border border-border rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFaq.map(cat => (
            <div key={cat.category} className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 p-4 flex items-center gap-3">
                <cat.icon className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">{cat.category}</h2>
              </div>
              <div className="divide-y divide-border">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const isOpen = openItems.includes(key);
                  return (
                    <div key={key}>
                      <button onClick={() => toggleItem(key)} className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors">
                        <span className="text-sm font-medium pr-4">{item.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-muted rounded-lg p-8 text-center">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h3 className="text-xl font-bold mb-2">Não encontrou o que procurava?</h3>
          <p className="text-muted-foreground text-sm mb-4">Nossa equipe está pronta para ajudar!</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={`mailto:${settings.email}`}>
              <Button variant="shop">ENVIAR E-MAIL</Button>
            </a>
            <a href={`https://wa.me/55${settings.phone.replace(/\D/g, "")}`} target="_blank">
              <Button variant="shop-outline">WHATSAPP</Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Atendimento: {settings.hours}</p>
        </div>
      </div>
    </Layout>
  );
};

export default HelpSupport;
