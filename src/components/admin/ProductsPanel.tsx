import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";

interface SubCategory {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  active: boolean;
  category: string;
  subcategory: string;
}

interface Category {
  name: string;
  subcategories: SubCategory[];
}

const initialCategories: Category[] = [
  { name: "Feminino", subcategories: [{ id: 1, name: "Blusas" }, { id: 2, name: "Vestidos" }, { id: 3, name: "Saias" }] },
  { name: "Masculino", subcategories: [{ id: 4, name: "Camisetas" }, { id: 5, name: "Calças" }, { id: 6, name: "Bermudas" }] },
  { name: "Calçados", subcategories: [{ id: 7, name: "Tênis" }, { id: 8, name: "Sandálias" }, { id: 9, name: "Botas" }] },
  { name: "Acessórios", subcategories: [{ id: 10, name: "Óculos" }, { id: 11, name: "Bolsas" }, { id: 12, name: "Relógios" }] },
];

const initialProducts: Product[] = [
  { id: 1, name: "Tênis Casual Branco", price: "R$199,90", stock: 45, active: true, category: "Calçados", subcategory: "Tênis" },
  { id: 2, name: "Bolsa Couro Premium", price: "R$199,90", stock: 12, active: true, category: "Acessórios", subcategory: "Bolsas" },
  { id: 3, name: "Óculos Gold Edition", price: "R$199,90", stock: 0, active: false, category: "Acessórios", subcategory: "Óculos" },
  { id: 4, name: "Camiseta Premium", price: "R$199,90", stock: 88, active: true, category: "Masculino", subcategory: "Camisetas" },
];

const ProductsPanel = () => {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCatManager, setShowCatManager] = useState(false);
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [newSubCat, setNewSubCat] = useState<Record<string, string>>({});
  const [newCatName, setNewCatName] = useState("");

  // Form state
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formStock, setFormStock] = useState(0);
  const [formCategory, setFormCategory] = useState("");
  const [formSubcategory, setFormSubcategory] = useState("");

  const handleNew = () => {
    setEditingProduct(null);
    setFormName(""); setFormPrice(""); setFormStock(0);
    setFormCategory(categories[0]?.name || ""); setFormSubcategory("");
    setShowForm(true);
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name); setFormPrice(p.price); setFormStock(p.stock);
    setFormCategory(p.category); setFormSubcategory(p.subcategory);
    setShowForm(true);
  };

  const handleSaveProduct = () => {
    if (!formName.trim()) { toast.error("Insira o nome do produto"); return; }
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, name: formName, price: formPrice, stock: formStock, category: formCategory, subcategory: formSubcategory } : p));
      toast.success("Produto atualizado!");
    } else {
      setProducts([...products, { id: Date.now(), name: formName, price: formPrice, stock: formStock, active: true, category: formCategory, subcategory: formSubcategory }]);
      toast.success("Produto criado!");
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Produto excluído!");
  };

  const handleToggle = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const toggleCat = (name: string) => {
    setExpandedCats(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  };

  const addSubCategory = (catName: string) => {
    const sub = newSubCat[catName]?.trim();
    if (!sub) return;
    setCategories(categories.map(c => c.name === catName ? { ...c, subcategories: [...c.subcategories, { id: Date.now(), name: sub }] } : c));
    setNewSubCat({ ...newSubCat, [catName]: "" });
    toast.success(`Subcategoria "${sub}" adicionada!`);
  };

  const removeSubCategory = (catName: string, subId: number) => {
    setCategories(categories.map(c => c.name === catName ? { ...c, subcategories: c.subcategories.filter(s => s.id !== subId) } : c));
    toast.success("Subcategoria removida!");
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([...categories, { name: newCatName, subcategories: [] }]);
    setNewCatName("");
    toast.success(`Categoria "${newCatName}" criada!`);
  };

  const selectedCat = categories.find(c => c.name === formCategory);

  return (
    <div className="space-y-6">
      <div className="bg-background border border-border rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Produtos</h2>
          <div className="flex gap-2">
            <Button variant="shop-outline" onClick={() => setShowCatManager(!showCatManager)}>
              {showCatManager ? "Fechar Categorias" : "Gerenciar Categorias"}
            </Button>
            <Button variant="shop" onClick={handleNew}>+ NOVO PRODUTO</Button>
          </div>
        </div>

        {/* Category Manager */}
        {showCatManager && (
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold">Categorias e Subcategorias</h3>
            {categories.map((cat) => (
              <div key={cat.name} className="border border-border rounded-sm">
                <button onClick={() => toggleCat(cat.name)} className="w-full flex items-center justify-between p-3 hover:bg-muted/50">
                  <span className="font-medium text-sm">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{cat.subcategories.length} subcategorias</span>
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
                      <input
                        placeholder="Nova subcategoria"
                        value={newSubCat[cat.name] || ""}
                        onChange={e => setNewSubCat({ ...newSubCat, [cat.name]: e.target.value })}
                        className="border border-border rounded-sm p-2 text-sm flex-1"
                        onKeyDown={e => e.key === "Enter" && addSubCategory(cat.name)}
                      />
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

        {/* Product Form */}
        {showForm && (
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{editingProduct ? "Editar Produto" : "Novo Produto"}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Nome</label>
                <input value={formName} onChange={e => setFormName(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Preço</label>
                <input value={formPrice} onChange={e => setFormPrice(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" placeholder="R$0,00" />
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
              <div>
                <label className="text-sm font-medium block mb-1">Imagem</label>
                <div className="border-2 border-dashed border-border rounded-sm p-4 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
                  Enviar imagem
                </div>
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
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(p)}>Editar</Button>
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
