"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Shield,
  Activity,
  Search,
  Filter,
  Settings,
  Crown,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  User,
  Mail,
  Phone,
  Calendar,
  Award,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminStatsGrid } from "@/components/admin-stats-grid"
import { UserManagementTable } from "@/components/user-management-table"
import { BlockchainActivityChart } from "@/components/blockchain-activity-chart"
import { SystemHealthMonitor } from "@/components/system-health-monitor"
import ScrollReveal from "@/components/scroll-reveal"
import { motion } from "framer-motion"
import StarBorderWithAnimation from "@/components/star-animation"
import { AddUserModal } from "@/components/add-user-modal"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock admin data
  const adminData = {
    name: "Administrator John Smith",
    employeeId: "ADM-2024-001",
    email: "j.smith@blocksentinel.gov",
    phone: "+1 (555) 123-4567",
    department: "System Administration",
    role: "System Administrator",
    joinDate: "2019-06-01",
    lastLogin: "2024-01-23T10:30:00Z",
    permissions: ["Full System Access", "User Management", "Security Settings", "Blockchain Management"],
  }

  // Mock system stats
  const systemStats = {
    totalUsers: 1247,
    activeOfficers: 89,
    totalComplaints: 3456,
    resolvedCases: 3201,
    blockchainTransactions: 15678,
    systemUptime: 99.97,
    aiVerificationRate: 94.8,
    averageResponseTime: 1.2,
  }

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "user_created",
      description: "New officer account created for Detective Williams",
      timestamp: "2024-01-23T14:30:00Z",
      severity: "info",
    },
    {
      id: 2,
      type: "system_alert",
      description: "High volume of complaints detected - possible coordinated attack",
      timestamp: "2024-01-23T13:45:00Z",
      severity: "warning",
    },
    {
      id: 3,
      type: "blockchain_sync",
      description: "Blockchain synchronization completed successfully",
      timestamp: "2024-01-23T12:00:00Z",
      severity: "success",
    },
    {
      id: 4,
      type: "ai_update",
      description: "AI model updated with new fraud detection patterns",
      timestamp: "2024-01-23T10:15:00Z",
      severity: "info",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout
      title="System Administration"
      subtitle="Monitor and manage the BlockSentinel platform"
      userRole="Admin"
      userName={adminData.name}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <ScrollReveal>
              <h1 className="text-3xl font-bold">System Administration</h1>
            </ScrollReveal>
            <p className="text-gray-400 mt-2">Monitor and manage the BlockSentinel platform</p>
          </div>
          <div className="flex gap-3">
            <StarBorderWithAnimation color="#8b5cf6" className="px-4 py-2">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </StarBorderWithAnimation>
            <AddUserModal
              trigger={
                <StarBorderWithAnimation color="#f97316" className="px-4 py-2">
                  <Users className="mr-2 h-4 w-4" />
                  Add Law Enforcement User
                </StarBorderWithAnimation>
              }
            />
          </div>
        </div>

        {/* System Stats Grid */}
        <AdminStatsGrid stats={systemStats} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="profile">Admin Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <SystemHealthMonitor />

              {/* Recent Activities */}
              <Card className="bg-gray-900/50 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Activity className="h-6 w-6 text-orange-500" />
                    <span className="text-xl">Recent System Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div className={getSeverityColor(activity.severity)}>{getSeverityIcon(activity.severity)}</div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blockchain Activity Chart */}
            <BlockchainActivityChart />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 focus:border-orange-500"
                />
              </div>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <AddUserModal />
            </div>

            {/* User Management Table */}
            <UserManagementTable searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gray-900/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-blue-500">
                      <Database className="h-6 w-6" />
                      <span className="text-xl text-blue-500">Blockchain Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Network Status</span>
                        <Badge className="bg-green-500/20 text-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Block Height</span>
                        <span className="text-white font-mono">2,847,392</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Last Block</span>
                        <span className="text-white">2 min ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Gas Price</span>
                        <span className="text-white">15 gwei</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gray-900/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-purple-500">
                      <Shield className="h-6 w-6" />
                      <span className="text-xl text-purple-500">Security Metrics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Evidence Integrity</span>
                        <span className="text-green-500 font-semibold">100%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Hash Verification</span>
                        <span className="text-green-500 font-semibold">100%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Failed Attempts</span>
                        <span className="text-white">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Security Score</span>
                        <span className="text-purple-500 font-semibold">A+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-gray-900/50 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-green-500">
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-xl text-green-500">Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Transaction Speed</span>
                        <span className="text-white">2.3s avg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Throughput</span>
                        <span className="text-white">1,247 TPS</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Storage Used</span>
                        <span className="text-white">78.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Uptime</span>
                        <span className="text-green-500 font-semibold">99.97%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Blockchain Transactions */}
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-orange-500" />
                  <span className="text-xl">Recent Blockchain Transactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12", type: "Evidence Upload", time: "2 min ago" },
                    { hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234", type: "Case Update", time: "5 min ago" },
                    {
                      hash: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
                      type: "User Registration",
                      time: "8 min ago",
                    },
                    {
                      hash: "0x4d5e6f7890abcdef1234567890abcdef12345678",
                      type: "Evidence Verification",
                      time: "12 min ago",
                    },
                  ].map((tx, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-mono text-orange-500">{tx.hash}</p>
                        <p className="text-xs text-gray-400">{tx.type}</p>
                      </div>
                      <span className="text-xs text-gray-400">{tx.time}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-orange-500" />
                  <span className="text-xl">Administrator Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Full Name</p>
                        <p className="text-white font-medium">{adminData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Employee ID</p>
                        <p className="text-white font-medium">{adminData.employeeId}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Role</p>
                        <p className="text-white font-medium">{adminData.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Email Address</p>
                        <p className="text-white font-medium">{adminData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Phone Number</p>
                        <p className="text-white font-medium">{adminData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Department</p>
                        <p className="text-white font-medium">{adminData.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Service Since</p>
                        <p className="text-white font-medium">
                          {new Date(adminData.joinDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Last Login</p>
                        <p className="text-white font-medium">{new Date(adminData.lastLogin).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-orange-500">System Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {adminData.permissions.map((permission, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-white">{permission}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <StarBorderWithAnimation color="#f97316" className="px-6 py-3">
                    Edit Profile
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
