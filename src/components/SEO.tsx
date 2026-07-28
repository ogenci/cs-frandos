import {Helmet} from 'react-helmet-async'

const SITE_NAME = 'CS Franddos Limited'
const SITE_URL = 'https://cs-frandos.vercel.app'
const DEFAULT_DESC = 'Travel, visa, immigration, and passport services based in Ashiaman, Ghana. Unlocking borders and building global careers.'
const OG_IMAGE = '/logo.webp'

interface SEOProps {
  title: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  jsonLd?: Record<string, unknown>
}

export default function SEO({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  publishedTime,
  jsonLd,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />

      {publishedTime && type === 'article' && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
