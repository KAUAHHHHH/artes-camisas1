import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { History, Clock } from "lucide-react"

export default async function HistoryPage() {
  const user = await getCurrentUser()
  if (!user?.email) return null

  const downloads = await prisma.download.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { updatedAt: "desc" },
    take: 20,
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Histórico</h1>
      {downloads.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <History className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Nenhum histórico</h2>
          <p className="text-sm text-white/40">Seu histórico de downloads aparecerá aqui.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {downloads.map((dl) => (
            <div key={dl.id} className="glass-card rounded-2xl p-3 flex items-center gap-3">
              <Clock className="w-4 h-4 text-white/30" />
              <span className="text-white/60 text-sm flex-1">{dl.product.name}</span>
              <span className="text-white/30 text-xs">{new Date(dl.createdAt).toLocaleDateString("pt-BR")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
