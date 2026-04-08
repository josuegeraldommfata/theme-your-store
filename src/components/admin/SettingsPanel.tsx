import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info, MessageCircle } from "lucide-react";

const Hint = ({ text }: { text: string }) => (
  <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> {text}</p>
);

const SettingsPanel = () => {
  const { settings, setSettings } = useStore();

  const update = (field: keyof typeof settings, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    toast.success("Configurações salvas! Alterações visíveis na loja.");
  };

  return (
    <div className="space-y-6">
      <div className="bg-background border border-border rounded-lg p-6 space-y-6">
        <div>
          <h2 className="font-bold text-lg">Configurações Gerais</h2>
          <p className="text-sm text-muted-foreground">Informações exibidas no top bar, footer e páginas de contato.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium block mb-2">E-mail de Contato</label>
            <input value={settings.email} onChange={e => update("email", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
            <Hint text="Exibido no top bar, rodapé e página Fale Conosco" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Telefone</label>
            <input value={settings.phone} onChange={e => update("phone", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
            <Hint text="Exibido no top bar, rodapé e página Fale Conosco" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp da Loja
            </label>
            <input value={settings.whatsapp} onChange={e => update("whatsapp", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" placeholder="(11) 99999-0000" />
            <Hint text="Usado no botão flutuante do WhatsApp e em todos os locais de telefone da loja" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">CNPJ</label>
            <input value={settings.cnpj} onChange={e => update("cnpj", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
            <Hint text="Exibido no rodapé, copyright" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Instagram</label>
            <input value={settings.instagram} onChange={e => update("instagram", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
            <Hint text="Exibido na seção Instagram do rodapé" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Endereço</label>
            <input value={settings.address} onChange={e => update("address", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
            <Hint text="Exibido no rodapé e página Fale Conosco" />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium block mb-2">Horário de Atendimento</label>
            <input value={settings.hours} onChange={e => update("hours", e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
            <Hint text="Exibido no top bar, rodapé e página Fale Conosco" />
          </div>
        </div>
        <Button variant="shop" onClick={handleSave}>SALVAR CONFIGURAÇÕES</Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
