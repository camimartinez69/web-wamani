import type {SchemaTypeDefinition} from 'sanity'
import {galleryItemType} from './galleryItemType'
import {bitacoraPostType} from './bitacoraPostType'
import {conservationItemType} from './conservationItemType'
import {conservationPageType} from './conservationPageType'
import {spaceItemType} from './spacesType'
import {siteSettingsType} from './siteSettingsType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    galleryItemType,
    bitacoraPostType,
    conservationItemType,
    conservationPageType,
    spaceItemType,
    siteSettingsType,
  ],
}