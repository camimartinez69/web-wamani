"use client"
import Link from "next/link"
import {useEffect, useState} from 'react'
import {client} from '@/sanity/lib/client'
import { BookOpen } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"
const BITACORA_QUERY = `*[_type == "bitacoraPost" && published == true] | order(coalesce(publishedAt, _createdAt) desc){
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  "imageUrl": coverImage.asset->url
}`
export function BitacoraSection() {
  const { language } = useLanguage()
  const t = content.bitacora[language]

  const [sanityEntries, setSanityEntries] = useState<any[]>([])

  useEffect(() => {
    client
      .fetch(BITACORA_QUERY)
      .then((data) => {
        setSanityEntries(data ?? [])
      })
      .catch((err) => {
        console.error('Error loading bitacora from Sanity:', err)
      })
  }, [])
  
  const staticEntries = (t.entries ?? []).map((entry: any) => ({
    id: entry.id,
    title: entry.title,
    subtitle: entry.subtitle || '',
    image: entry.image || '',
    slug: entry.slug || '',
    category: entry.category || 'Bitácora',
  }))  
  const cmsEntries = sanityEntries.map((entry: any) => ({
    id: entry._id,
    title: entry.title,
    subtitle: entry.excerpt || '',
    image: entry.imageUrl || '',
    slug: entry.slug || '',
    category: entry.category || 'Bitácora',
  }))
  
  const entries = cmsEntries.length > 0 ? [...cmsEntries, ...staticEntries] : staticEntries
  const hasEntries = entries.length > 0
  return (
    <section id="bitacora" className="py-14 md:py-32 bg-sand">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-3 md:mb-4 text-balance">
            {t.title}
          </h2>
          <p className="text-carbon/70 text-base md:text-lg">
            {t.subtitle}
          </p>
        </div>

        {hasEntries ? (
          /* Published entries grid */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {entries.map((entry) => (
              <Link
              key={entry.id}
              href={`/bitacora/${entry.slug}`}
              className="group block"
            >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${entry.image})` }}
                  />
                  <div className="absolute inset-0 bg-carbon/20 group-hover:bg-carbon/30 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-sand/90 text-carbon text-xs font-medium rounded-full">
                      {entry.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl text-carbon group-hover:text-copper transition-colors leading-snug">
                  {entry.title}
                </h3>
                {entry.subtitle && (
  <p className="text-carbon/70 text-sm md:text-base mt-2 leading-relaxed">
    {entry.subtitle}
  </p>
)}
              </Link>
            ))}
          </div>
        ) : (
          /* Empty state - elegant placeholder */
          <div className="space-y-8 md:space-y-12">
            {/* Central message */}
            <div className="max-w-md mx-auto text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-bone border border-carbon/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 md:w-7 md:h-7 text-sage" />
              </div>
              <p className="font-serif text-xl md:text-2xl text-carbon mb-2 md:mb-3">
                {t.emptyState.message}
              </p>
              <p className="text-carbon/60 text-sm md:text-base leading-relaxed">
                {t.emptyState.description}
              </p>
            </div>

            {/* Placeholder cards - visual preview of future content */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {t.placeholderCategories.map((category, index) => (
                <div
                  key={category}
                  className="group"
                >
                  {/* Placeholder image area */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-bone border border-carbon/5">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <pattern id={`pattern-${index}`} patternUnits="userSpaceOnUse" width="20" height="20">
                            <circle cx="10" cy="10" r="1" fill="currentColor" className="text-sage/30" />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill={`url(#pattern-${index})`} />
                      </svg>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-sand/80 text-carbon/40 text-xs font-medium rounded-full border border-carbon/5">
                        {category}
                      </span>
                    </div>
                    {/* Centered placeholder indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-sand/50 border border-carbon/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-sage/40" />
                      </div>
                    </div>
                  </div>
                  {/* Placeholder title lines */}
                  <div className="space-y-2">
                    <div className="h-5 bg-bone rounded w-4/5" />
                    <div className="h-4 bg-bone/60 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
