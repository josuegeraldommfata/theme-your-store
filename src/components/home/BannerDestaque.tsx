import { useStore } from "@/contexts/StoreContext";
import bannerDestaqueImg from "@/assets/banner-destaque.jpg";

const BannerDestaque = () => {
  const { banners } = useStore();
  const destaque = banners.find(b => b.type === "destaque" && b.active);

  if (!destaque) return null;

  return (
    <section className="py-8">
      <div className="container">
        <a href={destaque.link || "#"} className="block overflow-hidden rounded-sm">
          <img src={destaque.image || bannerDestaqueImg} alt={destaque.name} className="w-full h-auto object-cover hover:opacity-90 transition-opacity" loading="lazy" />
        </a>
      </div>
    </section>
  );
};

export default BannerDestaque;
