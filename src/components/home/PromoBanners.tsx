import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";
import promo3 from "@/assets/promo-3.jpg";

const PromoBanners = () => (
  <section className="py-12 bg-shop-gray">
    <div className="container">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Promoções</h2>
        <p className="text-muted-foreground text-sm mt-2">Confira nossos destaques</p>
        <div className="w-12 h-0.5 bg-border mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[promo1, promo2, promo3].map((img, i) => (
          <a key={i} href="#" className="block overflow-hidden rounded-sm group">
            <img src={img} alt={`Promoção ${i + 1}`} className="w-full aspect-[4/3] object-contain bg-white group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default PromoBanners;
