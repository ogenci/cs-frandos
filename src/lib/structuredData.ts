export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CS Franddos Limited',
  url: 'https://csfranddos.com',
  logo: 'https://csfranddos.com/logo.webp',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+233-247-789-031',
    contactType: 'customer service',
    email: 'csfranddosltd@gmail.com',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ashiaman, Near Tigo Office',
    addressLocality: 'Greater Accra',
    addressCountry: 'GH',
  },
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CS Franddos Limited',
  image: 'https://csfranddos.com/logo.webp',
  telephone: ['+233-247-789-031', '+233-242-035-562'],
  email: 'csfranddosltd@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ashiaman, Near Tigo Office',
    addressLocality: 'Greater Accra',
    addressCountry: 'GH',
  },
  url: 'https://csfranddos.com',
  priceRange: '$$',
  openingHours: 'Mo-Sa 08:00-17:00',
}

export function faqSchema(questions: {q: string; a: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({q, a}) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}

export function articleSchema(title: string, description: string, url: string, imageUrl: string, date: string, author: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: imageUrl,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CS Franddos Limited',
      logo: {
        '@type': 'ImageObject',
        url: 'https://csfranddos.com/logo.webp',
      },
    },
  }
}

export function breadcrumbSchema(items: {name: string; url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
