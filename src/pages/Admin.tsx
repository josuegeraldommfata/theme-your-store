import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Palette, Image, ShoppingBag, CreditCard, Truck, Menu, Settings, LogOut,
  ChevronRight, Eye, DollarSign, Package, Users
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: Palette, label: "Aparência", key: "appearance" },
  { icon: Image, label: "Banners e Slides", key: "banners" },
  { icon: ShoppingBag, label: "Produtos", key: "products" },
  { icon: Menu, label: "Menus", key: "menus" },
  { icon: CreditCard, label: "Pagamentos", key: "payments" },
  { icon: Truck, label: "Envios", key: "shipping" },
  { icon: Settings, label: "Configurações", key: "settings" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-background flex flex-col">
        <div className="p-6 border-b border-background/10">
          <span className="text-xl font-extrabold">FLEX</span>
          <span className="text-primary text-xs font-medium tracking-widest ml-1">ADMIN</span>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${activeTab === item.key ? "bg-background/10 text-primary" : "text-background/70 hover:text-background hover:bg-background/5"}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-background/10">
          <Link to="/" className="flex items-center gap-2 text-sm text-background/50 hover:text-background"><Eye className="w-4 h-4" /> Ver Loja</Link>
          <Link to="/login" className="flex items-center gap-2 text-sm text-background/50 hover:text-background mt-3"><LogOut className="w-4 h-4" /> Sair</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-muted">
        <header className="bg-background border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold capitalize">{sidebarItems.find(i => i.key === activeTab)?.label}</h1>
          <span className="text-sm text-muted-foreground">Olá, Admin</span>
        </header>

        <div className="p-8">
          {activeTab === "dashboard" && <DashboardPanel />}
          {activeTab === "appearance" && <AppearancePanel />}
          {activeTab === "banners" && <BannersPanel />}
          {activeTab === "products" && <ProductsPanel />}
          {activeTab === "menus" && <MenusPanel />}
          {activeTab === "payments" && <PaymentsPanel />}
          {activeTab === "shipping" && <ShippingPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="bg-background border border-border rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const DashboardPanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <StatCard icon={DollarSign} label="Vendas hoje" value="R$2.450,00" color="bg-primary/10 text-primary" />
    <StatCard icon={Package} label="Pedidos" value="28" color="bg-blue-50 text-blue-600" />
    <StatCard icon={Users} label="Clientes" value="1.342" color="bg-green-50 text-green-600" />
    <StatCard icon={ShoppingBag} label="Produtos" value="156" color="bg-amber-50 text-amber-600" />
  </div>
);

const AppearancePanel = () => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-6">
    <h2 className="font-bold text-lg">Personalizar Aparência</h2>
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium block mb-2">Nome da Loja</label>
        <input defaultValue="Flex Moda" className="w-full border border-border rounded-sm p-3 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium block mb-2">Cor Primária</label>
        <div className="flex items-center gap-3">
          <input type="color" defaultValue="#d6246e" className="w-10 h-10 cursor-pointer" />
          <input defaultValue="#d6246e" className="border border-border rounded-sm p-3 text-sm flex-1" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium block mb-2">Cor de Fundo</label>
        <div className="flex items-center gap-3">
          <input type="color" defaultValue="#ffffff" className="w-10 h-10 cursor-pointer" />
          <input defaultValue="#ffffff" className="border border-border rounded-sm p-3 text-sm flex-1" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium block mb-2">Cor do Texto</label>
        <div className="flex items-center gap-3">
          <input type="color" defaultValue="#222222" className="w-10 h-10 cursor-pointer" />
          <input defaultValue="#222222" className="border border-border rounded-sm p-3 text-sm flex-1" />
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
    <Button variant="shop">SALVAR ALTERAÇÕES</Button>
  </div>
);

const BannersPanel = () => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-lg">Banners e Slides</h2>
      <Button variant="shop">+ NOVO BANNER</Button>
    </div>
    {["Banner Principal 1", "Banner Principal 2", "Banner Destaque", "Promo 1", "Promo 2", "Promo 3"].map((b) => (
      <div key={b} className="flex items-center justify-between p-4 border border-border rounded-sm">
        <div className="flex items-center gap-4">
          <div className="w-20 h-12 bg-shop-gray rounded-sm" />
          <span className="text-sm font-medium">{b}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="shop-outline" size="sm">Editar</Button>
          <Button variant="outline" size="sm" className="text-destructive">Excluir</Button>
        </div>
      </div>
    ))}
  </div>
);

