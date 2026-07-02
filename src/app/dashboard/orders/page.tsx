import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ShoppingCart, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user?.email) return null

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Meus Pedidos</h1>
      {orders.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Nenhum pedido</h2>
          <p className="text-sm text-white/40">Seus pedidos aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-violet-400" />
                  <span className="text-white font-medium">Pedido #{order.id.slice(0, 8)}</span>
                </div>
                <Badge variant={order.status === "APPROVED" ? "success" : order.status === "PENDING" ? "warning" : "destructive"}>
                  {order.status === "APPROVED" ? "Aprovado" : order.status === "PENDING" ? "Pendente" : "Cancelado"}
                </Badge>
              </div>
              <div className="text-sm text-white/40">
                {order.items.map((item) => (
                  <span key={item.id}>{item.product.name} x{item.quantity}, </span>
                ))}
              </div>
              <div className="text-right mt-2">
                <span className="text-lg font-bold gradient-text">{formatPrice(Number(order.total))}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
