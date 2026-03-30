import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/home/HeroBanner";
import BenefitsBar from "@/components/home/BenefitsBar";
import CategoryCircles from "@/components/home/CategoryCircles";
import ProductShowcase from "@/components/home/ProductShowcase";
import PromoBanners from "@/components/home/PromoBanners";
import BannerDestaque from "@/components/home/BannerDestaque";
import Testimonials from "@/components/home/Testimonials";

const Index = () => (
  <Layout>
    <HeroBanner />
    <BenefitsBar />
    <CategoryCircles />
    <ProductShowcase title="Produtos em destaque" subtitle="Confira nossas novidades" />
    <PromoBanners />
    <ProductShowcase title="Lançamentos" subtitle="As peças mais desejadas da temporada" />
    <BannerDestaque />
    <ProductShowcase title="Mais Vendidos" subtitle="Os favoritos dos nossos clientes" />
    <Testimonials />
  </Layout>
);

export default Index;
