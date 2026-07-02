"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Download, Heart, MessageCircle } from "lucide-react"

const WHATSAPP = "5583991422744"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: any
    salePrice: any | null
    images: string[]
    downloadCount: number
    rating: number
    reviewCount: number
    filesCount: number
    category: { name: string; slug: string }
    bestseller?: boolean
    promotion?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const price = Number(product.price)
  const salePrice = product.salePrice ? Number(product.salePrice) : null

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-500/10 to-indigo-600/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
          {product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center">
                <span className="text-2xl">{product.category.name.charAt(0)}</span>
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 z-20 flex gap-2">
            {product.bestseller && <Badge variant="warning">Mais Vendido</Badge>}
            {product.promotion && <Badge variant="destructive">Promoção</Badge>}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <Heart className="w-4 h-4 text-white/70" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-white/40">{product.category.name}</span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-white/40">{product.filesCount} arquivos</span>
          </div>
          <h3 className="text-white font-semibold mb-2 group-hover:text-violet-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm text-white/60">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-white/30">({product.reviewCount})</span>
            <span className="text-white/20 mx-2">|</span>
            <Download className="w-3.5 h-3.5 text-white/30" />
            <span className="text-xs text-white/30">{product.downloadCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {salePrice ? (
                <>
                  <span className="text-lg font-bold gradient-text">{formatPrice(salePrice)}</span>
                  <span className="text-sm text-white/30 line-through">{formatPrice(price)}</span>
                </>
              ) : (
                <span className="text-lg font-bold gradient-text">{formatPrice(price)}</span>
              )}
            </div>
            {salePrice && (
              <Badge variant="success">-{Math.round((1 - salePrice / price) * 100)}%</Badge>
            )}
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name} (R$ ${formatPrice(salePrice || price)}). Link: ${window.location.origin}/product/${product.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-3 flex items-center justify-center gap-2 w-full h-9 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Comprar via WhatsApp
          </a>
        </div>
      </div>
    </Link>
  )
}
