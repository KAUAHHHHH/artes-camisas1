"use client"

import { MessageCircle } from "lucide-react"

const PHONE = "5583991422744"
const MESSAGE = "Olá! Gostaria de suporte."

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/25 flex items-center justify-center transition-all hover:scale-105"
      aria-label="Suporte via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}
