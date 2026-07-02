import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/product-card"
import { Package } from "lucide-react"

interface Props { params: Promise<{ slug: string }> }

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: { where: { active: true }, orderBy: { createdAt: "desc" }, include: { category: true } },
    },
  }).catch(() => null)
  if (!category) notFound()

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">{category.name}</h1>
          {category.description && <p className="text-white/40 mt-1">{category.description}</p>}
        </div>

        {category.products.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <h2 className="text-lg text-white font-medium mb-1">Nenhum produto</h2>
            <p className="text-sm text-white/40">Em breve novos packs.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
