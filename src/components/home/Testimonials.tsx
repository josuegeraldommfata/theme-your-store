import { Star, Quote } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import personMaria from "@/assets/person-maria.jpg";
import personJoao from "@/assets/person-joao.jpg";
import personAna from "@/assets/person-ana.jpg";
import personPedro from "@/assets/person-pedro.jpg";

const defaultImages = [personMaria, personJoao, personAna, personPedro];

const Testimonials = () => {
  const { testimonials, appearance } = useStore();

  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase">O que dizem nossos clientes</h2>
          <p className="text-muted-foreground text-sm mt-2">Avaliações reais de quem já comprou</p>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.id} className="bg-background border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow relative">
              <Quote className="w-6 h-6 absolute top-4 right-4 opacity-10" />
              <img
                src={t.image || defaultImages[i % defaultImages.length]}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                loading="lazy"
              />
              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < t.rating ? "fill-shop-star text-shop-star" : "text-border"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.text}"</p>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">Cliente verificado ✓</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
