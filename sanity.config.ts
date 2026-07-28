import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './studio/schemaTypes'
import {studioTheme} from './studio/theme'
import {structure} from './studio/structure'
import './studio/custom-studio.css'

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