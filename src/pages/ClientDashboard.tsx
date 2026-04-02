import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { User, Package, Heart, MapPin, LogOut, Eye, X } from "lucide-react";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
  Entregue: "bg-green-50 text-green-600",
  Enviado: "bg-blue-50 text-blue-600",
  Processando: "bg-amber-50 text-amber-600",
  Cancelado: "bg-red-50 text-red-600",
};

interface Address {
  id: number;
  label: string;
  street: string;
  neighborhood: string;
  city: string;
  cep: string;
  main: boolean;
}

const ClientDashboard = () => {
  const { currentUser, setCurrentUser, orders, products } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pedidos");

  // Profile state
  const [profileName, setProfileName] = useState(currentUser?.name || "");
  const [profileCpf, setProfileCpf] = useState("123.456.789-00");
  const [profilePhone, setProfilePhone] = useState("(11) 98765-4321");
  const [profileBirth, setProfileBirth] = useState("15/06/1990");
  const [profileGender, setProfileGender] = useState("feminino");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");

  // Addresses state
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: "Casa", street: "Rua Exemplo, 123 - Apto 45", neighborhood: "Centro", city: "São Paulo/SP", cep: "01001-000", main: true },
    { id: 2, label: "Trabalho", street: "Av. Paulista, 1000 - Sala 200", neighborhood: "Bela Vista", city: "São Paulo/SP", cep: "01310-100", main: false },
  ]);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [editAddrId, setEditAddrId] = useState<number | null>(null);
  const [addrLabel, setAddrLabel] = useState("");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrNeighborhood, setAddrNeighborhood] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrCep, setAddrCep] = useState("");

  // Favorites
  const [favorites, setFavorites] = useState<number[]>([1, 2, 3]);

  // Tracking modal
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);

  const clientOrders = orders.filter(o => o.email === currentUser?.email);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const handleSaveProfile = () => {
    if (currentUser) setCurrentUser({ ...currentUser, name: profileName });
    toast.success("Dados atualizados com sucesso!");
  };

  const handleChangePassword = () => {
    if (!currentPw || !newPw) { toast.error("Preencha ambos os campos"); return; }
    if (newPw.length < 6) { toast.error("A nova senha deve ter pelo menos 6 caracteres"); return; }
    toast.success("Senha alterada com sucesso!");
    setCurrentPw(""); setNewPw("");
  };

  const openAddrForm = (addr?: Address) => {
    if (addr) {
      setEditAddrId(addr.id); setAddrLabel(addr.label); setAddrStreet(addr.street);
      setAddrNeighborhood(addr.neighborhood); setAddrCity(addr.city); setAddrCep(addr.cep);
    } else {
      setEditAddrId(null); setAddrLabel(""); setAddrStreet(""); setAddrNeighborhood(""); setAddrCity(""); setAddrCep("");
    }
    setShowAddrForm(true);
  };

  const saveAddr = () => {
    if (!addrLabel || !addrStreet || !addrCep) { toast.error("Preencha os campos obrigatórios"); return; }
    if (editAddrId) {
      setAddresses(addresses.map(a => a.id === editAddrId ? { ...a, label: addrLabel, street: addrStreet, neighborhood: addrNeighborhood, city: addrCity, cep: addrCep } : a));
      toast.success("Endereço atualizado!");
    } else {
      setAddresses([...addresses, { id: Date.now(), label: addrLabel, street: addrStreet, neighborhood: addrNeighborhood, city: addrCity, cep: addrCep, main: false }]);
      toast.success("Endereço adicionado!");
    }
    setShowAddrForm(false);
  };

  const deleteAddr = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success("Endereço removido!");
  };

  const setMainAddr = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, main: a.id === id })));
    toast.success("Endereço principal atualizado!");
  };

  const removeFavorite = (productId: number) => {
    setFavorites(favorites.filter(f => f !== productId));
    toast.success("Removido dos favoritos!");
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
          <aside className="space-y-2">
            <div className="bg-muted rounded-lg p-4 mb-4">
              <p className="font-bold">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
            </div>
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </aside>

          <div className="md:col-span-3">
            {/* PEDIDOS */}
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
                          <Button variant="shop-outline" size="sm" className="gap-1" onClick={() => setTrackingOrder(order.id)}>
                            <Eye className="w-3 h-3" /> Rastrear
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {/* Tracking Modal */}
                {trackingOrder && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setTrackingOrder(null)}>
                    <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Rastreamento {trackingOrder}</h3>
                        <button onClick={() => setTrackingOrder(null)}><X className="w-5 h-5" /></button>
                      </div>
                      <div className="space-y-4">
                        {[
                          { date: "31/03/2026 14:30", status: "Objeto postado", local: "São Paulo/SP" },
                          { date: "01/04/2026 08:15", status: "Em trânsito", local: "Campinas/SP" },
                          { date: "01/04/2026 18:00", status: "Em trânsito - centro de distribuição", local: "Ribeirão Preto/SP" },
                          { date: "02/04/2026 10:00", status: "Saiu para entrega", local: "Destino" },
                        ].map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                              {i < 3 && <div className="w-0.5 h-8 bg-muted-foreground/20" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{step.status}</p>
                              <p className="text-xs text-muted-foreground">{step.date} - {step.local}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PERFIL */}
            {activeTab === "perfil" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Meus Dados</h2>
                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Nome Completo</label>
                      <input value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">E-mail</label>
                      <input defaultValue={currentUser?.email} className="w-full border border-border rounded-sm p-3 text-sm bg-muted" readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">CPF</label>
                      <input value={profileCpf} onChange={e => setProfileCpf(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Telefone</label>
                      <input value={profilePhone} onChange={e => setProfilePhone(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Data de Nascimento</label>
                      <input value={profileBirth} onChange={e => setProfileBirth(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Gênero</label>
                      <select value={profileGender} onChange={e => setProfileGender(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm">
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  <Button variant="shop" onClick={handleSaveProfile}>SALVAR ALTERAÇÕES</Button>
                </div>
                <div className="border border-border rounded-lg p-6 space-y-4">
                  <h3 className="font-bold">Alterar Senha</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Senha Atual</label>
                      <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Nova Senha</label>
                      <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm" />
                    </div>
                  </div>
                  <Button variant="shop-outline" onClick={handleChangePassword}>ALTERAR SENHA</Button>
                </div>
              </div>
            )}

            {/* ENDEREÇOS */}
            {activeTab === "enderecos" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Meus Endereços</h2>
                  <Button variant="shop" size="sm" onClick={() => openAddrForm()}>+ NOVO ENDEREÇO</Button>
                </div>

                {showAddrForm && (
                  <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{editAddrId ? "Editar" : "Novo"} Endereço</h3>
                      <button onClick={() => setShowAddrForm(false)}><X className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-1">Apelido (ex: Casa)</label>
                        <input value={addrLabel} onChange={e => setAddrLabel(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">CEP</label>
                        <input value={addrCep} onChange={e => setAddrCep(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-medium block mb-1">Endereço</label>
                        <input value={addrStreet} onChange={e => setAddrStreet(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">Bairro</label>
                        <input value={addrNeighborhood} onChange={e => setAddrNeighborhood(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">Cidade/UF</label>
                        <input value={addrCity} onChange={e => setAddrCity(e.target.value)} className="w-full border border-border rounded-sm p-2 text-sm" />
                      </div>
                    </div>
                    <Button variant="shop" onClick={saveAddr}>SALVAR ENDEREÇO</Button>
                  </div>
                )}

                {addresses.map(addr => (
                  <div key={addr.id} className="border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        {addr.main && <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-semibold">Principal</span>}
                        <p className="font-medium mt-2">{addr.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{addr.street}</p>
                        <p className="text-sm text-muted-foreground">{addr.neighborhood} - {addr.city}</p>
                        <p className="text-sm text-muted-foreground">CEP: {addr.cep}</p>
                      </div>
                      <div className="flex gap-2">
                        {!addr.main && <Button variant="ghost" size="sm" onClick={() => setMainAddr(addr.id)}>Definir Principal</Button>}
                        <Button variant="ghost" size="sm" onClick={() => openAddrForm(addr)}>Editar</Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteAddr(addr.id)}>Excluir</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAVORITOS */}
            {activeTab === "favoritos" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Meus Favoritos</h2>
                {favorites.length === 0 ? (
                  <div className="text-center py-12 border border-border rounded-lg">
                    <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Você não tem favoritos ainda</p>
                    <Link to="/"><Button variant="shop">EXPLORAR PRODUTOS</Button></Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map(fId => {
                      const p = products.find(pr => pr.id === fId);
                      if (!p) return null;
                      return (
                        <div key={p.id} className="border border-border rounded-lg overflow-hidden group relative">
                          <button onClick={() => removeFavorite(p.id)} className="absolute top-2 right-2 z-10 bg-background/80 rounded-full p-1.5 hover:bg-destructive hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                          </button>
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
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
