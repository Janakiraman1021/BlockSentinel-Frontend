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
import { Shield, Database, Bell, Server, Save, RotateCcw, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import StarBorderWithAnimation from "@/components/star-animation"
import ScrollReveal from "@/components/scroll-reveal"

interface AdminSettingsProps {
  userData: any
}

export function AdminSettings({ userData }: AdminSettingsProps) {
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    maxFileSize: 50,
    sessionTimeout: 30,
    enableRegistration: true,
    requireEmailVerification: true,
    enableTwoFactor: true,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
  })

  const [securitySettings, setSecuritySettings] = useState({
    enableFirewall: true,
    blockSuspiciousIPs: true,
    enableRateLimiting: true,
    logSecurityEvents: true,
    enableEncryption: true,
    sslOnly: true,
    enableAuditLog: true,
    dataRetentionDays: 365,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    systemAlerts: true,
    securityAlerts: true,
    userRegistrations: false,
    failedLogins: true,
    systemErrors: true,
    backupStatus: true,
    performanceAlerts: true,
    emailNotifications: true,
    smsAlerts: false,
    slackIntegration: false,
  })

  const [blockchainSettings, setBlockchainSettings] = useState({
    networkType: "mainnet",
    gasLimit: 21000,
    confirmations: 6,
    autoSync: true,
    enableSmartContracts: true,
    backupPrivateKeys: true,
    enableMultiSig: true,
    nodeUrl: "https://mainnet.infura.io/v3/...",
  })

  const handleSaveSettings = (category: string) => {
    // Handle saving settings for specific category
    console.log(`Saving ${category} settings`)
  }

  const handleResetSettings = (category: string) => {
    // Handle resetting settings for specific category
    console.log(`Resetting ${category} settings`)
  }

  return (
    <DashboardLayout
      title="System Settings"
      subtitle="Configure system-wide settings and preferences"
      userRole="admin"
      userName={userData?.name || "Administrator"}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <ScrollReveal>
              <h1 className="text-3xl font-bold">System Settings</h1>
            </ScrollReveal>
            <p className="text-gray-400 mt-2">Configure system-wide settings and security preferences</p>
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

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="bg-gray-800 grid grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Server className="h-6 w-6 text-orange-500" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Maintenance Mode</h3>
                        <p className="text-sm text-gray-400">Temporarily disable public access</p>
                      </div>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) =>
                          setSystemSettings({ ...systemSettings, maintenanceMode: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Auto Backup</h3>
                        <p className="text-sm text-gray-400">Automatic system backups</p>
                      </div>
                      <Switch
                        checked={systemSettings.autoBackup}
                        onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoBackup: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Backup Frequency</Label>
                      <Select
                        value={systemSettings.backupFrequency}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Max File Size (MB): {systemSettings.maxFileSize}</Label>
                      <Slider
                        value={[systemSettings.maxFileSize]}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, maxFileSize: value[0] })}
                        max={100}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Enable User Registration</h3>
                        <p className="text-sm text-gray-400">Allow new user registrations</p>
                      </div>
                      <Switch
                        checked={systemSettings.enableRegistration}
                        onCheckedChange={(checked) =>
                          setSystemSettings({ ...systemSettings, enableRegistration: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Email Verification Required</h3>
                        <p className="text-sm text-gray-400">Require email verification for new accounts</p>
                      </div>
                      <Switch
                        checked={systemSettings.requireEmailVerification}
                        onCheckedChange={(checked) =>
                          setSystemSettings({ ...systemSettings, requireEmailVerification: checked })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Session Timeout (minutes): {systemSettings.sessionTimeout}</Label>
                      <Slider
                        value={[systemSettings.sessionTimeout]}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, sessionTimeout: value[0] })}
                        max={120}
                        min={5}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Password Expiry (days): {systemSettings.passwordExpiry}</Label>
                      <Slider
                        value={[systemSettings.passwordExpiry]}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, passwordExpiry: value[0] })}
                        max={365}
                        min={30}
                        step={30}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <Button variant="outline" onClick={() => handleResetSettings("system")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <StarBorderWithAnimation color="#10b981" onClick={() => handleSaveSettings("system")}>
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
                  <Shield className="h-6 w-6 text-red-500" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { key: "enableFirewall", label: "Enable Firewall", desc: "Web application firewall protection" },
                      {
                        key: "blockSuspiciousIPs",
                        label: "Block Suspicious IPs",
                        desc: "Automatically block suspicious IP addresses",
                      },
                      {
                        key: "enableRateLimiting",
                        label: "Rate Limiting",
                        desc: "Limit requests per IP address",
                      },
                      {
                        key: "logSecurityEvents",
                        label: "Log Security Events",
                        desc: "Log all security-related events",
                      },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{setting.label}</h3>
                          <p className="text-sm text-gray-400">{setting.desc}</p>
                        </div>
                        <Switch
                          checked={securitySettings[setting.key as keyof typeof securitySettings] as boolean}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "enableEncryption", label: "Data Encryption", desc: "Encrypt sensitive data at rest" },
                      { key: "sslOnly", label: "SSL Only", desc: "Force HTTPS connections" },
                      { key: "enableAuditLog", label: "Audit Logging", desc: "Log all user actions" },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{setting.label}</h3>
                          <p className="text-sm text-gray-400">{setting.desc}</p>
                        </div>
                        <Switch
                          checked={securitySettings[setting.key as keyof typeof securitySettings] as boolean}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}

                    <div className="space-y-2">
                      <Label>Max Login Attempts: {systemSettings.maxLoginAttempts}</Label>
                      <Slider
                        value={[systemSettings.maxLoginAttempts]}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, maxLoginAttempts: value[0] })}
                        max={10}
                        min={3}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Data Retention (days): {securitySettings.dataRetentionDays}</Label>
                      <Slider
                        value={[securitySettings.dataRetentionDays]}
                        onValueChange={(value) =>
                          setSecuritySettings({ ...securitySettings, dataRetentionDays: value[0] })
                        }
                        max={1095}
                        min={30}
                        step={30}
                        className="w-full"
                      />
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

          <TabsContent value="blockchain" className="space-y-6">
            <Card className="bg-gray-900/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-blue-500" />
                  Blockchain Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Network Type</Label>
                      <Select
                        value={blockchainSettings.networkType}
                        onValueChange={(value) => setBlockchainSettings({ ...blockchainSettings, networkType: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="mainnet">Mainnet</SelectItem>
                          <SelectItem value="testnet">Testnet</SelectItem>
                          <SelectItem value="local">Local</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Node URL</Label>
                      <Input
                        value={blockchainSettings.nodeUrl}
                        onChange={(e) => setBlockchainSettings({ ...blockchainSettings, nodeUrl: e.target.value })}
                        className="bg-gray-800 border-gray-600"
                        placeholder="https://mainnet.infura.io/v3/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Gas Limit: {blockchainSettings.gasLimit}</Label>
                      <Slider
                        value={[blockchainSettings.gasLimit]}
                        onValueChange={(value) => setBlockchainSettings({ ...blockchainSettings, gasLimit: value[0] })}
                        max={100000}
                        min={21000}
                        step={1000}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Confirmations Required: {blockchainSettings.confirmations}</Label>
                      <Slider
                        value={[blockchainSettings.confirmations]}
                        onValueChange={(value) =>
                          setBlockchainSettings({ ...blockchainSettings, confirmations: value[0] })
                        }
                        max={20}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "autoSync", label: "Auto Sync", desc: "Automatically sync with blockchain" },
                      {
                        key: "enableSmartContracts",
                        label: "Smart Contracts",
                        desc: "Enable smart contract functionality",
                      },
                      { key: "backupPrivateKeys", label: "Backup Private Keys", desc: "Automatically backup keys" },
                      { key: "enableMultiSig", label: "Multi-Signature", desc: "Enable multi-signature wallets" },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{setting.label}</h3>
                          <p className="text-sm text-gray-400">{setting.desc}</p>
                        </div>
                        <Switch
                          checked={blockchainSettings[setting.key as keyof typeof blockchainSettings] as boolean}
                          onCheckedChange={(checked) =>
                            setBlockchainSettings({ ...blockchainSettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <Button variant="outline" onClick={() => handleResetSettings("blockchain")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <StarBorderWithAnimation color="#10b981" onClick={() => handleSaveSettings("blockchain")}>
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
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-purple-500">System Notifications</h3>
                    {[
                      { key: "systemAlerts", label: "System Alerts", desc: "Critical system notifications" },
                      { key: "securityAlerts", label: "Security Alerts", desc: "Security-related notifications" },
                      { key: "userRegistrations", label: "User Registrations", desc: "New user registration alerts" },
                      { key: "failedLogins", label: "Failed Logins", desc: "Failed login attempt notifications" },
                      { key: "systemErrors", label: "System Errors", desc: "System error notifications" },
                      { key: "backupStatus", label: "Backup Status", desc: "Backup completion notifications" },
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
                          checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-purple-500">Delivery Methods</h3>
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Send notifications via email" },
                      { key: "smsAlerts", label: "SMS Alerts", desc: "Send critical alerts via SMS" },
                      { key: "slackIntegration", label: "Slack Integration", desc: "Send notifications to Slack" },
                      {
                        key: "performanceAlerts",
                        label: "Performance Alerts",
                        desc: "System performance notifications",
                      },
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
                          checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-yellow-500">Important</span>
                      </div>
                      <p className="text-sm text-yellow-300">
                        Security alerts and system errors will always be delivered regardless of these settings.
                      </p>
                    </div>
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
