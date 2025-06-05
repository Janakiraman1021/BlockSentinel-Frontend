"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, User, Lock, Save, RotateCcw, Eye, EyeOff, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import StarBorderWithAnimation from "@/components/star-animation"
import ScrollReveal from "@/components/scroll-reveal"

interface UserSettingsProps {
  userData: any
}

export function UserSettings({ userData }: UserSettingsProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    caseUpdates: true,
    securityAlerts: true,
    newsletter: false,
    marketingEmails: false,
    theme: "dark",
    language: "en",
    timezone: "UTC-5",
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    shareDataForResearch: false,
    allowAnalytics: true,
    cookiePreferences: "essential",
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

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account")
    }
  }

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account preferences and privacy settings"
      userRole="user"
      userName={userData?.name || "User"}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <ScrollReveal>
              <h1 className="text-3xl font-bold">Account Settings</h1>
            </ScrollReveal>
            <p className="text-gray-400 mt-2">Manage your account preferences and privacy settings</p>
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
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gray-900/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-green-500" />
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
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Newsletter</h3>
                        <p className="text-sm text-gray-400">Monthly community newsletter</p>
                      </div>
                      <Switch
                        checked={accountSettings.newsletter}
                        onCheckedChange={(checked) => setAccountSettings({ ...accountSettings, newsletter: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Marketing Emails</h3>
                        <p className="text-sm text-gray-400">Promotional content and updates</p>
                      </div>
                      <Switch
                        checked={accountSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          setAccountSettings({ ...accountSettings, marketingEmails: checked })
                        }
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
                      { key: "caseUpdates", label: "Case Updates", desc: "Notifications about your complaints" },
                      { key: "securityAlerts", label: "Security Alerts", desc: "Account security notifications" },
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
                    <h3 className="font-semibold text-purple-500">Communication</h3>
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                      { key: "smsAlerts", label: "SMS Alerts", desc: "Critical alerts via SMS" },
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

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-900/50 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-red-500" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-500">Change Password</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
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

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Account Security</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                          <p>• Password last changed: 30 days ago</p>
                          <p>• Last login: Today at 2:30 PM</p>
                          <p>• Login location: City, State</p>
                        </div>
                      </div>

                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <h4 className="font-semibold mb-2 text-red-500">Danger Zone</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
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

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-gray-900/50 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-yellow-500" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select
                        value={privacySettings.profileVisibility}
                        onValueChange={(value) => setPrivacySettings({ ...privacySettings, profileVisibility: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="limited">Limited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Cookie Preferences</Label>
                      <Select
                        value={privacySettings.cookiePreferences}
                        onValueChange={(value) => setPrivacySettings({ ...privacySettings, cookiePreferences: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="essential">Essential Only</SelectItem>
                          <SelectItem value="functional">Essential + Functional</SelectItem>
                          <SelectItem value="all">All Cookies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Share Data for Research</h3>
                        <p className="text-sm text-gray-400">Help improve cybercrime prevention</p>
                      </div>
                      <Switch
                        checked={privacySettings.shareDataForResearch}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, shareDataForResearch: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Allow Analytics</h3>
                        <p className="text-sm text-gray-400">Help us improve the platform</p>
                      </div>
                      <Switch
                        checked={privacySettings.allowAnalytics}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, allowAnalytics: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-500">Data Protection</h4>
                  <p className="text-sm text-blue-300">
                    Your personal data is protected according to GDPR and other privacy regulations. You can request a
                    copy of your data or request deletion at any time.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <Button variant="outline" onClick={() => handleResetSettings("privacy")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <StarBorderWithAnimation color="#10b981" onClick={() => handleSaveSettings("privacy")}>
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
