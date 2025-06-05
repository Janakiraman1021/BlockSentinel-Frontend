"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Hash, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import StarBorder from "@/components/star-border"
import SplashCursor from "@/components/splash-cursor"
import Threads from "@/components/threads-background"
import ScrollReveal from "@/components/scroll-reveal"
import ScrollFloat from "@/components/scroll-float"

export default function ComplaintSuccess() {
  const complaintId =
    "CMP-2024-" +
    Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
  const blockchainHash = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Splash Cursor Effect */}
      <SplashCursor BACK_COLOR={{ r: 0.1, g: 0.05, b: 0 }} COLOR_UPDATE_SPEED={5} SPLAT_FORCE={8000} />

      {/* Threads Background */}
      <div className="fixed inset-0 z-0">
        <Threads color={[0.98, 0.45, 0.09]} amplitude={0.8} distance={0.2} enableMouseInteraction={true} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <ScrollFloat containerClassName="mb-4">Complaint Submitted Successfully</ScrollFloat>
            <ScrollReveal>
              Your cybercrime report has been securely recorded on the blockchain and assigned to our investigation team
            </ScrollReveal>
          </div>

          <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-orange-500" />
                    <span className="font-semibold">Complaint ID:</span>
                  </div>
                  <span className="text-orange-500 font-mono text-lg">{complaintId}</span>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Hash className="h-6 w-6 text-green-500" />
                    <span className="font-semibold">Blockchain Hash:</span>
                  </div>
                  <code className="text-xs text-green-500 font-mono break-all block bg-gray-900/50 p-3 rounded">
                    {blockchainHash}
                  </code>
                  <p className="text-xs text-gray-400 mt-2">
                    This hash proves your evidence is tamper-proof and permanently recorded
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-gray-800/30 rounded">
                    <span className="text-gray-400">Status:</span>
                    <span className="ml-2 text-yellow-500 font-semibold">Under Review</span>
                  </div>
                  <div className="p-3 bg-gray-800/30 rounded">
                    <span className="text-gray-400">Priority:</span>
                    <span className="ml-2 text-orange-500 font-semibold">Standard</span>
                  </div>
                  <div className="p-3 bg-gray-800/30 rounded">
                    <span className="text-gray-400">Submitted:</span>
                    <span className="ml-2 text-white">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="p-3 bg-gray-800/30 rounded">
                    <span className="text-gray-400">AI Verified:</span>
                    <span className="ml-2 text-green-500 font-semibold">✓ Verified</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-gray-800/30 rounded-lg">
                <div className="text-orange-500 font-semibold mb-2">1. AI Analysis</div>
                <p className="text-gray-300">
                  Our AI system analyzes your evidence for authenticity and categorization
                </p>
              </div>
              <div className="p-4 bg-gray-800/30 rounded-lg">
                <div className="text-orange-500 font-semibold mb-2">2. Officer Assignment</div>
                <p className="text-gray-300">A qualified officer will be assigned to investigate your case</p>
              </div>
              <div className="p-4 bg-gray-800/30 rounded-lg">
                <div className="text-orange-500 font-semibold mb-2">3. Investigation</div>
                <p className="text-gray-300">You'll receive updates as the investigation progresses</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <StarBorder as={Link} href="/" color="#f97316" className="px-6 py-3">
              Return Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </StarBorder>

            <StarBorder as={Link} href="/complaint/track" color="#10b981" className="px-6 py-3">
              Track Complaint
            </StarBorder>
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>Important:</strong> Save your Complaint ID ({complaintId}) for future reference. You can use it to
              track the progress of your case.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
