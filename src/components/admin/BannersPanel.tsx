import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Banner {
  id: number;
  name: string;
  link: string;
  active: boolean;
}

const initialBanners: Banner[] = [
  { id: 1, name: "Banner Principal 1", link: "/", active: true },
  { id: 2, name: "Banner Principal 2", link: "/", active: true },
  { id: 3, name: "Banner Destaque", link: "/", active: true },
  { id: 4, name: "Promo 1", link: "/", active: true },
  { id: 5, name: "Promo 2", link: "/", active: false },
  { id: 6, name: "Promo 3", link: "/", active: true },
];

const BannersPanel = () => {
  const [banners, setBanners] = useState(initialBanners);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formLink, setFormLink] = useState("/");

  const handleDelete = (id: number) => {
    setBanners(banners.filter(b => b.id !== id));
    toast.success("Banner excluído!");
  };

  const handleToggle = (id: number) => {
    setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const handleEdit = (banner: Banner) => {
    setEditing(banner);
    setFormName(banner.name);
    setFormLink(banner.link);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setFormName("");
    setFormLink("/");
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formName.trim()) { toast.error("Insira o nome do banner"); return; }
    if (editing) {
      setBanners(banners.map(b => b.id === editing.id ? { ...b, name: formName, link: formLink } : b));
      toast.success("Banner atualizado!");
    } else {
      setBanners([...banners, { id: Date.now(), name: formName, link: formLink, active: true }]);
      toast.success("Banner criado!");
    }
    setShowForm(false);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Banners e Slides</h2>
        <Button variant="shop" onClick={handleNew}>+ NOVO BANNER</Button>
      </div>

      {showForm && (
        <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editing ? "Editar Banner" : "Novo Banner"}</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Nome</label>
              <input value={formName} onChange={e => setFormName(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Link</label>
              <input value={formLink} onChange={e => setFormLink(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Imagem</label>
            <div className="border-2 border-dashed border-border rounded-sm p-6 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
              Arraste ou clique para enviar
            </div>
          </div>
          <Button variant="shop" onClick={handleSave}>SALVAR</Button>
        </div>
      )}

      {banners.map((b) => (
        <div key={b.id} className="flex items-center justify-between p-4 border border-border rounded-sm">
          <div className="flex items-center gap-4">
            <div className="w-20 h-12 bg-shop-gray rounded-sm" />
            <div>
              <span className="text-sm font-medium">{b.name}</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${b.active ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"}`}>
                {b.active ? "Ativo" : "Inativo"}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleToggle(b.id)}>
              {b.active ? "Desativar" : "Ativar"}
            </Button>
            <Button variant="shop-outline" size="sm" onClick={() => handleEdit(b)}>Editar</Button>
            <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(b.id)}>Excluir</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannersPanel;
