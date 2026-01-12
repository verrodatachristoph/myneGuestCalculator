import { cn } from '@/lib/utils'

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn(
      'flex sm:inline-flex gap-1 p-1.5 rounded-2xl',
      'bg-white/40 dark:bg-white/10',
      'backdrop-blur-xl',
      'border border-white/50 dark:border-white/20',
      'shadow-lg shadow-black/5 dark:shadow-black/20',
      className
    )}>
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export function TabsTrigger({ active, onClick, children, className }: TabsTriggerProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
        active
          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
        className
      )}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  active: boolean
  children: React.ReactNode
  className?: string
}

export function TabsContent({ active, children, className }: TabsContentProps) {
  if (!active) return null
  return (
    <div className={cn('mt-6 animate-fade-in', className)}>
      {children}
    </div>
  )
}
