import { Star } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import personMaria from "@/assets/person-maria.jpg";
import personJoao from "@/assets/person-joao.jpg";
import personAna from "@/assets/person-ana.jpg";
import personPedro from "@/assets/person-pedro.jpg";

const defaultImages = [personMaria, personJoao, personAna, personPedro];

const Testimonials = () => {
  const { testimonials } = useStore();

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase">Depoimentos</h2>
          <p className="text-muted-foreground text-sm mt-2">Confira o que dizem nossos clientes</p>
          <div className="w-12 h-0.5 bg-border mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <div key={t.id} className="bg-background border border-border rounded-lg p-6 text-center shadow-sm">
              <img src={t.image || defaultImages[i % defaultImages.length]} alt={t.name} className="w-14 h-14 rounded-full mx-auto mb-4 object-cover" loading="lazy" />
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-shop-star text-shop-star" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t.text}</p>
              <p className="font-semibold text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
