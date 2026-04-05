import { useState, useRef } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { X, Star, Info, Upload } from "lucide-react";
import { toast } from "sonner";

const TestimonialsPanel = () => {
  const { testimonials, setTestimonials } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formImage, setFormImage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Envie apenas imagens"); return; }
    const reader = new FileReader();
    reader.onload = () => setFormImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleNew = () => {
    setEditId(null); setFormName(""); setFormText(""); setFormRating(5); setFormImage(""); setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const t = testimonials.find(t => t.id === id);
    if (!t) return;
    setEditId(id); setFormName(t.name); setFormText(t.text); setFormRating(t.rating); setFormImage(t.image); setShowForm(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formText.trim()) { toast.error("Preencha todos os campos"); return; }
    if (editId) {
      setTestimonials(testimonials.map(t => t.id === editId ? { ...t, name: formName, text: formText, rating: formRating, image: formImage } : t));
      toast.success("Depoimento atualizado!");
    } else {
      setTestimonials([...testimonials, { id: Date.now(), name: formName, image: formImage, text: formText, rating: formRating }]);
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
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium">Foto do Cliente</label>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              {formImage ? (
                <div className="relative">
                  <img src={formImage} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-border" />
                  <button onClick={() => setFormImage("")} className="absolute -top-1 -right-1 bg-destructive text-background rounded-full p-0.5"><X className="w-3 h-3" /></button>
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-20 h-20 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Foto</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Nome do Cliente</label>
              <input value={formName} onChange={e => setFormName(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Avaliação</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setFormRating(n)}>
                    <Star className={`w-5 h-5 ${n <= formRating ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
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
            {t.image ? (
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{t.name.charAt(0)}</div>
            )}
            <div>
              <p className="font-medium text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{t.text}</p>
              <div className="flex gap-0.5 mt-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
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
