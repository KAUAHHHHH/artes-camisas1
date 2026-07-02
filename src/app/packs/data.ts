export type PackProduct = {
  id: string
  name: string
  slug: string
  price: number
  oldPrice?: number
  badge?: string
  image: string
  files: number
  images: string[]
}

export const products: PackProduct[] = [
  {
    id: "pack-01",
    name: "Pack Premium de Artes",
    slug: "pack-premium-artes",
    price: 49.90,
    oldPrice: 89.90,
    badge: "-44%",
    image: "/packs/pack-principal.jpg",
    files: 25,
    images: ["/packs/pack-principal.jpg"],
  },
  {
    id: "pack-02",
    name: "Pack Artes Premium 2",
    slug: "pack-artes-premium-2",
    price: 39.90,
    image: "/packs/pack-secundario.jpg",
    files: 18,
    images: ["/packs/pack-secundario.jpg"],
  },
]
