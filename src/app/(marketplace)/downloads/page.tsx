import { prisma } from "@/lib/prisma"
import { DownloadForm } from "./form"
import { Download, Package } from "lucide-react"

interface Props {
  searchParams: Promise<{ email?: string }>
}

export default async function DownloadsPage({ searchParams }: Props) {
  const { email } = await searchParams

  let downloads: any[] = []
  let userFound = false
  let error = null

  if (email) {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (user) {
        userFound = true
        downloads = await prisma.download.findMany({
          where: { userId: user.id },
          include: { product: true },
          orderBy: { createdAt: "desc" },
        })
      }
    } catch (e) {
      error = "Sistema temporariamente indisponível. Tente novamente mais tarde."
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Meus <span className="text-emerald-400">Downloads</span>
          </h1>
          <p className="text-white/40 max-w-lg mx-auto">
            Digite o email usado na compra para acessar seus produtos.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <DownloadForm email={email || ""} />
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {email && !error && !userFound && (
          <div className="max-w-md mx-auto mb-8 p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <Package className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-amber-300 font-medium mb-1">Nenhum download encontrado</p>
            <p className="text-amber-400/60 text-sm">
              Nenhum pedido foi encontrado com este email.{" "}
              <a href="/dashboard/downloads" className="underline hover:text-amber-300">
                Faça login
              </a>{" "}
              ou entre em contato pelo WhatsApp.
            </p>
          </div>
        )}

        {userFound && downloads.length === 0 && (
          <div className="max-w-md mx-auto mb-8 p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <Package className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-white font-medium mb-1">Nenhum download disponível</p>
            <p className="text-white/40 text-sm">Você ainda não possui produtos com download liberado.</p>
          </div>
        )}

        {downloads.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-4">
            {downloads.map((dl: any) => (
              <div key={dl.id} className="glass-card rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center overflow-hidden">
                    {dl.product.images[0] ? (
                      <img src={dl.product.images[0]} alt={dl.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Download className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{dl.product.name}</h3>
                    <p className="text-xs text-white/40">
                      {dl.count} download{dl.count !== 1 ? "s" : ""} •{" "}
                      {new Date(dl.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <a
                  href={`/api/download/${dl.product.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-colors"
                >
                  Baixar
                </a>
              </div>
            ))}
          </div>
        )}

        {!email && (
          <div className="text-center mt-8">
            <p className="text-white/30 text-sm">
              Já tem cadastro?{" "}
              <a href="/dashboard/downloads" className="text-emerald-400 hover:text-emerald-300 underline">
                Acesse pelo painel
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
