"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"

export function DownloadForm({ email }: { email: string }) {
  const router = useRouter()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get("email") as string
        if (email) router.push(`/downloads?email=${encodeURIComponent(email)}`)
      }}
      className="flex gap-2"
    >
      <Input
        name="email"
        type="email"
        defaultValue={email}
        placeholder="seu@email.com"
        required
        className="h-12 rounded-xl flex-1"
      />
      <Button type="submit" className="h-12 rounded-xl gap-2">
        Buscar <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  )
}
