"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { content } from "@/lib/content"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {client} from '@/sanity/lib/client'
// Portrait image IDs - these will get taller aspect ratio
const PORTRAIT_IDS = ["paisaje-2", "paisaje-4", "paisaje-5", "vida-4", "espacios-1", "paisaje-6"]
const GALLERY_QUERY = `*[_type == "galleryItem"] | order(coalesce(order, 9999) asc, _createdAt desc){
  _id,
  title,
  alt,
  category,
  "imageUrl": image.asset->url
}`
function GaleriaPageContent() {
  const { language } = useLanguage()
  const router = useRouter()
  const t = content.galeria[language]
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [sanityImages, setSanityImages] = useState<any[]>([])
  useEffect(() => {
    client
      .fetch(GALLERY_QUERY)
      .then((data) => {
        setSanityImages(data ?? [])
      })
      .catch((err) => {
        console.error('Error loading gallery from Sanity:', err)
      })
  }, [])
  // Combine featured + all images with proper orientation detection
  const staticImages = [
    {
      src: t.featured.image,
      alt: t.featured.alt,
      caption: t.featured.caption,
      category: 'all',
      isPortrait: false,
    },
    ...t.images.map((img) => ({
      src: img.src,
      alt: img.alt,
      caption: img.alt,
      category: img.category || 'all',
      isPortrait: PORTRAIT_IDS.includes(img.id),
    })),
  ]
  
  const cmsImages = sanityImages.map((img: any) => ({
    src: img.imageUrl,
    alt: img.alt || img.title || 'Wamani',
    caption: img.title || '',
    category: img.category || 'all',
    isPortrait: false,
  }))
  
  const allImages = [...staticImages, ...cmsImages]
  console.log('staticImages:', staticImages.length, 'cmsImages:', cmsImages.length)
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand pt-20">
        {/* Header Section - compact, left-aligned */}
        <div className="w-full px-3 md:px-6 lg:px-10 py-8 md:py-12">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-carbon/60 hover:text-carbon text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "es" ? "Volver" : "Go back"}
          </button>
          
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-carbon mb-2">
            {t.title}
          </h1>
          <p className="text-carbon/60 text-base md:text-lg leading-relaxed max-w-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Full Gallery - Expansive CSS Columns Masonry */}
        <div className="w-full px-1.5 md:px-3 lg:px-6 pb-12 md:pb-20">
          <div 
            className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6"
            style={{ columnGap: '4px' }}
          >
            {allImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid mb-1 cursor-pointer group relative overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                {/* Use natural aspect ratios: portrait gets 2:3, landscape gets 3:2 */}
                <div 
                  className="relative w-full"
                  style={{ 
                    aspectRatio: image.isPortrait ? '2/3' : '3/2'
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, (max-width: 1536px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/10 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

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
            <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
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
              {allImages[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default function GaleriaPage() {
  return (
    <LanguageProvider>
      <GaleriaPageContent />
    </LanguageProvider>
  )
}
