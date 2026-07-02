import { getCurrentUser } from "@/lib/auth"
import { User, Mail, Calendar } from "lucide-react"

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user?.email) return null

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Meu Perfil</h1>
      <div className="glass-card rounded-2xl p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            {user.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-white font-semibold">{user.name || "Usuário"}</h2>
            <p className="text-sm text-white/40">{user.email}</p>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-white/50"><User className="w-4 h-4 text-violet-400" /> {user.name || "—"}</div>
          <div className="flex items-center gap-3 text-white/50"><Mail className="w-4 h-4 text-violet-400" /> {user.email}</div>
        </div>
      </div>
    </div>
  )
}
