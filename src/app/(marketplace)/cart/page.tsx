"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ShoppingBag, ArrowRight, Shield, CreditCard, Truck, Minus, Plus, Loader2, CheckCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const router = useRouter()
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const total = subtotal - discount

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, slug: i.slug, price: i.salePrice ?? i.price, quantity: i.quantity })),
        }),
      })
      if (!res.ok) throw new Error("Erro no checkout")
      const data = await res.json()
      setDone(true)
      clearCart()
      setTimeout(() => router.push(`/downloads`), 1500)
    } catch {
      alert("Erro ao processar compra. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-violet-400" /> Carrinho
          </h1>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-sm text-white/30 hover:text-red-400 transition-colors">
              Limpar carrinho
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl text-white mb-2">Carrinho vazio</h2>
            <p className="text-white/40 mb-6">Explore nossos packs e adicione ao carrinho.</p>
            <Link href="/search"><Button>Explorar Packs</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">🎨</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug}`} className="text-white font-medium hover:text-violet-400 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-white/40 mt-0.5">{formatPrice(item.salePrice ?? item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-white w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="text-white font-semibold">{formatPrice((item.salePrice ?? item.price) * item.quantity)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="glass-card rounded-2xl p-6 space-y-4 sticky top-24">
                <h3 className="text-white font-semibold">Resumo</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal ({items.length} {items.length === 1 ? "item" : "itens"})</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-400">Desconto</span>
                      <span className="text-emerald-400">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/5 pt-3 flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-xl font-bold gradient-text">{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Cupom" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="h-10 text-sm" />
                  <Button variant="secondary" size="sm" className="h-10">Aplicar</Button>
                </div>
                <Button className="w-full h-12" onClick={handleCheckout} disabled={loading || done}>
                  {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processando...</> :
                   done ? <><CheckCircle className="w-5 h-5 mr-2" /> Compra Finalizada!</> :
                   <><ShoppingBag className="w-5 h-5 mr-2" /> Finalizar Compra <ArrowRight className="ml-2 w-4 h-4" /></>}
                </Button>
                <div className="space-y-2 pt-2">
                  {[
                    { icon: CreditCard, text: "Cartão, PIX, Boleto" },
                    { icon: Shield, text: "Compra segura" },
                    { icon: Truck, text: "Download imediato" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-xs text-white/30">
                      <item.icon className="w-3.5 h-3.5 text-violet-400" /> {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
