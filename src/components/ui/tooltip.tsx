import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "../../lib/utils"

// 正确声明：只声明一次
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Tooltip
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: TooltipPrimitive.TooltipContentProps) => (
  <TooltipPrimitive.TooltipContent
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
)

const TooltipArrow = ({
  className,
  ...props
}: TooltipPrimitive.TooltipArrowProps) => (
  <TooltipPrimitive.TooltipArrow
    className={cn("fill-popover", className)}
    {...props}
  />
)

// 导出所有组件
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
}