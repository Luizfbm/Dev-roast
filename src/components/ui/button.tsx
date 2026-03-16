import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/utils/cn'

const button = tv({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-m',
    'font-mono text-sm font-medium transition-colors focus-visible:outline-none',
    'focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: 'bg-accent-green text-foreground hover:bg-accent-green/90 shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-accent-amber',
      destructive: 'bg-accent-red text-white hover:bg-accent-red/90',
      outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      roast: 'bg-accent-green text-[#0A0A0A] hover:bg-accent-green/90',
    },
    size: {
      default: 'h-10 px-6 py-2.5',
      sm: 'h-8 px-4 text-xs',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'roast',
    size: 'default',
  },
})

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, button }
