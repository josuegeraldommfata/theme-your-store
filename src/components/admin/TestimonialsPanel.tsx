import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { X, Star, Info } from "lucide-react";
import { toast } from "sonner";

const TestimonialsPanel = () => {
  const { testimonials, setTestimonials } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");
  const [formRating, setFormRating] = useState(5);

  const handleNew = () => {
    setEditId(null); setFormName(""); setFormText(""); setFormRating(5); setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const t = testimonials.find(t => t.id === id);
    if (!t) return;
    setEditId(id); setFormName(t.name); setFormText(t.text); setFormRating(t.rating); setShowForm(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formText.trim()) { toast.error("Preencha todos os campos"); return; }
    if (editId) {
      setTestimonials(testimonials.map(t => t.id === editId ? { ...t, name: formName, text: formText, rating: formRating } : t));
      toast.success("Depoimento atualizado!");
    } else {
      setTestimonials([...testimonials, { id: Date.now(), name: formName, image: "", text: formText, rating: formRating }]);
      toast.success("Depoimento adicionado!");
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    toast.success("Depoimento removido!");
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Depoimentos</h2>
          <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Exibidos na seção "Depoimentos" da página inicial</p>
        </div>
        <Button variant="shop" onClick={handleNew}>+ NOVO DEPOIMENTO</Button>
      </div>

      {showForm && (
        <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editId ? "Editar" : "Novo"} Depoimento</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Nome do Cliente</label>
              <input value={formName} onChange={e => setFormName(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Avaliação</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setFormRating(n)}>
                    <Star className={`w-5 h-5 ${n <= formRating ? "fill-shop-star text-shop-star" : "text-border"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Depoimento</label>
            <textarea value={formText} onChange={e => setFormText(e.target.value)} rows={3} className="w-full border border-border rounded-sm p-2 text-sm resize-none" />
          </div>
          <Button variant="shop" onClick={handleSave}>SALVAR</Button>
        </div>
      )}

      {testimonials.map(t => (
        <div key={t.id} className="flex items-center justify-between p-4 border border-border rounded-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{t.name.charAt(0)}</div>
            <div>
              <p className="font-medium text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{t.text}</p>
              <div className="flex gap-0.5 mt-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-shop-star text-shop-star" />)}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="shop-outline" size="sm" onClick={() => handleEdit(t.id)}>Editar</Button>
            <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(t.id)}>Excluir</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsPanel;
