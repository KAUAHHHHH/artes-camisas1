import { prisma } from "@/lib/prisma"
import { ShoppingCart, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Pedidos</h1>

      {orders.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Nenhum pedido</h2>
          <p className="text-sm text-white/40">Os pedidos aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">#{order.id.slice(0, 8)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "APPROVED" ? "bg-emerald-500/20 text-emerald-400" :
                      order.status === "PENDING" ? "bg-amber-500/20 text-amber-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-white/50">
                    {order.user?.name || "Cliente"} • {order.user?.email || "sem email"}
                  </p>
                  <p className="text-xs text-white/30 mt-1">
                    {new Date(order.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">R$ {Number(order.total).toFixed(2)}</p>
                  <p className="text-xs text-white/30">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3">
                <p className="text-xs text-white/30 mb-2">Itens:</p>
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm py-1">
                    <Link href={`/product/${item.product.slug}`} className="text-white/60 hover:text-white flex items-center gap-1">
                      {item.product.name} <ExternalLink className="w-3 h-3" />
                    </Link>
                    <div className="flex items-center gap-4">
                      <span className="text-white/40">x{item.quantity}</span>
                      <span className="text-white">R$ {Number(item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {order.user?.email && (
                <div className="border-t border-white/5 pt-3 mt-3">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${order.user.email}&su=Seus%20Downloads%20ArtCamp&body=Ol%C3%A1!%20Segue%20o%20link%20para%20download%20dos%20seus%20arquivos%3A%0A%0A${order.items.map(i => `${i.product.name}: ${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/download/${i.product.slug}`).join('%0A%0A')}%0A%0AAtt,%20Equipe%20ArtCamp`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Enviar Links por Gmail
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
