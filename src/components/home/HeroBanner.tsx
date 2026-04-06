import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";

const defaultImages = [heroBanner1, heroBanner2];

const HeroBanner = () => {
  const { banners, appearance } = useStore();
  const heroBanners = banners.filter(b => b.type === "hero" && b.active);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (heroBanners.length <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroBanners.length), 5000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  if (heroBanners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "560px" }}>
      {heroBanners.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        >
          <img src={slide.image || defaultImages[i % defaultImages.length]} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-end pb-24 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg text-center">{slide.title}</h2>
            <p className="text-lg mb-6 drop-shadow-md text-center">{slide.subtitle}</p>
            {slide.cta && (
              <Link to={slide.link || "/"}>
                <Button size="lg" className="px-10 py-6 text-base shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: appearance.buttonColor, color: appearance.buttonTextColor }}>
                  {slide.cta}
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
      {heroBanners.length > 1 && (
        <>
          <button onClick={() => setCurrent((p) => (p - 1 + heroBanners.length) % heroBanners.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-colors shadow-md">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={() => setCurrent((p) => (p + 1) % heroBanners.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-colors shadow-md">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroBanners.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-1 rounded-full transition-all ${i === current ? "bg-white w-8" : "bg-white/50 w-3"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroBanner;
