import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'w-full h-11 px-4 rounded-xl bg-input border border-border/50 text-foreground text-sm',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/50 focus:bg-background',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:border-border',
        // iOS date input fixes
        type === 'date' && 'appearance-none min-h-[44px] [&::-webkit-date-and-time-value]:text-left',
        className
      )}
      {...props}
    />
  )
}
