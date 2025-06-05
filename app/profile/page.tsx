"use client"

import { useState, useEffect } from "react"
import { AdminProfile } from "@/components/admin-profile"
import { OfficerProfile } from "@/components/officer-profile"
import { UserProfile } from "@/components/user-profile"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
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
      <DashboardLayout title="Profile" subtitle="Loading profile information..." userRole="user" userName="">
        <div className="space-y-6">
          <Skeleton className="h-32 w-full bg-gray-800" />
          <Skeleton className="h-64 w-full bg-gray-800" />
          <Skeleton className="h-48 w-full bg-gray-800" />
        </div>
      </DashboardLayout>
    )
  }

  const renderProfile = () => {
    switch (userRole) {
      case "admin":
        return <AdminProfile userData={userData} />
      case "officer":
        return <OfficerProfile userData={userData} />
      case "user":
        return <UserProfile userData={userData} />
      default:
        return <UserProfile userData={userData} />
    }
  }

  return renderProfile()
}
