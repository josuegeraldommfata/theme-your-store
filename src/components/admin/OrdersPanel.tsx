import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Info, Eye, ChevronDown, ChevronUp } from "lucide-react";
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

  const filteredOrders = filterStatus === "todos" ? orders : orders.filter(o => o.status === filterStatus);

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    toast.success(`Pedido ${orderId} atualizado para "${newStatus}"`);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="font-bold text-lg">Gerenciar Pedidos</h2>
        <p className="text-xs text-primary/80 flex items-center gap-1 mt-1"><Info className="w-3 h-3" /> Gerencie os pedidos dos clientes, atualize status e veja detalhes</p>
      </div>

      <div className="flex gap-2">
        {["todos", ...statusOptions].map(s => (
          <Button
            key={s}
            variant={filterStatus === s ? "shop" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(s)}
          >
            {s === "todos" ? "Todos" : s}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredOrders.map(order => (
          <div key={order.id} className="border border-border rounded-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center gap-4">
                <span className="font-bold">{order.id}</span>
                <span className="text-sm">{order.customer}</span>
                <span className="text-sm text-muted-foreground">{order.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm">{order.total}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColor[order.status]}`}>{order.status}</span>
                <span className="text-xs text-muted-foreground">{order.date}</span>
                {expandedOrder === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
            {expandedOrder === order.id && (
              <div className="border-t border-border p-4 bg-muted/30 space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-2">Itens do Pedido:</p>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-1">
                      <span>{item.qty}x {item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Alterar Status:</label>
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    className="border border-border rounded-sm p-2 text-sm"
                  >
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPanel;
