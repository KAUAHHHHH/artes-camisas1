"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Package, Download, Heart, History, User, Settings, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const links = [
  { href: "/dashboard", label: "Meus Packs", icon: Package },
  { href: "/dashboard/downloads", label: "Downloads", icon: Download },
  { href: "/dashboard/favorites", label: "Favoritos", icon: Heart },
  { href: "/dashboard/history", label: "Histórico", icon: History },
  { href: "/dashboard/profile", label: "Perfil", icon: User },
  { href: "/dashboard/orders", label: "Pedidos", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="glass-card rounded-2xl p-3 lg:sticky lg:top-20 h-fit">
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                pathname === link.href
                  ? "bg-violet-500/20 text-violet-300 font-medium"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          )
        })}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 w-full transition-all"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </nav>
    </div>
  )
}
