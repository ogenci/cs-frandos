import {createClient} from '@sanity/client'
import {writeFileSync} from 'fs'
import {resolve} from 'path'

const projectId = process.env.VITE_SANITY_PROJECT_ID || '9ruf4c2t'
const dataset = process.env.VITE_SANITY_DATASET || 'cs-franddos'

const SITE = 'https://csfranddos.com'

const STATIC_PAGES = [
  {loc: '/', priority: 1.0},
  {loc: '/about', priority: 0.8},
  {loc: '/services', priority: 0.9},
  {loc: '/destinations', priority: 0.8},
  {loc: '/insights', priority: 0.8},
  {loc: '/contact', priority: 0.7},
  {loc: '/reviews', priority: 0.6},
  {loc: '/vacancies', priority: 0.7},
]

const DESTINATION_SLUGS = [
  'paris', 'dubai', 'london', 'toronto', 'new-york', 'amsterdam',
]

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

let posts = []
try {
  posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "date": date } | order(date desc)`
  )
  console.log(`Fetched ${posts.length} posts from Sanity`)
} catch (e) {
  console.warn('Failed to fetch posts from Sanity, using static URLs only:', e.message)
}

function xmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const urlElements = []

for (const p of STATIC_PAGES) {
  urlElements.push(`  <url>
    <loc>${SITE}${p.loc}</loc>
    <priority>${p.priority}</priority>
  </url>`)
}

for (const slug of DESTINATION_SLUGS) {
  urlElements.push(`  <url>
    <loc>${SITE}/destination/${slug}</loc>
    <priority>0.7</priority>
  </url>`)
}

for (const post of posts) {
  urlElements.push(`  <url>
    <loc>${SITE}/insights/${xmlEscape(post.slug)}</loc>
    ${post.date ? `<lastmod>${xmlEscape(post.date)}</lastmod>\n    ` : ''}<priority>0.7</priority>
  </url>`)
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements.join('\n')}
</urlset>
`

const outDir = resolve(import.meta.dirname, '..', 'dist', 'public')
const outPath = resolve(outDir, 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`Wrote sitemap to ${outPath} (${urlElements.length} URLs)`)
