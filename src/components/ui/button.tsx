import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { type ComponentPropsWithoutRef, forwardRef } from "react"

// 按钮样式变体（保持不变）
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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

// 按钮属性接口：基于原生 button 元素，添加变体属性
export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">, // 继承原生 button 所有属性（包括 disabled）
    VariantProps<typeof buttonVariants> {}

// 直接渲染原生 button 元素，无需 Slot 包装
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    disabled = false, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled} // 原生 button 支持 disabled 属性
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }