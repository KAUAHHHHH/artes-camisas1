import Link from "next/link"
import { ArrowRight, Star, Download, Shield, Zap, Layers, Palette, HeadphonesIcon, RefreshCw, FileText, Truck, Sparkles, ShoppingBag, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductCard } from "@/components/product-card"
import { prisma } from "@/lib/prisma"

async function getFeatured() {
  try {
    return await prisma.product.findMany({
      where: { active: true, featured: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    })
  } catch { return [] }
}

export default async function HomePage() {
  const featured = await getFeatured()

  return (
    <div>
      <HeroCarousel />

      {/* Produtos em Destaque */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#2563EB] text-sm font-semibold tracking-wider uppercase">Destaques</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Produtos em Destaque</h2>
            </div>
            <Link href="/search">
              <span className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1">
                Ver todos <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Packs com Desconto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="card-premium overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-[#2563EB] text-sm font-semibold tracking-wider uppercase mb-2">Oferta Especial</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Pack Completo Interclasse</h2>
              <p className="text-white/40 mb-6">Mais de 30 artes profissionais para camisas de interclasse. Formatos CDR, PDF e PNG.</p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-white">R$ 47,00</span>
                <span className="text-lg text-white/30 line-through">R$ 97,00</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">-52%</span>
              </div>
              <Link href="/interclasse" className="btn-primary inline-flex w-fit">
                Comprar Agora <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div
              className="h-[300px] lg:h-auto bg-cover bg-center"
              style={{ backgroundImage: "url(/interclasse/488_Pantera 02.png)" }}
            />
          </div>
        </div>
      </section>

      {/* Benefícios Detalhados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <span className="text-[#2563EB] text-sm font-semibold tracking-wider uppercase">Por que nos escolher?</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Benefícios Exclusivos</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Download, title: "Download Imediato", desc: "Após a confirmação do pagamento, você recebe os arquivos automaticamente." },
            { icon: Shield, title: "Pagamento Seguro", desc: "Ambiente criptografado. Aceitamos PIX, cartão e boleto." },
            { icon: RefreshCw, title: "Atualizações Grátis", desc: "Todos os packs são atualizados frequentemente sem custo adicional." },
            { icon: HeadphonesIcon, title: "Suporte Premium", desc: "Atendimento via WhatsApp e chat ao vivo de segunda a sexta." },
            { icon: FileText, title: "Arquivos Organizados", desc: "Pastas separadas por formato. Fácil de encontrar o que precisa." },
            { icon: Palette, title: "Alta Qualidade", desc: "Artes em alta resolução (300 DPI) prontas para impressão." },
          ].map((item) => (
            <div key={item.title} className="card-premium p-6">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB]/15 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <span className="text-[#2563EB] text-sm font-semibold tracking-wider uppercase">Depoimentos</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">O que nossos clientes dizem</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Carlos Silva", role: "Designer Gráfico", avatar: "C", text: "Incrível! Os packs são completos e a qualidade é excepcional. Economizo horas de trabalho." },
            { name: "Ana Oliveira", role: "Loja de Estamparia", avatar: "A", text: "Meus clientes amam as novidades. Sistema de downloads muito prático e rápido." },
            { name: "Marcos Lima", role: "Sublimação", avatar: "M", text: "Melhor custo-benefício do mercado. Arquivos PSD bem organizados e fáceis de editar." },
          ].map((dep) => (
            <div key={dep.name} className="card-premium p-6">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">&ldquo;{dep.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
                  {dep.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{dep.name}</p>
                  <p className="text-white/30 text-xs">{dep.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-2xl bg-[#2563EB] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] opacity-50" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Receba Novidades</h2>
            <p className="text-white/70 mb-6">Lançamentos exclusivos e promoções diretamente no seu email.</p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 h-12 rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button type="submit" className="h-12 px-6 rounded-xl bg-white text-[#2563EB] font-semibold text-sm hover:bg-white/90 transition-all">
                Receber Promoções
              </button>
            </form>
          </div>
        </div>
      </section>


    </div>
  )
}
