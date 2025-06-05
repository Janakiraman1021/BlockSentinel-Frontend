"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import StarBorder from "@/components/star-border"
import SplashCursor from "@/components/splash-cursor"
import Threads from "@/components/threads-background"
import ScrollReveal from "@/components/scroll-reveal"
import Logo from "@/components/logo"
import { auth } from "@/lib/auth"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms of service"
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the privacy policy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        // Register the user
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subscribeNewsletter: formData.subscribeNewsletter,
        }

        auth.register(userData)

        // Redirect to dashboard
        window.location.href = "/dashboard/user"
      } catch (error) {
        console.error("Registration error:", error)
      } finally {
        setIsLoading(false)
      }
    }
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
          <Link href="/" className="inline-block mb-6">
            <Logo size="lg" />
          </Link>
          <ScrollReveal>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          </ScrollReveal>
          <p className="text-gray-400">Join BlockSentinel to report cybercrime incidents</p>
        </div>

        {/* Registration Form */}
        <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="h-6 w-6 text-orange-500" />
              Register as Public User
            </CardTitle>
            <CardDescription>Create your account to start reporting cybercrime incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`bg-gray-800 border-gray-600 focus:border-orange-500 ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`bg-gray-800 border-gray-600 focus:border-orange-500 ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`bg-gray-800 border-gray-600 focus:border-orange-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`bg-gray-800 border-gray-600 focus:border-orange-500 pr-10 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`bg-gray-800 border-gray-600 focus:border-orange-500 pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Confirm your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>

              {/* Agreements */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    className={errors.agreeToTerms ? "border-red-500" : ""}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-5">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-500 hover:text-orange-400">
                      Terms of Service
                    </Link>{" "}
                    *
                  </Label>
                </div>
                {errors.agreeToTerms && <p className="text-red-500 text-xs ml-6">{errors.agreeToTerms}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToPrivacy: checked as boolean })}
                    className={errors.agreeToPrivacy ? "border-red-500" : ""}
                  />
                  <Label htmlFor="agreeToPrivacy" className="text-sm leading-5">
                    I agree to the{" "}
                    <Link href="/privacy" className="text-orange-500 hover:text-orange-400">
                      Privacy Policy
                    </Link>{" "}
                    *
                  </Label>
                </div>
                {errors.agreeToPrivacy && <p className="text-red-500 text-xs ml-6">{errors.agreeToPrivacy}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) => setFormData({ ...formData, subscribeNewsletter: checked as boolean })}
                  />
                  <Label htmlFor="subscribeNewsletter" className="text-sm leading-5">
                    Subscribe to our newsletter for cybersecurity updates (optional)
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <StarBorder type="submit" color="#f97316" className="w-full px-6 py-3" disabled={isLoading}>
                <User className="mr-2 h-4 w-4" />
                {isLoading ? "Creating Account..." : "Create Account"}
              </StarBorder>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-orange-500 hover:text-orange-400">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
