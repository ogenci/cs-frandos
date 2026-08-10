import {createClient} from '@sanity/client'

const PROJECT_ID = process.env.SANITY_PROJECT_ID || '9ruf4c2t'
const DATASET = process.env.SANITY_DATASET || 'cs-franddos'

const RATE_URL = 'https://open.er-api.com/v6/latest/AED'
const DOC_ID = 'exchangeRate'

export default async function handler(req: unknown, res: any) {
  try {
    const response = await fetch(RATE_URL, {headers: {accept: 'application/json'}})
    if (!response.ok) throw new Error(`Rate API responded ${response.status}`)
    const data = await response.json()
    const rate = Number(data?.rates?.GHS)

    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error('Rate API returned an invalid AED→GHS rate')
    }

    const token = process.env.SANITY_TOKEN
    if (!token) throw new Error('SANITY_TOKEN environment variable is not set')

    const client = createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: '2024-01-01',
      useCdn: false,
      token,
    })

    const now = new Date().toISOString()
    const existing = await client.getDocument(DOC_ID)

    if (existing) {
      await client
        .patch(DOC_ID)
        .set({aedToGhsRate: rate, updatedAt: now, rateSource: 'open.er-api.com'})
        .commit()
    } else {
      await client.create({
        _id: DOC_ID,
        _type: 'settings',
        aedToGhsRate: rate,
        updatedAt: now,
        rateSource: 'open.er-api.com',
      })
    }

    return res.status(200).json({ok: true, rate, updatedAt: now})
  } catch (e: any) {
    console.error('exchange-rate sync failed:', e?.message || e)
    return res.status(500).json({ok: false, error: e?.message || 'Failed to sync exchange rate'})
  }
}