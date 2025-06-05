"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Shield, User, Calendar, Award, Settings, FileText, Edit3, Save, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import StarBorderWithAnimation from "@/components/star-animation"
import ScrollReveal from "@/components/scroll-reveal"
import { motion } from "framer-motion"

interface OfficerProfileProps {
  userData: any
}

export function OfficerProfile({ userData }: OfficerProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "Detective Sarah Johnson",
    email: "s.johnson@police.gov",
    phone: "+1 (555) 987-6543",
    address: "456 Police Plaza, Metro City, MC 12345",
    department: "Cybercrime Investigation Unit",
    badgeNumber: "DET-2024-001",
    rank: "Detective",
    joinDate: "2020-03-15",
    bio: "Experienced cybercrime detective specializing in digital forensics and online fraud investigations.",
  })

  const [preferences, setPreferences] = useState({
    caseNotifications: true,
    evidenceAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
    mobileAlerts: true,
    emailDigest: true,
  })

  const officerStats = {
    totalCases: 156,
    activeCases: 12,
    resolvedCases: 144,
    successRate: "92.3%",
    avgResolutionTime: "4.2 days",
    aiAssistanceUsage: "98%",
  }

  const recentCases = [
    {
      id: "CMP-2024-001",
      type: "Identity Theft",
      status: "investigating",
      priority: "high",
      lastUpdate: "2024-01-23T14:30:00Z",
    },
    {
      id: "CMP-2024-002",
      type: "Phishing Attack",
      status: "evidence_review",
      priority: "medium",
      lastUpdate: "2024-01-22T16:45:00Z",
    },
    {
      id: "CMP-2024-003",
      type: "Cryptocurrency Fraud",
      status: "resolved",
      priority: "high",
      lastUpdate: "2024-01-21T10:30:00Z",
    },
  ]

  const certifications = [
    { name: "Certified Digital Forensics Examiner", issuer: "CDFE", year: "2023" },
    { name: "Cybercrime Investigation Specialist", issuer: "FBI Academy", year: "2022" },
    { name: "Advanced Blockchain Analysis", issuer: "Chainalysis", year: "2024" },
  ]

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "investigating":
        return "bg-blue-500/20 text-blue-500"
      case "evidence_review":
        return "bg-purple-500/20 text-purple-500"
      case "resolved":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "low":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <DashboardLayout
      title="Officer Profile"
      subtitle="Manage your law enforcement profile and case preferences"
      userRole="officer"
      userName={formData.name}
    >
      <div className="space-y-8">
        {/* Profile Header */}
        <Card className="bg-gray-900/50 border-blue-500/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ScrollReveal>
                    <h1 className="text-2xl font-bold">{formData.name}</h1>
                  </ScrollReveal>
                  <Badge className="bg-blue-500/20 text-blue-500">
                    <Shield className="h-3 w-3 mr-1" />
                    {formData.rank}
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4">{formData.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-blue-500" />
                    {formData.badgeNumber}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    Since {new Date(formData.joinDate).getFullYear()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-blue-500" />
                    {formData.department}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <StarBorderWithAnimation color="#3b82f6" className="px-4 py-2" onClick={() => setIsEditing(true)}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </StarBorderWithAnimation>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Officer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(officerStats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-500">{value}</p>
                  <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="cases">Recent Cases</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-gray-900/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-blue-500" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="badgeNumber">Badge Number</Label>
                      <Input
                        id="badgeNumber"
                        value={formData.badgeNumber}
                        disabled
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rank">Rank</Label>
                      <Input id="rank" value={formData.rank} disabled className="bg-gray-800 border-gray-600" />
                    </div>

                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        disabled
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-600 mt-2"
                  />
                </div>

                <div className="mt-6">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-600 mt-2"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <Card className="bg-gray-900/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-green-500" />
                  Recent Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCases.map((case_, index) => (
                    <motion.div
                      key={case_.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-blue-500">{case_.id}</h3>
                          <Badge className={getStatusColor(case_.status)}>{case_.status.replace("_", " ")}</Badge>
                          <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                        </div>
                        <p className="text-gray-400">{case_.type}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last updated: {new Date(case_.lastUpdate).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Case
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-purple-500" />
                  Certifications & Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-sm text-gray-400">{cert.issuer}</p>
                          <p className="text-xs text-gray-500">Certified {cert.year}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-orange-500" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { key: "caseNotifications", label: "Case Updates", desc: "Notifications for case status changes" },
                    { key: "evidenceAlerts", label: "Evidence Alerts", desc: "New evidence submissions" },
                    { key: "systemUpdates", label: "System Updates", desc: "Platform updates and maintenance" },
                    { key: "weeklyReports", label: "Weekly Reports", desc: "Weekly case summary reports" },
                    { key: "mobileAlerts", label: "Mobile Alerts", desc: "Push notifications on mobile" },
                    { key: "emailDigest", label: "Email Digest", desc: "Daily email summary" },
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{pref.label}</h4>
                        <p className="text-sm text-gray-400">{pref.desc}</p>
                      </div>
                      <Switch
                        checked={preferences[pref.key as keyof typeof preferences] as boolean}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, [pref.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
