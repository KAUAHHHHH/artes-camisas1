export type MockupProduct = {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  image: string
  files: number
  images: string[]
}

export const products: MockupProduct[] = [
  {
    id: "mock-01",
    name: "Pack Esportivo",
    slug: "pack-esportivo",
    price: 39.90,
    salePrice: null,
    image: "/mockups/pack-esportivo.png",
    files: 120,
    images: ["/mockups/pack-esportivo.png"],
  },
]
