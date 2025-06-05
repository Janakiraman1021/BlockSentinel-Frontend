"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Eye,
  History,
  Shield,
  Hash,
  Calendar,
  User,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StarBorder from "@/components/star-border"
import { motion } from "framer-motion"

interface EvidenceVersion {
  id: string
  version: number
  timestamp: string
  editedBy: string
  editedByRole: string
  changes: string[]
  blockchainHash: string
  status: "pending" | "approved" | "rejected"
  approvedBy?: string
  approvalTimestamp?: string
  notes?: string
}

interface EvidenceFile {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  uploadedBy: string
  caseId: string
  currentVersion: number
  originalHash: string
  currentHash: string
  status: "verified" | "modified" | "pending"
  aiVerified: boolean
  versions: EvidenceVersion[]
}

export default function EvidenceViewPage({ params }: { params: { id: string } }) {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null)

  // Mock evidence data
  const evidence: EvidenceFile = {
    id: params.id,
    name: "phishing_email_screenshot.png",
    type: "image/png",
    size: 2048576, // 2MB
    uploadDate: "2024-01-20T10:30:00Z",
    uploadedBy: "John Doe",
    caseId: "CMP-2024-001",
    currentVersion: 3,
    originalHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    currentHash: "0x9f8e7d6c5b4a3928374650192837465019283746",
    status: "modified",
    aiVerified: true,
    versions: [
      {
        id: "v1",
        version: 1,
        timestamp: "2024-01-20T10:30:00Z",
        editedBy: "John Doe",
        editedByRole: "Complainant",
        changes: ["Initial upload"],
        blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        status: "approved",
        approvedBy: "Detective Smith",
        approvalTimestamp: "2024-01-20T11:00:00Z",
        notes: "Original evidence submitted by complainant",
      },
      {
        id: "v2",
        version: 2,
        timestamp: "2024-01-21T14:15:00Z",
        editedBy: "Detective Smith",
        editedByRole: "Officer",
        changes: ["Added metadata annotations", "Enhanced image quality", "Redacted personal information"],
        blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
        status: "approved",
        approvedBy: "Supervisor Johnson",
        approvalTimestamp: "2024-01-21T15:30:00Z",
        notes: "Enhanced for investigation purposes, PII redacted for privacy",
      },
      {
        id: "v3",
        version: 3,
        timestamp: "2024-01-22T09:45:00Z",
        editedBy: "Forensic Analyst Wilson",
        editedByRole: "Forensic Expert",
        changes: ["Added forensic markers", "Timestamp verification", "Digital signature validation"],
        blockchainHash: "0x9f8e7d6c5b4a3928374650192837465019283746",
        status: "approved",
        approvedBy: "Chief Investigator Brown",
        approvalTimestamp: "2024-01-22T11:20:00Z",
        notes: "Forensic analysis completed, evidence authenticated",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <DashboardLayout
      title="Evidence Details"
      subtitle="View evidence file and version history"
      userRole="officer"
      userName="Detective Smith"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <StarBorder as={Link} href="/dashboard/officer" color="#6b7280" className="px-4 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </StarBorder>
            <div>
              <ScrollReveal>
                <h1 className="text-3xl font-bold">Evidence: {evidence.name}</h1>
              </ScrollReveal>
              <p className="text-gray-400 mt-2">Case ID: {evidence.caseId}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <StarBorder color="#10b981" className="px-4 py-2">
              <Download className="mr-2 h-4 w-4" />
              Download
            </StarBorder>
            <StarBorder color="#f97316" className="px-4 py-2">
              <Edit className="mr-2 h-4 w-4" />
              Edit Evidence
            </StarBorder>
          </div>
        </div>

        {/* Evidence Overview */}
        <Card className="bg-gray-900/50 border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-orange-500" />
              Evidence Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">File Name</p>
                  <p className="text-white font-medium">{evidence.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">File Type</p>
                  <p className="text-white font-medium">{evidence.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">File Size</p>
                  <p className="text-white font-medium">{formatFileSize(evidence.size)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Upload Date</p>
                  <p className="text-white font-medium">{new Date(evidence.uploadDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Uploaded By</p>
                  <p className="text-white font-medium">{evidence.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Version</p>
                  <p className="text-white font-medium">v{evidence.currentVersion}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <Badge className={getStatusColor(evidence.status)}>
                    {evidence.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {evidence.status === "modified" && <Edit className="h-3 w-3 mr-1" />}
                    {evidence.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                    {evidence.status.charAt(0).toUpperCase() + evidence.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">AI Verified</p>
                  <Badge
                    className={evidence.aiVerified ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}
                  >
                    {evidence.aiVerified ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {evidence.aiVerified ? "Verified" : "Not Verified"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Blockchain Hash</p>
                  <code className="text-xs text-orange-500 font-mono break-all">{evidence.currentHash}</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="versions" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="versions">Version History</TabsTrigger>
            <TabsTrigger value="preview">File Preview</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain Details</TabsTrigger>
          </TabsList>

          <TabsContent value="versions" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <History className="h-6 w-6 text-orange-500" />
                  Version History ({evidence.versions.length} versions)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evidence.versions.map((version, index) => (
                    <motion.div
                      key={version.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                        selectedVersion === version.version
                          ? "bg-orange-500/10 border-orange-500/50"
                          : "bg-gray-800/50 border-gray-700 hover:border-orange-500/30"
                      }`}
                      onClick={() => setSelectedVersion(selectedVersion === version.version ? null : version.version)}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-full">
                            <span className="text-orange-500 font-bold">v{version.version}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">Version {version.version}</h3>
                              <Badge className={getStatusColor(version.status)}>
                                {getStatusIcon(version.status)}
                                <span className="ml-1">{version.status}</span>
                              </Badge>
                              {version.version === evidence.currentVersion && (
                                <Badge className="bg-blue-500/20 text-blue-500">Current</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {version.editedBy} ({version.editedByRole})
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(version.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>

                      {selectedVersion === version.version && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-white mb-3">Changes Made</h4>
                              <ul className="space-y-2">
                                {version.changes.map((change, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {change}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-white mb-2">Blockchain Hash</h4>
                                <div className="flex items-center gap-2">
                                  <code className="text-xs text-orange-500 font-mono bg-gray-800 p-2 rounded flex-1">
                                    {version.blockchainHash}
                                  </code>
                                  <Button variant="ghost" size="sm">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {version.status === "approved" && version.approvedBy && (
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Approval Details</h4>
                                  <div className="text-sm text-gray-300 space-y-1">
                                    <p>
                                      <span className="text-gray-400">Approved by:</span> {version.approvedBy}
                                    </p>
                                    <p>
                                      <span className="text-gray-400">Approval date:</span>{" "}
                                      {version.approvalTimestamp &&
                                        new Date(version.approvalTimestamp).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {version.notes && (
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Notes</h4>
                                  <p className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded">{version.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-orange-500" />
                  File Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-96 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-600">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Preview not available</p>
                    <p className="text-sm text-gray-500">File type: {evidence.type}</p>
                    <StarBorder color="#f97316" className="mt-4 px-4 py-2">
                      <Download className="mr-2 h-4 w-4" />
                      Download to View
                    </StarBorder>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-orange-500" />
                  Blockchain Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Original Hash</h4>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <code className="text-sm text-green-500 font-mono break-all">{evidence.originalHash}</code>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Current Hash</h4>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <code className="text-sm text-orange-500 font-mono break-all">{evidence.currentHash}</code>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-blue-500">Integrity Status</span>
                    </div>
                    <p className="text-sm text-blue-300">
                      This evidence has been modified {evidence.versions.length - 1} time(s) since original upload. All
                      modifications have been properly documented and verified on the blockchain.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Blockchain Transaction History</h4>
                    {evidence.versions.map((version, index) => (
                      <div key={version.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-white">Version {version.version}</p>
                          <p className="text-xs text-gray-400">{new Date(version.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-orange-500" />
                          <code className="text-xs text-orange-500 font-mono">
                            {version.blockchainHash.slice(0, 10)}...{version.blockchainHash.slice(-8)}
                          </code>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
