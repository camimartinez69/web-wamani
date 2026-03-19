"use client"

import { useEffect, useState } from "react"
import { Clock, Car, MapPin, Plane, ExternalLink } from "lucide-react"
import { content, contactInfo, ui } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"
import { getSiteSettings, type SiteSettings } from "@/lib/site-settings"

const icons = [Clock, Car, MapPin, Plane]

export function ComoLlegarSection() {
  const { language } = useLanguage()
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  const t = content.comoLlegar[language]
  const labels = ui[language]

  useEffect(() => {
    getSiteSettings().then((data: SiteSettings | null) => {
      if (data) {
        setSiteSettings(data)
      }
    })
  }, [])

  const googleMapsUrl =
    siteSettings?.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`

  return (
    <section id="como-llegar" className="py-14 md:py-32 bg-carbon text-sand">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div>
            <span className="inline-block text-copper text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4">
              {t.subtitle}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 text-balance">
              {t.title}
            </h2>
            <p className="text-sand/80 text-base md:text-lg leading-relaxed mb-6 md:mb-10">
              {t.intro}
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {t.details.map((detail, index) => {
                const Icon = icons[index]
                return (
                  <div key={index} className="flex gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-sand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-copper" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sand text-sm md:text-base mb-0.5 md:mb-1">
                        {detail.title}
                      </h3>
                      <p className="text-sand/60 text-xs md:text-sm leading-relaxed">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="aspect-[4/3] lg:aspect-[4/3] rounded-xl overflow-hidden border border-sand/10 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19828.146631860058!2d-69.28260685832835!3d-34.48752192097894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sar!4v1773413197591!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wamani Location"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-copper/20 rounded-xl -z-10" />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sand/50 text-xs font-mono">
                {contactInfo.coordinates.lat.toFixed(4)}°S, {Math.abs(contactInfo.coordinates.lng).toFixed(4)}°W
              </p>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sand/70 hover:text-sand text-sm transition-colors group"
              >
                <span>{labels.openGoogleMaps}</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}