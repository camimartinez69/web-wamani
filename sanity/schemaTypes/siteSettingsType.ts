import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Ajustes del sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'mainEmail',
      title: 'Mail principal',
      type: 'string',
    }),
    defineField({
      name: 'mainWhatsapp',
      title: 'WhatsApp principal',
      type: 'string',
      description: 'Escribilo con código de país. Ejemplo: 5492611234567',
    }),
    defineField({
      name: 'secondaryWhatsapp',
      title: 'WhatsApp secundario',
      type: 'string',
      description: 'Escribilo con código de país. Ejemplo: 5492611234567',
    }),
    defineField({
      name: 'locationEs',
      title: 'Ubicación (ES)',
      type: 'string',
    }),
    defineField({
      name: 'locationEn',
      title: 'Location (EN)',
      type: 'string',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Link de Google Maps',
      type: 'url',
    }),
    defineField({
      name: 'contactCtaEs',
      title: 'CTA de contacto (ES)',
      type: 'string',
    }),
    defineField({
      name: 'contactCtaEn',
      title: 'CTA de contacto (EN)',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Ajustes del sitio',
      }
    },
  },
})