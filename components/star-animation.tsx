"use client"

import { useState } from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface StarAnimationProps {
  color?: string
  size?: number
  count?: number
  duration?: number
  className?: string
}

export function StarAnimation({
  color = "#f97316",
  size = 6,
  count = 20,
  duration = 1.5,
  className = "",
}: StarAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clean up any existing stars
    const existingStars = container.querySelectorAll(".star-particle")
    existingStars.forEach((star) => star.remove())

    // Create new stars
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div")
      star.className = "star-particle absolute"
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.backgroundColor = color
      star.style.borderRadius = "50%"
      star.style.opacity = "0"
      star.style.pointerEvents = "none"

      // Random position within the container
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`

      // Add to container
      container.appendChild(star)

      // Animate the star
      const delay = Math.random() * 0.5
      const angle = Math.random() * Math.PI * 2
      const distance = 30 + Math.random() * 70

      const keyframes = [
        {
          opacity: 0,
          transform: "scale(0) translate(0, 0)",
          offset: 0,
        },
        {
          opacity: 1,
          transform: `scale(1) translate(${(Math.cos(angle) * distance) / 3}px, ${(Math.sin(angle) * distance) / 3}px)`,
          offset: 0.1,
        },
        {
          opacity: 0.8,
          transform: `scale(0.8) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
          offset: 0.8,
        },
        {
          opacity: 0,
          transform: `scale(0) translate(${Math.cos(angle) * distance * 1.2}px, ${Math.sin(angle) * distance * 1.2}px)`,
          offset: 1,
        },
      ]

      star.animate(keyframes, {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        fill: "forwards",
      })

      // Remove the star after animation completes
      setTimeout(
        () => {
          star.remove()
        },
        (duration + delay) * 1000,
      )
    }
  }, [color, size, count, duration])

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}></div>
}

export default function StarBorderWithAnimation({ children, color = "white", className = "", ...props }: any) {
  const [showAnimation, setShowAnimation] = useState(false)

  const triggerAnimation = () => {
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 1500)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={triggerAnimation}
      {...props}
    >
      <div className="relative overflow-hidden rounded-md bg-gradient-to-r from-gray-900 to-gray-800 border border-orange-500/30 px-4 py-2 shadow-lg">
        {showAnimation && <StarAnimation color={color} />}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  )
}
