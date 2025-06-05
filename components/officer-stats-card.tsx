"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"

interface OfficerStatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
  suffix?: string
}

export function OfficerStatsCard({ title, value, icon, trend, trendUp = true, suffix = "" }: OfficerStatsCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="bg-gray-900/50 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-orange-500">{icon}</div>
            {trend && (
              <div className={`flex items-center text-sm ${trendUp ? "text-green-500" : "text-red-500"}`}>
                {trendUp ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {trend}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">
              {value}
              {suffix}
            </p>
            <p className="text-sm text-gray-400">{title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
