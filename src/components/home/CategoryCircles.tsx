import catBlusas from "@/assets/cat-blusas.jpg";
import catCalcas from "@/assets/cat-calcas.jpg";
import catVestidos from "@/assets/cat-vestidos.jpg";
import catConjuntos from "@/assets/cat-conjuntos.jpg";
import catJaquetas from "@/assets/cat-jaquetas.jpg";
import catAcessorios from "@/assets/cat-acessorios.jpg";

const categories = [
  { name: "Blusas", image: catBlusas },
  { name: "Calças", image: catCalcas },
  { name: "Vestidos", image: catVestidos },
  { name: "Conjuntos", image: catConjuntos },
  { name: "Jaquetas", image: catJaquetas },
  { name: "Acessórios", image: catAcessorios },
];

const CategoryCircles = () => (
  <section className="py-12">
    <div className="container">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <a key={cat.name} href="#" className="flex flex-col items-center gap-3 group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" width={112} height={112} />
            </div>
            <span className="text-sm font-medium">{cat.name}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryCircles;
