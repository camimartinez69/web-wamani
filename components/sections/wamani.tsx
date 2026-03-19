"use client"

import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function WamaniSection() {
  const { language } = useLanguage()
  const t = content.wamani[language]

  return (
    <section id="wamani" className="py-14 md:py-32 bg-sand">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block text-copper text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4">
              {t.subtitle}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-4 md:mb-6 text-balance">
              {t.title}
            </h2>
            <p className="text-carbon/80 text-base md:text-lg leading-relaxed mb-3 md:mb-4">
              {t.intro}
            </p>
            <p className="text-carbon/70 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              {t.description}
            </p>

            {/* Feature Tags */}
            {t.features && t.features.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {t.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/89.png-XKrIzJLWXodLUxdgpSkZcZkKlM3RpC.jpeg')" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
