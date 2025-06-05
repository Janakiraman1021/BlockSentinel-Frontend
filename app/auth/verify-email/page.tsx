"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Mail, CheckCircle, ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import StarBorder from "@/components/star-border"
import SplashCursor from "@/components/splash-cursor"
import Threads from "@/components/threads-background"
import ScrollReveal from "@/components/scroll-reveal"

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationCode.trim()) {
      setError("Please enter the verification code")
      return
    }
    if (verificationCode.length !== 6) {
      setError("Verification code must be 6 digits")
      return
    }

    console.log("Verifying code:", verificationCode)
    // Handle verification logic here
    window.location.href = "/auth/login?verified=true"
  }

  const handleResendCode = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsResending(false)
    console.log("Resending verification code")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative">
      {/* Splash Cursor Effect */}
      <SplashCursor BACK_COLOR={{ r: 0.1, g: 0.05, b: 0 }} COLOR_UPDATE_SPEED={5} SPLAT_FORCE={8000} />

      {/* Threads Background */}
      <div className="fixed inset-0 z-0">
        <Threads color={[0.98, 0.45, 0.09]} amplitude={0.8} distance={0.2} enableMouseInteraction={true} />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              BlockSentinel
            </span>
          </Link>
          <ScrollReveal>
            <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
          </ScrollReveal>
          <p className="text-gray-400">We've sent a verification code to your email address</p>
        </div>

        {/* Verification Form */}
        <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-orange-500" />
              Email Verification
            </CardTitle>
            <CardDescription>
              Enter the 6-digit code we sent to your email to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              {/* Email Icon Display */}
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Mail className="h-10 w-10 text-orange-500" />
                </div>
              </div>

              {/* Verification Code Input */}
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    setError("")
                  }}
                  className={`bg-gray-800 border-gray-600 focus:border-orange-500 text-center text-2xl tracking-widest ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="000000"
                  maxLength={6}
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>

              {/* Submit Button */}
              <StarBorder type="submit" color="#f97316" className="w-full px-6 py-3">
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Email
              </StarBorder>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 mb-3">Didn't receive the code?</p>
              <Button
                variant="outline"
                onClick={handleResendCode}
                disabled={isResending}
                className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
              >
                {isResending ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Code
                  </>
                )}
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Note:</strong> Check your spam folder if you don't see the email. The verification code expires
                in 15 minutes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-gray-400 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
