import { Star } from "lucide-react";

const testimonials = [
  { name: "Maria Silva", text: "Produtos de qualidade excepcional! Entrega rápida e atendimento maravilhoso. Recomendo muito para todos." },
  { name: "João Santos", text: "Melhor loja online que já comprei. Preços justos e as peças são exatamente como mostradas no site." },
  { name: "Ana Costa", text: "Compro sempre aqui. A qualidade dos produtos e o atendimento ao cliente são incomparáveis." },
  { name: "Pedro Oliveira", text: "Fiquei impressionado com a velocidade da entrega e a qualidade do produto. Certamente voltarei a comprar!" },
];

const Testimonials = () => (
  <section className="py-12">
    <div className="container">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold uppercase">Depoimentos</h2>
        <p className="text-muted-foreground text-sm mt-2">Confira o que dizem nossos clientes</p>
        <div className="w-12 h-0.5 bg-border mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-background border border-border rounded-lg p-6 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-shop-gray mx-auto mb-4" />
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-shop-star text-shop-star" />
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

export default Testimonials;
