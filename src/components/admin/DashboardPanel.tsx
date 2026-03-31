import { useStore } from "@/contexts/StoreContext";
import { ChevronRight, DollarSign, Package, Users, ShoppingBag, TrendingUp, Eye } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color, change }: { icon: any; label: string; value: string; color: string; change?: string }) => (
  <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
    {change && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{change}</p>}
  </div>
);

const statusColor: Record<string, string> = {
  Entregue: "bg-green-50 text-green-600",
  Enviado: "bg-blue-50 text-blue-600",
  Processando: "bg-amber-50 text-amber-600",
  Cancelado: "bg-red-50 text-red-600",
};

const DashboardPanel = () => {
  const { orders, products } = useStore();
  const activeProducts = products.filter(p => p.active).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Vendas hoje" value="R$2.450,00" color="bg-primary/10 text-primary" change="+12% vs ontem" />
        <StatCard icon={Package} label="Pedidos" value={String(orders.length)} color="bg-blue-50 text-blue-600" change="+5 novos" />
        <StatCard icon={Users} label="Clientes" value="1.342" color="bg-green-50 text-green-600" change="+18 este mês" />
        <StatCard icon={ShoppingBag} label="Produtos Ativos" value={String(activeProducts)} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Eye} label="Visitas hoje" value="3.421" color="bg-purple-50 text-purple-600" change="+8%" />
        <StatCard icon={DollarSign} label="Ticket Médio" value="R$87,50" color="bg-primary/10 text-primary" />
        <StatCard icon={TrendingUp} label="Conversão" value="3,2%" color="bg-green-50 text-green-600" change="+0,4%" />
      </div>

      <div className="bg-background border border-border rounded-lg p-6">
        <h2 className="font-bold text-lg mb-4">Últimos Pedidos</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium">Pedido</th>
              <th className="pb-3 font-medium">Cliente</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((o) => (
              <tr key={o.id} className="border-b border-border">
                <td className="py-3 font-medium">{o.id}</td>
                <td className="py-3">{o.customer}</td>
                <td className="py-3">{o.total}</td>
                <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${statusColor[o.status]}`}>{o.status}</span></td>
                <td className="py-3 text-muted-foreground">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPanel;
