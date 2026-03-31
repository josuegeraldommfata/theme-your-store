import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { X, GripVertical, Info } from "lucide-react";
import { toast } from "sonner";

const MenusPanel = () => {
  const { menus, setMenus } = useStore();

  const updateMenu = (id: number, field: "label" | "link", value: string) => {
    setMenus(menus.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addItem = () => {
    setMenus([...menus, { id: Date.now(), label: "", link: "/" }]);
  };

  const removeItem = (id: number) => {
    setMenus(menus.filter(m => m.id !== id));
    toast.success("Item removido!");
  };

  const handleSave = () => {
    toast.success("Menus salvos! Alterações já visíveis na loja.");
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="font-bold text-lg">Gerenciar Menus</h2>
        <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Estes itens aparecem na barra de navegação do header e nas categorias do rodapé</p>
      </div>
      <div className="space-y-3">
        {menus.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-3 border border-border rounded-sm">
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
              <input value={m.label} onChange={e => updateMenu(m.id, "label", e.target.value)} className="border border-border rounded-sm p-2 text-sm" placeholder="Nome do menu" />
              <input value={m.link} onChange={e => updateMenu(m.id, "link", e.target.value)} placeholder="Link" className="border border-border rounded-sm p-2 text-sm w-40" />
            </div>
            <button onClick={() => removeItem(m.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-sm transition-colors">
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
