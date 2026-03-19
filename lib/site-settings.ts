import { client } from "@/sanity/lib/client"

export type SiteSettings = {
  mainEmail?: string
  mainWhatsapp?: string
  secondaryWhatsapp?: string
  locationEs?: string
  locationEn?: string
  mapsUrl?: string
  contactCtaEs?: string
  contactCtaEn?: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0]{
    mainEmail,
    mainWhatsapp,
    secondaryWhatsapp,
    locationEs,
    locationEn,
    mapsUrl,
    contactCtaEs,
    contactCtaEn
  }`)
}