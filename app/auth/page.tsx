"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, UserCheck, Crown, Wallet, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import StarBorder from "@/components/star-border"
import SplashCursor from "@/components/splash-cursor"
import Threads from "@/components/threads-background"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"officer" | "admin">("officer")
  const searchParams = useSearchParams()

  useEffect(() => {
    const role = searchParams.get("role") as "officer" | "admin"
    if (role && (role === "officer" || role === "admin")) {
      setSelectedRole(role)
    }
  }, [searchParams])

  const roles = [
    {
      id: "officer" as const,
      title: "Law Enforcement",
      description: "Investigate cases and manage evidence",
      icon: <UserCheck className="h-8 w-8" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      id: "admin" as const,
      title: "Administrator",
      description: "System management and oversight",
      icon: <Crown className="h-8 w-8" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
  ]

  const handleAuth = (method: "email" | "wallet") => {
    const dashboardRoutes = {
      officer: "/dashboard/officer",
      admin: "/dashboard/admin",
    }

    window.location.href = dashboardRoutes[selectedRole]
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative">
      {/* Splash Cursor Effect */}
      <SplashCursor BACK_COLOR={{ r: 0.1, g: 0.05, b: 0 }} COLOR_UPDATE_SPEED={5} SPLAT_FORCE={8000} />

      {/* Threads Background */}
      <div className="fixed inset-0 z-0">
        <Threads color={[0.98, 0.45, 0.09]} amplitude={0.8} distance={0.2} enableMouseInteraction={true} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              BlockSentinel
            </span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Access Portal</h1>
          <p className="text-xl text-gray-300">Access your professional dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Role Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">Select Your Role</h2>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id}>
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedRole === role.id
                        ? `${role.bgColor} ${role.borderColor} border-2`
                        : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`${role.color} ${selectedRole === role.id ? "scale-110" : ""} transition-transform`}
                        >
                          {role.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{role.title}</h3>
                          <p className="text-gray-400">{role.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Form */}
          <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {roles.find((r) => r.id === selectedRole)?.title} Login
              </CardTitle>
              <CardDescription className="text-center">Access your secure dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger value="email" className="data-[state=active]:bg-orange-500">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="wallet" className="data-[state=active]:bg-orange-500">
                    <Wallet className="h-4 w-4 mr-2" />
                    Wallet
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-gray-800 border-gray-600 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-gray-800 border-gray-600 focus:border-orange-500 pr-10"
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
                  </div>

                  <StarBorder onClick={() => handleAuth("email")} color="#f97316" className="w-full px-6 py-3">
                    <Lock className="mr-2 h-4 w-4" />
                    Secure Login
                  </StarBorder>
                </TabsContent>

                <TabsContent value="wallet" className="space-y-4 mt-6">
                  <div className="text-center py-8">
                    <Wallet className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-300 mb-6">Connect your Web3 wallet for secure blockchain authentication</p>
                    <StarBorder onClick={() => handleAuth("wallet")} color="#f97316" className="w-full px-6 py-3">
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </StarBorder>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Forgot your password? <button className="text-orange-500 hover:text-orange-400">Reset here</button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
