import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { X, Info } from "lucide-react";
import { toast } from "sonner";

const BannersPanel = () => {
  const { banners, setBanners } = useStore();
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formLink, setFormLink] = useState("/");
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formCta, setFormCta] = useState("");
  const [formType, setFormType] = useState<"hero" | "promo" | "destaque">("hero");

  const handleDelete = (id: number) => {
    setBanners(banners.filter(b => b.id !== id));
    toast.success("Banner excluído!");
  };

  const handleToggle = (id: number) => {
    setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const handleEdit = (id: number) => {
    const b = banners.find(b => b.id === id);
    if (!b) return;
    setEditing(id); setFormName(b.name); setFormLink(b.link); setFormTitle(b.title);
    setFormSubtitle(b.subtitle); setFormCta(b.cta); setFormType(b.type);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null); setFormName(""); setFormLink("/"); setFormTitle(""); setFormSubtitle(""); setFormCta(""); setFormType("hero");
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formName.trim()) { toast.error("Insira o nome do banner"); return; }
    if (editing) {
      setBanners(banners.map(b => b.id === editing ? { ...b, name: formName, link: formLink, title: formTitle, subtitle: formSubtitle, cta: formCta, type: formType } : b));
      toast.success("Banner atualizado!");
    } else {
      setBanners([...banners, { id: Date.now(), name: formName, image: "", link: formLink, title: formTitle, subtitle: formSubtitle, cta: formCta, active: true, type: formType }]);
      toast.success("Banner criado!");
    }
    setShowForm(false);
  };

  const typeLabel: Record<string, string> = {
    hero: "🖼️ Slide Principal (carrossel do topo da home)",
    promo: "📦 Banner Promoção (grid 3 colunas na home)",
    destaque: "⭐ Banner Destaque (banner largo entre vitrines)",
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Banners e Slides</h2>
          <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Banners são exibidos na página inicial da loja em diferentes seções</p>
        </div>
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
              <label className="text-sm font-medium block mb-1">Tipo</label>
              <select value={formType} onChange={e => setFormType(e.target.value as any)} className="w-full border border-border rounded-sm p-2 text-sm">
                <option value="hero">Slide Principal</option>
                <option value="promo">Promoção</option>
                <option value="destaque">Destaque</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">{typeLabel[formType]}</p>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Título</label>
              <input value={formTitle} onChange={e => setFormTitle(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Subtítulo</label>
              <input value={formSubtitle} onChange={e => setFormSubtitle(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Texto do Botão (CTA)</label>
              <input value={formCta} onChange={e => setFormCta(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" placeholder="COMPRAR AGORA" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Link</label>
              <input value={formLink} onChange={e => setFormLink(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Imagem</label>
            <div className="border-2 border-dashed border-border rounded-sm p-6 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">Arraste ou clique para enviar</div>
          </div>
          <Button variant="shop" onClick={handleSave}>SALVAR</Button>
        </div>
      )}

      {["hero", "promo", "destaque"].map(type => {
        const typeBanners = banners.filter(b => b.type === type);
        if (typeBanners.length === 0) return null;
        return (
          <div key={type}>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase">{typeLabel[type]}</h3>
            {typeBanners.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 border border-border rounded-sm mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-12 bg-muted rounded-sm" />
                  <div>
                    <span className="text-sm font-medium">{b.name}</span>
                    {b.title && <span className="text-xs text-muted-foreground ml-2">"{b.title}"</span>}
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${b.active ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"}`}>
                      {b.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleToggle(b.id)}>{b.active ? "Desativar" : "Ativar"}</Button>
                  <Button variant="shop-outline" size="sm" onClick={() => handleEdit(b.id)}>Editar</Button>
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(b.id)}>Excluir</Button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default BannersPanel;
