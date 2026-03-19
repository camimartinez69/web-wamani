"use client"

import Image from "next/image"
import { content, contactInfo } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function DondeEstamosSection() {
  const { language } = useLanguage()
  const t = content.dondeEstamos[language]

  return (
    <section id="donde-estamos" className="py-14 md:py-32 bg-bone">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <span className="inline-block text-copper text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4">
            {t.subtitle}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-4 md:mb-6 text-balance">
            {t.title}
          </h2>
          <p className="text-carbon/70 text-base md:text-lg leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* Map Sequence - Using uploaded accurate SVG assets */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-8">
          {/* Argentina Map - using uploaded "argentina mendoza vector" SVG */}
          <div className="relative bg-sand rounded-lg md:rounded-xl p-2 md:p-6 border border-carbon/5 group hover:border-copper/20 transition-colors">
            <div className="aspect-[2/3] md:aspect-[3/4] relative flex items-center justify-center overflow-hidden rounded">
              <Image
                src="/images/argentina-mendoza.svg"
                alt="Mapa de Argentina con Mendoza destacada"
                fill
                className="object-contain scale-[0.9] md:scale-[0.85]"
                priority
              />
            </div>
            <div className="text-center mt-2 md:mt-5">
              <h3 className="font-serif text-xs md:text-lg text-carbon">{t.argentina}</h3>
              <p className="text-carbon/50 text-[10px] md:text-sm mt-0.5 hidden md:block">Mendoza</p>
            </div>
          </div>

          {/* Mendoza Province Map */}
          <div className="relative bg-sand rounded-lg md:rounded-xl p-2 md:p-6 border border-carbon/5 group hover:border-copper/20 transition-colors">
            <div className="aspect-[2/3] md:aspect-[3/4] relative flex items-center justify-center p-1 md:p-4">
              <Image
                src="/images/mendoza-san-carlos.svg"
                alt="Mapa de Mendoza con San Carlos destacado"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center mt-2 md:mt-5">
              <h3 className="font-serif text-xs md:text-lg text-carbon">{t.mendoza}</h3>
              <p className="text-carbon/50 text-[10px] md:text-sm mt-0.5 hidden md:block">{t.sanCarlos}</p>
            </div>
          </div>

          {/* San Carlos - Local Area with Wamani location */}
          <div className="relative bg-sand rounded-lg md:rounded-xl p-2 md:p-6 border border-copper/25 group hover:border-copper/40 transition-colors">
            <div className="aspect-[2/3] md:aspect-[3/4] w-full flex items-end justify-center pb-1 md:pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/san-carlos-wamani.svg"
                alt="Mapa de San Carlos con ubicación de Wamani"
                className="w-full max-h-[85%] object-contain"
              />
            </div>
            <div className="text-center mt-2 md:mt-5">
              <h3 className="font-serif text-xs md:text-lg text-copper">San Carlos</h3>
              <p className="text-carbon/50 text-[10px] md:text-sm mt-0.5 hidden md:block">Wamani</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
