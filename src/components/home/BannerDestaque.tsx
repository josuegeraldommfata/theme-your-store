import bannerDestaque from "@/assets/banner-destaque.jpg";

const BannerDestaque = () => (
  <section className="py-8">
    <div className="container">
      <a href="#" className="block overflow-hidden rounded-sm">
        <img src={bannerDestaque} alt="Banner destaque" className="w-full h-auto object-cover hover:opacity-90 transition-opacity" loading="lazy" width={1280} height={512} />
      </a>
    </div>
  </section>
);

export default BannerDestaque;
