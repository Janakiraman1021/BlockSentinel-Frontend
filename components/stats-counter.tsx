"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface StatsCounterProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  duration?: number
}

export function StatsCounter({ icon, value, label, suffix = "", duration = 2 }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

        setCount(Math.floor(progress * value))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 bg-gray-900/30 rounded-lg border border-orange-500/20 backdrop-blur-sm"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-300 font-medium">{label}</div>
    </motion.div>
  )
}
