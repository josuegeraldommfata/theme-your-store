import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SettingsPanel = () => {
  const [storeName, setStoreName] = useState("Flex Moda");
  const [email, setEmail] = useState("contato@dominio.com.br");
  const [phone, setPhone] = useState("(00) 00000-0000");
  const [cnpj, setCnpj] = useState("00.000.000/0001-00");
  const [address, setAddress] = useState("Cidade/Estado");
  const [hours, setHours] = useState("Seg a sex das 9 às 12h | 14-18h");

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <h2 className="font-bold text-lg">Configurações Gerais</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium block mb-2">Nome da Loja</label>
          <input value={storeName} onChange={e => setStoreName(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">E-mail de Contato</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Telefone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">CNPJ</label>
          <input value={cnpj} onChange={e => setCnpj(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium block mb-2">Endereço</label>
          <input value={address} onChange={e => setAddress(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium block mb-2">Horário de Atendimento</label>
          <input value={hours} onChange={e => setHours(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
        </div>
      </div>
      <Button variant="shop" onClick={handleSave}>SALVAR CONFIGURAÇÕES</Button>
    </div>
  );
};

export default SettingsPanel;
