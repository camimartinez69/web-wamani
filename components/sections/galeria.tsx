"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

const INITIAL_EAGER_IMAGES = 8

export function GaleriaSection() {
  const { language } = useLanguage()
  const t = content.galeria[language]
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const allImages = useMemo(
    () => [
      {
        src: t.featured.image,
        alt: t.featured.alt,
        caption: t.featured.caption,
      },
      ...t.images.map((img) => ({
        src: img.src,
        alt: img.alt,
        caption: img.alt,
      })),
    ],
    [t]
  )

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length)
  }, [allImages.length])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

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
  }, [lightboxOpen, closeLightbox, nextImage, prevImage])

  useEffect(() => {
    if (!lightboxOpen || allImages.length === 0) return

    const previousIndex = (lightboxIndex - 1 + allImages.length) % allImages.length
    const nextIndex = (lightboxIndex + 1) % allImages.length

    ;[previousIndex, nextIndex].forEach((index) => {
      const img = new window.Image()
      img.src = allImages[index].src
    })
  }, [lightboxOpen, lightboxIndex, allImages])

  const getImageStyle = (index: number): { span: string; aspectRatio: string } => {
    const patterns = [
      { span: "col-span-2 row-span-2", aspectRatio: "aspect-[4/3]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[3/4]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[3/4]" },
      { span: "col-span-2 row-span-1", aspectRatio: "aspect-[16/9]" },
      { span: "col-span-2 row-span-1", aspectRatio: "aspect-[16/9]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[4/3]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-[4/3]" },
      { span: "col-span-1 row-span-1", aspectRatio: "aspect-square" },
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
        <div className="max-w-xl mb-10 md:mb-14 px-1">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-carbon mb-3">
            {t.title}
          </h2>

          <p className="text-carbon/60 text-base md:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5 auto-rows-[140px] md:auto-rows-[200px] lg:auto-rows-[240px]">
          {allImages.map((image, index) => {
            const style = getImageStyle(index)
            const shouldLoadEarly = index < INITIAL_EAGER_IMAGES

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                className={`${style.span} relative overflow-hidden cursor-pointer group bg-carbon/10 text-left`}
                onClick={() => openLightbox(index)}
                aria-label={`Abrir imagen: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes={
                    index === 0 || style.span.includes("col-span-2")
                      ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      : "(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  }
                  quality={75}
                  {...(shouldLoadEarly
                    ? { priority: true }
                    : { loading: "lazy" as const })}
                />

                <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/10 transition-colors duration-300" />
              </button>
            )
          })}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-carbon/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 text-sand/70 hover:text-sand transition-colors rounded-full hover:bg-sand/10"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-sand/70 hover:text-sand transition-colors rounded-full hover:bg-sand/10"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-sand/70 hover:text-sand transition-colors rounded-full hover:bg-sand/10"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

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
                quality={90}
                priority
              />
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sand/60 text-sm font-mono">
            {lightboxIndex + 1} / {allImages.length}
          </div>

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