import { cn } from "../../lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const Card = ({ className, as: Component = "div", ...props }: CardProps) => {
  return (
    <Component
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const CardContent = ({
  className,
  as: Component = "div",
  ...props
}: CardContentProps) => {
  return (
    <Component
      className={cn("p-6", className)}
      {...props}
    />
  )
}

export { Card, CardContent }