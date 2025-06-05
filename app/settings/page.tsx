"use client"

import { useState, useEffect } from "react"
import { AdminSettings } from "@/components/admin-settings"
import { OfficerSettings } from "@/components/officer-settings"
import { UserSettings } from "@/components/user-settings"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data - replace with actual API call
    const fetchUserData = async () => {
      try {
        // Mock user data - replace with actual API call
        const mockUserData = {
          role: "admin", // This would come from your auth system
          name: "John Smith",
          email: "j.smith@blocksentinel.gov",
          // ... other user data
        }

        setUserRole(mockUserData.role)
        setUserData(mockUserData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <DashboardLayout title="Settings" subtitle="Loading settings..." userRole="user" userName="">
        <div className="space-y-6">
          <Skeleton className="h-32 w-full bg-gray-800" />
          <Skeleton className="h-64 w-full bg-gray-800" />
          <Skeleton className="h-48 w-full bg-gray-800" />
        </div>
      </DashboardLayout>
    )
  }

  const renderSettings = () => {
    switch (userRole) {
      case "admin":
        return <AdminSettings userData={userData} />
      case "officer":
        return <OfficerSettings userData={userData} />
      case "user":
        return <UserSettings userData={userData} />
      default:
        return <UserSettings userData={userData} />
    }
  }

  return renderSettings()
}
