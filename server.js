import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SETTINGS_FILE = join(__dirname, 'settings.json')
const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json())

// GET /api/settings - Einstellungen laden
app.get('/api/settings', (req, res) => {
  try {
    if (existsSync(SETTINGS_FILE)) {
      const data = readFileSync(SETTINGS_FILE, 'utf-8')
      res.json(JSON.parse(data))
    } else {
      res.json(null)
    }
  } catch (error) {
    console.error('Error reading settings:', error)
    res.status(500).json({ error: 'Failed to read settings' })
  }
})

// POST /api/settings - Einstellungen speichern
app.post('/api/settings', (req, res) => {
  try {
    writeFileSync(SETTINGS_FILE, JSON.stringify(req.body, null, 2))
    res.json({ success: true })
  } catch (error) {
    console.error('Error writing settings:', error)
    res.status(500).json({ error: 'Failed to write settings' })
  }
})

app.listen(PORT, () => {
  console.log(`API Server running at http://localhost:${PORT}`)
})
