"use client"

import { Package } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

const images = Array.from({ length: 7 }, (_, i) => `/terceirao/arte${i + 1}.jpg`)

export default function TerceiraoPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-500/10 to-indigo-600/10 overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <AddToCartButton
                  id={`ter-img-${i + 1}`}
                  name={`Arte ${i + 1}`}
                  slug={`arte-terceirao-${i + 1}`}
                  price={19.90}
                  salePrice={null}
                  image={src}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
