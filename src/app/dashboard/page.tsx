import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Package, Download, Heart, Star } from "lucide-react"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user?.email) return null

  const [downloads, favorites, orders] = await Promise.all([
    prisma.download.count({ where: { userId: user.id } }),
    prisma.favorite.count({ where: { userId: user.id } }),
    prisma.order.count({ where: { userId: user.id } }),
  ]).catch(() => [0, 0, 0])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Meu Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Package, label: "Packs Comprados", value: orders, color: "from-violet-500/20 to-indigo-600/20 text-violet-400" },
          { icon: Download, label: "Downloads", value: downloads, color: "from-emerald-500/20 to-teal-600/20 text-emerald-400" },
          { icon: Heart, label: "Favoritos", value: favorites, color: "from-rose-500/20 to-pink-600/20 text-rose-400" },
          { icon: Star, label: "Avaliações", value: "0", color: "from-amber-500/20 to-orange-600/20 text-amber-400" },
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

      <div className="glass-card rounded-2xl p-8 text-center">
        <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
        <h2 className="text-lg text-white font-medium mb-1">Nenhum pack comprado ainda</h2>
        <p className="text-sm text-white/40">Explore nossa loja e adquira packs incríveis.</p>
      </div>
    </div>
  )
}
