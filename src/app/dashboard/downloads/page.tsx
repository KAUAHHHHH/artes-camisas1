import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Download, Package, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function DownloadsPage() {
  const user = await getCurrentUser()
  if (!user?.email) return null

  const downloads = await prisma.download.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { updatedAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Meus Downloads</h1>

      {downloads.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Download className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Nenhum download</h2>
          <p className="text-sm text-white/40">Compre packs para começar a baixar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {downloads.map((dl) => (
            <div key={dl.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium">{dl.product.name}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/30">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Comprado em {new Date(dl.createdAt).toLocaleDateString("pt-BR")}</span>
                  <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Versão {dl.product.version}</span>
                  <span>↓ {dl.count} downloads</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">{dl.product.totalSize}</Badge>
                <Button size="sm" className="h-9"><Download className="w-4 h-4 mr-1" /> Baixar</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
