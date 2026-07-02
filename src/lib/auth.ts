import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

const ADMIN_EMAILS = ["josekauadasilvasouza@gmail.com"]

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const role = ADMIN_EMAILS.includes(user.email!) ? "ADMIN" : "CLIENT"
  const name = user.user_metadata?.name || null
  const image = user.user_metadata?.avatar_url || null

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
    if (dbUser) {
      if (dbUser.role !== role) {
        await prisma.user.update({ where: { id: dbUser.id }, data: { role } })
      }
      return { id: dbUser.id, email: dbUser.email!, name: dbUser.name, image: dbUser.image, role }
    }

    await prisma.user.upsert({
      where: { email: user.email! },
      update: { name, image, role },
      create: { email: user.email!, name, image, role },
    })

    return { id: user.id, email: user.email!, name, image, role }
  } catch {
    return { id: user.id, email: user.email!, name, image, role }
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") redirect("/login")
  return user
}
