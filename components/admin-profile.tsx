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
  Crown,
  User,
  Calendar,
  Shield,
  Settings,
  Lock,
  Activity,
  Users,
  CheckCircle,
  Edit3,
  Save,
  X,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import StarBorderWithAnimation from "@/components/star-animation"
import ScrollReveal from "@/components/scroll-reveal"
import { motion } from "framer-motion"

interface AdminProfileProps {
  userData: any
}

export function AdminProfile({ userData }: AdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "Administrator John Smith",
    email: "j.smith@blocksentinel.gov",
    phone: "+1 (555) 123-4567",
    address: "123 Government Plaza, Washington, DC 20001",
    department: "System Administration",
    employeeId: "ADM-2024-001",
    role: "System Administrator",
    joinDate: "2019-06-01",
    bio: "Experienced system administrator with over 10 years in cybersecurity and law enforcement technology systems.",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsAlerts: false,
    systemAlerts: true,
    securityNotifications: true,
    weeklyReports: true,
    darkMode: true,
    twoFactorAuth: true,
  })

  const adminStats = {
    totalUsers: 1247,
    systemUptime: "99.97%",
    securityIncidents: 0,
    lastBackup: "2 hours ago",
    activeOfficers: 89,
    pendingApprovals: 12,
  }

  const recentActivities = [
    {
      action: "Created new officer account",
      target: "Detective Williams",
      timestamp: "2024-01-23T14:30:00Z",
      type: "user_management",
    },
    {
      action: "Updated system security settings",
      target: "Firewall Configuration",
      timestamp: "2024-01-23T10:15:00Z",
      type: "security",
    },
    {
      action: "Approved evidence upload",
      target: "Case CMP-2024-001",
      timestamp: "2024-01-22T16:45:00Z",
      type: "evidence",
    },
    {
      action: "System backup completed",
      target: "Database Backup",
      timestamp: "2024-01-22T02:00:00Z",
      type: "system",
    },
  ]

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false)
  }

  return (
    <DashboardLayout
      title="Administrator Profile"
      subtitle="Manage your administrative account and system preferences"
      userRole="admin"
      userName={formData.name}
    >
      <div className="space-y-8">
        {/* Profile Header */}
        <Card className="bg-gray-900/50 border-orange-500/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white">
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ScrollReveal>
                    <h1 className="text-2xl font-bold">{formData.name}</h1>
                  </ScrollReveal>
                  <Badge className="bg-orange-500/20 text-orange-500">
                    <Crown className="h-3 w-3 mr-1" />
                    System Administrator
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4">{formData.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-orange-500" />
                    {formData.employeeId}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    Since {new Date(formData.joinDate).getFullYear()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-orange-500" />
                    {formData.department}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <StarBorderWithAnimation color="#f97316" className="px-4 py-2" onClick={() => setIsEditing(true)}>
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

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(adminStats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-orange-500">{value}</p>
                  <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="security">Security & Access</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-orange-500" />
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
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId}
                        disabled
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        disabled={!isEditing}
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

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-900/50 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-red-500" />
                  Security & Access Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={preferences.twoFactorAuth}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, twoFactorAuth: checked })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-500">Active Sessions</h4>
                      <p className="text-sm text-gray-400">Current device - Washington, DC</p>
                      <p className="text-xs text-gray-500">Last active: Now</p>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-500">Access Level</h4>
                      <Badge className="bg-red-500/20 text-red-500">
                        <Crown className="h-3 w-3 mr-1" />
                        Full System Access
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">System Permissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "User Management",
                        "System Configuration",
                        "Security Settings",
                        "Blockchain Management",
                        "Evidence Access",
                        "Audit Logs",
                        "Backup & Recovery",
                        "API Management",
                      ].map((permission, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-gray-900/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-blue-500" />
                  System Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                        { key: "smsAlerts", label: "SMS Alerts", desc: "Critical alerts via SMS" },
                        { key: "systemAlerts", label: "System Alerts", desc: "System status notifications" },
                        {
                          key: "securityNotifications",
                          label: "Security Notifications",
                          desc: "Security-related alerts",
                        },
                        { key: "weeklyReports", label: "Weekly Reports", desc: "Automated weekly system reports" },
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
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Interface</h3>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-gray-400">Use dark theme interface</p>
                      </div>
                      <Switch
                        checked={preferences.darkMode}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-purple-500" />
                  Recent Administrative Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.target}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type.replace("_", " ")}
                      </Badge>
                    </motion.div>
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
