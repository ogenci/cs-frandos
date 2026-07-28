import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

function createSanityClient() {
  try {
    return createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  } catch {
    console.warn(
      'Sanity client not configured. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET env vars.'
    )
    return null
  }
}

export const client = createSanityClient()

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  return builder?.image(source) ?? null
}

async function safeFetch<T>(fetcher: () => Promise<T>): Promise<T | null> {
  if (!client) return null
  try {
    return await fetcher()
  } catch (e) {
    console.warn('Sanity fetch failed:', e)
    return null
  }
}

export function getTestimonials(): Promise<any[]> {
  if (!client) return Promise.resolve([])
  return safeFetch(() =>
    client!.fetch(
      `*[_type == "testimonial"] | order(_createdAt desc) {
        _id, featured,
        "videoUrl": video.asset->url,
        "thumbnailUrl": thumbnail.asset->url
      }`
    )
  ).then(r => r ?? [])
}

export function getLatestTestimonials(count: number = 4): Promise<any[]> {
  if (!client) return Promise.resolve([])
  return safeFetch(() =>
    client!.fetch(
      `*[_type == "testimonial"] | order(_createdAt desc) [0...$count] {
        _id, featured,
        "videoUrl": video.asset->url,
        "thumbnailUrl": thumbnail.asset->url
      }`,
      {count}
    )
  ).then(r => r ?? [])
}

export function getVacancies(): Promise<any[]> {
  if (!client) return Promise.resolve([])
  return safeFetch(() =>
    client!.fetch(
      `*[_type == "vacancy" && status == "Open"] | order(deadline asc) {
        _id, title, slug, location, type, department, description, requirements, deadline, status
      }`
    )
  ).then(r => r ?? [])
}

export function getPosts(): Promise<any[]> {
  if (!client) return Promise.resolve([])
  return safeFetch(() =>
    client!.fetch(
      `*[_type == "post"] | order(date desc) {
        _id, title, slug, tag, summary, date, readTime, author,
        "imageUrl": image.asset->url
      }`
    )
  ).then(r => r ?? [])
}

export function getPostBySlug(slug: string) {
  return safeFetch(() =>
    client!.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id, title, slug, tag, summary, content, date, readTime, author,
        "imageUrl": image.asset->url
      }`,
      {slug}
    )
  )
}

export function getLatestPosts(count: number = 3): Promise<any[]> {
  if (!client) return Promise.resolve([])
  return safeFetch(() =>
    client!.fetch(
      `*[_type == "post"] | order(date desc) [0...$count] {
        _id, title, slug, tag, summary, date, readTime, author,
        "imageUrl": image.asset->url
      }`,
      {count}
    )
  ).then(r => r ?? [])
}