"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Mountain, Leaf, Bird, Droplets, ArrowLeft, X, ChevronRight } from "lucide-react"
import { content, ui, type ConservationSection } from "@/lib/content"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { client } from "@/sanity/lib/client"

const icons = {
  mountain: Mountain,
  leaf: Leaf,
  bird: Bird,
  droplets: Droplets,
}

const sectionImages: Record<string, string> = {
  paisaje: "/images/conservacion/paisaje.jpg",
  flora: "/images/conservacion/flora.jpg",
  fauna: "/images/conservacion/nandu.jpg",
  agua: "/images/conservacion/agua.jpg",
}

const heroImages: Record<string, string> = {
  paisaje: "/images/conservacion/paisaje.jpg",
  flora: "/images/conservacion/flora.jpg",
  fauna: "/images/conservacion/guanaco.jpg",
  agua: "/images/conservacion/agua.jpg",
}

type SanityConservationItem = {
  _id: string
  commonNameEs: string
  commonNameEn?: string
  scientificName?: string
  category: string
  shortDescriptionEs?: string
  shortDescriptionEn?: string
  bodyEs?: any[]
  bodyEn?: any[]
  featured?: boolean
  imageUrl?: string
  altEs?: string
  altEn?: string
}

type LocalizedSelectedItem = {
  id: string
  title: string
  scientificName?: string
  shortDescription?: string
  body?: any[]
  imageUrl?: string
  alt?: string
}

type ConservationPageSection = {
  sectionKey: string
  titleEs?: string
  titleEn?: string
  descriptionEs?: string
  descriptionEn?: string
}

type ConservationPageData = {
  heroTitleEs?: string
  heroTitleEn?: string
  heroSubtitleEs?: string
  heroSubtitleEn?: string
  introEs?: string
  introEn?: string
  introSecondaryEs?: string
  introSecondaryEn?: string
  sections?: ConservationPageSection[]
  futureTitleEs?: string
  futureTitleEn?: string
  futureTextEs?: string
  futureTextEn?: string
  futureNoteEs?: string
  futureNoteEn?: string
}

const CONSERVATION_ITEMS_QUERY = `*[_type == "conservationItem"] | order(coalesce(order, 9999) asc, _createdAt desc){
  _id,
  commonNameEs,
  commonNameEn,
  scientificName,
  category,
  shortDescriptionEs,
  shortDescriptionEn,
  bodyEs,
  bodyEn,
  featured,
  "imageUrl": image.asset->url,
  "altEs": image.altEs,
  "altEn": image.altEn
}`

const CONSERVATION_PAGE_QUERY = `*[_type == "conservationPage"][0]{
  heroTitleEs,
  heroTitleEn,
  heroSubtitleEs,
  heroSubtitleEn,
  introEs,
  introEn,
  introSecondaryEs,
  introSecondaryEn,
  sections[]{
    sectionKey,
    titleEs,
    titleEn,
    descriptionEs,
    descriptionEn
  },
  futureTitleEs,
  futureTitleEn,
  futureTextEs,
  futureTextEn,
  futureNoteEs,
  futureNoteEn
}`

