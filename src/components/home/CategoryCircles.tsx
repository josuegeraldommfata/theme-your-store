const categories = [
  "Blusas", "Calças", "Vestidos", "Conjuntos", "Jaquetas", "Acessórios",
];

const CategoryCircles = () => (
  <section className="py-12">
    <div className="container">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <a key={cat} href="#" className="flex flex-col items-center gap-3 group">
            <div className="w-28 h-28 rounded-full bg-shop-gray group-hover:bg-primary/10 transition-colors" />
            <span className="text-sm font-medium">{cat}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryCircles;
