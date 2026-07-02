import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP not configured. Email not sent.")
    return
  }

  await transporter.sendMail({
    from: `"ArtCamp" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })
}

export function notifyNewOrderEmail(order: {
  id: string
  customerName: string
  customerEmail: string
  total: number
  items: { name: string; price: number; quantity: number }[]
}) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">R$ ${item.price.toFixed(2)}</td>
        </tr>`
    )
    .join("")

  return {
    to: "suporteartcamp@gmail.com",
    subject: `Nova Compra #${order.id.slice(0, 8)}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#2563EB">Nova Compra Realizada!</h2>
        <p><strong>Pedido:</strong> #${order.id.slice(0, 8)}</p>
        <p><strong>Cliente:</strong> ${order.customerName} (${order.customerEmail})</p>
        <p><strong>Total:</strong> R$ ${order.total.toFixed(2)}</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <thead>
            <tr style="background:#f5f5f5">
              <th style="padding:8px;text-align:left">Produto</th>
              <th style="padding:8px;text-align:center">Qtd</th>
              <th style="padding:8px;text-align:right">Valor</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />
        <p style="color:#666;font-size:12px">ArtCamp - Marketplace de Artes para Camisas</p>
      </div>
    `,
  }
}
