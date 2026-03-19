"use client"

import { useState } from "react"
import { X, Bike, Footprints, CircleUser, Car, Users, UtensilsCrossed, Star, Mountain } from "lucide-react"
import { content, ui, type Experience } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

const icons = [Bike, Footprints, CircleUser, Car, Users, UtensilsCrossed, Star, Mountain]

export function ExperienciasSection() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const { language } = useLanguage()
  const t = content.experiencias[language]
  const labels = ui[language]

  return (
    <>
      <section id="experiencias" className="py-14 md:py-32 bg-sand">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-3 md:mb-4 text-balance">
              {t.title}
            </h2>
            <p className="text-carbon/70 text-base md:text-lg mb-3 md:mb-4">
              {t.subtitle}
            </p>
            <p className="text-carbon/60 text-sm md:text-base leading-relaxed">
              {t.intro}
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
            {t.experiences.map((experience, index) => {
              const Icon = icons[index]
              return (
                <button
                  key={experience.id}
                  onClick={() => setSelectedExperience(experience)}
                  className="group text-left p-3 md:p-6 bg-bone rounded-lg border border-carbon/5 hover:border-copper/30 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image placeholder or actual image */}
                  <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden mb-3 md:mb-4 bg-sage/10">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${experience.image})` }}
                    />
                    <div className="absolute inset-0 bg-carbon/10 group-hover:bg-carbon/20 transition-colors" />
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-sand/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-copper" />
                    </div>
                  </div>
                  <h3 className="font-medium text-carbon text-sm md:text-base mb-1 md:mb-2 group-hover:text-copper transition-colors">
                    {experience.name}
                  </h3>
                  <p className="text-carbon/60 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {experience.description}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Language Note */}
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-carbon/50 text-sm italic border-t border-carbon/10 pt-8">
              {t.note}
            </p>
          </div>
        </div>
      </section>

      {/* Experience Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-carbon/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedExperience(null)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-sand rounded-lg shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            {/* Close button */}
            <button
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 z-10 p-2 text-sand/80 hover:text-sand bg-carbon/30 hover:bg-carbon/50 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative aspect-video">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedExperience.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-3xl text-sand">
                  {selectedExperience.name}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-carbon/80 leading-relaxed mb-6">
                {selectedExperience.fullDescription}
              </p>

              {/* Additional images if available */}
              {selectedExperience.images && selectedExperience.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {selectedExperience.images.slice(1, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => setSelectedExperience(null)}
                className="w-full px-6 py-3 bg-copper text-sand font-medium rounded hover:bg-copper/90 transition-colors"
              >
                {labels.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
