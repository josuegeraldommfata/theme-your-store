import Layout from "@/components/layout/Layout";
import { Shield, Eye, Lock, Database, UserCheck, Trash2 } from "lucide-react";

const PrivacyPolicy = () => (
  <Layout>
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Política de Privacidade</h1>
      <p className="text-center text-muted-foreground mb-10">Última atualização: 31 de março de 2026</p>

      <div className="space-y-8">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <Shield className="w-10 h-10 mx-auto mb-3 text-primary" />
          <p className="text-sm">Seus dados são protegidos com criptografia SSL 256 bits e seguimos todas as diretrizes da LGPD (Lei Geral de Proteção de Dados).</p>
        </div>

        {[
          { icon: Database, title: "1. Dados que Coletamos", content: "Coletamos apenas os dados necessários para processar suas compras e melhorar sua experiência: nome, e-mail, CPF, endereço de entrega, telefone e dados de pagamento (processados de forma segura por nossos gateways)." },
          { icon: Eye, title: "2. Como Utilizamos seus Dados", content: "Seus dados são utilizados para: processar pedidos e entregas, enviar atualizações sobre seus pedidos, comunicações de marketing (com seu consentimento), melhorar nossos produtos e serviços, e cumprir obrigações legais." },
          { icon: Lock, title: "3. Proteção dos Dados", content: "Utilizamos criptografia SSL 256 bits, servidores seguros, e acesso restrito aos dados. Nossos parceiros de pagamento (Mercado Pago, PagSeguro, Pagar.me) seguem os padrões PCI-DSS de segurança." },
          { icon: UserCheck, title: "4. Seus Direitos (LGPD)", content: "Você tem direito a: acessar seus dados pessoais, solicitar correção de dados incompletos, solicitar a exclusão de seus dados, revogar consentimento para comunicações, e solicitar portabilidade dos dados." },
          { icon: Trash2, title: "5. Exclusão de Dados", content: "Você pode solicitar a exclusão de seus dados a qualquer momento através do e-mail privacidade@flexmoda.com.br. Responderemos em até 15 dias úteis, conforme a LGPD." },
        ].map((section) => (
          <div key={section.title} className="border border-border rounded-lg p-6">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-3"><section.icon className="w-5 h-5 text-primary" /> {section.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}

        <div className="border border-border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">6. Cookies</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Utilizamos cookies para melhorar sua experiência de navegação. Os tipos de cookies utilizados são:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Essenciais:</strong> necessários para o funcionamento do site (carrinho, login)</li>
            <li>• <strong>Analíticos:</strong> nos ajudam a entender como você usa o site</li>
            <li>• <strong>Marketing:</strong> personalizam anúncios (apenas com seu consentimento)</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-6 text-center">
          <p className="font-semibold">Dúvidas sobre privacidade?</p>
          <p className="text-sm text-muted-foreground">privacidade@flexmoda.com.br</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default PrivacyPolicy;
