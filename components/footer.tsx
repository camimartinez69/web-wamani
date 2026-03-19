"use client"

import { useEffect, useState } from "react"
import { content, contactInfo } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"
import { getSiteSettings, type SiteSettings } from "@/lib/site-settings"

export function Footer() {
  const { language } = useLanguage()
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  const t = content.footer[language]

  useEffect(() => {
    getSiteSettings().then((data: SiteSettings | null) => {
      if (data) {
        setSiteSettings(data)
      }
    })
  }, [])

  const location =
    language === "es"
      ? siteSettings?.locationEs || contactInfo.location.es
      : siteSettings?.locationEn || contactInfo.location.en

  return (
    <footer className="py-10 md:py-16 bg-carbon border-t border-sand/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col items-center gap-5 md:gap-8">
          <img
            src="/logos/wamani-color-bone.svg"
            alt="Wamani"
            className="h-12 md:h-20 w-auto block"
            style={{ background: "transparent" }}
          />

          <p className="text-sand/60 text-xs md:text-sm">{location}</p>

          <div className="w-16 h-px bg-sand/20" />

          <p className="text-sand/40 text-xs md:text-sm">
            © {new Date().getFullYear()} {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}