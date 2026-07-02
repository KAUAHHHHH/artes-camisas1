import { prisma } from "@/lib/prisma"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign } from "lucide-react"

async function getStats() {
  try {
    const [products, orders, users, totalRevenue] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "APPROVED" } }),
    ])
    return { products, orders, users, revenue: Number(totalRevenue._sum?.amount ?? 0) }
  } catch {
    return { products: 0, orders: 0, users: 0, revenue: 0 }
  }
}

export default async function AdminDashboard() {
  const { products, orders, users, revenue } = await getStats()

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Package, label: "Produtos", value: products, color: "from-violet-500/20 to-indigo-600/20 text-violet-400" },
          { icon: ShoppingCart, label: "Pedidos", value: orders, color: "from-emerald-500/20 to-teal-600/20 text-emerald-400" },
          { icon: Users, label: "Clientes", value: users, color: "from-blue-500/20 to-cyan-600/20 text-blue-400" },
          { icon: DollarSign, label: "Receita", value: `R$ ${revenue.toFixed(2)}`, color: "from-amber-500/20 to-orange-600/20 text-amber-400" },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
              <item.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-white/40">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-400" /> Visão Geral
        </h2>
        <p className="text-white/40 text-sm">Bem-vindo ao painel administrativo. Use o menu ao lado para gerenciar.</p>
      </div>
    </div>
  )
}
