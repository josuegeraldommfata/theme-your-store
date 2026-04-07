import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/home/HeroBanner";
import BenefitsBar from "@/components/home/BenefitsBar";
import CategoryCircles from "@/components/home/CategoryCircles";
import ProductShowcase from "@/components/home/ProductShowcase";
import PromoBanners from "@/components/home/PromoBanners";
import BannerDestaque from "@/components/home/BannerDestaque";
import Testimonials from "@/components/home/Testimonials";
import CountdownBanner from "@/components/home/CountdownBanner";

const Index = () => (
  <Layout>
    <HeroBanner />
    <BenefitsBar />
    <CategoryCircles />
    <ProductShowcase title="Produtos em Destaque" subtitle="Confira nossas novidades" sort="featured" />
    <PromoBanners />
    <CountdownBanner />
    <ProductShowcase title="Lançamentos" subtitle="As peças mais desejadas da temporada" sort="newest" />
    <BannerDestaque />
    <ProductShowcase title="Mais Vendidos" subtitle="Os favoritos dos nossos clientes" sort="bestseller" />
    <Testimonials />
  </Layout>
);

export default Index;
