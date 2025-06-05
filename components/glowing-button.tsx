"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import type { ReactNode } from "react"

interface GlowingButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function GlowingButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: GlowingButtonProps) {
  const baseClasses = `
    relative overflow-hidden font-semibold transition-all duration-300
    ${
      variant === "primary"
        ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
        : "bg-gray-900/50 border-2 border-orange-500/50 text-orange-500 hover:bg-orange-500/10 hover:border-orange-500"
    }
    ${size === "sm" ? "px-4 py-2 text-sm" : size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3"}
    ${className}
  `

  const buttonContent = (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={baseClasses}>
      <div className="relative z-10 flex items-center justify-center">{children}</div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-400/20 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 border-2 border-orange-500/0"
        whileHover={{ borderColor: "rgba(249, 115, 22, 0.8)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  )
}
