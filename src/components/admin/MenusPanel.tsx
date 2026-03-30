import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface MenuItem {
  id: number;
  label: string;
  link: string;
}

const initialMenus: MenuItem[] = [
  { id: 1, label: "FEMININO", link: "/" },
  { id: 2, label: "MASCULINO", link: "/" },
  { id: 3, label: "CALÇADOS", link: "/" },
  { id: 4, label: "ACESSÓRIOS", link: "/" },
  { id: 5, label: "MARCAS", link: "/" },
];

const MenusPanel = () => {
  const [menus, setMenus] = useState(initialMenus);

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
    toast.success("Menus salvos com sucesso!");
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <h2 className="font-bold text-lg">Gerenciar Menus</h2>
      <div className="space-y-3">
        {menus.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-3 border border-border rounded-sm">
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
              <input value={m.label} onChange={e => updateMenu(m.id, "label", e.target.value)} className="border border-border rounded-sm p-2 text-sm" />
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
