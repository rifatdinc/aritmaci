import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--foreground)] text-[var(--card)] shadow-[0_1px_2px_rgba(28,27,24,0.08)] hover:bg-[#2f2d28]',
        ocean:
          'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_1px_2px_rgba(28,27,24,0.08)] hover:bg-[var(--primary-hover)]',
        whatsapp:
          'border border-[var(--border-strong)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-raised)]',
        secondary:
          'border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[#e7e1d6]',
        outline:
          'border border-[var(--border-strong)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-raised)]',
        ghost:
          'text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--foreground)]',
        inverted:
          'bg-[var(--dark-foreground)] text-[var(--surface-dark)] hover:bg-[#ffffff] focus-visible:ring-offset-[var(--surface-dark)]',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
