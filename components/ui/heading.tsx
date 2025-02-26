import type React from "react"
import { cn } from "@/lib/utils"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  as?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

export function Heading({ level = 2, as, children, className, ...props }: HeadingProps) {
  const actualLevel = as || level

  const styles = {
    1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    4: "scroll-m-20 text-xl font-semibold tracking-tight",
    5: "scroll-m-20 text-lg font-semibold tracking-tight",
    6: "scroll-m-20 text-base font-semibold tracking-tight",
  }

  const Component = `h${actualLevel}` as keyof JSX.IntrinsicElements

  return (
    <Component className={cn(styles[actualLevel], className)} {...props}>
      {children}
    </Component>
  )
}

