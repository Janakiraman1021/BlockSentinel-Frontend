"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertTriangle, Eye, Hash, Shield, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface Complaint {
  id: string
  title: string
  status: "pending_review" | "under_investigation" | "resolved"
  priority: "low" | "medium" | "high"
  dateSubmitted: string
  lastUpdate: string
  evidenceCount: number
  blockchainHash: string
  aiVerified: boolean
}

interface ComplaintCardProps {
  complaint: Complaint
}

export function ComplaintCard({ complaint }: ComplaintCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_review":
        return <Clock className="h-4 w-4" />
      case "under_investigation":
        return <AlertTriangle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "under_investigation":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30"
      case "resolved":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="bg-gray-800/50 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-white">{complaint.title}</h3>
                {complaint.aiVerified && <Shield className="h-4 w-4 text-green-500" title="AI Verified" />}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={getStatusColor(complaint.status)}>
                  {getStatusIcon(complaint.status)}
                  <span className="ml-1 capitalize">{complaint.status.replace("_", " ")}</span>
                </Badge>

                <Badge className={getPriorityColor(complaint.priority)}>
                  {complaint.priority.toUpperCase()} Priority
                </Badge>

                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  ID: {complaint.id}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Submitted: {new Date(complaint.dateSubmitted).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Updated: {new Date(complaint.lastUpdate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-2" />
                  Evidence: {complaint.evidenceCount} items
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>

          {/* Blockchain Hash Preview */}
          <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Blockchain Hash:</span>
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                Verified
              </Badge>
            </div>
            <code className="text-xs text-orange-500 font-mono break-all">{complaint.blockchainHash}</code>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
