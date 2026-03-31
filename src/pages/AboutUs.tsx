import Layout from "@/components/layout/Layout";
import { useStore } from "@/contexts/StoreContext";
import { Users, Award, Heart, Target } from "lucide-react";

const AboutUs = () => {
  const { appearance } = useStore();

  return (
    <Layout>
      <div className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Quem Somos</h1>

        <div className="prose max-w-none space-y-8">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A <strong>{appearance.storeName}</strong> nasceu da paixão por moda e do desejo de oferecer peças de qualidade com preços acessíveis. Desde 2020, trabalhamos para levar estilo e conforto a milhares de clientes em todo o Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-border rounded-lg p-6 text-center">
              <Target className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Nossa Missão</h3>
              <p className="text-sm text-muted-foreground">Democratizar a moda de qualidade, tornando acessíveis as últimas tendências para todos os estilos e bolsos.</p>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <Heart className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Nossos Valores</h3>
              <p className="text-sm text-muted-foreground">Qualidade, transparência, sustentabilidade e respeito ao cliente guiam todas as nossas decisões.</p>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <Users className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Nossa Equipe</h3>
              <p className="text-sm text-muted-foreground">Uma equipe apaixonada por moda, composta por profissionais dedicados a oferecer a melhor experiência de compra.</p>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <Award className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Nosso Compromisso</h3>
              <p className="text-sm text-muted-foreground">Garantimos qualidade em cada produto, com curadoria cuidadosa e parceiros de confiança.</p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8 text-center mt-8">
            <h3 className="text-2xl font-bold mb-4">Números que nos orgulham</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div><p className="text-3xl font-bold text-primary">50K+</p><p className="text-sm text-muted-foreground">Clientes satisfeitos</p></div>
              <div><p className="text-3xl font-bold text-primary">150+</p><p className="text-sm text-muted-foreground">Marcas parceiras</p></div>
              <div><p className="text-3xl font-bold text-primary">5.000+</p><p className="text-sm text-muted-foreground">Produtos</p></div>
              <div><p className="text-3xl font-bold text-primary">4.8★</p><p className="text-sm text-muted-foreground">Avaliação média</p></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
