import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import {
  User, Package, Heart, MapPin, LogOut, Eye, X, LayoutDashboard,
  Ticket, Bell, ShoppingBag, Star, TrendingUp, CreditCard, Truck,
  CheckCircle, Clock, XCircle, RefreshCw, Copy, Gift, ChevronRight,
  Camera, Shield, Mail, Phone, Calendar, Edit2, Trash2, Plus, Home
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const statusColor: Record<string, string> = {
  Entregue: "bg-green-100/80 text-green-700 border border-green-200",
  Enviado: "bg-blue-100/80 text-blue-700 border border-blue-200",
  Processando: "bg-amber-100/80 text-amber-700 border border-amber-200",
  Cancelado: "bg-red-100/80 text-red-700 border border-red-200",
};

const statusIcon: Record<string, typeof CheckCircle> = {
  Entregue: CheckCircle,
  Enviado: Truck,
  Processando: Clock,
  Cancelado: XCircle,
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

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "order" | "promo" | "system";
}

const mockNotifications: Notification[] = [
  { id: 1, title: "Pedido Enviado! 🚀", message: "Seu pedido #1229 foi despachado e está a caminho.", date: "31/03/2026", read: false, type: "order" },
  { id: 2, title: "Cupom Exclusivo! 🎉", message: "Use FLEX10 e ganhe 10% de desconto na sua próxima compra.", date: "30/03/2026", read: false, type: "promo" },
  { id: 3, title: "Avalie seu pedido ⭐", message: "Conta pra gente como foi sua experiência com o pedido #1228.", date: "28/03/2026", read: true, type: "system" },
  { id: 4, title: "Promoção Relâmpago ⚡", message: "Até 50% OFF em toda a coleção de verão por tempo limitado!", date: "27/03/2026", read: true, type: "promo" },
  { id: 5, title: "Bem-vindo(a)! 👋", message: "Sua conta foi criada com sucesso. Aproveite as ofertas exclusivas!", date: "25/03/2026", read: true, type: "system" },
];

const ClientDashboard = () => {
  const { currentUser, setCurrentUser, orders, products, coupons, wishlist, setWishlist, cart, setCart } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resumo");
  const [avatar, setAvatar] = useState("");

  // Profile state
  const [profileName, setProfileName] = useState(currentUser?.name || "");
  const [profileCpf, setProfileCpf] = useState("123.456.789-00");
  const [profilePhone, setProfilePhone] = useState("(11) 98765-4321");
  const [profileBirth, setProfileBirth] = useState("15/06/1990");
  const [profileGender, setProfileGender] = useState("feminino");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

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

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Tracking modal
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);

  // Order detail modal
  const [detailOrder, setDetailOrder] = useState<string | null>(null);

  const clientOrders = orders.filter(o => o.email === currentUser?.email);

  const stats = useMemo(() => {
    const totalSpent = clientOrders.reduce((sum, o) => {
      const val = parseFloat(o.total.replace("R$", "").replace(".", "").replace(",", "."));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
    return {
      totalOrders: clientOrders.length,
      delivered: clientOrders.filter(o => o.status === "Entregue").length,
      inTransit: clientOrders.filter(o => o.status === "Enviado").length,
      totalSpent,
      favCount: wishlist.length,
      loyalty: Math.min(100, clientOrders.length * 15),
    };
  }, [clientOrders, wishlist]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => { setCurrentUser(null); navigate("/"); };

  const handleSaveProfile = () => {
    if (currentUser) setCurrentUser({ ...currentUser, name: profileName });
    toast.success("Dados atualizados com sucesso!");
  };

  const handleChangePassword = () => {
    if (!currentPw || !newPw || !confirmPw) { toast.error("Preencha todos os campos"); return; }
    if (newPw.length < 6) { toast.error("A nova senha deve ter pelo menos 6 caracteres"); return; }
    if (newPw !== confirmPw) { toast.error("As senhas não conferem"); return; }
    toast.success("Senha alterada com sucesso!");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setAvatar(ev.target?.result as string); toast.success("Foto atualizada!"); };
      reader.readAsDataURL(file);
    }
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

  const deleteAddr = (id: number) => { setAddresses(addresses.filter(a => a.id !== id)); toast.success("Endereço removido!"); };
  const setMainAddr = (id: number) => { setAddresses(addresses.map(a => ({ ...a, main: a.id === id }))); toast.success("Endereço principal atualizado!"); };

  const removeFavorite = (productId: number) => { setWishlist(wishlist.filter(f => f !== productId)); toast.success("Removido dos favoritos!"); };

  const handleReorder = (order: typeof clientOrders[0]) => {
    const newCart = order.items.map(item => {
      const product = products.find(p => p.name.includes(item.name.split(" ").slice(0, 2).join(" ")));
      return { productId: product?.id || 1, qty: item.qty, size: product?.sizes[0] || "M", color: product?.colors[0]?.name || "" };
    });
    setCart([...cart, ...newCart]);
    toast.success("Produtos adicionados ao carrinho!");
    navigate("/carrinho");
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("Todas notificações marcadas como lidas");
  };

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Cupom ${code} copiado!`);
  };

  const tabs = [
    { key: "resumo", label: "Resumo", icon: LayoutDashboard },
    { key: "pedidos", label: "Meus Pedidos", icon: Package },
    { key: "perfil", label: "Meus Dados", icon: User },
    { key: "enderecos", label: "Endereços", icon: MapPin },
    { key: "favoritos", label: "Favoritos", icon: Heart },
    { key: "cupons", label: "Cupons", icon: Ticket },
    { key: "notificacoes", label: "Notificações", icon: Bell, badge: unreadCount },
  ];

  const inputClass = "w-full border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <aside className="space-y-1">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 mb-4 text-center border border-primary/10">
              <div className="relative w-20 h-20 mx-auto mb-3">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary/30" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors shadow-md">
                  <Camera className="w-3.5 h-3.5" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>
              <p className="font-bold text-sm">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
              <div className="mt-3 bg-background/60 rounded-lg p-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Fidelidade</span>
                  <span className="font-semibold text-primary">{stats.loyalty}%</span>
                </div>
                <Progress value={stats.loyalty} className="h-2" />
              </div>
            </div>
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm transition-all ${activeTab === tab.key ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "hover:bg-muted text-foreground"}`}>
                <span className="flex items-center gap-3">
                  <tab.icon className="w-4 h-4" />{tab.label}
                </span>
                {tab.badge && tab.badge > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary text-primary-foreground"}`}>{tab.badge}</span>
                )}
              </button>
            ))}
            <hr className="my-2 border-border" />
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" /> Sair da Conta
            </button>
          </aside>

          {/* MAIN CONTENT */}
          <div className="md:col-span-3">

            {/* RESUMO */}
            {activeTab === "resumo" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Olá, {currentUser?.name?.split(" ")[0]}! 👋</h2>
                  <p className="text-muted-foreground text-sm mt-1">Aqui está o resumo da sua conta</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: ShoppingBag, label: "Pedidos", value: stats.totalOrders, color: "text-blue-600 bg-blue-50" },
                    { icon: Truck, label: "A Caminho", value: stats.inTransit, color: "text-amber-600 bg-amber-50" },
                    { icon: CheckCircle, label: "Entregues", value: stats.delivered, color: "text-green-600 bg-green-50" },
                    { icon: Heart, label: "Favoritos", value: stats.favCount, color: "text-pink-600 bg-pink-50" },
                  ].map((card, i) => (
                    <div key={i} className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-bold">{card.value}</p>
                      <p className="text-xs text-muted-foreground">{card.label}</p>
                    </div>
                  ))}
                </div>

                <div className="border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">Total em Compras</h3>
                  </div>
                  <p className="text-3xl font-bold text-primary">R$ {stats.totalSpent.toFixed(2).replace(".", ",")}</p>
                  <p className="text-xs text-muted-foreground mt-1">Economia total com descontos: <span className="text-green-600 font-semibold">R$ 127,40</span></p>
                </div>

                {/* Últimos pedidos */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Últimos Pedidos</h3>
                    <button onClick={() => setActiveTab("pedidos")} className="text-sm text-primary hover:underline flex items-center gap-1">
                      Ver todos <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {clientOrders.slice(0, 3).map(order => {
                      const Icon = statusIcon[order.status] || Clock;
                      return (
                        <div key={order.id} className="border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setDetailOrder(order.id)}>
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{order.id}</p>
                              <p className="text-xs text-muted-foreground">{order.date} • {order.items.length} {order.items.length === 1 ? "item" : "itens"}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">{order.total}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>{order.status}</span>
                          </div>
                        </div>
                      );
                    })}
                    {clientOrders.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        Nenhum pedido ainda. <Link to="/" className="text-primary hover:underline">Comece a comprar!</Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cupons disponíveis preview */}
                {coupons.filter(c => c.active).length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center gap-2"><Gift className="w-4 h-4 text-primary" /> Cupons Disponíveis</h3>
                      <button onClick={() => setActiveTab("cupons")} className="text-sm text-primary hover:underline flex items-center gap-1">
                        Ver todos <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {coupons.filter(c => c.active).slice(0, 3).map(c => (
                        <div key={c.code} className="min-w-[200px] border-2 border-dashed border-primary/30 rounded-xl p-4 bg-primary/5 flex-shrink-0">
                          <p className="font-bold text-primary text-lg">{c.type === "percent" ? `${c.discount}% OFF` : `R$${c.discount} OFF`}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <code className="bg-background px-2 py-1 rounded text-xs font-mono font-bold border border-border">{c.code}</code>
                            <button onClick={() => copyCoupon(c.code)} className="text-primary hover:text-primary/70"><Copy className="w-3.5 h-3.5" /></button>
                          </div>
                          {c.minValue > 0 && <p className="text-xs text-muted-foreground mt-1">Mín. R${c.minValue}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PEDIDOS */}
            {activeTab === "pedidos" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Meus Pedidos</h2>
                {clientOrders.length === 0 ? (
                  <div className="text-center py-16 border border-border rounded-xl">
                    <Package className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
                    <p className="text-lg font-medium mb-2">Nenhum pedido encontrado</p>
                    <p className="text-muted-foreground text-sm mb-6">Que tal explorar nossa loja?</p>
                    <Link to="/"><Button variant="shop">COMEÇAR A COMPRAR</Button></Link>
                  </div>
                ) : (
                  clientOrders.map(order => {
                    const Icon = statusIcon[order.status] || Clock;
                    return (
                      <div key={order.id} className="border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-muted/30 px-6 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            <span className="font-bold text-sm">{order.id}</span>
                            <span className="text-xs text-muted-foreground">{order.date}</span>
                            {order.paymentMethod && <span className="text-xs bg-background border border-border px-2 py-0.5 rounded-full"><CreditCard className="w-3 h-3 inline mr-1" />{order.paymentMethod}</span>}
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[order.status]}`}>{order.status}</span>
                        </div>
                        <div className="p-6">
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm items-center">
                                <span className="flex items-center gap-2">
                                  <span className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs font-bold">{item.qty}x</span>
                                  {item.name}
                                </span>
                                <span className="font-medium">{item.price}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-border pt-4 flex flex-wrap justify-between items-center gap-3">
                            <div>
                              <span className="text-lg font-bold">{order.total}</span>
                              {order.shippingMethod && <span className="text-xs text-muted-foreground ml-2">via {order.shippingMethod}</span>}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="shop-outline" size="sm" onClick={() => setDetailOrder(order.id)}>
                                <Eye className="w-3 h-3 mr-1" /> Detalhes
                              </Button>
                              {order.status === "Enviado" && (
                                <Button variant="shop" size="sm" onClick={() => setTrackingOrder(order.id)}>
                                  <Truck className="w-3 h-3 mr-1" /> Rastrear
                                </Button>
                              )}
                              {order.status === "Entregue" && (
                                <Button variant="shop-outline" size="sm" onClick={() => handleReorder(order)}>
                                  <RefreshCw className="w-3 h-3 mr-1" /> Comprar Novamente
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* PERFIL */}
            {activeTab === "perfil" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Meus Dados</h2>
                <div className="border border-border rounded-xl p-6 space-y-5">
                  <h3 className="font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Informações Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1"><User className="w-3 h-3" /> Nome Completo</label>
                      <input value={profileName} onChange={e => setProfileName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1"><Mail className="w-3 h-3" /> E-mail</label>
                      <input defaultValue={currentUser?.email} className={`${inputClass} bg-muted cursor-not-allowed`} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1"><Shield className="w-3 h-3" /> CPF</label>
                      <input value={profileCpf} onChange={e => setProfileCpf(e.target.value)} className={inputClass} placeholder="000.000.000-00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1"><Phone className="w-3 h-3" /> Telefone</label>
                      <input value={profilePhone} onChange={e => setProfilePhone(e.target.value)} className={inputClass} placeholder="(00) 00000-0000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1"><Calendar className="w-3 h-3" /> Data de Nascimento</label>
                      <input value={profileBirth} onChange={e => setProfileBirth(e.target.value)} className={inputClass} placeholder="DD/MM/AAAA" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Gênero</label>
                      <select value={profileGender} onChange={e => setProfileGender(e.target.value)} className={inputClass}>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                        <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                      </select>
                    </div>
                  </div>
                  <Button variant="shop" onClick={handleSaveProfile} className="mt-2">SALVAR ALTERAÇÕES</Button>
                </div>

                <div className="border border-border rounded-xl p-6 space-y-5">
                  <h3 className="font-semibold flex items-center gap-2"><Shield className="w-4 h-4" /> Alterar Senha</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Senha Atual</label>
                      <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Nova Senha</label>
                      <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Confirmar Nova Senha</label>
                      <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <Button variant="shop-outline" onClick={handleChangePassword}>ALTERAR SENHA</Button>
                </div>

                <div className="border border-border rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2"><Bell className="w-4 h-4" /> Preferências de Comunicação</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Receber novidades por e-mail", defaultChecked: true },
                      { label: "Notificações de promoções", defaultChecked: true },
                      { label: "Atualizações de pedidos por SMS", defaultChecked: false },
                    ].map((pref, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked={pref.defaultChecked} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                        <span className="text-sm">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                  <Button variant="shop-outline" size="sm" onClick={() => toast.success("Preferências salvas!")}>SALVAR PREFERÊNCIAS</Button>
                </div>
              </div>
            )}

            {/* ENDEREÇOS */}
            {activeTab === "enderecos" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Meus Endereços</h2>
                  <Button variant="shop" size="sm" onClick={() => openAddrForm()} className="gap-1">
                    <Plus className="w-4 h-4" /> NOVO ENDEREÇO
                  </Button>
                </div>

                {showAddrForm && (
                  <div className="border-2 border-primary/30 bg-primary/5 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{editAddrId ? "Editar" : "Novo"} Endereço</h3>
                      <button onClick={() => setShowAddrForm(false)} className="p-1 hover:bg-muted rounded"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Apelido (ex: Casa)</label>
                        <input value={addrLabel} onChange={e => setAddrLabel(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1.5">CEP</label>
                        <input value={addrCep} onChange={e => setAddrCep(e.target.value)} className={inputClass} placeholder="00000-000" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium block mb-1.5">Endereço Completo</label>
                        <input value={addrStreet} onChange={e => setAddrStreet(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Bairro</label>
                        <input value={addrNeighborhood} onChange={e => setAddrNeighborhood(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Cidade/UF</label>
                        <input value={addrCity} onChange={e => setAddrCity(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="shop" onClick={saveAddr}>SALVAR ENDEREÇO</Button>
                      <Button variant="shop-outline" onClick={() => setShowAddrForm(false)}>CANCELAR</Button>
                    </div>
                  </div>
                )}

                {addresses.map(addr => (
                  <div key={addr.id} className={`border rounded-xl p-5 transition-all ${addr.main ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${addr.main ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{addr.label}</p>
                            {addr.main && <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">Principal</span>}
                          </div>
                          <p className="text-sm text-muted-foreground">{addr.street}</p>
                          <p className="text-sm text-muted-foreground">{addr.neighborhood} - {addr.city}</p>
                          <p className="text-sm text-muted-foreground">CEP: {addr.cep}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!addr.main && (
                          <Button variant="ghost" size="sm" onClick={() => setMainAddr(addr.id)} className="text-xs"><Star className="w-3 h-3 mr-1" /> Principal</Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => openAddrForm(addr)}><Edit2 className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => deleteAddr(addr.id)}><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAVORITOS */}
            {activeTab === "favoritos" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Meus Favoritos ({wishlist.length})</h2>
                {wishlist.length === 0 ? (
                  <div className="text-center py-16 border border-border rounded-xl">
                    <Heart className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
                    <p className="text-lg font-medium mb-2">Nenhum favorito ainda</p>
                    <p className="text-muted-foreground text-sm mb-6">Explore e salve produtos que você ama</p>
                    <Link to="/"><Button variant="shop">EXPLORAR PRODUTOS</Button></Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlist.map(fId => {
                      const p = products.find(pr => pr.id === fId);
                      if (!p) return null;
                      return (
                        <div key={p.id} className="border border-border rounded-xl overflow-hidden group relative hover:shadow-md transition-shadow">
                          <button onClick={() => removeFavorite(p.id)} className="absolute top-2 right-2 z-10 bg-background/90 rounded-full p-1.5 hover:bg-destructive hover:text-white transition-all shadow-sm">
                            <X className="w-4 h-4" />
                          </button>
                          <Link to={`/produto/${p.id}`}>
                            <div className="aspect-square bg-muted overflow-hidden">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                          </Link>
                          <div className="p-4">
                            <h3 className="text-sm font-medium line-clamp-2 mb-2">{p.name}</h3>
                            {p.oldPrice && <p className="text-xs text-muted-foreground line-through">{p.oldPrice}</p>}
                            <p className="font-bold text-primary">{p.price}</p>
                            <p className="text-xs text-green-600 mb-3">{p.pixPrice} no PIX</p>
                            <div className="flex gap-2">
                              <Link to={`/produto/${p.id}`} className="flex-1">
                                <Button variant="shop" size="sm" className="w-full text-xs">VER</Button>
                              </Link>
                              <Button variant="shop-outline" size="sm" className="text-xs" onClick={() => {
                                setCart([...cart, { productId: p.id, qty: 1, size: p.sizes[0], color: p.colors[0]?.name || "" }]);
                                toast.success("Adicionado ao carrinho!");
                              }}>
                                <ShoppingBag className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* CUPONS */}
            {activeTab === "cupons" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Meus Cupons</h2>
                <p className="text-muted-foreground text-sm">Use esses cupons no checkout para economizar nas suas compras</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coupons.filter(c => c.active).map(c => (
                    <div key={c.code} className="border-2 border-dashed border-primary/30 rounded-xl overflow-hidden hover:border-primary/60 transition-colors">
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-2xl font-bold text-primary">{c.type === "percent" ? `${c.discount}%` : `R$${c.discount}`}</p>
                            <p className="text-sm font-medium">de desconto</p>
                          </div>
                          <Gift className="w-8 h-8 text-primary/30" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <code className="bg-muted px-3 py-1.5 rounded-lg text-sm font-mono font-bold flex-1 text-center border border-border">{c.code}</code>
                          <Button variant="shop-outline" size="sm" onClick={() => copyCoupon(c.code)} className="gap-1">
                            <Copy className="w-3 h-3" /> Copiar
                          </Button>
                        </div>
                        {c.minValue > 0 && (
                          <p className="text-xs text-muted-foreground">Pedido mínimo: R$ {c.minValue.toFixed(2).replace(".", ",")}</p>
                        )}
                        <p className="text-xs text-green-600 mt-1">✓ Cupom ativo</p>
                      </div>
                    </div>
                  ))}
                </div>
                {coupons.filter(c => c.active).length === 0 && (
                  <div className="text-center py-12 border border-border rounded-xl">
                    <Ticket className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground">Nenhum cupom disponível no momento</p>
                  </div>
                )}
              </div>
            )}

            {/* NOTIFICAÇÕES */}
            {activeTab === "notificacoes" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Notificações</h2>
                  {unreadCount > 0 && (
                    <Button variant="shop-outline" size="sm" onClick={markAllRead}>Marcar todas como lidas</Button>
                  )}
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className={`border rounded-xl p-4 flex gap-3 transition-all cursor-pointer hover:shadow-sm ${!n.read ? "border-primary/30 bg-primary/5" : "border-border"}`}
                      onClick={() => setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, read: true } : notif))}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        n.type === "order" ? "bg-blue-100 text-blue-600" :
                        n.type === "promo" ? "bg-green-100 text-green-600" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {n.type === "order" ? <Package className="w-4 h-4" /> :
                         n.type === "promo" ? <Ticket className="w-4 h-4" /> :
                         <Bell className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm ${!n.read ? "font-bold" : "font-medium"}`}>{n.title}</p>
                          {!n.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRACKING MODAL */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setTrackingOrder(null)}>
          <div className="bg-background rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg flex items-center gap-2"><Truck className="w-5 h-5 text-primary" /> Rastreamento {trackingOrder}</h3>
              <button onClick={() => setTrackingOrder(null)} className="p-1 hover:bg-muted rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-0">
              {[
                { date: "31/03/2026 14:30", status: "Objeto postado", local: "São Paulo/SP", done: true },
                { date: "01/04/2026 08:15", status: "Em trânsito", local: "Campinas/SP", done: true },
                { date: "01/04/2026 18:00", status: "Centro de distribuição", local: "Ribeirão Preto/SP", done: true },
                { date: "02/04/2026 10:00", status: "Saiu para entrega", local: "Destino", done: false },
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${i === arr.length - 1 ? "border-primary bg-primary animate-pulse" : step.done ? "border-green-500 bg-green-500" : "border-muted-foreground/30 bg-background"}`} />
                    {i < arr.length - 1 && <div className={`w-0.5 h-12 ${step.done ? "bg-green-500" : "bg-muted-foreground/20"}`} />}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${i === arr.length - 1 ? "text-primary" : ""}`}>{step.status}</p>
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                    <p className="text-xs text-muted-foreground">{step.local}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ORDER DETAIL MODAL */}
      {detailOrder && (() => {
        const order = clientOrders.find(o => o.id === detailOrder);
        if (!order) return null;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDetailOrder(null)}>
            <div className="bg-background rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-lg">Detalhes do Pedido {order.id}</h3>
                <button onClick={() => setDetailOrder(null)} className="p-1 hover:bg-muted rounded"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColor[order.status]}`}>{order.status}</span>
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </div>
                <hr className="border-border" />
                <div>
                  <p className="font-semibold text-sm mb-2">Itens do Pedido</p>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 text-sm border-b border-border last:border-0">
                      <span>{item.qty}x {item.name}</span>
                      <span className="font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-border" />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Pagamento:</span><p className="font-medium">{order.paymentMethod || "—"}</p></div>
                  <div><span className="text-muted-foreground">Envio:</span><p className="font-medium">{order.shippingMethod || "—"}</p></div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">{order.total}</span>
                </div>
                <div className="flex gap-2">
                  {order.status === "Enviado" && (
                    <Button variant="shop" className="flex-1" onClick={() => { setDetailOrder(null); setTrackingOrder(order.id); }}>
                      <Truck className="w-4 h-4 mr-1" /> Rastrear Pedido
                    </Button>
                  )}
                  {order.status === "Entregue" && (
                    <Button variant="shop" className="flex-1" onClick={() => { setDetailOrder(null); handleReorder(order); }}>
                      <RefreshCw className="w-4 h-4 mr-1" /> Comprar Novamente
                    </Button>
                  )}
                  <Button variant="shop-outline" className="flex-1" onClick={() => { toast.success("Nota fiscal será enviada por e-mail"); }}>
                    Nota Fiscal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </Layout>
  );
};

export default ClientDashboard;
