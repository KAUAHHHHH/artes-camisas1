"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, X, User, Heart, LogOut, Package, Download, Shield, CreditCard, HeadphonesIcon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/app/providers"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  { name: "Início", href: "/" },
  { name: "Interclasse", href: "/interclasse" },
  { name: "Terceirão", href: "/terceirao" },
  { name: "Futebol", href: "/search?categoria=futebol" },
  { name: "Religiosas", href: "/search?categoria=religiosas" },
  { name: "Packs", href: "/packs" },
  { name: "Downloads", href: "/downloads" },
]

const topBenefits = [
  { icon: Download, text: "Download Imediato" },
  { icon: Shield, text: "Compra Segura" },
  { icon: CreditCard, text: "Pagamento Facilitado" },
  { icon: HeadphonesIcon, text: "Suporte WhatsApp" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <>
      <div className="hidden lg:block bg-[#2563EB]/10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-8 gap-8">
            {topBenefits.map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 text-xs text-white/60">
                <item.icon className="w-3 h-3 text-[#2563EB]" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <header className="sticky top-0 left-0 right-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-lg shadow-[#2563EB]/20">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-white hidden sm:block">ArtCamp</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3.5 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all">
                <Search className="w-5 h-5" />
              </button>

              {user && (
                <Link href="/dashboard/favorites" className="p-2.5 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all hidden sm:block">
                  <Heart className="w-5 h-5" />
                </Link>
              )}



              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded-full hover:ring-2 hover:ring-[#2563EB]/50 transition-all ml-1">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                        <AvatarFallback className="bg-[#2563EB]/20 text-[#2563EB] text-xs">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#1a1a1a] border-white/5">
                    <div className="px-2 py-1.5 text-sm text-white/50">{user.email}</div>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild><Link href="/dashboard" className="flex items-center gap-2"><Package className="w-4 h-4" />Meus Packs</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/downloads" className="flex items-center gap-2"><Download className="w-4 h-4" />Downloads</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/favorites" className="flex items-center gap-2"><Heart className="w-4 h-4" />Favoritos</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/profile" className="flex items-center gap-2"><User className="w-4 h-4" />Perfil</Link></DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild><Link href="/admin" className="flex items-center gap-2"><Shield className="w-4 h-4" />Admin</Link></DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-400 focus:text-red-400">
                      <LogOut className="w-4 h-4 mr-2" />Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login"><Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-9 px-4 rounded-xl text-sm shadow-lg shadow-[#2563EB]/20">Entrar</Button></Link>
              )}

              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2.5 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all lg:hidden">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/5 px-4 py-3">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <Input
                placeholder="Buscar artes, packs, mockups..."
                className="w-full pl-12 h-12 text-sm bg-white/5 border-white/10 rounded-xl"
              />
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#0D0D0D]">
            <nav className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/5 my-3" />
              {!user && (
                <Link href="/login" className="block px-4 py-3 text-sm text-[#2563EB] font-medium rounded-xl hover:bg-white/5 transition-all" onClick={() => setMobileOpen(false)}>
                  Entrar / Cadastrar
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
