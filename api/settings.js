import { kv } from '@vercel/kv'

const SETTINGS_KEY = 'ferienhaus-settings'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      const settings = await kv.get(SETTINGS_KEY)
      return res.json(settings || null)
    }

    if (req.method === 'POST') {
      await kv.set(SETTINGS_KEY, req.body)
      return res.json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('KV Error:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
