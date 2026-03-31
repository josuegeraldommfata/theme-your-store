import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info } from "lucide-react";

const Hint = ({ text }: { text: string }) => (
  <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> {text}</p>
);

const AppearancePanel = () => {
  const { appearance, setAppearance } = useStore();

  const update = (field: keyof typeof appearance, value: string) => {
    setAppearance({ ...appearance, [field]: value });
  };

  const handleSave = () => {
    toast.success("Aparência salva! As alterações já estão visíveis na loja.");
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="font-bold text-lg">Personalizar Aparência</h2>
        <p className="text-sm text-muted-foreground">As alterações são aplicadas em tempo real na loja.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium block mb-2">Nome da Loja</label>
          <input value={appearance.storeName} onChange={e => update("storeName", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
          <Hint text="Aparece no header, footer e título da página" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor Primária</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.primaryColor} onChange={e => update("primaryColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.primaryColor} onChange={e => update("primaryColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Botões principais, preço PIX, links, top bar, badge carrinho" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor do Botão Principal</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.buttonColor} onChange={e => update("buttonColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.buttonColor} onChange={e => update("buttonColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Cor dos botões COMPRAR, VER DETALHES, CTA dos banners" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor do Texto do Botão</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.buttonTextColor} onChange={e => update("buttonTextColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.buttonTextColor} onChange={e => update("buttonTextColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Texto dentro dos botões principais" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor de Fundo do Header</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.headerBgColor} onChange={e => update("headerBgColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.headerBgColor} onChange={e => update("headerBgColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Fundo do cabeçalho com logo, busca e menu" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cor do Texto</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.textColor} onChange={e => update("textColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.textColor} onChange={e => update("textColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Cor do nome da loja no header" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Top Bar - Fundo</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.topBarBgColor} onChange={e => update("topBarBgColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.topBarBgColor} onChange={e => update("topBarBgColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Barra superior com telefone, email e horário" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Top Bar - Texto</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.topBarTextColor} onChange={e => update("topBarTextColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.topBarTextColor} onChange={e => update("topBarTextColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Texto da barra superior" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Rodapé - Fundo</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.footerBgColor} onChange={e => update("footerBgColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.footerBgColor} onChange={e => update("footerBgColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Cor de fundo de todo o rodapé" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Rodapé - Texto</label>
          <div className="flex items-center gap-3">
            <input type="color" value={appearance.footerTextColor} onChange={e => update("footerTextColor", e.target.value)} className="w-10 h-10 cursor-pointer" />
            <input value={appearance.footerTextColor} onChange={e => update("footerTextColor", e.target.value)} className="border border-border rounded-sm p-3 text-sm flex-1" />
          </div>
          <Hint text="Cor do texto, links e ícones do rodapé" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Logo</label>
          <div className="border-2 border-dashed border-border rounded-sm p-8 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
            Arraste ou clique para enviar
          </div>
          <Hint text="Logo exibida no header e rodapé" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Favicon</label>
          <div className="border-2 border-dashed border-border rounded-sm p-8 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
            Arraste ou clique para enviar
          </div>
          <Hint text="Ícone que aparece na aba do navegador" />
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="font-semibold mb-3">Pré-visualização</h3>
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="py-1 px-4 text-xs" style={{ backgroundColor: appearance.topBarBgColor, color: appearance.topBarTextColor }}>
            Barra superior - telefone, email
          </div>
          <div className="p-4 flex items-center justify-between" style={{ backgroundColor: appearance.headerBgColor }}>
            <span className="text-xl font-extrabold" style={{ color: appearance.textColor }}>{appearance.storeName}</span>
            <button className="px-4 py-2 rounded text-sm font-bold" style={{ backgroundColor: appearance.buttonColor, color: appearance.buttonTextColor }}>COMPRAR</button>
          </div>
          <div className="p-4 text-sm" style={{ backgroundColor: appearance.footerBgColor, color: appearance.footerTextColor }}>
            Rodapé - categorias, contato, pagamento
          </div>
        </div>
      </div>

      <Button variant="shop" onClick={handleSave}>SALVAR ALTERAÇÕES</Button>
    </div>
  );
};

export default AppearancePanel;
