import { useState, useCallback } from 'react'
import { TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Calculator } from '@/components/Calculator/Calculator'
import { Settings } from '@/components/Settings/Settings'
import { Help } from '@/components/Help/Help'
import { Toast } from '@/components/ui/Toast'
import { useSettings } from '@/hooks/useSettings'
import { useTheme } from '@/hooks/useTheme'
import { DEFAULT_STAY } from '@/lib/constants'
import type { Stay, Settings as SettingsType } from '@/types'

type TabValue = 'calculator' | 'settings' | 'help'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabValue>('calculator')
  const [settings, setSettings, isLoading] = useSettings()
  const [stay, setStay] = useState<Stay>(DEFAULT_STAY)
  const [showToast, setShowToast] = useState(false)

  const handleSettingsChange = useCallback((newSettings: SettingsType) => {
    setSettings(newSettings)
    setShowToast(true)
  }, [setSettings])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Lädt...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background bg-gradient-mesh flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 w-full">
        <header className="mb-6 sm:mb-8 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <>
              <img src="/logo.webp" alt="MYNE" className="h-8 sm:h-10 flex-shrink-0 block dark:hidden" />
              <img src="/logo-white.webp" alt="MYNE" className="h-8 sm:h-10 flex-shrink-0 hidden dark:block" />
            </>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">Kostenverteiler</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Alpine Terrace - Brixen im Thale</p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <TabsList className="mb-6">
          <TabsTrigger
            value="calculator"
            active={activeTab === 'calculator'}
            onClick={() => setActiveTab('calculator')}
          >
            Rechner
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Einstellungen
          </TabsTrigger>
          <TabsTrigger
            value="help"
            active={activeTab === 'help'}
            onClick={() => setActiveTab('help')}
          >
            Hilfe
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" active={activeTab === 'calculator'}>
          <Calculator settings={settings} stay={stay} onStayChange={setStay} />
        </TabsContent>

        <TabsContent value="settings" active={activeTab === 'settings'}>
          <Settings settings={settings} onSettingsChange={handleSettingsChange} />
        </TabsContent>

        <TabsContent value="help" active={activeTab === 'help'}>
          <Help />
        </TabsContent>
      </div>

      <footer className="py-6 text-center text-xs text-muted-foreground/60 border-t border-border/50">
        by Christoph Ludwig (MYNE Property Owner)
      </footer>

      <Toast
        message="Einstellungen gespeichert"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}
