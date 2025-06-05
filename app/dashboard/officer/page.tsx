"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  UserCheck,
  TrendingUp,
  Calendar,
  Users,
  Shield,
  Brain,
  User,
  Mail,
  Phone,
  Award,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OfficerStatsCard } from "@/components/officer-stats-card"
import { EvidenceHash } from "@/components/evidence-hash"
import StarBorder from "@/components/star-border"
import ScrollReveal from "@/components/scroll-reveal"

export default function OfficerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock officer data
  const officerData = {
    name: "Detective Sarah Johnson",
    badge: "DET-2024-001",
    email: "s.johnson@police.gov",
    phone: "+1 (555) 987-6543",
    department: "Cybercrime Investigation Unit",
    rank: "Detective",
    joinDate: "2020-03-15",
    totalCases: 156,
    activeCases: 12,
    resolvedCases: 144,
    successRate: 92.3,
  }

  // Mock cases data
  const cases = [
    {
      id: "CMP-2024-001",
      type: "Identity Theft",
      status: "under_review" as const,
      date: "2024-01-20",
      description: "Unauthorized use of personal information for fraudulent activities",
      priority: "high" as const,
      complainant: "John Doe",
      evidenceCount: 5,
      lastUpdate: "2024-01-22",
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      aiAnalysis: "95% confidence - Verified identity theft patterns",
    },
    {
      id: "CMP-2024-002",
      type: "Phishing Attack",
      status: "investigating" as const,
      date: "2024-01-18",
      description: "Sophisticated phishing campaign targeting banking credentials",
      priority: "high" as const,
      complainant: "Jane Smith",
      evidenceCount: 8,
      lastUpdate: "2024-01-23",
      blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
      aiAnalysis: "88% confidence - Known phishing infrastructure detected",
    },
    {
      id: "CMP-2024-003",
      type: "Cryptocurrency Fraud",
      status: "evidence_review" as const,
      date: "2024-01-15",
      description: "Fraudulent cryptocurrency investment scheme",
      priority: "medium" as const,
      complainant: "Mike Wilson",
      evidenceCount: 12,
      lastUpdate: "2024-01-21",
      blockchainHash: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
      aiAnalysis: "91% confidence - Ponzi scheme characteristics identified",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under_review":
        return "bg-yellow-500/20 text-yellow-500"
      case "investigating":
        return "bg-blue-500/20 text-blue-500"
      case "evidence_review":
        return "bg-purple-500/20 text-purple-500"
      case "resolved":
        return "bg-green-500/20 text-green-500"
      case "closed":
        return "bg-gray-500/20 text-gray-500"
      default:
        return "bg-orange-500/20 text-orange-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "investigating":
        return <Search className="h-4 w-4" />
      case "evidence_review":
        return <FileText className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <Shield className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
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

  const filteredCases = cases.filter(
    (case_) =>
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout userRole="officer" userName={officerData.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <ScrollReveal>
              <h1 className="text-3xl font-bold">Officer Dashboard</h1>
            </ScrollReveal>
            <p className="text-gray-400 mt-2">Manage investigations and review evidence</p>
          </div>
          <div className="flex gap-3">
            <StarBorder color="#10b981" className="px-4 py-2">
              <Brain className="mr-2 h-4 w-4" />
              AI Analysis
            </StarBorder>
            <StarBorder color="#f97316" className="px-4 py-2">
              <FileText className="mr-2 h-4 w-4" />
              New Case
            </StarBorder>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <OfficerStatsCard
            title="Total Cases"
            value={officerData.totalCases}
            icon={<FileText className="h-6 w-6" />}
            color="orange"
            trend="+12%"
          />
          <OfficerStatsCard
            title="Active Cases"
            value={officerData.activeCases}
            icon={<Clock className="h-6 w-6" />}
            color="blue"
            trend="+3"
          />
          <OfficerStatsCard
            title="Resolved"
            value={officerData.resolvedCases}
            icon={<CheckCircle className="h-6 w-6" />}
            color="green"
            trend="+8%"
          />
          <OfficerStatsCard
            title="Success Rate"
            value={`${officerData.successRate}%`}
            icon={<TrendingUp className="h-6 w-6" />}
            color="purple"
            trend="+2.1%"
          />
          <OfficerStatsCard
            title="AI Assisted"
            value="98%"
            icon={<Brain className="h-6 w-6" />}
            color="cyan"
            trend="+5%"
          />
        </div>

        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="cases">Active Cases</TabsTrigger>
            <TabsTrigger value="profile">Officer Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 focus:border-orange-500"
                />
              </div>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Cases List */}
            <div className="space-y-4">
              {filteredCases.map((case_) => (
                <Card
                  key={case_.id}
                  className="bg-gray-900/50 border-gray-700 hover:border-orange-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          <span className="text-orange-500">{case_.id}</span>
                          <Badge className={getStatusColor(case_.status)}>
                            {getStatusIcon(case_.status)}
                            <span className="ml-1 capitalize">{case_.status.replace("_", " ")}</span>
                          </Badge>
                          <Badge className={getPriorityColor(case_.priority)}>{case_.priority.toUpperCase()}</Badge>
                        </CardTitle>
                        <p className="text-gray-400 mt-1">{case_.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                          <Eye className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                          <Brain className="h-4 w-4 mr-1" />
                          AI Analysis
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">{case_.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Submitted:</span>
                          <span className="ml-2 text-white">{new Date(case_.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Complainant:</span>
                          <span className="ml-2 text-white">{case_.complainant}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Evidence Files:</span>
                          <span className="ml-2 text-white">{case_.evidenceCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Last Update:</span>
                          <span className="ml-2 text-white">{new Date(case_.lastUpdate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* AI Analysis */}
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-semibold text-blue-500">AI Analysis</span>
                        </div>
                        <p className="text-sm text-blue-300">{case_.aiAnalysis}</p>
                      </div>

                      <EvidenceHash hash={case_.blockchainHash} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCases.length === 0 && (
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No cases found</h3>
                  <p className="text-gray-400">
                    {searchTerm ? "Try adjusting your search terms" : "No active cases assigned"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <UserCheck className="h-6 w-6 text-orange-500" />
                  Officer Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Full Name</p>
                        <p className="text-white font-medium">{officerData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Badge Number</p>
                        <p className="text-white font-medium">{officerData.badge}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Rank</p>
                        <p className="text-white font-medium">{officerData.rank}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Email Address</p>
                        <p className="text-white font-medium">{officerData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Phone Number</p>
                        <p className="text-white font-medium">{officerData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Department</p>
                        <p className="text-white font-medium">{officerData.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Service Since</p>
                        <p className="text-white font-medium">
                          {new Date(officerData.joinDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Success Rate</p>
                        <p className="text-white font-medium">{officerData.successRate}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <StarBorder color="#f97316" className="px-6 py-3">
                    Edit Profile
                  </StarBorder>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-500">Case Resolution Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">This Month</span>
                      <span className="text-green-500 font-semibold">+15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Average Resolution Time</span>
                      <span className="text-white font-semibold">4.2 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">AI Assistance Usage</span>
                      <span className="text-blue-500 font-semibold">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-500">Evidence Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Files Processed</span>
                      <span className="text-white font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Blockchain Verified</span>
                      <span className="text-green-500 font-semibold">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">AI Confidence Avg</span>
                      <span className="text-purple-500 font-semibold">94.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
