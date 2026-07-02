import { requireAdmin } from "@/lib/auth"
import { AdminNav } from "@/components/admin-nav"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[200px_1fr] gap-6">
          <AdminNav />
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
