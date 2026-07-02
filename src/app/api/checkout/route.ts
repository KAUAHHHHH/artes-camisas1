import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendEmail, notifyNewOrderEmail } from "@/lib/email"
import { getCurrentUser } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    const body = await req.json()
    const { items, customerName, customerEmail, paymentMethod } = body

    if (!items?.length) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 })
    }

    const total = items.reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0)

    let order: any

    if (user) {
      order = await prisma.order.create({
        data: {
          userId: user.id,
          status: "APPROVED",
          total,
          paymentMethod: paymentMethod || "PIX",
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity || 1,
              price: item.price,
            })),
          },
        },
        include: { items: true },
      })
    } else {
      order = {
        id: crypto.randomUUID(),
        status: "APPROVED",
        total,
        paymentMethod: paymentMethod || "PIX",
        items: items.map((item: any) => ({
          id: crypto.randomUUID(),
          productId: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      }
    }

    const emailData = notifyNewOrderEmail({
      id: order.id,
      customerName: customerName || user?.name || "Cliente",
      customerEmail: customerEmail || user?.email || "não informado",
      total,
      items: items.map((item: any) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
    })

    await sendEmail(emailData).catch(console.error)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      downloadLinks: items.map((item: any) => ({
        name: item.name,
        slug: item.slug,
        url: `/api/download/${item.slug}`,
      })),
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Erro ao processar pedido" }, { status: 500 })
  }
}
