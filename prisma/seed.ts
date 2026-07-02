import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "interclasse" },
    create: {
      name: "Interclasse",
      slug: "interclasse",
      description: "Packs de artes para camisas de interclasse",
      order: 1,
    },
    update: {},
  })

  const products = [
    { name: "Completo Interclasse 2025", slug: "pack-completo-interclasse-2025", price: 97, salePrice: 47, image: "/interclasse/488_Pantera 02.png", files: 33, featured: true, bestseller: true },
    { name: "Pantera 488", slug: "pantera-488-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/488_Pantera 02.png", files: 6 },
    { name: "Fenix 445", slug: "fenix-445-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/445_Fenix 02.png", files: 6 },
    { name: "Dragão 291", slug: "dragao-291-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/291_Dragão 02.png", files: 6 },
    { name: "Dragão 306", slug: "dragao-306-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/306_Dragão 02.png", files: 6 },
    { name: "Tigre 839", slug: "tigre-839-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/839_Tigre 02.png", files: 6 },
    { name: "Tigre Bege 809", slug: "tigre-bege-809-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/809_Tigre Bege 02.png", files: 6 },
    { name: "Águia 844", slug: "aguia-844-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/844_Aguia 02.png", files: 6 },
    { name: "Pokemon Gengar 800", slug: "pokemon-gengar-800-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/800_Pokemon Gengar 02.png", files: 6 },
    { name: "Gengar Pokemon 842", slug: "gengar-pokemon-842-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/842_Gengar Pokemon 02.png", files: 6 },
    { name: "Frozen 712", slug: "frozen-712-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/712_Frozen 02.png", files: 6 },
    { name: "Lilo e Stitch 834", slug: "lilo-stitch-834-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/834_Lilo e Stitch 02.png", files: 6 },
    { name: "A Bela e a Fera 759", slug: "bela-fera-759-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/759_A Bela e a Fera 02.png", files: 6 },
    { name: "Feiticeiro 832", slug: "feiticeiro-832-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/832_Feiticeiro 02.png", files: 6 },
    { name: "Múmia 669", slug: "mumia-669-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/669_Mumia 02.png", files: 6 },
    { name: "Japão 308", slug: "japao-308-interclasse", price: 14.90, salePrice: 9.90, image: "/interclasse/308_Japão 02.png", files: 6 },
    { name: "Dragoes", slug: "pack-dragoes-interclasse", price: 24.90, salePrice: 14.90, image: "/interclasse/291_Dragão 02.png", files: 12 },
    { name: "Gengar", slug: "pack-gengar-interclasse", price: 24.90, salePrice: 14.90, image: "/interclasse/800_Pokemon Gengar 02.png", files: 12 },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        name: p.name,
        slug: p.slug,
        description: `Pack completo com artes profissionais para camisa de interclasse. ${p.name}.`,
        price: p.price,
        salePrice: p.salePrice,
        images: [p.image],
        mockups: [p.image],
        categoryId: category.id,
        filesCount: p.files,
        featured: (p as any).featured || false,
        bestseller: (p as any).bestseller || false,
      },
      update: {
        price: p.price,
        salePrice: p.salePrice,
        images: [p.image],
        filesCount: p.files,
      },
    })
  }

  console.log("Seed concluido!")
}

main().catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
