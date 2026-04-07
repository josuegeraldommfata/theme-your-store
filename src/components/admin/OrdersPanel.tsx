import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Info, Eye, ChevronDown, ChevronUp, Search, Download, Printer } from "lucide-react";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
  Entregue: "bg-green-50 text-green-600",
  Enviado: "bg-blue-50 text-blue-600",
  Processando: "bg-amber-50 text-amber-600",
  Cancelado: "bg-red-50 text-red-600",
};

const statusOptions = ["Processando", "Enviado", "Entregue", "Cancelado"] as const;

const OrdersPanel = () => {
  const { orders, setOrders } = useStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders
    .filter(o => filterStatus === "todos" || o.status === filterStatus)
    .filter(o => !searchTerm || o.id.includes(searchTerm) || o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    toast.success(`Pedido ${orderId} atualizado para "${newStatus}"`);
  };

  const statusCounts = {
    todos: orders.length,
    Processando: orders.filter(o => o.status === "Processando").length,
    Enviado: orders.filter(o => o.status === "Enviado").length,
    Entregue: orders.filter(o => o.status === "Entregue").length,
    Cancelado: orders.filter(o => o.status === "Cancelado").length,
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Gerenciar Pedidos</h2>
          <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Gerencie os pedidos, atualize status e veja detalhes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.success("Relatório exportado!")}>
            <Download className="w-3 h-3" /> Exportar
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por ID, cliente ou email..."
            className="w-full border border-border rounded-lg pl-10 pr-4 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["todos", ...statusOptions] as const).map(s => (
            <Button
              key={s}
              variant={filterStatus === s ? "shop" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(s)}
              className="gap-1"
            >
              {s === "todos" ? "Todos" : s}
              <span className="text-[10px] opacity-70">({statusCounts[s]})</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">Nenhum pedido encontrado</div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="border border-border rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm">{order.id}</span>
                  <span className="text-sm">{order.customer}</span>
                  <span className="text-xs text-muted-foreground hidden md:inline">{order.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm">{order.total}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColor[order.status]}`}>{order.status}</span>
                  <span className="text-xs text-muted-foreground hidden md:inline">{order.date}</span>
                  {expandedOrder === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="border-t border-border p-4 bg-muted/30 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Itens do Pedido</p>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm py-1">
                          <span>{item.qty}x {item.name}</span>
                          <span className="font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Detalhes</p>
                      <div className="text-sm space-y-1">
                        <p>📧 {order.email}</p>
                        <p>💳 {order.paymentMethod || "N/A"}</p>
                        <p>🚚 {order.shippingMethod || "N/A"}</p>
                        <p>📅 {order.date}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Ações</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium">Status:</label>
                          <select
                            value={order.status}
                            onChange={e => updateStatus(order.id, e.target.value)}
                            className="border border-border rounded-lg p-2 text-sm flex-1"
                          >
                            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <Button variant="outline" size="sm" className="w-full gap-1" onClick={() => toast.success("Nota fiscal gerada!")}>
                          <Printer className="w-3 h-3" /> Gerar Nota Fiscal
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPanel;
