import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon, Package } from "lucide-react"
import Link from "next/link"

const staticProducts = [
  { id: "sp-01", name: "Completo 2025", slug: "pack-completo-interclasse-2025", price: 97, salePrice: 47, images: ["/interclasse/488_Pantera 02.png"], filesCount: 33, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Interclasse", slug: "interclasse" }, bestseller: true },
  { id: "sp-02", name: "Camisa Pantera", slug: "camisa-pantera", price: 19.90, salePrice: null, images: ["/interclasse/488_Pantera 02.png"], filesCount: 8, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Interclasse", slug: "interclasse" } },
  { id: "sp-03", name: "Camisa Fenix", slug: "camisa-fenix", price: 19.90, salePrice: null, images: ["/interclasse/445_Fenix 02.png"], filesCount: 6, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Interclasse", slug: "interclasse" } },
  { id: "sp-04", name: "Camisa Tigre", slug: "camisa-tigre", price: 19.90, salePrice: null, images: ["/interclasse/839_Tigre 02.png"], filesCount: 6, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Interclasse", slug: "interclasse" } },
  { id: "sp-05", name: "Camisa Dragão", slug: "camisa-dragao", price: 19.90, salePrice: null, images: ["/interclasse/306_Dragão 02.png"], filesCount: 6, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Interclasse", slug: "interclasse" } },
  { id: "sp-06", name: "Camisa Águia", slug: "camisa-aguia", price: 19.90, salePrice: null, images: ["/interclasse/844_Aguia 02.png"], filesCount: 12, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Interclasse", slug: "interclasse" } },
  { id: "sp-07", name: "Pack Esportivo", slug: "pack-esportivo", price: 39.90, salePrice: null, images: ["/mockups/pack-esportivo.png"], filesCount: 120, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Mockups", slug: "mockups" } },
  { id: "sp-08", name: "Pack Premium de Artes", slug: "pack-premium-artes", price: 49.90, salePrice: null, images: ["/packs/pack-principal.jpg"], filesCount: 25, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Packs", slug: "packs" }, promotion: true },
  { id: "sp-09", name: "Pack Artes Premium 2", slug: "pack-artes-premium-2", price: 39.90, salePrice: null, images: ["/packs/pack-secundario.jpg"], filesCount: 18, downloadCount: 0, rating: 0, reviewCount: 0, category: { name: "Packs", slug: "packs" } },
]

const allStatic = [
  ...staticProducts,
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `ter-img-${i + 1}`,
    name: `Arte Terceirão ${i + 1}`,
    slug: `arte-terceirao-${i + 1}`,
    price: 19.90,
    salePrice: null,
    images: [`/terceirao/arte${i + 1}.jpg`],
    filesCount: 6,
    downloadCount: 0,
    rating: 0,
    reviewCount: 0,
    category: { name: "Terceirão", slug: "terceirao" },
  })),
]

interface Props {
  searchParams: Promise<{ q?: string; categoria?: string; promocao?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const q = (params.q || "").toLowerCase()
  const categoria = params.categoria || ""

  let dbProducts: any[] = []
  try {
    const where: any = { active: true }
    if (q) where.name = { contains: q, mode: "insensitive" }
    if (categoria) where.category = { slug: categoria }
    if (params.promocao) where.promotion = true
    dbProducts = await prisma.product.findMany({ where, include: { category: true }, orderBy: { createdAt: "desc" } })
  } catch {}

  let allProducts = dbProducts.length > 0 ? dbProducts : allStatic as any

  if (allProducts === (allStatic as any)) {
    if (categoria) allProducts = allProducts.filter((p: any) => p.category?.slug === categoria)
    if (q) allProducts = allProducts.filter((p: any) => p.name.toLowerCase().includes(q))
    if (params.promocao) allProducts = allProducts.filter((p: any) => p.promotion || p.salePrice)
  }

  let categories: any[] = []
  try {
    categories = await prisma.category.findMany({ orderBy: { name: "asc" } })
  } catch {}
  if (categories.length === 0) {
    categories = [
      { id: "cat-inter", name: "Interclasse", slug: "interclasse" },
      { id: "cat-ter", name: "Terceirão", slug: "terceirao" },
      { id: "cat-mock", name: "Mockups", slug: "mockups" },
      { id: "cat-packs", name: "Packs", slug: "packs" },
    ]
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form className="mb-8">
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <Input
              name="q"
              defaultValue={params.q || ""}
              placeholder="Buscar artes, packs, categorias..."
              className="h-14 pl-12 text-base rounded-2xl"
            />
          </div>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/search" className={`px-4 py-2 rounded-xl text-sm transition-all ${!categoria ? "bg-[#2563EB]/20 text-[#2563EB]" : "bg-white/5 text-white/50 hover:text-white"}`}>
            Todos
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/search?categoria=${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${categoria === cat.slug ? "bg-[#2563EB]/20 text-[#2563EB]" : "bg-white/5 text-white/50 hover:text-white"}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <p className="text-white/40 text-sm mb-6">{allProducts.length} resultado(s)</p>

        {allProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <h2 className="text-lg text-white font-medium mb-1">Nenhum produto encontrado</h2>
            <p className="text-sm text-white/40">Tente buscar por outro termo.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allProducts.map((product: any) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
