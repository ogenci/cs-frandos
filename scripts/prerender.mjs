import puppeteer from 'puppeteer'
import {createClient} from '@sanity/client'
import {createServer} from 'http'
import {readFileSync, existsSync, mkdirSync, writeFileSync} from 'fs'
import {resolve, join, dirname, extname} from 'path'
import * as cheerio from 'cheerio'

const SITE_URL = 'https://csfranddos.com'

const STATIC_ROUTES = [
  '/', '/about', '/services', '/destinations', '/insights',
  '/contact', '/reviews', '/vacancies',
]

const DESTINATION_SLUGS = [
  'paris', 'dubai', 'london', 'toronto', 'new-york', 'amsterdam',
]

let postSlugs = []
try {
  const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || '9ruf4c2t',
    dataset: process.env.VITE_SANITY_DATASET || 'cs-franddos',
    apiVersion: '2024-01-01',
    useCdn: true,
  })
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  )
  postSlugs = posts.map(p => p.slug)
  console.log(`Fetched ${postSlugs.length} post slugs for prerendering`)
} catch (e) {
  console.warn('Failed to fetch posts for prerendering:', e.message)
}

const routes = [
  ...STATIC_ROUTES,
  ...DESTINATION_SLUGS.map(s => `/destination/${s}`),
  ...postSlugs.map(s => `/insights/${s}`),
]

const outDir = resolve(import.meta.dirname, '..', 'dist', 'public')
const port = 4173

const server = createServer((req, res) => {
  const safePath = req.url.split('?')[0].split('#')[0]
  let filePath = join(outDir, safePath === '/' ? 'index.html' : safePath)

  if (!existsSync(filePath)) {
    const dirIndex = join(outDir, safePath, 'index.html')
    if (existsSync(dirIndex)) {
      filePath = dirIndex
    } else {
      filePath = join(outDir, 'index.html')
    }
  }

  const mime = {
    '.html': 'text/html', '.js': 'application/javascript',
    '.css': 'text/css', '.webp': 'image/webp',
    '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.json': 'application/json',
    '.woff2': 'font/woff2', '.xml': 'application/xml',
  }

  try {
    const content = readFileSync(filePath)
    res.writeHead(200, {'Content-Type': mime[extname(filePath)] || 'application/octet-stream'})
    res.end(content)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
})

await new Promise(resolve => server.listen(port, resolve))
console.log(`Static server on http://localhost:${port}`)

let browser
try {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
  })
} catch (e) {
  console.error('Failed to launch Puppeteer:', e.message)
  console.log('Build will continue without prerendered HTML')
  server.close()
  process.exit(0)
}

const page = await browser.newPage()
page.setDefaultTimeout(30000)

page.on('console', msg => {
  if (msg.type() === 'error') return
})

await page.evaluateOnNewDocument(() => {
  window.__PRERENDER__ = true
})

let success = 0
let failed = 0

for (const route of routes) {
  const url = `http://localhost:${port}${route}`
  process.stdout.write(`  ${route}... `)

  try {
    await page.goto(url, {waitUntil: 'networkidle0', timeout: 30000})

    const raw = await page.content()
    const $ = cheerio.load(raw)

    $('title').first().remove()

    const seen = new Set()
    $('meta').each((_i, el) => {
      const $el = $(el)
      const key = $el.attr('name') || $el.attr('property') || $el.attr('charset')
      if (key) {
        if (seen.has(key)) { $el.remove(); return }
        seen.add(key)
      }
    })

    const html = $.html()

    const outPath = route === '/'
      ? join(outDir, 'index.html')
      : join(outDir, route.slice(1), 'index.html')

    mkdirSync(dirname(outPath), {recursive: true})
    writeFileSync(outPath, html)
    success++
    console.log(`✓ (${(html.length / 1024).toFixed(1)} KB)`)
  } catch (e) {
    failed++
    console.log(`✗ ${e.message}`)
  }
}

await browser.close()
server.close()
console.log(`\nPrerendered ${success} pages${failed ? `, ${failed} failed` : ''}`)
