"use client"

import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

type Props = {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  image: string
}

export function AddToCartButton({ id, name, slug, price, salePrice, image }: Props) {
  const { addItem } = useCart()
  const [done, setDone] = useState(false)

  function handleClick() {
    addItem({ id, name, slug, price, salePrice, image })
    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }

  return (
    <Button size="lg" className="flex-1 min-w-[200px]" onClick={handleClick}>
      {done ? (
        <><Check className="mr-2 w-5 h-5" /> Adicionado!</>
      ) : (
        <><ShoppingCart className="mr-2 w-5 h-5" /> Adicionar ao Carrinho</>
      )}
    </Button>
  )
}
