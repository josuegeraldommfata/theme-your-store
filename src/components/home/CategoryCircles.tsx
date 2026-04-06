import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import catBlusas from "@/assets/cat-blusas.jpg";
import catCalcas from "@/assets/cat-calcas.jpg";
import catVestidos from "@/assets/cat-vestidos.jpg";
import catConjuntos from "@/assets/cat-conjuntos.jpg";
import catJaquetas from "@/assets/cat-jaquetas.jpg";
import catAcessorios from "@/assets/cat-acessorios.jpg";

const defaultImages: Record<string, string> = {
  "Blusas": catBlusas,
  "Calças": catCalcas,
  "Vestidos": catVestidos,
  "Conjuntos": catConjuntos,
  "Jaquetas": catJaquetas,
  "Acessórios": catAcessorios,
};

const CategoryCircles = () => {
  const { categories } = useStore();

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Categorias</h2>
          <p className="text-muted-foreground text-sm mt-2">Explore por categoria</p>
          <div className="w-12 h-0.5 bg-border mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/categoria/${cat.name}`} className="flex flex-col items-center gap-3 group">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors shadow-md group-hover:shadow-lg">
                <img
                  src={cat.image || defaultImages[cat.name] || catBlusas}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  width={112}
                  height={112}
                />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCircles;
