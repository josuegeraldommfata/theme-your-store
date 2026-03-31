import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { User, Package, Heart, MapPin, LogOut, Eye, ChevronRight } from "lucide-react";

const statusColor: Record<string, string> = {
  Entregue: "bg-green-50 text-green-600",
  Enviado: "bg-blue-50 text-blue-600",
  Processando: "bg-amber-50 text-amber-600",
  Cancelado: "bg-red-50 text-red-600",
};

const ClientDashboard = () => {
  const { currentUser, setCurrentUser, orders, products } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pedidos");

  const clientOrders = orders.filter(o => o.email === currentUser?.email);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const tabs = [
    { key: "pedidos", label: "Meus Pedidos", icon: Package },
    { key: "perfil", label: "Meus Dados", icon: User },
    { key: "enderecos", label: "Endereços", icon: MapPin },
    { key: "favoritos", label: "Favoritos", icon: Heart },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-2">
            <div className="bg-muted rounded-lg p-4 mb-4">
              <p className="font-bold">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
            </div>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </aside>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === "pedidos" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Meus Pedidos</h2>
                {clientOrders.length === 0 ? (
                  <div className="text-center py-12 border border-border rounded-lg">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Você ainda não fez nenhum pedido</p>
                    <Link to="/"><Button variant="shop">COMEÇAR A COMPRAR</Button></Link>
                  </div>
                ) : (
                  clientOrders.map(order => (
                    <div key={order.id} className="border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="font-bold">{order.id}</span>
                          <span className="text-sm text-muted-foreground ml-3">{order.date}</span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${statusColor[order.status]}`}>{order.status}</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{item.qty}x {item.name}</span>
                            <span className="font-medium">{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between items-center">
                        <span className="font-bold">Total: {order.total}</span>
                        {order.status === "Enviado" && (
                          <Button variant="shop-outline" size="sm" className="gap-1"><Eye className="w-3 h-3" /> Rastrear</Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "perfil" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Meus Dados</h2>
                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Nome Completo</label>
                      <input defaultValue={currentUser?.name} className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">E-mail</label>
                      <input defaultValue={currentUser?.email} className="w-full border border-border rounded-sm p-3 text-sm" readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">CPF</label>
                      <input defaultValue="123.456.789-00" className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Telefone</label>
                      <input defaultValue="(11) 98765-4321" className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Data de Nascimento</label>
                      <input defaultValue="15/06/1990" className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Gênero</label>
                      <select defaultValue="feminino" className="w-full border border-border rounded-sm p-3 text-sm">
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  <Button variant="shop">SALVAR ALTERAÇÕES</Button>
                </div>
                <div className="border border-border rounded-lg p-6 space-y-4">
                  <h3 className="font-bold">Alterar Senha</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Senha Atual</label>
                      <input type="password" className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Nova Senha</label>
                      <input type="password" className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                  </div>
                  <Button variant="shop-outline">ALTERAR SENHA</Button>
                </div>
              </div>
            )}

            {activeTab === "enderecos" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Meus Endereços</h2>
                  <Button variant="shop" size="sm">+ NOVO ENDEREÇO</Button>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-semibold">Principal</span>
                      <p className="font-medium mt-2">Casa</p>
                      <p className="text-sm text-muted-foreground mt-1">Rua Exemplo, 123 - Apto 45</p>
                      <p className="text-sm text-muted-foreground">Centro - São Paulo/SP</p>
                      <p className="text-sm text-muted-foreground">CEP: 01001-000</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Excluir</Button>
                    </div>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Trabalho</p>
                      <p className="text-sm text-muted-foreground mt-1">Av. Paulista, 1000 - Sala 200</p>
                      <p className="text-sm text-muted-foreground">Bela Vista - São Paulo/SP</p>
                      <p className="text-sm text-muted-foreground">CEP: 01310-100</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Excluir</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "favoritos" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Meus Favoritos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products.slice(0, 3).map(p => (
                    <div key={p.id} className="border border-border rounded-lg overflow-hidden group">
                      <Link to={`/produto/${p.id}`}>
                        <div className="aspect-square bg-muted overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      </Link>
                      <div className="p-3">
                        <h3 className="text-sm font-medium line-clamp-1">{p.name}</h3>
                        <p className="font-bold text-sm mt-1">{p.price}</p>
                        <Link to={`/produto/${p.id}`}>
                          <Button variant="shop" size="sm" className="w-full mt-2 text-xs">VER PRODUTO</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
