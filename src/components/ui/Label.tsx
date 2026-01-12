import { cn } from '@/lib/utils'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn('block text-sm font-medium text-slate-600 mb-2', className)}
      {...props}
    >
      {children}
    </label>
  )
}
