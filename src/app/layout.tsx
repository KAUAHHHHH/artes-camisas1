import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: {
    default: "ArtCamp - Packs de Artes para Camisas",
    template: "%s | ArtCamp",
  },
  description: "O maior marketplace de artes para camisas. Packs completos com CDR, PDF, PNG e muito mais.",
  keywords: ["artes para camisas", "estampas", "mockups", "design camisetas", "packs de artes"],
  openGraph: {
    title: "ArtCamp - Packs de Artes para Camisas",
    description: "O marketplace definitivo para designers de camisas.",
    type: "website",
    locale: "pt_BR",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(18,18,26,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f8f9fa",
              backdropFilter: "blur(20px)",
            },
          }}
        />
      </body>
    </html>
  )
}
