"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, MoreHorizontal, UserCheck, UserX, Shield, Crown, User } from "lucide-react"
import { motion } from "framer-motion"
import { AddUserModal } from "@/components/add-user-modal"

interface UserManagementTableProps {
  searchTerm?: string
}

export function UserManagementTable({ searchTerm: initialSearchTerm = "" }: UserManagementTableProps) {
  const [roleFilter, setRoleFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      role: "public",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      casesReported: 3,
    },
    {
      id: 2,
      name: "Officer Johnson",
      email: "johnson@police.gov",
      role: "officer",
      status: "active",
      joinDate: "2023-12-01",
      lastActive: "30 minutes ago",
      casesHandled: 24,
    },
    {
      id: 3,
      name: "Admin Smith",
      email: "admin@blocksentinel.com",
      role: "admin",
      status: "active",
      joinDate: "2023-11-01",
      lastActive: "5 minutes ago",
      systemAccess: "Full",
    },
    {
      id: 4,
      name: "Jane Wilson",
      email: "jane.wilson@email.com",
      role: "public",
      status: "inactive",
      joinDate: "2024-01-10",
      lastActive: "2 days ago",
      casesReported: 1,
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "officer":
        return <Shield className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30"
      case "officer":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30"
      default:
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-500/20 text-green-500 border-green-500/30"
      : "bg-gray-500/20 text-gray-500 border-gray-500/30"
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  return (
    <Card className="bg-gray-900/50 border-orange-500/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-orange-500" />
          User Management
        </CardTitle>
        <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 focus:border-orange-500"
              />
            </div>
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="officer">Officer</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>

          <AddUserModal />
        </div>

        {/* Users Table */}
        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-500 font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={getRoleColor(user.role)}>
                    {getRoleIcon(user.role)}
                    <span className="ml-1 capitalize">{user.role}</span>
                  </Badge>

                  <Badge className={getStatusColor(user.status)}>
                    {user.status === "active" ? (
                      <UserCheck className="h-3 w-3 mr-1" />
                    ) : (
                      <UserX className="h-3 w-3 mr-1" />
                    )}
                    {user.status}
                  </Badge>

                  <div className="text-sm text-gray-400">Last active: {user.lastActive}</div>

                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-500">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                <div>
                  <span className="text-gray-500">Joined:</span> {user.joinDate}
                </div>
                {user.role === "public" && (
                  <div>
                    <span className="text-gray-500">Cases Reported:</span> {user.casesReported}
                  </div>
                )}
                {user.role === "officer" && (
                  <div>
                    <span className="text-gray-500">Cases Handled:</span> {user.casesHandled}
                  </div>
                )}
                {user.role === "admin" && (
                  <div>
                    <span className="text-gray-500">System Access:</span> {user.systemAccess}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
