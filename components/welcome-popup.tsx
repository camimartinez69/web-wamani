"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function WelcomePopup() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const t = content.popup[language]

  useEffect(() => {
    setMounted(true)

    const dismissed = window.sessionStorage.getItem("wamani-welcome-popup-dismissed")

    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    window.sessionStorage.setItem("wamani-welcome-popup-dismissed", "true")
    setIsOpen(false)
  }

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-carbon/60 backdrop-blur-[2px] animate-in fade-in duration-500"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-bone rounded-2xl shadow-2xl border border-sand/20 ring-1 ring-carbon/5 animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-500">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/50 to-carbon/80" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: "url('/images/hero-1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="relative p-10 md:p-14 text-center">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 text-sand/70 hover:text-sand transition-colors rounded-full hover:bg-sand/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="font-serif text-3xl md:text-4xl text-sand mb-5 leading-tight text-balance">
            {t.headline}
          </h2>

          <p className="text-sand/85 text-base md:text-lg leading-relaxed mb-10 max-w-sm mx-auto">
            {t.supporting}
          </p>

          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center px-8 py-3 bg-copper text-sand font-medium rounded-lg transition-all duration-300 hover:bg-copper/90 hover:shadow-lg hover:scale-[1.02]"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </div>
  )
}