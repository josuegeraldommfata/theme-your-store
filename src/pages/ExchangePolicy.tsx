import Layout from "@/components/layout/Layout";
import { RefreshCw, Clock, CheckCircle, XCircle, Package, Mail } from "lucide-react";

const ExchangePolicy = () => (
  <Layout>
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Trocas e Devoluções</h1>

      <div className="space-y-8">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <RefreshCw className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h2 className="text-xl font-bold mb-2">Troca Grátis em até 7 dias</h2>
          <p className="text-sm text-muted-foreground">Sua satisfação é nossa prioridade. Se não ficou satisfeito, trocamos sem custo!</p>
        </div>

        <div className="border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Prazos</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> <span><strong>7 dias corridos</strong> após o recebimento para troca ou devolução por arrependimento (conforme CDC).</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> <span><strong>30 dias corridos</strong> para produtos com defeito de fabricação.</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> <span><strong>90 dias</strong> para vícios ocultos (defeitos não aparentes no momento da compra).</span></li>
          </ul>
        </div>

        <div className="border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Condições para Troca</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Produto em sua embalagem original</li>
            <li>• Sem sinais de uso, lavagem ou alteração</li>
            <li>• Com todas as etiquetas originais</li>
            <li>• Acompanhado da nota fiscal</li>
          </ul>
        </div>

        <div className="border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><XCircle className="w-5 h-5 text-destructive" /> Não Aceitamos Troca</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Produtos com sinais de uso ou lavagem</li>
            <li>• Peças íntimas e meias (por questões de higiene)</li>
            <li>• Produtos personalizados ou sob encomenda</li>
            <li>• Itens fora do prazo de troca</li>
          </ul>
        </div>

        <div className="border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Como Solicitar</h3>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <span>Entre em contato pelo e-mail ou telefone informando o número do pedido.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <span>Nossa equipe enviará as instruções e o código de postagem (frete grátis).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <span>Embale o produto e leve ao ponto de postagem mais próximo.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <span>Após recebimento e análise, realizamos a troca ou reembolso em até 5 dias úteis.</span>
            </li>
          </ol>
        </div>

        <div className="bg-muted rounded-lg p-6 text-center">
          <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="font-semibold">Dúvidas? Fale conosco!</p>
          <p className="text-sm text-muted-foreground">trocas@flexmoda.com.br | (11) 99999-0000</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default ExchangePolicy;
