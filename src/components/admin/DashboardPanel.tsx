import { useStore } from "@/contexts/StoreContext";
import { ChevronRight, DollarSign, Package, Users, ShoppingBag, TrendingUp, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color, change, positive }: { icon: any; label: string; value: string; color: string; change?: string; positive?: boolean }) => (
  <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      {change && (
        <span className={`text-xs font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full ${positive !== false ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {positive !== false ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

const statusColor: Record<string, string> = {
  Entregue: "bg-green-50 text-green-600",
  Enviado: "bg-blue-50 text-blue-600",
  Processando: "bg-amber-50 text-amber-600",
  Cancelado: "bg-red-50 text-red-600",
};

const salesData = [
  { day: "Seg", value: 1200 },
  { day: "Ter", value: 1800 },
  { day: "Qua", value: 2450 },
  { day: "Qui", value: 1900 },
  { day: "Sex", value: 3200 },
  { day: "Sáb", value: 2800 },
  { day: "Dom", value: 1500 },
];

const topProducts = [
  { name: "Tênis Casual Branco", sales: 45, revenue: "R$8.995,50" },
  { name: "Bolsa Couro Premium", sales: 28, revenue: "R$7.837,20" },
  { name: "Vestido Floral Verão", sales: 35, revenue: "R$7.696,50" },
  { name: "Camiseta Premium", sales: 62, revenue: "R$5.573,80" },
  { name: "Óculos Gold Edition", sales: 22, revenue: "R$3.297,80" },
];

const DashboardPanel = () => {
  const { orders, products } = useStore();
  const activeProducts = products.filter(p => p.active).length;
  const maxSale = Math.max(...salesData.map(d => d.value));

  const totalRevenue = orders.reduce((sum, o) => {
    const val = parseFloat(o.total.replace("R$", "").replace(".", "").replace(",", "."));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Vendas hoje" value="R$2.450,00" color="bg-primary/10 text-primary" change="+12%" />
        <StatCard icon={Package} label="Pedidos" value={String(orders.length)} color="bg-blue-50 text-blue-600" change="+5" />
        <StatCard icon={Users} label="Clientes" value="1.342" color="bg-green-50 text-green-600" change="+18" />
        <StatCard icon={ShoppingBag} label="Produtos Ativos" value={String(activeProducts)} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Eye} label="Visitas hoje" value="3.421" color="bg-purple-50 text-purple-600" change="+8%" />
        <StatCard icon={DollarSign} label="Receita Total" value={`R$${totalRevenue.toFixed(2).replace(".", ",")}`} color="bg-primary/10 text-primary" change="+23%" />
        <StatCard icon={TrendingUp} label="Taxa de Conversão" value="3,2%" color="bg-green-50 text-green-600" change="+0,4%" />
      </div>

      {/* Sales Chart */}
      <div className="bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg">Vendas da Semana</h2>
          <span className="text-sm text-muted-foreground">Últimos 7 dias</span>
        </div>
        <div className="flex items-end gap-3 h-48">
          {salesData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">R${(d.value / 1000).toFixed(1)}k</span>
              <div
                className="w-full rounded-t-lg bg-primary/20 hover:bg-primary/40 transition-colors relative group"
                style={{ height: `${(d.value / maxSale) * 100}%` }}
              >
                <div className="absolute bottom-0 w-full rounded-t-lg bg-primary" style={{ height: "60%" }} />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-background border border-border rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4">Últimos Pedidos</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <span className="font-semibold text-sm">{o.id}</span>
                  <p className="text-xs text-muted-foreground">{o.customer} • {o.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm">{o.total}</span>
                  <span className={`block text-xs px-2 py-0.5 rounded-full mt-1 ${statusColor[o.status]}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-background border border-border rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4">Produtos Mais Vendidos</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className="text-lg font-bold text-muted-foreground/50 w-6">#{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sales} vendas</p>
                </div>
                <span className="font-bold text-sm">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
