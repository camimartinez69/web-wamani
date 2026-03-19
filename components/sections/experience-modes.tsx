"use client"

import { Pause, Compass, Users, Settings, Mountain, Bike, Sun, Moon } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  pause: Pause,
  compass: Compass,
  users: Users,
  settings: Settings,
  mountain: Mountain,
  bike: Bike,
  sun: Sun,
  moon: Moon,
}

export function ExperienceModesSection() {
  const { language } = useLanguage()
  const t = content.experienceModes[language]

  return (
    <section className="relative py-14 md:py-28 overflow-hidden">
      {/* Section background - soft countryside veil, visible but washed out */}
      <div className="absolute inset-0 bg-sand" />
      {/* Primary landscape texture - visible atmospheric layer */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/L1002444-Ls9GFBhBR1GuZusoKcnSmc0ZQY9BA4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) saturate(0.4) contrast(0.75) brightness(1.1)",
        }}
      />
      {/* Secondary texture for depth - slightly offset */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22.png-qQjWcikezQ2jJ2FpFoKBWgOhfUHvrg.jpeg')",
          backgroundSize: "120%",
          backgroundPosition: "center 60%",
          filter: "blur(60px) saturate(0.3) contrast(0.7)",
        }}
      />
      {/* Warm beige overlay to unify and soften */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand/60 via-sand/40 to-sand/60" />
      <div className="absolute inset-0 bg-sand/25" />
      
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-2 md:mb-3 text-balance">
            {t.title}
          </h2>
          <p className="text-carbon/55 text-sm md:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Cards Grid - clean dark earthy cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {t.modes.map((mode, index) => {
            const Icon = iconMap[mode.icon] || Compass
            
            return (
              <div
                key={index}
                className="group relative p-4 md:p-7 rounded-xl md:rounded-2xl bg-gradient-to-br from-carbon/95 via-carbon/90 to-carbon/85 border border-carbon/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-copper/5 via-transparent to-ochre/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card content */}
                <div className="relative">
                  {/* Icon container - refined copper/ochre accent */}
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-5 bg-copper/15 border border-copper/25 group-hover:bg-copper/20 group-hover:border-copper/40 transition-all">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-copper" />
                  </div>
                  
                  {/* Copper accent line */}
                  <div className="w-6 md:w-8 h-0.5 bg-copper/40 mb-3 md:mb-4 group-hover:w-12 transition-all duration-300" />
                  
                  {/* Title - light warm text */}
                  <h3 className="font-serif text-base md:text-xl text-bone font-medium mb-2 md:mb-3">
                    {mode.title}
                  </h3>
                  
                  {/* Description - softer light text */}
                  <p className="text-bone/70 text-xs md:text-sm leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
