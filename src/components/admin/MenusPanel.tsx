import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { X, GripVertical, Info } from "lucide-react";
import { toast } from "sonner";

const MenusPanel = () => {
  const { menus, setMenus, categories } = useStore();

  const updateMenu = (id: number, field: "label" | "link", value: string) => {
    setMenus(menus.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addItem = () => {
    setMenus([...menus, { id: Date.now(), label: "", link: "/categoria/" }]);
  };

  const removeItem = (id: number) => {
    setMenus(menus.filter(m => m.id !== id));
    toast.success("Item removido!");
  };

  const handleSave = () => {
    toast.success("Menus salvos! Alterações já visíveis na loja.");
  };

  const suggestedLinks = [
    { label: "Página inicial", value: "/" },
    ...categories.map(c => ({ label: `Categoria: ${c.name}`, value: `/categoria/${c.name}` })),
    { label: "Ofertas", value: "/categoria/Ofertas" },
    { label: "Quem Somos", value: "/quem-somos" },
    { label: "Fale Conosco", value: "/fale-conosco" },
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="font-bold text-lg">Gerenciar Menus</h2>
        <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Estes itens aparecem na barra de navegação do header e nas categorias do rodapé</p>
      </div>
      <div className="space-y-3">
        {menus.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-3 border border-border rounded-sm">
            <div className="flex items-center gap-3 flex-1">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
              <input value={m.label} onChange={e => updateMenu(m.id, "label", e.target.value)} className="border border-border rounded-sm p-2 text-sm w-40" placeholder="Nome do menu" />
              <div className="flex-1">
                <select
                  value={suggestedLinks.find(s => s.value === m.link) ? m.link : "__custom__"}
                  onChange={e => {
                    if (e.target.value !== "__custom__") updateMenu(m.id, "link", e.target.value);
                  }}
                  className="border border-border rounded-sm p-2 text-sm w-full"
                >
                  {suggestedLinks.map(s => (
                    <option key={s.value} value={s.value}>{s.label} → {s.value}</option>
                  ))}
                  <option value="__custom__">Link personalizado</option>
                </select>
                {!suggestedLinks.find(s => s.value === m.link) && (
                  <input
                    value={m.link}
                    onChange={e => updateMenu(m.id, "link", e.target.value)}
                    placeholder="/categoria/NomeDaCategoria"
                    className="border border-border rounded-sm p-2 text-sm w-full mt-1"
                  />
                )}
              </div>
            </div>
            <button onClick={() => removeItem(m.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-sm transition-colors ml-2">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="shop-outline" onClick={addItem}>+ ADICIONAR ITEM</Button>
        <Button variant="shop" onClick={handleSave}>SALVAR</Button>
      </div>
    </div>
  );
};

export default MenusPanel;
