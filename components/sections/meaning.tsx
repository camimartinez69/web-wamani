"use client"

import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function MeaningSection() {
  const { language } = useLanguage()
  const t = content.meaning[language]

  return (
    <section className="py-14 md:py-32 bg-carbon text-sand">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Short Version */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <span className="inline-block text-copper text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4">
            {t.subtitle}
          </span>
          <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6 text-balance">
            {t.title}
          </h2>
          <p className="text-sand/80 text-base md:text-lg leading-relaxed">
            {t.short}
          </p>
        </div>

        {/* Long Version */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image with white frame */}
          <div className="relative">
            {/* White frame container */}
            <div className="bg-bone p-3 md:p-6 rounded-lg shadow-lg">
              <div className="aspect-[4/3] md:aspect-square rounded overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/85.png-kJCPOP6zbsAXhucN5scycoNPnz5IHm.jpeg')" }}
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-copper/30 rounded-lg -z-10" />
          </div>

          {/* Text Content */}
          <div>
            <span className="inline-block text-copper text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4">
              {t.long.title}
            </span>
            <div className="space-y-4 md:space-y-6">
              {t.long.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sand/80 leading-relaxed text-sm md:text-lg italic"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
