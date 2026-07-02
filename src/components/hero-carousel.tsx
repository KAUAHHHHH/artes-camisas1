"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "/interclasse/488_Pantera 02.png",
    title: "Artes Premium para Sublimação",
    subtitle: "Mais de milhares de artes profissionais prontas para impressão, download imediato e atualização constante.",
  },
  {
    image: "/interclasse/291_Dragão 02.png",
    title: "Camisas de Interclasse",
    subtitle: "Packs completos com artes exclusivas para interclasse. Destaque-se na competição.",
  },
  {
    image: "/terceirao/arte1.jpg",
    title: "Camisas de Terceirão",
    subtitle: "Artes personalizadas para a melhor fase da escola. Formatos profissionais.",
  },
  {
    image: "/mockups/pack-esportivo.png",
    title: "Mockups Profissionais",
    subtitle: "Mockups em CDR, PSD e PNG. Prontos para personalizar e apresentar seus designs.",
  },
  {
    image: "/interclasse/800_Pokemon Gengar 02.png",
    title: "Artes para Sublimação",
    subtitle: "Artes em alta resolução prontas para impressão DTF e sublimação.",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const next = useCallback(() => {
    setDir(1)
    setCurrent((p) => (p + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setDir(-1)
    setCurrent((p) => (p - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-[#0D0D0D]/30" />
        </div>
      ))}

      <div className="relative h-full flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                {slides[current].title.split("para")[0]}
                {slides[current].title.includes("para") && (
                  <>
                    <br /><span className="text-[#2563EB]">para{slides[current].title.split("para")[1]}</span>
                  </>
                )}
                {!slides[current].title.includes("para") && (
                  <span className="block text-[#2563EB] mt-2">{slides[current].title.split(" ").slice(-2).join(" ")}</span>
                )}
              </h1>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-lg">
                {slides[current].subtitle}
              </p>
            </div>
            <div className="animate-fade-in-up flex flex-wrap gap-4" style={{ animationDelay: "0.6s" }}>
              <Link href="/search" className="btn-primary">
                Comprar Agora
              </Link>
              <Link href="/search" className="btn-outline">
                Ver Packs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-[#2563EB]" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
