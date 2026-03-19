import {defineArrayMember, defineField, defineType} from 'sanity'

export const spaceItemType = defineType({
  name: 'spaceItem',
  title: 'Espacios',
  type: 'document',
  fields: [
    defineField({
      name: 'spaceKey',
      title: 'Clave del espacio',
      type: 'string',
      options: {
        list: [
          {title: 'Casco Principal', value: 'casco'},
          {title: 'Dormis', value: 'dormis'},
          {title: 'Domo Amarillo', value: 'domo'},
          {title: 'Domos El Selerpe', value: 'domos-selerpe'},
          {title: 'Puesto Lolo', value: 'puesto-lolo'},
          {title: 'Puesto El Selerpe', value: 'puesto-selerpe'},
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'nameEs',
      title: 'Nombre (ES)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Name (EN)',
      type: 'string',
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
      name: 'fullDescriptionEs',
      title: 'Descripción larga (ES)',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'fullDescriptionEn',
      title: 'Long description (EN)',
      type: 'text',
      rows: 8,
    }),

    defineField({
      name: 'atmosphereEs',
      title: 'Atmósfera (ES)',
      type: 'string',
    }),
    defineField({
      name: 'atmosphereEn',
      title: 'Atmosphere (EN)',
      type: 'string',
    }),

    defineField({
      name: 'stayTypeEs',
      title: 'Tipo de estadía (ES)',
      type: 'string',
    }),
    defineField({
      name: 'stayTypeEn',
      title: 'Stay type (EN)',
      type: 'string',
    }),

    defineField({
      name: 'featuresEs',
      title: 'Características (ES)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'featuresEn',
      title: 'Features (EN)',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'altEs',
          title: 'Alt (ES)',
          type: 'string',
        }),
        defineField({
          name: 'altEn',
          title: 'Alt (EN)',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'altEs',
              title: 'Alt (ES)',
              type: 'string',
            }),
            defineField({
              name: 'altEn',
              title: 'Alt (EN)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'altEs',
              media: 'image',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'upcoming',
      title: 'Próximamente',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'nameEs',
      subtitle: 'spaceKey',
      media: 'coverImage',
    },
  },
})