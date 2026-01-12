import { cn } from '@/lib/utils'

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn('flex sm:inline-flex gap-1 p-1 bg-secondary rounded-lg', className)}>
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
        'flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
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
  return <div className={cn('mt-6', className)}>{children}</div>
}
