import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id, featured,
      "videoUrl": video.asset->url,
      "thumbnailUrl": thumbnail.asset->url
    }`
  )
}

export async function getLatestTestimonials(count: number = 4) {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) [0...$count] {
      _id, featured,
      "videoUrl": video.asset->url,
      "thumbnailUrl": thumbnail.asset->url
    }`,
    {count}
  )
}

export async function getVacancies() {
  return client.fetch(
    `*[_type == "vacancy" && status == "Open"] | order(deadline asc) {
      _id, title, slug, location, type, department, description, requirements, deadline, status
    }`
  )
}

export async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(date desc) {
      _id, title, slug, tag, summary, date, readTime, author,
      "imageUrl": image.asset->url
    }`
  )
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, tag, summary, content, date, readTime, author,
      "imageUrl": image.asset->url
    }`,
    {slug}
  )
}

export async function getLatestPosts(count: number = 3) {
  return client.fetch(
    `*[_type == "post"] | order(date desc) [0...$count] {
      _id, title, slug, tag, summary, date, readTime, author,
      "imageUrl": image.asset->url
    }`,
    {count}
  )
}