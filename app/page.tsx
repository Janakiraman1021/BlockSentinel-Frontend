"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Lock, ChevronRight, Zap, Globe } from "lucide-react"
import Link from "next/link"
import SplashCursor from "@/components/splash-cursor"
import ScrollReveal from "@/components/scroll-reveal"
import ScrollFloat from "@/components/scroll-float"
import StarBorder from "@/components/star-border"
import Threads from "@/components/threads-background"
import { StatsCounter } from "@/components/stats-counter"
import Logo from "@/components/logo"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleComplaintRedirect = (e) => {
    e.preventDefault()
    // For demo purposes, let's just redirect directly to the complaint page
    // In a real app, we would check authentication first
    window.location.href = "/complaint/register"
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Splash Cursor Effect */}
      <SplashCursor BACK_COLOR={{ r: 0.1, g: 0.05, b: 0 }} COLOR_UPDATE_SPEED={5} SPLAT_FORCE={8000} />

      {/* Threads Background */}
      <div className="fixed inset-0 z-0">
        <Threads color={[0.98, 0.45, 0.09]} amplitude={1.2} distance={0.3} enableMouseInteraction={true} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Logo size="large" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              BlockSentinel
            </span>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="#features" className="hover:text-orange-500 transition-colors">
              Features
            </Link>
            <Link href="#security" className="hover:text-orange-500 transition-colors">
              Security
            </Link>
            <Link href="#about" className="hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="/auth" className="hover:text-orange-500 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <ScrollFloat containerClassName="mb-6">Protecting Digital Truth</ScrollFloat>
            <ScrollFloat containerClassName="mb-6" textClassName="text-orange-500">
              with AI & Blockchain
            </ScrollFloat>
          </div>

          <ScrollReveal containerClassName="mb-12">
            Revolutionary cybercrime evidence management powered by artificial intelligence and secured by blockchain
            technology
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <StarBorder
              as="button"
              onClick={handleComplaintRedirect}
              color="#f97316"
              className="px-8 py-4 text-lg font-semibold"
            >
              <Logo size="small" />
              <span className="ml-2">Register Complaint</span>
            </StarBorder>

            <StarBorder as={Link} href="/auth?role=officer" color="#f97316" className="px-8 py-4 text-lg font-semibold">
              <Lock className="mr-2 h-5 w-5" />
              Officer Login
            </StarBorder>

            <Button
              variant="outline"
              size="lg"
              className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10 backdrop-blur-sm"
              asChild
            >
              <Link href="#features">
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatsCounter icon={<Logo />} value={15420} label="Cases Secured" suffix="+" />
            <StatsCounter
              icon={<Brain className="h-8 w-8 text-orange-500" />}
              value={99.7}
              label="AI Accuracy"
              suffix="%"
            />
            <StatsCounter
              icon={<Globe className="h-8 w-8 text-orange-500" />}
              value={47}
              label="Countries Served"
              suffix="+"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollFloat containerClassName="mb-6">Next-Generation Security</ScrollFloat>
            <ScrollReveal>
              Combining cutting-edge AI with immutable blockchain technology to create the most secure evidence
              management platform ever built
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-12 w-12 text-orange-500" />,
                title: "AI-Powered Analysis",
                description:
                  "Advanced machine learning algorithms automatically verify and categorize digital evidence with 99.7% accuracy",
              },
              {
                icon: <Logo size="large" />,
                title: "Blockchain Security",
                description:
                  "Immutable evidence storage with cryptographic hashing ensures tamper-proof digital chain of custody",
              },
              {
                icon: <Zap className="h-12 w-12 text-orange-500" />,
                title: "Real-Time Tracking",
                description:
                  "Monitor case progress, evidence verification, and investigation status with live blockchain updates",
              },
            ].map((feature, index) => (
              <div key={index}>
                <Card className="p-8 bg-gray-900/50 border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300 group">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-500">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFloat containerClassName="mb-6">Ready to Secure Digital Justice?</ScrollFloat>
          <ScrollReveal containerClassName="mb-12">
            Join thousands of law enforcement agencies and citizens protecting digital truth
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <StarBorder
              as="button"
              onClick={handleComplaintRedirect}
              color="#f97316"
              className="px-8 py-4 text-lg font-semibold"
            >
              Start Your Report
              <ChevronRight className="ml-2 h-5 w-5" />
            </StarBorder>

            <StarBorder as={Link} href="/auth" color="#f97316" className="px-8 py-4 text-lg font-semibold">
              Access Dashboard
              <Lock className="ml-2 h-5 w-5" />
            </StarBorder>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-orange-500/20 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Logo />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              BlockSentinel
            </span>
          </div>
          <p className="text-gray-400">© 2024 BlockSentinel. Securing digital evidence with blockchain technology.</p>
        </div>
      </footer>
    </div>
  )
}
