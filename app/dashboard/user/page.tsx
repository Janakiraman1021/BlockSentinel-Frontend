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
  Download,
  MessageSquare,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EvidenceHash } from "@/components/evidence-hash"
import StarBorder from "@/components/star-border"
import ScrollReveal from "@/components/scroll-reveal"

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    joinDate: "2024-01-15",
    totalComplaints: 3,
    activeComplaints: 1,
    resolvedComplaints: 2,
  }

  // Mock complaints data
  const complaints = [
    {
      id: "CMP-2024-001",
      type: "Identity Theft",
      status: "under_review" as const,
      date: "2024-01-20",
      description: "Unauthorized use of personal information for fraudulent activities",
      priority: "high" as const,
      officer: "Detective Smith",
      evidenceCount: 5,
      lastUpdate: "2024-01-22",
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    },
    {
      id: "CMP-2024-002",
      type: "Phishing Attack",
      status: "resolved" as const,
      date: "2024-01-10",
      description: "Received fraudulent emails attempting to steal banking credentials",
      priority: "medium" as const,
      officer: "Officer Johnson",
      evidenceCount: 3,
      lastUpdate: "2024-01-18",
      blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
    },
    {
      id: "CMP-2024-003",
      type: "Online Harassment",
      status: "closed" as const,
      date: "2024-01-05",
      description: "Persistent harassment through social media platforms",
      priority: "low" as const,
      officer: "Detective Brown",
      evidenceCount: 8,
      lastUpdate: "2024-01-15",
      blockchainHash: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
    },
  ]

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
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <FileText className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout userRole="user" userName={userData.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <ScrollReveal>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
            </ScrollReveal>
            <p className="text-gray-400 mt-2">Track your complaints and case progress</p>
          </div>
          <StarBorder as="a" href="/complaint/register" color="#f97316" className="px-6 py-3">
            <FileText className="mr-2 h-4 w-4" />
            New Complaint
          </StarBorder>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Complaints</p>
                  <p className="text-2xl font-bold text-orange-500">{userData.totalComplaints}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Cases</p>
                  <p className="text-2xl font-bold text-yellow-500">{userData.activeComplaints}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Resolved</p>
                  <p className="text-2xl font-bold text-green-500">{userData.resolvedComplaints}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="text-lg font-bold text-blue-500">{new Date(userData.joinDate).toLocaleDateString()}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="complaints" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="complaints">My Complaints</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="complaints" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search complaints..."
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

            {/* Complaints List */}
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <Card
                  key={complaint.id}
                  className="bg-gray-900/50 border-gray-700 hover:border-orange-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          <span className="text-orange-500">{complaint.id}</span>
                          <Badge className={getStatusColor(complaint.status)}>
                            {getStatusIcon(complaint.status)}
                            <span className="ml-1 capitalize">{complaint.status.replace("_", " ")}</span>
                          </Badge>
                        </CardTitle>
                        <p className="text-gray-400 mt-1">{complaint.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">{complaint.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Submitted:</span>
                          <span className="ml-2 text-white">{new Date(complaint.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Assigned Officer:</span>
                          <span className="ml-2 text-white">{complaint.officer}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Evidence Files:</span>
                          <span className="ml-2 text-white">{complaint.evidenceCount}</span>
                        </div>
                      </div>

                      <EvidenceHash hash={complaint.blockchainHash} />

                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <span className="text-sm text-gray-400">
                          Last updated: {new Date(complaint.lastUpdate).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm" className="text-orange-500 hover:bg-orange-500/10">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact Officer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredComplaints.length === 0 && (
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm ? "Try adjusting your search terms" : "You haven't submitted any complaints yet"}
                  </p>
                  <StarBorder as="a" href="/complaint/register" color="#f97316" className="px-6 py-3">
                    <FileText className="mr-2 h-4 w-4" />
                    Submit First Complaint
                  </StarBorder>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-orange-500" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Full Name</p>
                        <p className="text-white font-medium">{userData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Email Address</p>
                        <p className="text-white font-medium">{userData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Phone Number</p>
                        <p className="text-white font-medium">{userData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Address</p>
                        <p className="text-white font-medium">{userData.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Member Since</p>
                        <p className="text-white font-medium">
                          {new Date(userData.joinDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
