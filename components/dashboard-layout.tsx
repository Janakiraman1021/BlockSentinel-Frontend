"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { AnimatedNavbar } from "@/components/animated-navbar"
import ScrollFloat from "@/components/scroll-float"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  userRole: string
  userName?: string
}

export function DashboardLayout({ children, title, subtitle, userRole, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/5 via-black to-purple-500/5" />

      {/* Animated Navbar */}
      <AnimatedNavbar userName={userName} userRole={userRole} />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <ScrollFloat
              containerClassName="mb-2"
              textClassName="bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent"
              animationDuration={1}
              ease="power3.out"
              scrollStart="top bottom-=10%"
              scrollEnd="center center"
              stagger={0.02}
            >
              {title}
            </ScrollFloat>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl text-gray-300"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
