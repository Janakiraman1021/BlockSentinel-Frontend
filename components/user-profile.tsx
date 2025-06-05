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
import {
  User,
  Calendar,
  Settings,
  Lock,
  FileText,
  CheckCircle,
  Edit3,
  Save,
  X,
  Clock,
  AlertTriangle,
  Shield,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import StarBorderWithAnimation from "@/components/star-animation"
import ScrollReveal from "@/components/scroll-reveal"
import { motion } from "framer-motion"

interface UserProfileProps {
  userData: any
}

export function UserProfile({ userData }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1985-06-15",
    joinDate: "2024-01-15",
    bio: "Concerned citizen committed to reporting and preventing cybercrime in our community.",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsAlerts: false,
    caseUpdates: true,
    securityAlerts: true,
    newsletter: false,
    marketingEmails: false,
  })

  const userStats = {
    totalComplaints: 3,
    activeComplaints: 1,
    resolvedComplaints: 2,
    memberSince: "Jan 2024",
  }

  const recentComplaints = [
    {
      id: "CMP-2024-001",
      type: "Identity Theft",
      status: "under_review",
      date: "2024-01-20",
      officer: "Detective Smith",
    },
    {
      id: "CMP-2024-002",
      type: "Phishing Attack",
      status: "resolved",
      date: "2024-01-10",
      officer: "Officer Johnson",
    },
    {
      id: "CMP-2024-003",
      type: "Online Harassment",
      status: "closed",
      date: "2024-01-05",
      officer: "Detective Brown",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under_review":
        return "bg-yellow-500/20 text-yellow-500"
      case "resolved":
        return "bg-green-500/20 text-green-500"
      case "closed":
        return "bg-gray-500/20 text-gray-500"
      default:
        return "bg-blue-500/20 text-blue-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "under_review":
        return <Clock className="h-3 w-3" />
      case "resolved":
        return <CheckCircle className="h-3 w-3" />
      case "closed":
        return <FileText className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your personal information and complaint preferences"
      userRole="user"
      userName={formData.name}
    >
      <div className="space-y-8">
        {/* Profile Header */}
        <Card className="bg-gray-900/50 border-green-500/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl font-bold text-white">
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ScrollReveal>
                    <h1 className="text-2xl font-bold">{formData.name}</h1>
                  </ScrollReveal>
                  <Badge className="bg-green-500/20 text-green-500">
                    <User className="h-3 w-3 mr-1" />
                    Community Member
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4">{formData.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-green-500" />
                    Member since {userStats.memberSince}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-green-500" />
                    {userStats.totalComplaints} complaints filed
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    Verified Account
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <StarBorderWithAnimation color="#10b981" className="px-4 py-2" onClick={() => setIsEditing(true)}>
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

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(userStats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">{value}</p>
                  <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="complaints">My Complaints</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-gray-900/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-green-500" />
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
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="joinDate">Member Since</Label>
                      <Input
                        id="joinDate"
                        value={new Date(formData.joinDate).toLocaleDateString()}
                        disabled
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>
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

          <TabsContent value="complaints" className="space-y-6">
            <Card className="bg-gray-900/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-500" />
                  My Complaints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComplaints.map((complaint, index) => (
                    <motion.div
                      key={complaint.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-blue-500">{complaint.id}</h3>
                          <Badge className={getStatusColor(complaint.status)}>
                            {getStatusIcon(complaint.status)}
                            <span className="ml-1 capitalize">{complaint.status.replace("_", " ")}</span>
                          </Badge>
                        </div>
                        <p className="text-gray-400">{complaint.type}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Assigned to: {complaint.officer} • {new Date(complaint.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-900/50 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-red-500" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Password</h3>
                    <p className="text-sm text-gray-400 mb-4">Last changed 30 days ago</p>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Account Verification</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Email verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Phone verified</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Login Activity</h3>
                    <p className="text-sm text-gray-400">Last login: Today at 2:30 PM</p>
                    <p className="text-sm text-gray-400">Location: City, State</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-purple-500" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                    { key: "smsAlerts", label: "SMS Alerts", desc: "Important alerts via SMS" },
                    { key: "caseUpdates", label: "Case Updates", desc: "Notifications about your complaints" },
                    { key: "securityAlerts", label: "Security Alerts", desc: "Account security notifications" },
                    { key: "newsletter", label: "Newsletter", desc: "Monthly community newsletter" },
                    { key: "marketingEmails", label: "Marketing Emails", desc: "Promotional content and updates" },
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
