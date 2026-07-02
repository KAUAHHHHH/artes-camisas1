import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Download, ShoppingCart, Heart, Share2, Check, FileText, Layers, CreditCard, QrCode, Banknote, Info, Shield, MessageCircle } from "lucide-react"
import { ProductCard } from "@/components/product-card"
const WHATSAPP = "5583991422744"

const staticProducts: Record<string, {
  name: string; price: number; salePrice: number | null; images: string[]; mockups: string[];
  filesCount: number; totalSize: string; version: string; compatibility: string;
  description: string; category: string; bestseller?: boolean; promotion?: boolean;
  downloadCount: number; rating: number; reviewCount: number; files: string[];
}> = {
  "pack-completo-interclasse-2025": {
    name: "Completo 2025", price: 97, salePrice: 47, bestseller: true,
    images: ["/interclasse/488_Pantera 02.png"], mockups: [],
    filesCount: 33, totalSize: "1.2 GB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Pack completo com 33 artes profissionais para interclasse 2025. Inclui animais como Pantera, Fênix, Tigre, Dragão, Águia e muito mais. Arquivos em CDR, PDF e PNG prontos para impressão e estamparia.",
    category: "Interclasse", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
  "camisa-pantera": {
    name: "Camisa Pantera", price: 19.90, salePrice: null,
    images: ["/interclasse/488_Pantera 02.png"], mockups: [],
    filesCount: 8, totalSize: "280 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Arte profissional da Pantera para camisas de interclasse. Design moderno com traços agressivos. Inclui arquivos em CDR, PDF e PNG.",
    category: "Interclasse", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
  "camisa-fenix": {
    name: "Camisa Fênix", price: 19.90, salePrice: null,
    images: ["/interclasse/445_Fenix 02.png"], mockups: [],
    filesCount: 6, totalSize: "240 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Arte da Fênix renascendo das cinzas para camisas de time. Detalhes em chamas com acabamento premium. Arquivos em CDR, PDF e PNG.",
    category: "Interclasse", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
  "camisa-tigre": {
    name: "Camisa Tigre", price: 19.90, salePrice: null,
    images: ["/interclasse/839_Tigre 02.png"], mockups: [],
    filesCount: 6, totalSize: "220 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Arte do Tigre com design feroz e estilizado. Ideal para times que querem impor presença. Arquivos em CDR, PDF e PNG.",
    category: "Interclasse", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
  "camisa-dragao": {
    name: "Camisa Dragão", price: 19.90, salePrice: null,
    images: ["/interclasse/306_Dragão 02.png"], mockups: [],
    filesCount: 6, totalSize: "260 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Arte do Dragão com detalhes orientais e acabamento sofisticado. Design imponente para equipes competitivas. Arquivos em CDR, PDF e PNG.",
    category: "Interclasse", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
  "camisa-aguia": {
    name: "Camisa Águia", price: 19.90, salePrice: null,
    images: ["/interclasse/844_Aguia 02.png"], mockups: [],
    filesCount: 12, totalSize: "450 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Pack especial da Águia com 12 variações de cores e estilos. Design premium com penas detalhadas e pose imponente. Arquivos em CDR, PDF e PNG.",
    category: "Interclasse", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
  "pack-esportivo": {
    name: "Pack Esportivo", price: 39.90, salePrice: null,
    images: ["/mockups/pack-esportivo.png"], mockups: [],
    filesCount: 120, totalSize: "3.5 GB", version: "2.0", compatibility: "CDR, PDF, PNG",
    description: "Mega pack com 120 mockups esportivos profissionais. Ideal para lojas de estamparia e designers. Camisetas, regatas, shorts e muito mais em alta resolução.",
    category: "Mockups", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["PNG", "PSD", "AI"],
  },
  "pack-premium-artes": {
    name: "Pack Premium de Artes", price: 49.90, salePrice: null, promotion: true,
    images: ["/packs/pack-principal.jpg"], mockups: [],
    filesCount: 25, totalSize: "890 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Pack premium com 25 artes exclusivas para camisas. Designs modernos e versáteis perfeitos para qualquer ocasião. Arquivos prontos em CDR, PDF e PNG.",
    category: "Packs", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
  "pack-artes-premium-2": {
    name: "Pack Artes Premium 2", price: 39.90, salePrice: null,
    images: ["/packs/pack-secundario.jpg"], mockups: [],
    filesCount: 18, totalSize: "620 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: "Pack com 18 artes exclusivas para camisas. Designs variados e prontos para uso. Arquivos em CDR, PDF e PNG.",
    category: "Packs", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  },
}

for (let i = 1; i <= 7; i++) {
  staticProducts[`arte-terceirao-${i}`] = {
    name: `Arte Terceirão ${i}`, price: 19.90, salePrice: null,
    images: [`/terceirao/arte${i}.jpg`], mockups: [],
    filesCount: 6, totalSize: "180 MB", version: "1.0", compatibility: "CDR, PDF, PNG",
    description: `Arte exclusiva para camisas de Terceirão. Design moderno e personalizado com elementos temáticos. Arquivos em CDR, PDF e PNG prontos para impressão.`,
    category: "Terceirão", downloadCount: 0, rating: 0, reviewCount: 0,
    files: ["CDR", "PDF", "PNG"],
  }
}

interface Props { params: Promise<{ slug: string }> }

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  let product: any = null
  let related: any[] = []

  try {
    product = await prisma.product.findUnique({
      where: { slug, active: true },
      include: { category: true, files: true, reviews: { include: { user: true }, take: 10, orderBy: { createdAt: "desc" } } },
    })
    if (product) {
      related = await prisma.product.findMany({
        where: { categoryId: product.categoryId, id: { not: product.id }, active: true },
        include: { category: true }, take: 4,
      })
    }
  } catch {}

  if (!product && staticProducts[slug]) {
    const s = staticProducts[slug]
    product = {
      id: slug, name: s.name, slug, description: s.description,
      price: s.price, salePrice: s.salePrice,
      images: s.images, mockups: s.mockups,
      filesCount: s.filesCount, totalSize: s.totalSize, version: s.version,
      compatibility: s.compatibility, downloadCount: s.downloadCount,
      rating: s.rating, reviewCount: s.reviewCount,
      bestseller: s.bestseller || false, promotion: s.promotion || false,
      category: { name: s.category, slug: s.category.toLowerCase() },
      reviews: [], files: s.files.map((f, i) => ({ id: String(i), name: f, url: "#", size: "-", format: f.toLowerCase() })),
    }
  }

  if (!product) notFound()

  const price = Number(product.price)
  const salePrice = product.salePrice ? Number(product.salePrice) : null

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-white/30 mb-6">
          <a href="/" className="hover:text-white/60">Início</a>
          <span>/</span>
          <a href={`/search?categoria=${product.category.slug}`} className="hover:text-white/60">{product.category.name}</a>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="glass-card rounded-2xl overflow-hidden mb-4">
              <div className="aspect-[4/3] bg-gradient-to-br from-violet-500/10 to-indigo-600/10 flex items-center justify-center">
                {product.images[0] ? (
                  <Image src={product.images[0]} alt={product.name} width={800} height={600} className="w-full h-full object-cover" />
                ) : (
                  <Layers className="w-24 h-24 text-violet-400/30" />
                )}
              </div>
            </div>
            {product.mockups?.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.mockups.slice(0, 4).map((mockup: string, i: number) => (
                  <div key={i} className="glass-card rounded-xl overflow-hidden aspect-square">
                    <Image src={mockup} alt={`Mockup ${i + 1}`} width={200} height={200} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary">{product.category.name}</Badge>
              {product.bestseller && <Badge variant="warning">Mais Vendido</Badge>}
              {product.promotion && <Badge variant="destructive">Promoção</Badge>}
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-white/20"}`} />
                ))}
                <span className="text-sm text-white/40 ml-1">({product.reviewCount} avaliações)</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-1 text-white/40 text-sm">
                <Download className="w-4 h-4" /> {product.downloadCount} downloads
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              {salePrice ? (
                <>
                  <span className="text-4xl font-bold gradient-text">{formatPrice(salePrice)}</span>
                  <span className="text-xl text-white/30 line-through">{formatPrice(price)}</span>
                  <Badge variant="success">-{Math.round((1 - salePrice / price) * 100)}% OFF</Badge>
                </>
              ) : (
                <span className="text-4xl font-bold gradient-text">{formatPrice(price)}</span>
              )}
            </div>

            <p className="text-white/50 leading-relaxed mb-8">{product.description}</p>

            <div className="glass-card rounded-2xl p-5 mb-8">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" /> Arquivos Incluídos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(product.files || []).slice(0, 6).map((f: any) => (
                  <div key={typeof f === "string" ? f : f.id} className="flex items-center gap-2 text-sm text-white/50">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> {typeof f === "string" ? f : f.name}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5 text-sm">
                <div><span className="text-white/30">Arquivos:</span> <span className="text-white/60">{product.filesCount}</span></div>
                <div><span className="text-white/30">Tamanho:</span> <span className="text-white/60">{product.totalSize}</span></div>
                <div><span className="text-white/30">Versão:</span> <span className="text-white/60">{product.version}</span></div>
                <div><span className="text-white/30">Compatibilidade:</span> <span className="text-white/60">{product.compatibility}</span></div>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name} (R$ ${formatPrice(salePrice || price)}). Link: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/product/${product.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors mb-3"
            >
              <MessageCircle className="w-5 h-5" /> Comprar via WhatsApp
            </a>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" /> Informações de Pagamento
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">PIX</p>
                    <p className="text-white/40 text-xs">Pagamento instantâneo via PIX. Aprovação na hora e liberação imediata dos arquivos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Cartão de Crédito</p>
                    <p className="text-white/40 text-xs">Parcele em até 12x. Pagamento processado com segurança via gateway.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Boleto / Transferência</p>
                    <p className="text-white/40 text-xs">Pagamento via boleto bancário (até 3 dias úteis) ou transferência PIX.</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-white/30 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Compra 100% segura. Todos os dados são criptografados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {product.reviews?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Avaliações</h2>
            <div className="space-y-4">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="glass-card rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {review.user.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{review.user.name || "Anônimo"}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.comment && <p className="text-white/50 text-sm ml-11">{review.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Produtos Relacionados</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
