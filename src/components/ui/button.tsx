import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/35 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-zinc-950 text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-zinc-800 hover:shadow-[0_6px_20px_rgba(9,9,11,0.16)]',
        ocean:
          'bg-sky-600 text-white shadow-[0_2px_10px_rgba(2,132,199,0.28)] hover:bg-sky-700 hover:shadow-[0_8px_24px_rgba(2,132,199,0.34)]',
        whatsapp:
          'bg-emerald-600 text-white shadow-[0_2px_10px_rgba(5,150,105,0.24)] hover:bg-emerald-700',
        secondary: 'bg-sky-50 text-sky-900 hover:bg-sky-100',
        outline:
          'border border-slate-200 bg-white text-zinc-950 hover:border-sky-300 hover:bg-sky-50/40',
        ghost: 'text-slate-600 hover:bg-slate-100 hover:text-zinc-950',
      },
      size: {
        sm: 'h-9 px-4 text-[13px]',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-6 text-[14.5px]',
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
