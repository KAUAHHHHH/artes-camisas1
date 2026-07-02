import { createClient as createServerClient } from "./server"
import { createClient as createBrowserClient } from "./client"
import { prisma } from "@/lib/prisma"

export async function signUp(email: string, password: string, name: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
  if (error) return { error: error.message }
  return { success: true }
}

export async function signIn(email: string, password: string) {
  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  return { success: true }
}

export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
}

export async function getCurrentUser() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
    if (dbUser) return { id: dbUser.id, email: dbUser.email!, name: dbUser.name, image: dbUser.image, role: dbUser.role }
  } catch {}

  return { id: user.id, email: user.email!, name: user.user_metadata?.name || null, image: user.user_metadata?.avatar_url || null, role: "CLIENT" as const }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized")
  return user
}

export async function signInWithOAuth(provider: "google" | "github") {
  const supabase = createBrowserClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  })
  if (error) return { error: error.message }
  return { url: data.url }
}
