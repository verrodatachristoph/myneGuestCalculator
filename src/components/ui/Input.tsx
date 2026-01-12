import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'w-full h-11 px-4 rounded-lg bg-input border border-border text-foreground text-sm',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // iOS date input fixes
        type === 'date' && 'appearance-none min-h-[44px] [&::-webkit-date-and-time-value]:text-left',
        className
      )}
      {...props}
    />
  )
}
