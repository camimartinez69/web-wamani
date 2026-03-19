import {defineArrayMember, defineField, defineType} from 'sanity'

export const conservationPageType = defineType({
  name: 'conservationPage',
  title: 'Página de Conservación',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitleEs',
      title: 'Hero title (ES)',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleEn',
      title: 'Hero title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitleEs',
      title: 'Hero subtitle (ES)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroSubtitleEn',
      title: 'Hero subtitle (EN)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'introEs',
      title: 'Introducción principal (ES)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introEn',
      title: 'Main introduction (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introSecondaryEs',
      title: 'Introducción secundaria (ES)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introSecondaryEn',
      title: 'Secondary introduction (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sections',
      title: 'Secciones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'sectionKey',
              title: 'Clave de sección',
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
              name: 'titleEs',
              title: 'Título (ES)',
              type: 'string',
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
            }),
            defineField({
              name: 'descriptionEs',
              title: 'Descripción (ES)',
              type: 'text',
              rows: 5,
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (EN)',
              type: 'text',
              rows: 5,
            }),
          ],
          preview: {
            select: {
              title: 'titleEs',
              subtitle: 'sectionKey',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'futureTitleEs',
      title: 'Título alianzas (ES)',
      type: 'string',
    }),
    defineField({
      name: 'futureTitleEn',
      title: 'Partnerships title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'futureTextEs',
      title: 'Texto alianzas (ES)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'futureTextEn',
      title: 'Partnerships text (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'futureNoteEs',
      title: 'Nota alianzas (ES)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'futureNoteEn',
      title: 'Partnerships note (EN)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Página de Conservación',
      }
    },
  },
})