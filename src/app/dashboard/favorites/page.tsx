import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Heart } from "lucide-react"
import { ProductCard } from "@/components/product-card"

export default async function FavoritesPage() {
  const user = await getCurrentUser()
  if (!user?.email) return null

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Heart className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Nenhum favorito</h2>
          <p className="text-sm text-white/40">Salve seus packs favoritos aqui.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <ProductCard key={fav.id} product={fav.product} />
          ))}
        </div>
      )}
    </div>
  )
}
