"use client"

import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { products } from "./data"

export default function InterclassePage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-4">PACK INTERCLASSE 2025</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Artes para <span className="gradient-text">Interclasse</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto">
            Packs completos com artes exclusivas para camisas de interclasse. Formatos CDR, PDF e PNG.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto">
            <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <h2 className="text-lg text-white font-medium mb-1">Nenhum produto</h2>
            <p className="text-sm text-white/40">Em breve novos packs de interclasse.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="glass-card rounded-2xl overflow-hidden group">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-500/10 to-indigo-600/10 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-white/40">Interclasse</span>
                    <span className="text-white/20">•</span>
                    <span className="text-xs text-white/40">{product.files} arquivos</span>
                  </div>
                  <h3 className="text-white font-semibold mb-3">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    {product.salePrice ? (
                      <>
                        <span className="text-2xl font-bold gradient-text">
                          R$ {product.salePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-white/30 line-through">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold gradient-text">
                        R$ {product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <AddToCartButton
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    salePrice={product.salePrice}
                    image={product.image}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/search">
            <Button variant="outline" size="lg">
              Ver Todos os Packs <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
