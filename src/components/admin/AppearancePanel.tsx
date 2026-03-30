import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AppearancePanel = () => {
  const [storeName, setStoreName] = useState("Flex Moda");
  const [primaryColor, setPrimaryColor] = useState("#d6246e");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#222222");

  const handleSave = () => {
    toast.success("Aparência salva com sucesso!");
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <h2 className="font-bold text-lg">Personalizar Aparência</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium block mb-2">Nome da Loja</label>
          <input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor Primária</label>
          <div className="flex items-center gap-3">
            <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor de Fundo</label>
          <div className="flex items-center gap-3">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor do Texto</label>
          <div className="flex items-center gap-3">
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Logo</label>
          <div className="border-2 border-dashed border-border rounded-sm p-8 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
            Arraste ou clique para enviar
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Favicon</label>
          <div className="border-2 border-dashed border-border rounded-sm p-8 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
            Arraste ou clique para enviar
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <h3 className="font-semibold mb-3">Pré-visualização</h3>
        <div className="border border-border rounded-sm p-4 flex items-center gap-4" style={{ backgroundColor: bgColor }}>
          <span className="text-xl font-extrabold" style={{ color: textColor }}>{storeName}</span>
          <Button style={{ backgroundColor: primaryColor, color: "#fff" }}>BOTÃO EXEMPLO</Button>
        </div>
      </div>
      <Button variant="shop" onClick={handleSave}>SALVAR ALTERAÇÕES</Button>
    </div>
  );
};

export default AppearancePanel;
