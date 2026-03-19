"use client"

import { useState } from "react"
import Image from "next/image"
import { Mountain, Leaf, Bird, Droplets, ChevronRight, X } from "lucide-react"
import { content, ui, type ConservationSection } from "@/lib/content"
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

export function ConservacionSection() {
  const [selectedSection, setSelectedSection] = useState<ConservationSection | null>(null)
  const { language } = useLanguage()
  const t = content.conservacion[language]
  const labels = ui[language]

  return (
    <>
      <section id="conservacion" className="py-24 md:py-32 bg-sage/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header with refined quote */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="font-serif text-xl md:text-2xl text-sage italic mb-8">
              "{t.subtitle}"
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-6 text-balance">
              {t.title}
            </h2>
            <p className="text-carbon/70 text-lg leading-relaxed">
              {t.intro}
            </p>
          </div>

          {/* Conservation Areas - Visual Cards with Images */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {t.sections.map((section) => {
              const Icon = icons[section.icon as keyof typeof icons] || Mountain
              const imageUrl = sectionImages[section.id]
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section as ConservationSection)}
                  className="group text-left bg-sand rounded-xl overflow-hidden border border-sage/15 hover:border-sage/40 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute top-3 left-3 w-9 h-9 bg-sand/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-sage" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-carbon mb-2 flex items-center justify-between">
                      {section.title}
                      <ChevronRight className="w-4 h-4 text-sage opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-carbon/60 text-sm leading-relaxed line-clamp-2">
                      {section.description}
                    </p>
                    {/* Item count badge */}
                    {"items" in section && (section as ConservationSection).items.length > 0 && (
                      <span className="inline-block mt-3 px-2.5 py-1 bg-sage/10 text-sage text-xs font-medium rounded">
                        {(section as ConservationSection).items.length} {labels.species}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Future Collaborations Note */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-carbon/60 text-sm italic border-t border-sage/20 pt-8">
              {t.future}
            </p>
          </div>
        </div>
      </section>

      {/* Conservation Detail Modal */}
      {selectedSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-carbon/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedSection(null)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-sand rounded-xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative p-6 bg-sage/10 border-b border-sage/20 shrink-0">
              <button
                onClick={() => setSelectedSection(null)}
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
                  <h3 className="font-serif text-2xl text-carbon">
                    {selectedSection.title}
                  </h3>
                  <p className="text-carbon/60 text-sm mt-1">
                    {selectedSection.items.length} {labels.registeredItems}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Full Description */}
              <p className="text-carbon/80 leading-relaxed mb-8">
                {selectedSection.fullDescription}
              </p>
              
              {/* Species/Items List */}
              <div className="space-y-4">
                {selectedSection.items.map((item, index) => (
                  <div 
                    key={index}
                    className="group bg-bone rounded-lg border border-sage/10 overflow-hidden hover:border-sage/30 transition-colors"
                  >
                    <div className="flex gap-4 p-4">
                      {/* Item Image */}
                      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-sage/10">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
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
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-carbon">
                              {item.name}
                            </h4>
                            {item.scientificName && (
                              <p className="text-carbon/50 text-sm italic">
                                {item.scientificName}
                              </p>
                            )}
                          </div>
                          {item.notes && (
                            <span className="shrink-0 px-2 py-1 bg-copper/10 text-copper text-xs rounded">
                              {item.notes}
                            </span>
                          )}
                        </div>
                        <p className="text-carbon/70 text-sm mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedSection(null)}
                className="w-full mt-8 px-6 py-3 bg-sage text-sand font-medium rounded-lg hover:bg-sage/90 transition-colors"
              >
                {t.closeButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
