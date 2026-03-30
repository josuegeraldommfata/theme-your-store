import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";

const slides = [
  { image: heroBanner1, title: "Nova Coleção Feminina", subtitle: "Até 30% OFF em peças selecionadas", cta: "COMPRAR AGORA" },
  { image: heroBanner2, title: "Streetwear Masculino", subtitle: "Novidades toda semana", cta: "VER COLEÇÃO" },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "560px" }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" width={1680} height={560} />
          <div className="absolute inset-0 bg-foreground/20 flex flex-col items-center justify-center text-background">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">{slide.title}</h2>
            <p className="text-lg mb-6">{slide.subtitle}</p>
            <Button variant="shop" size="lg" className="px-10 py-6 text-base">{slide.cta}</Button>
          </div>
        </div>
      ))}
      <button onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => setCurrent((p) => (p + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-colors ${i === current ? "bg-background" : "bg-background/50"}`} />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
