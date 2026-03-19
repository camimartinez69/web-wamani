"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function GaleriaSection() {
  const { language } = useLanguage()
  const t = content.galeria[language]
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Combine featured + all images into one array
  const allImages = [
    { src: t.featured.image, alt: t.featured.alt, caption: t.featured.caption },
    ...t.images.map(img => ({ src: img.src, alt: img.alt, caption: img.alt }))
  ]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  // Define image sizes for masonry effect - pattern that respects vertical/horizontal
  // Pattern repeats every 6 images with mixed sizes
  const getImageStyle = (index: number): { span: string; aspectRatio: string } => {
    const patterns = [
      // Row 1: Large featured + 2 smaller
      { span: "col-span-2 row-span-2", aspectRatio: "aspect-[4/3]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      // Row 2: 3 medium
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[3/4]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[3/4]" },
      // Row 3: 2 wide
      { span: "col-span-2 row-span-1", aspectRatio: "aspect-[16/9]" },
      { span: "col-span-2 row-span-1", aspectRatio: "aspect-[16/9]" },
      // Row 4: 4 equal
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[4/3]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[4/3]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      // Row 5: Large + small
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[3/4]" },
      { span: "col-span-2 row-span-2", aspectRatio: "aspect-[4/3]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[3/4]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
    ]
    return patterns[index % patterns.length]
  }

  return (
    <section id="galeria" className="py-16 md:py-24 bg-sand">
      <div className="max-w-[1800px] mx-auto px-3 md:px-6">
        {/* Header */}
        <div className="max-w-xl mb-10 md:mb-14 px-1">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-carbon mb-3">
            {t.title}
          </h2>
          <p className="text-carbon/60 text-base md:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Masonry-style Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5 auto-rows-[140px] md:auto-rows-[200px] lg:auto-rows-[240px]">
          {allImages.map((image, index) => {
            const style = getImageStyle(index)
            return (
              <div
                key={index}
                className={`${style.span} relative overflow-hidden cursor-pointer group`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/10 transition-colors duration-300" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-carbon/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 text-sand/70 hover:text-sand transition-colors rounded-full hover:bg-sand/10"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-sand/70 hover:text-sand transition-colors rounded-full hover:bg-sand/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-sand/70 hover:text-sand transition-colors rounded-full hover:bg-sand/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4 md:p-12 lg:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[85vh]">
              <Image
                src={allImages[lightboxIndex].src}
                alt={allImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sand/60 text-sm font-mono">
            {lightboxIndex + 1} / {allImages.length}
          </div>

          {/* Caption */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center max-w-xl px-6">
            <p className="text-sand/80 text-sm">
              {allImages[lightboxIndex].caption || allImages[lightboxIndex].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