const ProductsPanel = () => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-lg">Produtos</h2>
      <Button variant="shop">+ NOVO PRODUTO</Button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border text-left"><th className="pb-3 font-medium">Produto</th><th className="pb-3 font-medium">Preço</th><th className="pb-3 font-medium">Estoque</th><th className="pb-3 font-medium">Status</th><th className="pb-3"></th></tr></thead>
        <tbody>
          {[
            { name: "Tênis Casual Branco", price: "R$199,90", stock: 45, active: true },
            { name: "Bolsa Couro Premium", price: "R$199,90", stock: 12, active: true },
            { name: "Óculos Gold Edition", price: "R$199,90", stock: 0, active: false },
            { name: "Camiseta Premium", price: "R$199,90", stock: 88, active: true },
          ].map((p) => (
            <tr key={p.name} className="border-b border-border">
              <td className="py-3">{p.name}</td>
              <td className="py-3">{p.price}</td>
              <td className="py-3">{p.stock}</td>
              <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${p.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{p.active ? "Ativo" : "Inativo"}</span></td>
              <td className="py-3 text-right"><Button variant="ghost" size="sm">Editar</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MenusPanel = () => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-6">
    <h2 className="font-bold text-lg">Gerenciar Menus</h2>
    <div className="space-y-3">
      {["FEMININO", "MASCULINO", "CALÇADOS", "ACESSÓRIOS", "MARCAS"].map((m) => (
        <div key={m} className="flex items-center justify-between p-3 border border-border rounded-sm">
          <div className="flex items-center gap-3">
            <Menu className="w-4 h-4 text-muted-foreground cursor-grab" />
            <input defaultValue={m} className="border border-border rounded-sm p-2 text-sm" />
            <input defaultValue="/" placeholder="Link" className="border border-border rounded-sm p-2 text-sm w-40" />
          </div>
          <Button variant="outline" size="sm" className="text-destructive">Excluir</Button>
        </div>
      ))}
    </div>
    <div className="flex gap-2">
      <Button variant="shop-outline">+ ADICIONAR ITEM</Button>
      <Button variant="shop">SALVAR</Button>
    </div>
  </div>
);

const PaymentsPanel = () => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-6">
    <h2 className="font-bold text-lg">Integrações de Pagamento</h2>
    {[
      { name: "Mercado Pago", desc: "Receba pagamentos via Pix, cartão, boleto", connected: true },
      { name: "PagSeguro", desc: "Pagamentos com PagSeguro/PagBank", connected: false },
      { name: "Pagar.me", desc: "Gateway de pagamento completo", connected: false },
    ].map((g) => (
      <div key={g.name} className="flex items-center justify-between p-6 border border-border rounded-sm">
        <div>
          <h3 className="font-semibold">{g.name}</h3>
          <p className="text-sm text-muted-foreground">{g.desc}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-xs px-3 py-1 rounded-full ${g.connected ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"}`}>
            {g.connected ? "Conectado" : "Desconectado"}
          </span>
          <Button variant={g.connected ? "shop-outline" : "shop"} size="sm">{g.connected ? "Configurar" : "Conectar"}</Button>
        </div>
      </div>
    ))}
  </div>
);

const ShippingPanel = () => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-6">
    <h2 className="font-bold text-lg">Integrações de Envio</h2>
    {[
      { name: "Correios", desc: "PAC, SEDEX, Mini Envios", connected: true },
      { name: "Melhor Envio", desc: "Cotação com múltiplas transportadoras", connected: false },
      { name: "Jadlog", desc: "Encomendas e cargas", connected: false },
    ].map((s) => (
      <div key={s.name} className="flex items-center justify-between p-6 border border-border rounded-sm">
        <div>
          <h3 className="font-semibold">{s.name}</h3>
          <p className="text-sm text-muted-foreground">{s.desc}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-xs px-3 py-1 rounded-full ${s.connected ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"}`}>
            {s.connected ? "Conectado" : "Desconectado"}
          </span>
          <Button variant={s.connected ? "shop-outline" : "shop"} size="sm">{s.connected ? "Configurar" : "Conectar"}</Button>
        </div>
      </div>
    ))}
    <div className="border-t border-border pt-6">
      <h3 className="font-semibold mb-3">Calcular Frete</h3>
      <div className="flex gap-3">
        <input placeholder="CEP de origem" className="border border-border rounded-sm p-3 text-sm flex-1" />
        <input placeholder="CEP de destino" className="border border-border rounded-sm p-3 text-sm flex-1" />
        <Button variant="shop">CALCULAR</Button>
      </div>
    </div>
  </div>
);

const SettingsPanel = () => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-6">
    <h2 className="font-bold text-lg">Configurações Gerais</h2>
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium block mb-2">Nome da Loja</label>
        <input defaultValue="Flex Moda" className="w-full border border-border rounded-sm p-3 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium block mb-2">E-mail de Contato</label>
        <input defaultValue="contato@dominio.com.br" className="w-full border border-border rounded-sm p-3 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium block mb-2">Telefone</label>
        <input defaultValue="(00) 00000-0000" className="w-full border border-border rounded-sm p-3 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium block mb-2">CNPJ</label>
        <input defaultValue="00.000.000/0001-00" className="w-full border border-border rounded-sm p-3 text-sm" />
      </div>
      <div className="col-span-2">
        <label className="text-sm font-medium block mb-2">Endereço</label>
        <input defaultValue="Cidade/Estado" className="w-full border border-border rounded-sm p-3 text-sm" />
      </div>
      <div className="col-span-2">
        <label className="text-sm font-medium block mb-2">Horário de Atendimento</label>
        <input defaultValue="Seg a sex das 9 às 12h | 14-18h" className="w-full border border-border rounded-sm p-3 text-sm" />
      </div>
    </div>
    <Button variant="shop">SALVAR CONFIGURAÇÕES</Button>
  </div>
);

export default Admin;
