import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronRight, Plus, Info } from "lucide-react";
import { toast } from "sonner";

const ProductsPanel = () => {
  const { products, setProducts, categories, setCategories } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCatManager, setShowCatManager] = useState(false);
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [newSubCat, setNewSubCat] = useState<Record<string, string>>({});
  const [newCatName, setNewCatName] = useState("");

  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formOldPrice, setFormOldPrice] = useState("");
  const [formStock, setFormStock] = useState(0);
  const [formCategory, setFormCategory] = useState("");
  const [formSubcategory, setFormSubcategory] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const handleNew = () => {
    setEditingId(null);
    setFormName(""); setFormPrice(""); setFormOldPrice(""); setFormStock(0);
    setFormCategory(categories[0]?.name || ""); setFormSubcategory(""); setFormDescription("");
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const p = products.find(p => p.id === id);
    if (!p) return;
    setEditingId(id);
    setFormName(p.name); setFormPrice(p.price); setFormOldPrice(p.oldPrice); setFormStock(p.stock);
    setFormCategory(p.category); setFormSubcategory(p.subcategory); setFormDescription(p.description);
    setShowForm(true);
  };

  const handleSaveProduct = () => {
    if (!formName.trim()) { toast.error("Insira o nome do produto"); return; }
    const pixPrice = formPrice.replace("R$", "").replace(",", ".");
    const pixVal = (parseFloat(pixPrice) * 0.9).toFixed(2).replace(".", ",");
    
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? {
        ...p, name: formName, price: formPrice, oldPrice: formOldPrice, stock: formStock,
        category: formCategory, subcategory: formSubcategory, description: formDescription,
        pixPrice: `R$${pixVal}`,
      } : p));
      toast.success("Produto atualizado!");
    } else {
      setProducts([...products, {
        id: Date.now(), name: formName, image: products[0]?.image || "", price: formPrice,
        oldPrice: formOldPrice, pixPrice: `R$${pixVal}`,
        installment: "3x sem juros", description: formDescription, category: formCategory,
        subcategory: formSubcategory, stock: formStock, active: true,
        colors: [{ name: "Preto", hex: "#222" }, { name: "Branco", hex: "#fff" }],
        sizes: ["P", "M", "G", "GG"],
      }]);
      toast.success("Produto criado!");
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => { setProducts(products.filter(p => p.id !== id)); toast.success("Produto excluído!"); };
  const handleToggle = (id: number) => { setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p)); };
  const toggleCat = (name: string) => { setExpandedCats(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]); };

  const addSubCategory = (catName: string) => {
    const sub = newSubCat[catName]?.trim();
    if (!sub) return;
    setCategories(categories.map(c => c.name === catName ? { ...c, subcategories: [...c.subcategories, { id: Date.now(), name: sub }] } : c));
    setNewSubCat({ ...newSubCat, [catName]: "" });
    toast.success(`Subcategoria "${sub}" adicionada!`);
  };

  const removeSubCategory = (catName: string, subId: number) => {
    setCategories(categories.map(c => c.name === catName ? { ...c, subcategories: c.subcategories.filter(s => s.id !== subId) } : c));
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([...categories, { name: newCatName, image: "", subcategories: [] }]);
    setNewCatName("");
    toast.success(`Categoria "${newCatName}" criada!`);
  };

  const selectedCat = categories.find(c => c.name === formCategory);

  return (
    <div className="space-y-6">
      <div className="bg-background border border-border rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Produtos</h2>
            <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Produtos ativos são exibidos nas vitrines da página inicial e na busca</p>
          </div>
          <div className="flex gap-2">
            <Button variant="shop-outline" onClick={() => setShowCatManager(!showCatManager)}>
              {showCatManager ? "Fechar Categorias" : "Gerenciar Categorias"}
            </Button>
            <Button variant="shop" onClick={handleNew}>+ NOVO PRODUTO</Button>
          </div>
        </div>

        {showCatManager && (
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold">Categorias e Subcategorias</h3>
            <p className="text-xs text-primary/80 flex items-center gap-1"><Info className="w-3 h-3" /> Categorias organizam produtos e aparecem nos círculos da home e nos filtros</p>
            {categories.map((cat) => (
              <div key={cat.name} className="border border-border rounded-sm">
                <button onClick={() => toggleCat(cat.name)} className="w-full flex items-center justify-between p-3 hover:bg-muted/50">
                  <span className="font-medium text-sm">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{cat.subcategories.length} sub</span>
                    {expandedCats.includes(cat.name) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>
                {expandedCats.includes(cat.name) && (
                  <div className="border-t border-border p-3 space-y-2">
                    {cat.subcategories.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between pl-4 py-1">
                        <span className="text-sm">{sub.name}</span>
                        <button onClick={() => removeSubCategory(cat.name, sub.id)} className="text-destructive text-xs hover:underline">Remover</button>
                      </div>
                    ))}
                    <div className="flex gap-2 pl-4 pt-2">
                      <input placeholder="Nova subcategoria" value={newSubCat[cat.name] || ""} onChange={e => setNewSubCat({ ...newSubCat, [cat.name]: e.target.value })} className="border border-border rounded-sm p-2 text-sm flex-1" onKeyDown={e => e.key === "Enter" && addSubCategory(cat.name)} />
                      <Button variant="shop-outline" size="sm" onClick={() => addSubCategory(cat.name)}><Plus className="w-3 h-3" /></Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <input placeholder="Nova categoria" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="border border-border rounded-sm p-2 text-sm flex-1" onKeyDown={e => e.key === "Enter" && addCategory()} />
              <Button variant="shop" size="sm" onClick={addCategory}>+ CATEGORIA</Button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{editingId ? "Editar Produto" : "Novo Produto"}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Nome</label>
                <input value={formName} onChange={e => setFormName(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Preço</label>
                <input value={formPrice} onChange={e => setFormPrice(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" placeholder="R$199,90" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Preço Anterior</label>
                <input value={formOldPrice} onChange={e => setFormOldPrice(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" placeholder="R$249,90" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Estoque</label>
                <input type="number" value={formStock} onChange={e => setFormStock(Number(e.target.value))} className="w-full border border-border rounded-sm p-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Categoria</label>
                <select value={formCategory} onChange={e => { setFormCategory(e.target.value); setFormSubcategory(""); }} className="w-full border border-border rounded-sm p-2 text-sm">
                  <option value="">Selecionar</option>
                  {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Subcategoria</label>
                <select value={formSubcategory} onChange={e => setFormSubcategory(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm">
                  <option value="">Selecionar</option>
                  {selectedCat?.subcategories.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium block mb-1">Descrição</label>
                <textarea value={formDescription} onChange={e => setFormDescription(e.target.value)} rows={3} className="w-full border border-border rounded-sm p-2 text-sm resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Imagem</label>
                <div className="border-2 border-dashed border-border rounded-sm p-4 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">Enviar imagem</div>
              </div>
            </div>
            <Button variant="shop" onClick={handleSaveProduct}>SALVAR PRODUTO</Button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium">Produto</th>
                <th className="pb-3 font-medium">Categoria</th>
                <th className="pb-3 font-medium">Preço</th>
                <th className="pb-3 font-medium">Estoque</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border">
                  <td className="py-3 font-medium">{p.name}</td>
                  <td className="py-3 text-muted-foreground">{p.category} / {p.subcategory}</td>
                  <td className="py-3">{p.price}</td>
                  <td className="py-3">{p.stock}</td>
                  <td className="py-3">
                    <button onClick={() => handleToggle(p.id)} className={`text-xs px-2 py-1 rounded-full cursor-pointer ${p.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {p.active ? "Ativo" : "Inativo"}
                    </button>
                  </td>
                  <td className="py-3 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(p.id)}>Editar</Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(p.id)}>Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPanel;
