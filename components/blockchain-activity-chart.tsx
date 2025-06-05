"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"
import { motion } from "framer-motion"

export function BlockchainActivityChart() {
  // Mock data for demonstration
  const activityData = [
    { time: "00:00", transactions: 120 },
    { time: "04:00", transactions: 89 },
    { time: "08:00", transactions: 234 },
    { time: "12:00", transactions: 456 },
    { time: "16:00", transactions: 378 },
    { time: "20:00", transactions: 289 },
    { time: "24:00", transactions: 156 },
  ]

  const maxTransactions = Math.max(...activityData.map((d) => d.transactions))

  return (
    <Card className="bg-gray-900/50 border-orange-500/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5 text-orange-500" />
          Blockchain Activity
        </CardTitle>
        <CardDescription>Real-time blockchain transaction monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {activityData.map((data, index) => (
              <motion.div
                key={data.time}
                initial={{ height: 0 }}
                animate={{ height: `${(data.transactions / maxTransactions) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-orange-500/80 to-orange-300/60 rounded-t-sm min-h-[20px] relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.transactions}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Time labels */}
          <div className="flex justify-between text-xs text-gray-400">
            {activityData.map((data) => (
              <span key={data.time}>{data.time}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">2,156</p>
              <p className="text-sm text-gray-400">Today's Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">+12.5%</p>
              <p className="text-sm text-gray-400">vs Yesterday</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">1.2s</p>
              <p className="text-sm text-gray-400">Avg Block Time</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
