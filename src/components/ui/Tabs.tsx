import { cn } from '@/lib/utils'

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={cn('w-full', className)} data-value={value} data-onchange={onValueChange.toString()}>
      {typeof children === 'function'
        ? (children as (props: { value: string; onValueChange: (v: string) => void }) => React.ReactNode)({
            value,
            onValueChange,
          })
        : children}
    </div>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
    >
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

export function TabsTrigger({ value, active, onClick, children, className }: TabsTriggerProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-value={value}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        active ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50',
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

export function TabsContent({ value, active, children, className }: TabsContentProps) {
  if (!active) return null
  return (
    <div
      role="tabpanel"
      data-value={value}
      className={cn(
        'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </div>
  )
}
