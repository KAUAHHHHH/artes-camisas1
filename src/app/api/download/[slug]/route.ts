import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const fileMap: Record<string, string> = {
  "pack-completo-interclasse-2025": "/interclasse/pack-completo-2025.zip",
  "camisa-pantera": "/interclasse/488_Pantera 02.png",
  "camisa-fenix": "/interclasse/445_Fenix 02.png",
  "camisa-tigre": "/interclasse/839_Tigre 02.png",
  "camisa-dragao": "/interclasse/306_Dragão 02.png",
  "camisa-aguia": "/interclasse/844_Aguia 02.png",
  "pack-esportivo": "/mockups/pack-esportivo.png",
  "pack-premium-artes": "/packs/pack-principal.jpg",
  "pack-artes-premium-2": "/packs/pack-secundario.jpg",
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const user = await import("@/lib/auth").then((m) => m.getCurrentUser())

    if (user) {
      const product = await prisma.product.findUnique({ where: { slug } })
      if (product) {
        const existing = await prisma.download.findUnique({
          where: { userId_productId: { userId: user.id, productId: product.id } },
        })
        if (existing) {
          await prisma.download.update({ where: { id: existing.id }, data: { count: existing.count + 1 } })
        } else {
          await prisma.download.create({ data: { userId: user.id, productId: product.id } })
        }
      }
    }
  } catch {}

  const filePath = fileMap[slug]
  if (!filePath) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 })
  }

  const fs = await import("fs/promises")
  const path = await import("path")
  const fullPath = path.join(process.cwd(), "public", filePath)

  try {
    await fs.access(fullPath)
  } catch {
    return NextResponse.json({ error: "Arquivo não encontrado no servidor" }, { status: 404 })
  }

  const file = await fs.readFile(fullPath)
  const ext = path.extname(fullPath).slice(1)
  const contentType =
    ext === "png" ? "image/png" :
    ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
    ext === "zip" ? "application/zip" :
    ext === "pdf" ? "application/pdf" :
    "application/octet-stream"

  return new NextResponse(file, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${path.basename(fullPath)}"`,
    },
  })
}
