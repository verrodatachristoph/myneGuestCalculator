import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full h-11 px-4 rounded-lg bg-slate-50 border-0 text-slate-800 text-sm',
        'focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:bg-white',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode
}

export function SelectOption({ children, ...props }: SelectOptionProps) {
  return <option {...props}>{children}</option>
}
