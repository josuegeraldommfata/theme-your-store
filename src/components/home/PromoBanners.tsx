import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";
import promo3 from "@/assets/promo-3.jpg";

const defaultPromoImages = [promo1, promo2, promo3];

const PromoBanners = () => {
  const { banners } = useStore();
  const promoBanners = banners.filter(b => b.type === "promo" && b.active);

  if (promoBanners.length === 0) return null;

  return (
    <section className="py-12 bg-muted">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Promoções</h2>
          <p className="text-muted-foreground text-sm mt-2">Confira nossos destaques</p>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promoBanners.map((banner, i) => (
            <Link key={banner.id} to={banner.link || "/"} className="block overflow-hidden rounded-xl group relative shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-[4/5] relative">
                <img
                  src={banner.image || defaultPromoImages[i % defaultPromoImages.length]}
                  alt={banner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {banner.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <span className="text-white font-bold text-xl drop-shadow-md block">{banner.title}</span>
                      {banner.subtitle && <span className="text-white/80 text-sm">{banner.subtitle}</span>}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
