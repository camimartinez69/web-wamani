"use client"

import { useEffect, useMemo, useState } from "react"
import { X, Home, Bed, Circle, Trees, Building, Landmark, type LucideIcon } from "lucide-react"
import { content, ui, type Space } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"
import { client } from "@/sanity/lib/client"

const icons: Record<string, LucideIcon> = {
  casco: Home,
  dormis: Bed,
  domo: Circle,
  "domos-selerpe": Trees,
  "puesto-lolo": Building,
  "puesto-selerpe": Landmark,
}

type SanityGalleryImage = {
  imageUrl?: string
  altEs?: string
  altEn?: string
}

type SanitySpaceItem = {
  _id: string
  spaceKey: string
  nameEs?: string
  nameEn?: string
  shortDescriptionEs?: string
  shortDescriptionEn?: string
  fullDescriptionEs?: string
  fullDescriptionEn?: string
  atmosphereEs?: string
  atmosphereEn?: string
  stayTypeEs?: string
  stayTypeEn?: string
  featuresEs?: string[]
  featuresEn?: string[]
  coverImageUrl?: string
  coverAltEs?: string
  coverAltEn?: string
  gallery?: SanityGalleryImage[]
  upcoming?: boolean
  order?: number
}

const SPACES_QUERY = `*[_type == "spaceItem"] | order(coalesce(order, 9999) asc, _createdAt asc) {
  _id,
  spaceKey,
  nameEs,
  nameEn,
  shortDescriptionEs,
  shortDescriptionEn,
  fullDescriptionEs,
  fullDescriptionEn,
  atmosphereEs,
  atmosphereEn,
  stayTypeEs,
  stayTypeEn,
  featuresEs,
  featuresEn,
  upcoming,
  order,
  "coverImageUrl": coverImage.asset->url,
  "coverAltEs": coverImage.altEs,
  "coverAltEn": coverImage.altEn,
  gallery[]{
    "imageUrl": image.asset->url,
    altEs,
    altEn
  }
}`

