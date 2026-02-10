import { useState, useEffect, useCallback } from 'react'
import { loadSettings, saveSettings } from '@/lib/api'
import type { Settings } from '@/types'
import { DEFAULT_SETTINGS } from '@/lib/constants'

const LOCAL_STORAGE_KEY = 'ferienhaus-settings'

// Migrate old 4-season settings to new 3-season format
function migrateSettings(stored: Record<string, unknown>): Settings | null {
  const seasons = stored.seasons as Record<string, unknown> | undefined
  if (!seasons) return null
  // If old format detected (has 'high' or 'mid' keys), reset to defaults
  if ('high' in seasons || 'mid' in seasons) {
    return null
  }
  // Check if new format is complete
  if ('holidayPremium' in seasons && 'holiday' in seasons && 'peak' in seasons && 'low' in seasons) {
    return stored as unknown as Settings
  }
  return null
}

export function useSettings(): [Settings, (settings: Settings) => void, boolean] {
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)

  // Beim Start: Erst API versuchen, dann localStorage
  useEffect(() => {
    async function load() {
      setIsLoading(true)

      // 1. Versuche API
      const apiSettings = await loadSettings()
      if (apiSettings) {
        const migrated = migrateSettings(apiSettings as unknown as Record<string, unknown>)
        if (migrated) {
          setSettingsState(migrated)
          setIsLoading(false)
          return
        }
      }

      // 2. Fallback: localStorage
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          const migrated = migrateSettings(parsed)
          if (migrated) {
            setSettingsState(migrated)
          }
          // If migration fails, stick with DEFAULT_SETTINGS
        }
      } catch {
        // Silently ignore localStorage errors
      }

      setIsLoading(false)
    }

    load()
  }, [])

  // Speichern: API + localStorage
  const setSettings = useCallback((newSettings: Settings) => {
    setSettingsState(newSettings)

    // localStorage sofort aktualisieren
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSettings))
    } catch {
      // Silently ignore localStorage errors
    }

    // API async aktualisieren (silently)
    saveSettings(newSettings).catch(() => {
      // Silently ignore - localStorage is the fallback
    })
  }, [])

  return [settings, setSettings, isLoading]
}
