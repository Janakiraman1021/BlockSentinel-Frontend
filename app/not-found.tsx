"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import StarBorder from "@/components/star-border"
import SplashCursor from "@/components/splash-cursor"
import Threads from "@/components/threads-background"
import ScrollFloat from "@/components/scroll-float"
import ScrollReveal from "@/components/scroll-reveal"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Splash Cursor Effect */}
      <SplashCursor BACK_COLOR={{ r: 0.1, g: 0.05, b: 0 }} COLOR_UPDATE_SPEED={5} SPLAT_FORCE={8000} />

      {/* Threads Background */}
      <div className="fixed inset-0 z-0">
        <Threads color={[0.98, 0.45, 0.09]} amplitude={1.0} distance={0.4} enableMouseInteraction={true} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <AlertTriangle className="h-24 w-24 text-orange-500 mx-auto mb-6" />
            <ScrollFloat containerClassName="mb-4">404 - Page Not Found</ScrollFloat>
            <ScrollReveal>
              The secure page you're looking for has been moved, deleted, or doesn't exist in our blockchain-protected
              system
            </ScrollReveal>
          </div>

          <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm mb-8">
            <div className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Security Notice</h3>
                  <p className="text-gray-300 mb-4">This could happen for several reasons:</p>
                  <ul className="text-left text-gray-300 space-y-2 max-w-md mx-auto">
                    <li>• The URL was typed incorrectly</li>
                    <li>• The page has been moved or deleted</li>
                    <li>• You don't have permission to access this resource</li>
                    <li>• The session has expired for security reasons</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <Search className="h-6 w-6 text-orange-500 mb-2" />
                    <div className="font-semibold mb-1">Lost?</div>
                    <p className="text-gray-400">Use our navigation to find what you need</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 mb-2" />
                    <div className="font-semibold mb-1">Security</div>
                    <p className="text-gray-400">All access attempts are logged for security</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gray-800/30 border-gray-600 hover:border-orange-500/50 transition-colors">
                <Home className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="font-semibold mb-1">Home</div>
                <p className="text-xs text-gray-400">Return to main page</p>
              </Card>

              <Card className="p-4 bg-gray-800/30 border-gray-600 hover:border-orange-500/50 transition-colors">
                <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="font-semibold mb-1">Report Crime</div>
                <p className="text-xs text-gray-400">Register a complaint</p>
              </Card>

              <Card className="p-4 bg-gray-800/30 border-gray-600 hover:border-orange-500/50 transition-colors">
                <Search className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="font-semibold mb-1">Officer Login</div>
                <p className="text-xs text-gray-400">Access dashboard</p>
              </Card>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <StarBorder as={Link} href="/" color="#f97316" className="px-6 py-3">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </StarBorder>

            <StarBorder onClick={() => window.history.back()} color="#6b7280" className="px-6 py-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </StarBorder>

            <StarBorder as={Link} href="/complaint/register" color="#10b981" className="px-6 py-3">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report Issue
            </StarBorder>
          </div>

          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-300">
              <strong>Security Alert:</strong> If you believe you should have access to this page, please contact your
              system administrator or report this as a potential security issue.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
