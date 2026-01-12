import { useState } from 'react'
import { TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Calculator } from '@/components/Calculator/Calculator'
import { Settings } from '@/components/Settings/Settings'
import { useSettings } from '@/hooks/useSettings'
import { DEFAULT_STAY } from '@/lib/constants'
import type { Stay } from '@/types'

type TabValue = 'calculator' | 'settings'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabValue>('calculator')
  const [settings, setSettings, isLoading] = useSettings()
  const [stay, setStay] = useState<Stay>(DEFAULT_STAY)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Lade Einstellungen...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Ferienhaus-Kostenrechner</h1>
          <p className="text-muted-foreground mt-1">Faire Kostenaufteilung für Ferienhaus-Aufenthalte</p>
        </header>

        <div className="w-full">
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
          </TabsList>

          <TabsContent value="calculator" active={activeTab === 'calculator'}>
            <Calculator settings={settings} stay={stay} onStayChange={setStay} />
          </TabsContent>

          <TabsContent value="settings" active={activeTab === 'settings'}>
            <Settings settings={settings} onSettingsChange={setSettings} />
          </TabsContent>
        </div>
      </div>
    </div>
  )
}
