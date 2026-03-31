import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Palette, Image, ShoppingBag, CreditCard, Truck, Menu, Settings, LogOut,
  Eye, MessageSquare, Shield, Users
} from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import DashboardPanel from "@/components/admin/DashboardPanel";
import AppearancePanel from "@/components/admin/AppearancePanel";
import BannersPanel from "@/components/admin/BannersPanel";
import ProductsPanel from "@/components/admin/ProductsPanel";
import MenusPanel from "@/components/admin/MenusPanel";
import PaymentsPanel from "@/components/admin/PaymentsPanel";
import ShippingPanel from "@/components/admin/ShippingPanel";
import SettingsPanel from "@/components/admin/SettingsPanel";
import BadgesPanel from "@/components/admin/BadgesPanel";
import TestimonialsPanel from "@/components/admin/TestimonialsPanel";
import OrdersPanel from "@/components/admin/OrdersPanel";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: ShoppingBag, label: "Pedidos", key: "orders" },
  { icon: ShoppingBag, label: "Produtos", key: "products" },
  { icon: Palette, label: "Aparência", key: "appearance" },
  { icon: Image, label: "Banners e Slides", key: "banners" },
  { icon: Menu, label: "Menus", key: "menus" },
  { icon: CreditCard, label: "Pagamentos", key: "payments" },
  { icon: Truck, label: "Envios", key: "shipping" },
  { icon: Shield, label: "Selos e Bandeiras", key: "badges" },
  { icon: MessageSquare, label: "Depoimentos", key: "testimonials" },
  { icon: Settings, label: "Configurações", key: "settings" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { appearance, setCurrentUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-foreground text-background flex flex-col shrink-0">
        <div className="p-6 border-b border-background/10">
          <span className="text-xl font-extrabold">{appearance.storeName.split(" ")[0] || "FLEX"}</span>
          <span className="text-xs font-medium tracking-widest ml-1" style={{ color: appearance.primaryColor }}>ADMIN</span>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
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
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-background/50 hover:text-background mt-3 w-full"><LogOut className="w-4 h-4" /> Sair</button>
        </div>
      </aside>

      <main className="flex-1 bg-muted overflow-y-auto">
        <header className="bg-background border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold capitalize">{sidebarItems.find(i => i.key === activeTab)?.label}</h1>
          <span className="text-sm text-muted-foreground">Olá, Admin</span>
        </header>

        <div className="p-8">
          {activeTab === "dashboard" && <DashboardPanel />}
          {activeTab === "orders" && <OrdersPanel />}
          {activeTab === "products" && <ProductsPanel />}
          {activeTab === "appearance" && <AppearancePanel />}
          {activeTab === "banners" && <BannersPanel />}
          {activeTab === "menus" && <MenusPanel />}
          {activeTab === "payments" && <PaymentsPanel />}
          {activeTab === "shipping" && <ShippingPanel />}
          {activeTab === "badges" && <BadgesPanel />}
          {activeTab === "testimonials" && <TestimonialsPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
};

export default Admin;
