"use client"

import { useEffect, useState } from "react"
import { MessageCircle, Mail, Send, Instagram } from "lucide-react"
import { content, contactInfo } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"
import { getSiteSettings, type SiteSettings } from "@/lib/site-settings"

function formatWhatsapp(number: string) {
  const clean = number.replace(/\D/g, "")

  if (clean.startsWith("549") && clean.length >= 13) {
    return `+54 9 ${clean.slice(3, 6)} ${clean.slice(6, 9)} ${clean.slice(9)}`
  }

  return `+${clean}`
}

export function ContactoSection() {
  const [mounted, setMounted] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  const { language } = useLanguage()
  const t = content.contacto[language]
  const cta = contactInfo.cta[language]
  const labels = contactInfo.labels[language]

  useEffect(() => {
    setMounted(true)

    getSiteSettings().then((data: SiteSettings | null) => {
      if (data) {
        setSiteSettings(data)
      }
    })
  }, [])

  if (!mounted) return null

  const email = siteSettings?.mainEmail || contactInfo.email

  const whatsappRaw = siteSettings?.mainWhatsapp || contactInfo.whatsapp.number
  const whatsappNumber = whatsappRaw.replace(/\D/g, "")
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  const whatsappDisplay = siteSettings?.mainWhatsapp
    ? formatWhatsapp(siteSettings.mainWhatsapp)
    : contactInfo.whatsapp.display

  const secondaryWhatsappRaw = siteSettings?.secondaryWhatsapp || ""
  const secondaryWhatsappNumber = secondaryWhatsappRaw.replace(/\D/g, "")
  const secondaryWhatsappLink = secondaryWhatsappNumber
    ? `https://wa.me/${secondaryWhatsappNumber}`
    : ""
  const secondaryWhatsappDisplay = secondaryWhatsappRaw
    ? formatWhatsapp(secondaryWhatsappRaw)
    : ""

  const primaryWhatsappButtonLabel =
    language === "es" ? "WhatsApp Cami" : "WhatsApp Cami"

  const primaryWhatsappDetailLabel =
    language === "es"
      ? "WhatsApp principal — Cami"
      : "Main WhatsApp — Cami"

  const secondaryWhatsappButtonLabel =
    language === "es"
      ? "WhatsApp alternativo — Lucía"
      : "Alternative WhatsApp — Lucía"

  const secondaryWhatsappDetailLabel =
    language === "es"
      ? "WhatsApp alternativo — Lucía"
      : "Alternative WhatsApp — Lucía"

  const contactDescription =
    language === "es"
      ? siteSettings?.contactCtaEs || labels.contactDescription
      : siteSettings?.contactCtaEn || labels.contactDescription

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section id="contacto" className="py-14 md:py-32 bg-carbon text-sand">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 text-balance">
              {t.title}
            </h2>
            <p className="text-sand/80 text-base md:text-lg leading-relaxed mb-3 md:mb-4">
              {t.subtitle}
            </p>
            <p className="text-sand/60 text-sm md:text-base leading-relaxed mb-6 md:mb-10">
              {t.description}
            </p>

            <div className="mb-8 p-5 bg-sand/5 rounded-lg border border-sand/10">
              <p className="text-sand font-medium mb-2">{labels.contactPerson}</p>
              <p className="text-sand/70 text-sm leading-relaxed">{contactDescription}</p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-sage text-sand text-sm md:text-base font-medium rounded transition-all hover:bg-sage/90 hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  {primaryWhatsappButtonLabel}
                </a>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-sand/10 text-sand border border-sand/30 text-sm md:text-base font-medium rounded transition-all hover:bg-sand/20"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  {cta.email}
                </a>
              </div>

              {secondaryWhatsappNumber ? (
                <a
                  href={secondaryWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-sand/10 text-sand border border-sand/20 text-sm md:text-base font-medium rounded transition-all hover:bg-sand/20"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  {secondaryWhatsappButtonLabel}
                </a>
              ) : null}
            </div>

            <div className="mt-10 pt-8 border-t border-sand/10">
              <div className="grid gap-4 text-sm">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sand/70 hover:text-sand transition-colors group"
                >
                  <Mail className="w-4 h-4 text-copper" />
                  <span className="group-hover:underline">{email}</span>
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sand/70 hover:text-sand transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-copper" />
                  <span className="group-hover:underline">
                    {primaryWhatsappDetailLabel}: {whatsappDisplay}
                  </span>
                </a>

                {secondaryWhatsappNumber ? (
                  <a
                    href={secondaryWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sand/60 hover:text-sand transition-colors group"
                  >
                    <MessageCircle className="w-4 h-4 text-copper/80" />
                    <span className="group-hover:underline">
                      {secondaryWhatsappDetailLabel}: {secondaryWhatsappDisplay}
                    </span>
                  </a>
                ) : null}

                {contactInfo.social.instagram.url ? (
                  <a
                    href={contactInfo.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sand/70 hover:text-sand transition-colors group"
                  >
                    <Instagram className="w-4 h-4 text-copper" />
                    <span className="group-hover:underline">{contactInfo.social.instagram.handle}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 text-sand/50">
                    <Instagram className="w-4 h-4 text-copper/50" />
                    <span>{contactInfo.social.instagram.handle}</span>
                    <span className="text-xs bg-sand/10 px-2 py-0.5 rounded">{labels.instagramSoon}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-sand/5 rounded-lg p-6 md:p-8 backdrop-blur-sm">
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-copper" />
                  </div>
                  <p className="text-sand/80">{t.form.success}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sand/70 text-sm mb-2">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/10 border border-sand/20 rounded text-sand placeholder:text-sand/40 focus:outline-none focus:border-copper transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sand/70 text-sm mb-2">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/10 border border-sand/20 rounded text-sand placeholder:text-sand/40 focus:outline-none focus:border-copper transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sand/70 text-sm mb-2">
                    {t.form.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/10 border border-sand/20 rounded text-sand placeholder:text-sand/40 focus:outline-none focus:border-copper transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-copper text-sand font-medium rounded transition-all hover:bg-copper/90 hover:shadow-lg"
                >
                  {t.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}