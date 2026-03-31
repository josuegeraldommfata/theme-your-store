import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { Phone, Mail, Clock, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const ContactUs = () => {
  const { settings } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Responderemos em até 24h.");
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  return (
    <Layout>
      <div className="container py-12 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Fale Conosco</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Informações de Contato</h2>
            {[
              { icon: Phone, label: "Telefone", value: settings.phone },
              { icon: Mail, label: "E-mail", value: settings.email },
              { icon: Clock, label: "Horário", value: settings.hours },
              { icon: MapPin, label: "Endereço", value: settings.address },
            ].map(info => (
              <div key={info.label} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                <info.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">{info.label}</p>
                  <p className="text-sm text-muted-foreground">{info.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-semibold">WhatsApp</p>
              <p className="text-xs text-muted-foreground">{settings.phone}</p>
              <Button variant="shop" size="sm" className="mt-2 w-full">ABRIR CHAT</Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="border border-border rounded-lg p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Send className="w-5 h-5 text-primary" /> Envie sua mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Nome</label>
                    <input value={name} onChange={e => setName(e.target.value)} required className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">E-mail</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="seu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Assunto</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)} required className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Selecione</option>
                    <option value="duvida">Dúvida sobre produto</option>
                    <option value="pedido">Meu pedido</option>
                    <option value="troca">Troca ou devolução</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="elogio">Elogio</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Mensagem</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Descreva sua mensagem..." />
                </div>
                <Button variant="shop" size="lg" className="w-full py-6">ENVIAR MENSAGEM</Button>
              </form>
            </div>

            <div className="mt-6 bg-muted rounded-lg p-6">
              <h3 className="font-bold mb-3">Perguntas Frequentes</h3>
              <div className="space-y-3">
                {[
                  { q: "Qual o prazo de entrega?", a: "De 3 a 12 dias úteis, dependendo da região." },
                  { q: "Como rastrear meu pedido?", a: "Acesse 'Meus Pedidos' na sua conta ou use o código de rastreio enviado por e-mail." },
                  { q: "Posso trocar por outro tamanho?", a: "Sim! Troca grátis em até 7 dias após o recebimento." },
                ].map(faq => (
                  <details key={faq.q} className="border border-border rounded-sm">
                    <summary className="p-3 text-sm font-medium cursor-pointer hover:bg-muted/50">{faq.q}</summary>
                    <p className="px-3 pb-3 text-sm text-muted-foreground">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
