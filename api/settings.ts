import type { VercelRequest, VercelResponse } from '@vercel/node'
import { get } from '@vercel/edge-config'

const SETTINGS_KEY = 'app-settings'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // GET - Read settings from Edge Config
  if (req.method === 'GET') {
    try {
      const settings = await get(SETTINGS_KEY)
      if (settings) {
        return res.status(200).json(settings)
      }
      return res.status(404).json({ error: 'No settings found' })
    } catch (error) {
      console.error('Error reading Edge Config:', error)
      return res.status(500).json({ error: 'Failed to read settings' })
    }
  }

  // POST - Write settings to Edge Config via Vercel REST API
  if (req.method === 'POST') {
    const edgeConfigId = process.env.EDGE_CONFIG_ID
    const vercelApiToken = process.env.VERCEL_API_TOKEN
    const teamId = process.env.VERCEL_TEAM_ID

    if (!edgeConfigId || !vercelApiToken) {
      return res.status(500).json({ error: 'Missing Edge Config credentials' })
    }

    try {
      const settings = req.body

      // Build URL with optional team ID
      let url = `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`
      if (teamId) {
        url += `?teamId=${teamId}`
      }

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${vercelApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'upsert',
              key: SETTINGS_KEY,
              value: settings,
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Edge Config update failed:', errorText)
        return res.status(500).json({ error: 'Failed to save settings' })
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error writing to Edge Config:', error)
      return res.status(500).json({ error: 'Failed to save settings' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
