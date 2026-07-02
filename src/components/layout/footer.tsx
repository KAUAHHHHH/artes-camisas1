import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold gradient-text">ArtCamp</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              O maior marketplace de artes para camisas. Packs completos para designers e estamparias.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Categorias</h3>
            <ul className="space-y-2.5">
              {["Futebol", "Igrejas", "Empresas", "Escolas", "Eventos"].map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Ajuda</h3>
            <ul className="space-y-2.5">
              {["Como funciona", "Pagamentos", "Downloads", "Reembolsos", "FAQ"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2.5">
              {["suporte@artcamp.com", "Instagram", "WhatsApp", "Discord"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">2025 ArtCamp. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            {["Termos", "Privacidade", "Cookies"].map((item) => (
              <Link key={item} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
