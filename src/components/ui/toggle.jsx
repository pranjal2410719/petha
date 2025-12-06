"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

const Toggle = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variantStyles = {
    default: "bg-transparent hover:bg-gray-100",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100"
  }
  
  const sizeStyles = {
    default: "h-10 px-3",
    sm: "h-9 px-2.5",
    lg: "h-11 px-5"
  }

  return (
    <TogglePrimitive.Root
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-100 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  )
})

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
