import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";
import promo3 from "@/assets/promo-3.jpg";

const defaultPromoImages = [promo1, promo2, promo3];

const PromoBanners = () => {
  const { banners } = useStore();
  const promoBanners = banners.filter(b => b.type === "promo" && b.active);

  return (
    <section className="py-12 bg-muted">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Promoções</h2>
          <p className="text-muted-foreground text-sm mt-2">Confira nossos destaques</p>
          <div className="w-12 h-0.5 bg-border mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promoBanners.map((banner, i) => (
            <Link key={banner.id} to={banner.link || "/"} className="block overflow-hidden rounded-lg group relative shadow-md hover:shadow-xl transition-shadow">
              <img
                src={banner.image || defaultPromoImages[i % defaultPromoImages.length]}
                alt={banner.name}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {banner.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-lg drop-shadow-md">{banner.title}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