function ConservacionPageContent() {
  const { language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const t = content.conservacion[language]
  const labels = ui[language]

  const [selectedSection, setSelectedSection] = useState<ConservationSection | null>(null)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const [items, setItems] = useState<SanityConservationItem[]>([])
  const [pageData, setPageData] = useState<ConservationPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      client.fetch(CONSERVATION_ITEMS_QUERY),
      client.fetch(CONSERVATION_PAGE_QUERY),
    ])
      .then(([itemsData, pageDataResult]) => {
        setItems(itemsData ?? [])
        setPageData(pageDataResult ?? null)
      })
      .catch((error) => console.error("Error loading conservation content:", error))
      .finally(() => setLoading(false))
  }, [])

  const sectionMap = useMemo(() => {
    const map = new Map<string, ConservationPageSection>()
    pageData?.sections?.forEach((section) => {
      if (section.sectionKey) map.set(section.sectionKey, section)
    })
    return map
  }, [pageData])

  const openSection = (section: ConservationSection, updateUrl = true) => {
    const cmsSection = sectionMap.get(section.id)

    const sectionTitle =
      language === "en"
        ? cmsSection?.titleEn || section.title
        : cmsSection?.titleEs || section.title

    const sectionDescription =
      language === "en"
        ? cmsSection?.descriptionEn || section.fullDescription || section.description
        : cmsSection?.descriptionEs || section.fullDescription || section.description

    setSelectedSection({
      ...section,
      title: sectionTitle,
      description: sectionDescription,
      fullDescription: sectionDescription,
    })
    setExpandedItemId(null)

    if (updateUrl) {
      router.replace(`/conservacion?section=${section.id}`, { scroll: false })
    }
  }

  const closeSectionModal = () => {
    setSelectedSection(null)
    setExpandedItemId(null)
    router.replace("/conservacion", { scroll: false })
  }

  useEffect(() => {
    const sectionParam = searchParams.get("section")
    if (!sectionParam) return

    const matchedSection = t.sections.find(
      (section) => section.id === sectionParam
    ) as ConservationSection | undefined

    if (matchedSection) {
      openSection(matchedSection, false)
    }
  }, [searchParams, t.sections, language, sectionMap])

  const selectedItems: LocalizedSelectedItem[] = selectedSection
    ? items
        .filter((item) => item.category === selectedSection.id)
        .map((item) => ({
          id: item._id,
          title: language === "en" ? item.commonNameEn || item.commonNameEs : item.commonNameEs,
          scientificName: item.scientificName,
          shortDescription:
            language === "en"
              ? item.shortDescriptionEn || item.shortDescriptionEs
              : item.shortDescriptionEs,
          body:
            language === "en"
              ? item.bodyEn && item.bodyEn.length > 0
                ? item.bodyEn
                : item.bodyEs
              : item.bodyEs,
          imageUrl: item.imageUrl,
          alt:
            language === "en"
              ? item.altEn || item.altEs || item.commonNameEn || item.commonNameEs
              : item.altEs || item.altEn || item.commonNameEs,
        }))
    : []

  const heroTitle =
    language === "en"
      ? pageData?.heroTitleEn || t.title
      : pageData?.heroTitleEs || t.title

  const heroSubtitle =
    language === "en"
      ? pageData?.heroSubtitleEn || t.subtitle
      : pageData?.heroSubtitleEs || t.subtitle

  const introPrimary =
    language === "en"
      ? pageData?.introEn || t.intro
      : pageData?.introEs || t.intro

  const introSecondary =
    language === "en"
      ? pageData?.introSecondaryEn ||
        "Each visit to Wamani is an opportunity to reconnect with nature and understand the cycles that sustain this unique ecosystem. Below, we invite you to discover the four pillars of our conservation vision."
      : pageData?.introSecondaryEs ||
        "Cada visita a Wamani es una oportunidad para reconectar con la naturaleza y comprender los ciclos que sostienen este ecosistema único. A continuación, te invitamos a conocer los cuatro pilares de nuestra visión de conservación."

  const futureTitle =
    language === "en"
      ? pageData?.futureTitleEn || "Conservation partnerships"
      : pageData?.futureTitleEs || "Alianzas para la conservación"

  const futureText =
    language === "en"
      ? pageData?.futureTextEn || t.future
      : pageData?.futureTextEs || t.future

  const futureNote =
    language === "en"
      ? pageData?.futureNoteEn ||
        "If you represent an organization interested in collaborating with Wamani, we would love to talk."
      : pageData?.futureNoteEs ||
        "Si representas una organización interesada en colaborar con Wamani, nos encantaría conversar."

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand">
        <div className="relative h-[60vh] min-h-[400px] max-h-[600px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/67.png-CGtFz3WL5zXHHizY9o3Gf0QxpPv05L.jpeg"
            alt="Paisaje de la precordillera de Wamani con flora nativa y montañas"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/40 via-carbon/25 to-sand" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sand/80 hover:text-sand text-sm mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === "es" ? "Volver" : "Go back"}
              </button>

              <p className="font-serif text-xl md:text-2xl text-sand/90 italic mb-4 max-w-2xl">
                "{heroSubtitle}"
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sand mb-4">
                {heroTitle}
              </h1>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-sand">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <p className="text-carbon/80 text-lg md:text-xl leading-relaxed text-center">
              {introPrimary}
            </p>
            <p className="text-carbon/70 text-lg leading-relaxed mt-6 text-center">
              {introSecondary}
            </p>
          </div>
        </section>

        <section className="bg-bone">
          {t.sections.map((section, index) => {
            const Icon = icons[section.icon as keyof typeof icons] || Mountain
            const heroImage = heroImages[section.id] || sectionImages[section.id]
            const isEven = index % 2 === 0
            const conservationSection = section as ConservationSection
            const cmsSection = sectionMap.get(section.id)

            const sectionTitle =
              language === "en"
                ? cmsSection?.titleEn || section.title
                : cmsSection?.titleEs || section.title

            const sectionDescription =
              language === "en"
                ? cmsSection?.descriptionEn || conservationSection.fullDescription || section.description
                : cmsSection?.descriptionEs || conservationSection.fullDescription || section.description

            const sectionCmsItems = items.filter((item) => item.category === section.id)
            const previewItems = sectionCmsItems.slice(0, 4).map((item) =>
              language === "en" ? item.commonNameEn || item.commonNameEs : item.commonNameEs
            )

            return (
              <div
                key={section.id}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className="relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
                  <Image
                    src={heroImage}
                    alt={sectionTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent to-bone/20 hidden lg:block`}
                  />
                </div>

                <div className="w-full lg:w-1/2 flex items-center">
                  <div className="p-8 md:p-12 lg:p-16 max-w-xl mx-auto lg:mx-0">
                    <div className="w-14 h-14 bg-sage/15 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-sage" />
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl text-carbon mb-4">{sectionTitle}</h2>

                    <p className="text-carbon/70 text-lg leading-relaxed mb-6">
                      {sectionDescription}
                    </p>

                    {sectionCmsItems.length > 0 && (
                      <div className="mb-6">
                        <p className="text-carbon/50 text-sm uppercase tracking-wider mb-3">
                          {language === "es" ? "Destacados" : "Highlights"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {previewItems.map((itemName, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-sage/10 text-carbon/70 text-sm rounded-full"
                            >
                              {itemName}
                            </span>
                          ))}
                          {sectionCmsItems.length > 4 && (
                            <span className="px-3 py-1.5 text-sage text-sm">
                              +{sectionCmsItems.length - 4} {language === "es" ? "más" : "more"}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => openSection(conservationSection)}
                      className="inline-flex items-center gap-2 text-copper hover:text-copper/80 font-medium transition-colors group"
                    >
                      {language === "es" ? "Explorar especies y elementos" : "Explore species and elements"}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        <section className="py-20 md:py-28 bg-sage/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h3 className="font-serif text-2xl md:text-3xl text-carbon mb-6">
              {futureTitle}
            </h3>
            <p className="text-carbon/70 text-lg leading-relaxed mb-8">{futureText}</p>
            <p className="text-carbon/50 text-sm italic">
              {futureNote}
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {selectedSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-carbon/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeSectionModal}
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-sand rounded-xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 overflow-hidden flex flex-col">
            <div className="relative p-6 bg-sage/10 border-b border-sage/20 shrink-0">
              <button
                onClick={closeSectionModal}
                className="absolute top-4 right-4 p-2 text-carbon/50 hover:text-carbon rounded-full hover:bg-carbon/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-sage/20 rounded-lg flex items-center justify-center">
                  {(() => {
                    const Icon = icons[selectedSection.icon as keyof typeof icons] || Mountain
                    return <Icon className="w-7 h-7 text-sage" />
                  })()}
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-carbon">{selectedSection.title}</h3>
                  <p className="text-carbon/60 text-sm mt-1">
                    {selectedItems.length} {labels.registeredItems}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {loading ? (
                <p className="text-carbon/60">{language === "es" ? "Cargando..." : "Loading..."}</p>
              ) : selectedItems.length === 0 ? (
                <p className="text-carbon/60">
                  {language === "es"
                    ? "Todavía no hay elementos cargados en esta categoría."
                    : "There are no items loaded in this category yet."}
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedItems.map((item, index) => {
                    const isExpanded = expandedItemId === item.id

                    return (
                      <div
                        key={item.id ?? `${selectedSection.id}-${item.title}-${index}`}
                        className="group bg-bone rounded-lg border border-sage/10 overflow-hidden hover:border-sage/30 transition-colors"
                      >
                        <div
                          onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                          className="flex gap-4 p-4 cursor-pointer"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (item.imageUrl) {
                                setLightboxImage({
                                  src: item.imageUrl,
                                  alt: item.alt || item.title,
                                })
                              }
                            }}
                            className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-sage/10 ${
                              item.imageUrl
                                ? "cursor-zoom-in hover:ring-2 hover:ring-copper/40 transition-all"
                                : ""
                            }`}
                          >
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.alt || item.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                {(() => {
                                  const Icon = icons[selectedSection.icon as keyof typeof icons] || Mountain
                                  return <Icon className="w-8 h-8 text-sage/40" />
                                })()}
                              </div>
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="font-medium text-carbon">{item.title}</h4>
                                {item.scientificName && (
                                  <p className="text-carbon/50 text-sm italic">{item.scientificName}</p>
                                )}
                              </div>

                              <span className="text-copper text-sm shrink-0 mt-1">
                                {isExpanded
                                  ? language === "es"
                                    ? "Ver menos"
                                    : "Show less"
                                  : language === "es"
                                    ? "Ver más"
                                    : "Read more"}
                              </span>
                            </div>

                            {item.shortDescription && (
                              <p className="text-carbon/70 text-sm mt-2 leading-relaxed">
                                {item.shortDescription}
                              </p>
                            )}

                            {isExpanded && item.body && item.body.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-sage/15 text-carbon/70 text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-2">
                                <PortableText value={item.body} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <button
                onClick={closeSectionModal}
                className="w-full mt-8 px-6 py-3 bg-sage text-sand font-medium rounded-lg hover:bg-sage/90 transition-colors"
              >
                {t.closeButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-carbon/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-3 text-sand/70 hover:text-sand rounded-full hover:bg-sand/10 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full animate-in zoom-in-95 duration-200">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1200}
              height={800}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-sand/80 text-center mt-4 font-medium">{lightboxImage.alt}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function ConservacionPage() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div className="min-h-screen bg-sand" />}>
        <ConservacionPageContent />
      </Suspense>
    </LanguageProvider>
  )
}