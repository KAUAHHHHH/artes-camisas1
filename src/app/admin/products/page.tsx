import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Package, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true, _count: { select: { orderItems: true } } },
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Produtos</h1>
        <Button><Plus className="w-4 h-4 mr-1" /> Novo Produto</Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-white/40 font-medium">Nome</th>
                <th className="text-left p-4 text-white/40 font-medium">Categoria</th>
                <th className="text-left p-4 text-white/40 font-medium">Preço</th>
                <th className="text-left p-4 text-white/40 font-medium">Vendas</th>
                <th className="text-left p-4 text-white/40 font-medium">Status</th>
                <th className="text-right p-4 text-white/40 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white">{p.name}</td>
                  <td className="p-4 text-white/50">{p.category.name}</td>
                  <td className="p-4 text-white">{formatPrice(Number(p.salePrice || p.price))}</td>
                  <td className="p-4 text-white/50">{p._count.orderItems}</td>
                  <td className="p-4"><Badge variant={p.active ? "success" : "destructive"}>{p.active ? "Ativo" : "Inativo"}</Badge></td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-white/30 hover:text-violet-400"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-white/30 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
