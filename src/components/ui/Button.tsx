import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'default' | 'sm' | 'icon'
  children: React.ReactNode
}

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Variants
        variant === 'primary' && 'bg-ocean text-white hover:bg-ocean-light focus:ring-ocean/30',
        variant === 'secondary' && 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300',
        variant === 'ghost' && 'text-slate-600 hover:bg-slate-100 focus:ring-slate-300',
        variant === 'danger' && 'text-red-600 hover:bg-red-50 focus:ring-red-300',
        // Sizes
        size === 'default' && 'h-11 px-5 text-sm',
        size === 'sm' && 'h-9 px-4 text-sm',
        size === 'icon' && 'h-10 w-10',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
