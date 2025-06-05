"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Settings, Bell, User, Lock, Save, RotateCcw, Eye, EyeOff } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import StarBorderWithAnimation from "@/components/star-animation"
import ScrollReveal from "@/components/scroll-reveal"

interface OfficerSettingsProps {
  userData: any
}

export function OfficerSettings({ userData }: OfficerSettingsProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    caseUpdates: true,
    evidenceAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
    mobileAlerts: true,
    emailDigest: true,
    autoLogout: 30,
    theme: "dark",
    language: "en",
    timezone: "UTC-5",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    requirePasswordChange: false,
  })

  const [workflowSettings, setWorkflowSettings] = useState({
    autoAssignCases: false,
    priorityFilter: "all",
    defaultView: "grid",
    itemsPerPage: 20,
    autoRefresh: true,
    refreshInterval: 30,
    showAIRecommendations: true,
    enableQuickActions: true,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSaveSettings = (category: string) => {
    console.log(`Saving ${category} settings`)
  }

  const handleResetSettings = (category: string) => {
    console.log(`Resetting ${category} settings`)
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match")
      return
    }
    console.log("Changing password")
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <DashboardLayout
      title="Officer Settings"
      subtitle="Configure your account and workflow preferences"
      userRole="officer"
      userName={userData?.name || "Officer"}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <ScrollReveal>
              <h1 className="text-3xl font-bold">Officer Settings</h1>
            </ScrollReveal>
            <p className="text-gray-400 mt-2">Customize your account and workflow preferences</p>
          </div>
          <div className="flex gap-3">
            <StarBorderWithAnimation color="#ef4444" className="px-4 py-2">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset All
            </StarBorderWithAnimation>
            <StarBorderWithAnimation color="#10b981" className="px-4 py-2">
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </StarBorderWithAnimation>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-gray-800 grid grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gray-900/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-blue-500" />
                  Account Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select
                        value={accountSettings.theme}
                        onValueChange={(value) => setAccountSettings({ ...accountSettings, theme: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select
                        value={accountSettings.language}
                        onValueChange={(value) => setAccountSettings({ ...accountSettings, language: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select
                        value={accountSettings.timezone}
                        onValueChange={(value) => setAccountSettings({ ...accountSettings, timezone: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Auto Logout (minutes): {accountSettings.autoLogout}</Label>
                      <Slider
                        value={[accountSettings.autoLogout]}
                        onValueChange={(value) => setAccountSettings({ ...accountSettings, autoLogout: value[0] })}
                        max={120}
                        min={5}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Email Digest</h3>
                        <p className="text-sm text-gray-400">Daily summary of activities</p>
                      </div>
                      <Switch
                        checked={accountSettings.emailDigest}
                        onCheckedChange={(checked) => setAccountSettings({ ...accountSettings, emailDigest: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Mobile Alerts</h3>
                        <p className="text-sm text-gray-400">Push notifications on mobile devices</p>
                      </div>
                      <Switch
                        checked={accountSettings.mobileAlerts}
                        onCheckedChange={(checked) => setAccountSettings({ ...accountSettings, mobileAlerts: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <Button variant="outline" onClick={() => handleResetSettings("account")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <StarBorderWithAnimation color="#10b981" onClick={() => handleSaveSettings("account")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </StarBorderWithAnimation>
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-red-500">Authentication</h3>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-400">Add extra security to your account</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Login Alerts</h3>
                        <p className="text-sm text-gray-400">Get notified of new logins</p>
                      </div>
                      <Switch
                        checked={securitySettings.loginAlerts}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({ ...securitySettings, loginAlerts: checked })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Session Timeout (minutes): {securitySettings.sessionTimeout}</Label>
                      <Slider
                        value={[securitySettings.sessionTimeout]}
                        onValueChange={(value) =>
                          setSecuritySettings({ ...securitySettings, sessionTimeout: value[0] })
                        }
                        max={120}
                        min={5}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-red-500">Password Settings</h3>

                    <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <div className="relative">
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="bg-gray-800 border-gray-600 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="bg-gray-800 border-gray-600 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Confirm New Password</Label>
                        <Input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className="bg-gray-800 border-gray-600"
                        />
                      </div>

                      <Button onClick={handlePasswordChange} className="w-full">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <Button variant="outline" onClick={() => handleResetSettings("security")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <StarBorderWithAnimation color="#10b981" onClick={() => handleSaveSettings("security")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </StarBorderWithAnimation>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-purple-500" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-purple-500">Case Notifications</h3>
                    {[
                      { key: "caseUpdates", label: "Case Updates", desc: "Notifications for case status changes" },
                      { key: "evidenceAlerts", label: "Evidence Alerts", desc: "New evidence submissions" },
                      { key: "weeklyReports", label: "Weekly Reports", desc: "Weekly case summary reports" },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{setting.label}</h4>
                          <p className="text-sm text-gray-400">{setting.desc}</p>
                        </div>
                        <Switch
                          checked={accountSettings[setting.key as keyof typeof accountSettings] as boolean}
                          onCheckedChange={(checked) =>
                            setAccountSettings({ ...accountSettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-purple-500">System Notifications</h3>
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                      { key: "smsAlerts", label: "SMS Alerts", desc: "Critical alerts via SMS" },
                      { key: "systemUpdates", label: "System Updates", desc: "Platform updates and maintenance" },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{setting.label}</h4>
                          <p className="text-sm text-gray-400">{setting.desc}</p>
                        </div>
                        <Switch
                          checked={accountSettings[setting.key as keyof typeof accountSettings] as boolean}
                          onCheckedChange={(checked) =>
                            setAccountSettings({ ...accountSettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <Button variant="outline" onClick={() => handleResetSettings("notifications")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <StarBorderWithAnimation color="#10b981" onClick={() => handleSaveSettings("notifications")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </StarBorderWithAnimation>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <Card className="bg-gray-900/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-green-500" />
                  Workflow Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Default View</Label>
                      <Select
                        value={workflowSettings.defaultView}
                        onValueChange={(value) => setWorkflowSettings({ ...workflowSettings, defaultView: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="grid">Grid View</SelectItem>
                          <SelectItem value="list">List View</SelectItem>
                          <SelectItem value="table">Table View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Priority Filter</Label>
                      <Select
                        value={workflowSettings.priorityFilter}
                        onValueChange={(value) => setWorkflowSettings({ ...workflowSettings, priorityFilter: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="high">High Priority Only</SelectItem>
                          <SelectItem value="medium">Medium & High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Items Per Page: {workflowSettings.itemsPerPage}</Label>
                      <Slider
                        value={[workflowSettings.itemsPerPage]}
                        onValueChange={(value) => setWorkflowSettings({ ...workflowSettings, itemsPerPage: value[0] })}
                        max={100}
                        min={10}
                        step={10}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "autoAssignCases", label: "Auto-Assign Cases", desc: "Automatically assign new cases" },
                      { key: "autoRefresh", label: "Auto Refresh", desc: "Automatically refresh case list" },
                      {
                        key: "showAIRecommendations",
                        label: "AI Recommendations",
                        desc: "Show AI-powered suggestions",
                      },
                      { key: "enableQuickActions", label: "Quick Actions", desc: "Enable quick action buttons" },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{setting.label}</h4>
                          <p className="text-sm text-gray-400">{setting.desc}</p>
                        </div>
                        <Switch
                          checked={workflowSettings[setting.key as keyof typeof workflowSettings] as boolean}
                          onCheckedChange={(checked) =>
                            setWorkflowSettings({ ...workflowSettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}

                    {workflowSettings.autoRefresh && (
                      <div className="space-y-2">
                        <Label>Refresh Interval (seconds): {workflowSettings.refreshInterval}</Label>
                        <Slider
                          value={[workflowSettings.refreshInterval]}
                          onValueChange={(value) =>
                            setWorkflowSettings({ ...workflowSettings, refreshInterval: value[0] })
                          }
                          max={300}
                          min={10}
                          step={10}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <Button variant="outline" onClick={() => handleResetSettings("workflow")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <StarBorderWithAnimation color="#10b981" onClick={() => handleSaveSettings("workflow")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </StarBorderWithAnimation>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
