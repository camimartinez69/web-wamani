"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

// Real Wamani landscape photos - 5 curated images communicating space, silence, and remoteness
const heroImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/83.png-uF8d0liwX27d0pLgOa6chAPoflPqES.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15.png-3afl6ULZov1ovA4jUmkwEuLlPwqvA5.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002444-Ls9GFBhBR1GuZusoKcnSmc0ZQY9BA4.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3653-vE9mJbHYIoeUrmfAQU9ctUpZEhvVwk.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22.png-qQjWcikezQ2jJ2FpFoKBWgOhfUHvrg.jpeg",
]

const FIRST_IMAGE_DURATION = 12000
const STANDARD_DURATION = 8000

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const { language } = useLanguage()
  const t = content.hero[language]
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scheduleNextImage = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    const duration = currentImage === 0 ? FIRST_IMAGE_DURATION : STANDARD_DURATION
    timeoutRef.current = setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, duration)
  }, [currentImage])

  useEffect(() => {
    scheduleNextImage()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [scheduleNextImage])

  const handleScroll = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-carbon/45 via-carbon/30 to-carbon/55" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <img
          src="/logos/wamani-color-bone.svg"
          alt="Wamani"
          className="h-32 md:h-44 lg:h-48 w-auto mx-auto mb-5 md:mb-8 block"
          style={{ background: "transparent", border: "none", boxShadow: "none" }}
        />

        <p className="font-serif text-lg md:text-2xl lg:text-3xl text-sand/90 leading-relaxed mb-6 md:mb-10 max-w-2xl mx-auto px-2">
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => handleScroll("#wamani")}
            className="px-6 py-3 md:px-8 md:py-3.5 bg-copper text-sand text-sm md:text-base font-medium rounded transition-all duration-300 hover:bg-copper/90 hover:shadow-lg hover:scale-105"
          >
            {t.cta1}
          </button>
          <button
            onClick={() => handleScroll("#contacto")}
            className="px-6 py-3 md:px-8 md:py-3.5 bg-sand/10 backdrop-blur-sm text-sand border border-sand/30 text-sm md:text-base font-medium rounded transition-all duration-300 hover:bg-sand/20"
          >
            {t.cta2}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => handleScroll("#wamani")}
          className="p-2 text-sand/70 hover:text-sand transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage ? "bg-sand w-6" : "bg-sand/40 hover:bg-sand/60"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}