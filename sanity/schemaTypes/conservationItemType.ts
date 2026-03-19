import {defineArrayMember, defineField, defineType} from 'sanity'

export const conservationItemType = defineType({
  name: 'conservationItem',
  title: 'Conservación',
  type: 'document',
  fields: [
    defineField({
      name: 'commonNameEs',
      title: 'Nombre común (ES)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'commonNameEn',
      title: 'Common name (EN)',
      type: 'string',
    }),
    defineField({
      name: 'scientificName',
      title: 'Nombre científico',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Paisaje', value: 'paisaje'},
          {title: 'Flora', value: 'flora'},
          {title: 'Fauna', value: 'fauna'},
          {title: 'Agua', value: 'agua'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'altEs',
          title: 'Texto alternativo (ES)',
          type: 'string',
        }),
        defineField({
          name: 'altEn',
          title: 'Alternative text (EN)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'shortDescriptionEs',
      title: 'Descripción corta (ES)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'shortDescriptionEn',
      title: 'Short description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bodyEs',
      title: 'Contenido largo (ES)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'bodyEn',
      title: 'Long content (EN)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Orden (opcional)',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'commonNameEs',
      subtitle: 'scientificName',
      media: 'image',
    },
  },
})