export function EspaciosSection() {
  const { language } = useLanguage()
  const t = content.espacios[language]
  const labels = ui[language]

  const [cmsSpaces, setCmsSpaces] = useState<SanitySpaceItem[]>([])
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    client
      .fetch(SPACES_QUERY)
      .then((data) => setCmsSpaces(data ?? []))
      .catch((error) => console.error("Error loading spaces:", error))
  }, [])

  const fallbackSpaces = t.spaces

  const fallbackById = useMemo(() => {
    return new Map(fallbackSpaces.map((space) => [space.id, space]))
  }, [fallbackSpaces])

  const fallbackIndex = useMemo(() => {
    return new Map(fallbackSpaces.map((space, index) => [space.id, index]))
  }, [fallbackSpaces])

  const localizedCmsSpaces = useMemo<Space[]>(() => {
    return cmsSpaces.map((item) => {
      const fallback = fallbackById.get(item.spaceKey)

      const pickText = (es?: string, en?: string, fallbackValue?: string) => {
        return language === "en"
          ? en || es || fallbackValue || ""
          : es || en || fallbackValue || ""
      }

      const coverImage = item.coverImageUrl || fallback?.image || ""

      const galleryImages =
        item.gallery
          ?.map((img) => img.imageUrl)
          .filter((img): img is string => Boolean(img)) || []

      const mergedImages = coverImage
        ? [coverImage, ...galleryImages.filter((img) => img !== coverImage)]
        : galleryImages

      const finalImages =
        mergedImages.length > 0
          ? mergedImages
          : fallback?.images || (coverImage ? [coverImage] : [])

      const features =
        language === "en"
          ? item.featuresEn?.length
            ? item.featuresEn
            : item.featuresEs?.length
              ? item.featuresEs
              : fallback?.features || []
          : item.featuresEs?.length
            ? item.featuresEs
            : item.featuresEn?.length
              ? item.featuresEn
              : fallback?.features || []

      return {
        id: item.spaceKey || fallback?.id || item._id,
        name: pickText(item.nameEs, item.nameEn, fallback?.name),
        description: pickText(item.shortDescriptionEs, item.shortDescriptionEn, fallback?.description),
        fullDescription: pickText(item.fullDescriptionEs, item.fullDescriptionEn, fallback?.fullDescription),
        atmosphere: pickText(item.atmosphereEs, item.atmosphereEn, fallback?.atmosphere),
        stayType: pickText(item.stayTypeEs, item.stayTypeEn, fallback?.stayType),
        features,
        image: coverImage || fallback?.image || "",
        images: finalImages,
        upcoming: item.upcoming ?? fallback?.upcoming ?? false,
      }
    })
  }, [cmsSpaces, fallbackById, language])

  const displayedSpaces = useMemo(() => {
    if (!cmsSpaces.length) return fallbackSpaces

    const cmsById = new Map(localizedCmsSpaces.map((space) => [space.id, space]))
    const orderById = new Map(cmsSpaces.map((item) => [item.spaceKey, item.order ?? 9999]))

    const merged = fallbackSpaces.map((space) => cmsById.get(space.id) || space)
    const extraCms = localizedCmsSpaces.filter((space) => !fallbackById.has(space.id))

    return [...merged, ...extraCms].sort((a, b) => {
      const orderA = orderById.get(a.id)
      const orderB = orderById.get(b.id)

      if ((orderA ?? 9999) !== (orderB ?? 9999)) {
        return (orderA ?? 9999) - (orderB ?? 9999)
      }

      return (fallbackIndex.get(a.id) ?? 9999) - (fallbackIndex.get(b.id) ?? 9999)
    })
  }, [cmsSpaces, localizedCmsSpaces, fallbackSpaces, fallbackById, fallbackIndex])

  const selectedSpace = displayedSpaces.find((space) => space.id === selectedSpaceId) || null

  return (
    <>
      <section id="espacios" className="py-14 md:py-32 bg-bone">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-3 md:mb-4 text-balance">
              {t.title}
            </h2>
            <p className="text-carbon/70 text-base md:text-lg leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {displayedSpaces.map((space) => {
              const Icon = icons[space.id] || Home
              const isUpcoming = space.upcoming === true

              return (
                <button
                  key={space.id}
                  onClick={() => !isUpcoming && setSelectedSpaceId(space.id)}
                  className={`group relative rounded-lg overflow-hidden aspect-[3/4] md:aspect-[4/5] text-left ${
                    isUpcoming ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                      isUpcoming
                        ? "blur-[2px] saturate-50 scale-105"
                        : "group-hover:scale-110"
                    }`}
                    style={{ backgroundImage: `url(${space.image})` }}
                  />

                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      isUpcoming
                        ? "bg-gradient-to-t from-carbon/85 via-carbon/50 to-carbon/30"
                        : "bg-gradient-to-t from-carbon/80 via-carbon/30 to-carbon/10 group-hover:from-carbon/90"
                    }`}
                  />

                  {isUpcoming && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-sand/90 backdrop-blur-sm rounded text-xs font-medium text-carbon/80 tracking-wide">
                      {labels.comingSoon}
                    </div>
                  )}

                  {!isUpcoming && (
                    <div className="absolute top-4 right-4 w-10 h-10 bg-sand/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Icon className="w-5 h-5 text-copper" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                    <h3
                      className={`font-serif text-lg md:text-2xl mb-1 md:mb-2 ${
                        isUpcoming ? "text-sand/80" : "text-sand"
                      }`}
                    >
                      {space.name}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed line-clamp-2 ${
                        isUpcoming
                          ? "text-sand/60"
                          : "text-sand/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      }`}
                    >
                      {space.description}
                    </p>

                    {!isUpcoming && (
                      <div className="mt-3 flex items-center gap-2 text-copper text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>{labels.viewMore}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {selectedSpace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-carbon/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedSpaceId(null)}
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-sand rounded-lg shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            <button
              onClick={() => setSelectedSpaceId(null)}
              className="absolute top-4 right-4 z-20 p-2 text-sand/80 hover:text-sand bg-carbon/30 hover:bg-carbon/50 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedSpace.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  {selectedSpace.stayType && (
                    <span className="px-2.5 py-1 bg-copper/90 text-sand text-xs font-medium rounded">
                      {selectedSpace.stayType}
                    </span>
                  )}
                  {selectedSpace.atmosphere && (
                    <span className="px-2.5 py-1 bg-sand/20 backdrop-blur-sm text-sand text-xs rounded">
                      {selectedSpace.atmosphere}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-3xl text-sand">
                  {selectedSpace.name}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-carbon/80 leading-relaxed mb-6">
                {selectedSpace.fullDescription}
              </p>

              {selectedSpace.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-carbon/50 uppercase tracking-wider mb-3">
                    {labels.features}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpace.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-sage/10 text-carbon/70 text-sm rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedSpace.images.length > 1 && (
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-carbon/50 uppercase tracking-wider mb-3">
                    {labels.gallery}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedSpace.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLightboxImage(img)}
                        className="aspect-square rounded bg-cover bg-center cursor-zoom-in"
                        style={{ backgroundImage: `url(${img})` }}
                        aria-label={`Gallery image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedSpaceId(null)}
                className="w-full px-6 py-3 bg-copper text-sand font-medium rounded hover:bg-copper/90 transition-colors"
              >
                {t.closeButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-carbon/90 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-20 p-3 text-sand/70 hover:text-sand rounded-full hover:bg-sand/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full">
            <div
              className="w-full h-[85vh] rounded-lg bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${lightboxImage})` }}
            />
          </div>
        </div>
      )}
    </>
  )
}