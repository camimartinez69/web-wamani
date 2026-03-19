"use client"

import Image from "next/image"
import Link from "next/link"
import { Mountain, Leaf, Bird, Droplets, ArrowRight } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

const icons = {
  mountain: Mountain,
  leaf: Leaf,
  bird: Bird,
  droplets: Droplets,
}

// Map section IDs to conservation images
const sectionImages: Record<string, string> = {
  paisaje: "/images/conservacion/paisaje.jpg",
  flora: "/images/conservacion/flora.jpg",
  fauna: "/images/conservacion/nandu.jpg",
  agua: "/images/conservacion/agua.jpg",
}

export function ConservacionPreview() {
  const { language } = useLanguage()
  const t = content.conservacion[language]

  return (
    <section id="conservacion" className="py-14 md:py-32 bg-sage/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <p className="font-serif text-base md:text-2xl text-sage italic mb-4 md:mb-6">
            "{t.subtitle}"
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-4 md:mb-6 text-balance">
            {t.title}
          </h2>
          <p className="text-carbon/70 text-sm md:text-lg leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* Preview Cards - 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {t.sections.map((section) => {
            const Icon = icons[section.icon as keyof typeof icons] || Mountain
            const imageUrl = sectionImages[section.id]

            return (
              <Link
                key={section.id}
                href={`/conservacion?section=${section.id}`}
                className="group block bg-sand rounded-xl overflow-hidden border border-sage/15 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 w-7 h-7 md:w-9 md:h-9 bg-sand/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-sage" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-4">
                  <h3 className="font-serif text-sm md:text-lg text-carbon mb-0.5 md:mb-1">
                    {section.title}
                  </h3>
                  <p className="text-carbon/60 text-xs md:text-sm leading-relaxed line-clamp-2 hidden md:block">
                    {section.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/conservacion"
            className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-sage text-sand text-sm md:text-base font-medium rounded-lg hover:bg-sage/90 transition-colors group"
          >
            {language === "es" ? "Explorar conservación" : "Explore conservation"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}