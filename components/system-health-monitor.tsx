"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react"
import { motion } from "framer-motion"

export function SystemHealthMonitor() {
  const systemMetrics = [
    {
      name: "CPU Usage",
      value: 45,
      icon: <Cpu className="h-4 w-4" />,
      status: "good",
    },
    {
      name: "Memory Usage",
      value: 67,
      icon: <Activity className="h-4 w-4" />,
      status: "warning",
    },
    {
      name: "Disk Usage",
      value: 23,
      icon: <HardDrive className="h-4 w-4" />,
      status: "good",
    },
    {
      name: "Network",
      value: 89,
      icon: <Wifi className="h-4 w-4" />,
      status: "good",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getProgressColor = (value: number) => {
    if (value < 50) return "bg-green-500"
    if (value < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-gray-900/50 border-orange-500/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-orange-500" />
          System Health
        </CardTitle>
        <CardDescription>Real-time system performance monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {systemMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(metric.status)}>{metric.icon}</div>
                  <span className="text-sm font-medium text-white">{metric.name}</span>
                </div>
                <span className="text-sm text-gray-400">{metric.value}%</span>
              </div>

              <div className="relative">
                <Progress value={metric.value} className="h-2 bg-gray-800" />
                <div
                  className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(metric.value)}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </motion.div>
          ))}

          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">System Status</span>
              <span className="text-green-500 font-semibold">Operational</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
