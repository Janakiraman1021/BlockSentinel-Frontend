"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, FileText, CheckCircle, Database, Activity, Clock, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface AdminStatsGridProps {
  stats: {
    totalUsers: number
    activeOfficers: number
    totalComplaints: number
    resolvedCases: number
    blockchainTransactions: number
    aiVerificationRate: number
    systemUptime: number
    averageResponseTime: number
  }
}

export function AdminStatsGrid({ stats }: AdminStatsGridProps) {
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Officers",
      value: stats.activeOfficers.toLocaleString(),
      icon: <Shield className="h-6 w-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Total Complaints",
      value: stats.totalComplaints.toLocaleString(),
      icon: <FileText className="h-6 w-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Resolved Cases",
      value: stats.resolvedCases.toLocaleString(),
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Blockchain Transactions",
      value: stats.blockchainTransactions.toLocaleString(),
      icon: <Database className="h-6 w-6" />,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "AI Verification Rate",
      value: `${stats.aiVerificationRate}%`,
      icon: <Activity className="h-6 w-6" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "System Uptime",
      value: `${stats.systemUptime}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Avg Response Time",
      value: `${stats.averageResponseTime}s`,
      icon: <Clock className="h-6 w-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-gray-900/50 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} ${stat.bgColor} p-3 rounded-lg`}>{stat.icon}</div>
              </div>

              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
