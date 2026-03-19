import {defineField, defineType} from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Galería',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría (opcional)',
      type: 'string',
      options: {
        list: [
          {title: 'Paisaje', value: 'paisaje'},
          {title: 'Espacios', value: 'espacios'},
          {title: 'Experiencias', value: 'experiencias'},
          {title: 'Conservación', value: 'conservacion'},
          {title: 'Otra', value: 'otra'},
        ],
      },
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Orden (opcional)',
      type: 'number',
    }),
  ],
})