import { useState, useEffect, useCallback } from 'react'
import { loadSettings, saveSettings } from '@/lib/api'
import type { Settings } from '@/types'
import { DEFAULT_SETTINGS } from '@/lib/constants'

const LOCAL_STORAGE_KEY = 'ferienhaus-settings'

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
        setSettingsState(apiSettings)
        setIsLoading(false)
        return
      }

      // 2. Fallback: localStorage
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (stored) {
          setSettingsState(JSON.parse(stored))
        }
      } catch (error) {
        console.warn('Failed to load from localStorage:', error)
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
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }

    // API async aktualisieren
    saveSettings(newSettings).catch((error) => {
      console.warn('Failed to save to API:', error)
    })
  }, [])

  return [settings, setSettings, isLoading]
}
