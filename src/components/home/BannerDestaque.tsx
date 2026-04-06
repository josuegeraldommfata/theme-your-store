import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import bannerDestaqueImg from "@/assets/banner-destaque.jpg";

const BannerDestaque = () => {
  const { banners, appearance } = useStore();
  const destaque = banners.find(b => b.type === "destaque" && b.active);

  if (!destaque) return null;

  return (
    <section className="py-8">
      <div className="container">
        <Link to={destaque.link || "/"} className="block overflow-hidden rounded-lg relative group shadow-md hover:shadow-xl transition-shadow">
          <img src={destaque.image || bannerDestaqueImg} alt={destaque.name} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col justify-center pl-12">
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{destaque.title}</h3>
            {destaque.subtitle && <p className="text-white/80 text-lg mb-4 drop-shadow-md">{destaque.subtitle}</p>}
            {destaque.cta && (
              <Button className="w-fit" style={{ backgroundColor: appearance.buttonColor, color: appearance.buttonTextColor }}>
                {destaque.cta}
              </Button>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BannerDestaque;
