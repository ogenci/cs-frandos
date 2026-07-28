import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {studioTheme} from './theme'
import {structure} from './structure'
import './custom-studio.css'

export default defineConfig({
  name: 'default',
  title: 'CS Frandos CMS',

  basePath: '/studio',
  projectId: '9ruf4c2t',
  dataset: 'cs-franddos',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
  theme: studioTheme,
})