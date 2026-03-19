"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function GaleriaPreviewSection() {
  const { language } = useLanguage()
  const t = content.galeria[language]

  // 5 curated LANDSCAPE images only for homepage preview
  // Selected for visual variety and impact - no portrait images
  const previewImages = [
    { src: t.featured.image, alt: t.featured.alt },           // Hikers in valley (landscape)
    { src: t.images[0].src, alt: t.images[0].alt },           // Mountain ridges (landscape)
    { src: t.images[11].src, alt: t.images[11].alt },         // Three horses red rocks (landscape)
    { src: t.images[5].src, alt: t.images[5].alt },           // Rider with white horse (landscape)
    { src: t.images[6].src, alt: t.images[6].alt },           // Sunrise from summit (landscape)
  ]

  return (
    <section id="galeria-preview" className="py-12 md:py-24 bg-sand">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="max-w-xl mb-6 md:mb-10">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-carbon mb-1.5 md:mb-2">
            {t.title}
          </h2>
          <p className="text-carbon/60 text-sm md:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Compact 5-image grid - tight gaps, smaller images, all landscape */}
        <div className="grid grid-cols-6 gap-1 mb-6 md:mb-8">
          {/* Row 1: 3 images */}
          <div className="col-span-3 md:col-span-2 relative aspect-[3/2] overflow-hidden group">
            <Image
              src={previewImages[0].src}
              alt={previewImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="col-span-3 md:col-span-2 relative aspect-[3/2] overflow-hidden group">
            <Image
              src={previewImages[1].src}
              alt={previewImages[1].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="col-span-6 md:col-span-2 relative aspect-[3/2] overflow-hidden group">
            <Image
              src={previewImages[2].src}
              alt={previewImages[2].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          
          {/* Row 2: 2 images */}
          <div className="col-span-3 relative aspect-[3/2] overflow-hidden group">
            <Image
              src={previewImages[3].src}
              alt={previewImages[3].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="50vw"
            />
          </div>
          <div className="col-span-3 relative aspect-[3/2] overflow-hidden group">
            <Image
              src={previewImages[4].src}
              alt={previewImages[4].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="50vw"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-carbon text-sand font-medium text-sm tracking-wide hover:bg-carbon/90 transition-colors duration-200"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
