"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hash, Shield, Copy, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface EvidenceHashProps {
  complaintId: string
  hash: string
  verified: boolean
  evidenceCount: number
}

export function EvidenceHash({ complaintId, hash, verified, evidenceCount }: EvidenceHashProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className="bg-gray-800/30 border-gray-700 hover:border-orange-500/30 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-orange-500" />
              <span className="font-semibold text-white">{complaintId}</span>
              <Badge variant="outline" className="text-xs">
                {evidenceCount} items
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              {verified ? (
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Blockchain Hash:</span>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-orange-500/20"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3 text-gray-400" />
                  )}
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-orange-500/20">
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </Button>
              </div>
            </div>
            <code className="text-xs text-orange-500 font-mono break-all block">{hash}</code>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Last verified: 2 hours ago</span>
            <span className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Immutable
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
