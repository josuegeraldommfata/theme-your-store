import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useStore } from "@/contexts/StoreContext";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, X } from "lucide-react";

const priceRanges = [
  { label: "Até R$100", min: 0, max: 100 },
  { label: "R$100 - R$200", min: 100, max: 200 },
  { label: "R$200 - R$300", min: 200, max: 300 },
  { label: "Acima de R$300", min: 300, max: Infinity },
];

const sortOptions = [
  { label: "Mais relevantes", value: "relevance" },
  { label: "Menor preço", value: "price_asc" },
  { label: "Maior preço", value: "price_desc" },
  { label: "Mais vendidos", value: "bestseller" },
  { label: "Lançamentos", value: "newest" },
];

const CategoryPage = () => {
  const { name } = useParams();
  const { products, categories } = useStore();
  const [sort, setSort] = useState("relevance");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [gridCols, setGridCols] = useState(4);
  const [showFilters, setShowFilters] = useState(true);

  const parsePrice = (p: string) => parseFloat(p.replace("R$", "").replace(".", "").replace(",", "."));

  const category = categories.find(c => c.name.toLowerCase() === (name || "").toLowerCase());
  const subcategories = category?.subcategories || [];

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes);
  }, [products]);

  const allColors = useMemo(() => {
    const colors = new Map<string, string>();
    products.forEach(p => p.colors.forEach(c => colors.set(c.name, c.hex)));
    return Array.from(colors.entries());
  }, [products]);

  const filtered = useMemo(() => {
    let result = products.filter(p => p.active && (
      p.category.toLowerCase() === (name || "").toLowerCase() ||
      p.subcategory.toLowerCase() === (name || "").toLowerCase()
    ));

    if (priceFilter !== null) {
      const range = priceRanges[priceFilter];
      result = result.filter(p => {
        const price = parsePrice(p.price);
        return price >= range.min && price < range.max;
      });
    }

    if (sizeFilter) {
      result = result.filter(p => p.sizes.includes(sizeFilter));
    }

    if (colorFilter) {
      result = result.filter(p => p.colors.some(c => c.name === colorFilter));
    }

    switch (sort) {
      case "price_asc": result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break;
      case "price_desc": result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break;
      case "bestseller": result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0)); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
    }

    return result;
  }, [products, name, sort, priceFilter, sizeFilter, colorFilter]);

  const activeFilters = [priceFilter !== null, sizeFilter !== null, colorFilter !== null].filter(Boolean).length;

  const clearFilters = () => {
    setPriceFilter(null);
    setSizeFilter(null);
    setColorFilter(null);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-foreground font-medium">{name}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="w-4 h-4" /> Filtros {activeFilters > 0 && <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">{activeFilters}</span>}
            </Button>
            <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
              <button onClick={() => setGridCols(3)} className={`p-1.5 rounded ${gridCols === 3 ? "bg-muted" : ""}`}><LayoutGrid className="w-4 h-4" /></button>
              <button onClick={() => setGridCols(4)} className={`p-1.5 rounded ${gridCols === 4 ? "bg-muted" : ""}`}><Grid3X3 className="w-4 h-4" /></button>
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-sm">
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {subcategories.map(sub => (
              <Link key={sub.id} to={`/categoria/${sub.name}`}>
                <Button variant="outline" size="sm" className="rounded-full text-xs">{sub.name}</Button>
              </Link>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="hidden md:block w-56 shrink-0 space-y-6">
              {activeFilters > 0 && (
                <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Limpar filtros
                </button>
              )}

              <div>
                <h3 className="font-semibold text-sm mb-3">Preço</h3>
                <div className="space-y-2">
                  {priceRanges.map((r, i) => (
                    <label key={i} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                      <input type="radio" name="price" checked={priceFilter === i} onChange={() => setPriceFilter(priceFilter === i ? null : i)} className="accent-primary" />
                      {r.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-3">Tamanho</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(s => (
                    <button key={s} onClick={() => setSizeFilter(sizeFilter === s ? null : s)}
                      className={`min-w-[36px] h-8 px-2 border text-xs font-medium rounded-lg transition-all ${sizeFilter === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-3">Cor</h3>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(([name, hex]) => (
                    <button key={name} onClick={() => setColorFilter(colorFilter === name ? null : name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${colorFilter === name ? "border-primary scale-110 ring-2 ring-primary/30" : "border-border"}`}
                      style={{ backgroundColor: hex, boxShadow: hex === "#FFFFFF" ? "inset 0 0 0 1px #ddd" : undefined }}
                      title={name}
                    />
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className={`grid gap-4 ${gridCols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground mb-2">Nenhum produto encontrado</p>
                {activeFilters > 0 && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>Limpar filtros</Button>
                )}
                <Link to="/" className="text-primary hover:underline mt-4 block text-sm">Voltar para a loja</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
