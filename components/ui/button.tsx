import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"



const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default: "bg-primary-300 text-gray-50 hover:bg-primary-400/90  ",
        destructive:
          "bg-red-500 text-gray-50 hover:bg-red-500/90 ",
        outline:
          "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 ",
        gray:
          "bg-gray-100 text-gray-900 hover:bg-gray-100/80 ",
        ghost: "hover:bg-gray-100 hover:text-gray-900 ",
        swipe: "relative overflow-hidden rounded-full border-2 border-solid border-gray-700 px-4 py-2 text-sm text-gray-800 hover:text-white transition-colors duration-700 ease-out before:absolute before:-left-10 before:top-0 before:z-[-1] before:h-full before:w-[0%] before:skew-x-[45deg] before:bg-gray-700 before:transition-all before:delay-75 before:duration-700 before:content-[''] hover:before:w-[150%] focus:outline-none focus:ring-gray-600 focus:ring-offset-1 focus:ring-offset-white focus:before:w-[150%] focus-visible:ring-2 dark:border-gray-500 dark:text-gray-200 dark:before:bg-gray-500 dark:focus:ring-gray-400 dark:focus:ring-offset-jet", link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
