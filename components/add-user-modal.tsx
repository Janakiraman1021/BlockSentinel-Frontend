"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Shield, Crown, Eye, EyeOff } from "lucide-react"
import StarBorder from "@/components/star-border"

interface AddUserModalProps {
  trigger?: React.ReactNode
}

export function AddUserModal({ trigger }: AddUserModalProps) {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    badgeId: "",
    rank: "",
    password: "",
    confirmPassword: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating user:", formData)
    // Here you would typically send the data to your API
    setOpen(false)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      badgeId: "",
      rank: "",
      password: "",
      confirmPassword: "",
      notes: "",
    })
  }

  const roles = [
    { value: "officer", label: "Law Enforcement Officer", icon: <Shield className="h-4 w-4" /> },
    { value: "admin", label: "Administrator", icon: <Crown className="h-4 w-4" /> },
  ]

  const ranks = ["Officer", "Detective", "Sergeant", "Lieutenant", "Captain", "Chief", "Administrator", "System Admin"]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <StarBorder color="#10b981" className="px-4 py-2">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Law Enforcement User
          </StarBorder>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-orange-500/20 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-orange-500">
            <UserPlus className="h-6 w-6" />
            Add New Law Enforcement User
          </DialogTitle>
          <DialogDescription>Create a new account for law enforcement personnel or administrators</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Role and Department */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Role & Department</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 focus:border-orange-500">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          {role.icon}
                          {role.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rank">Rank *</Label>
                <Select
                  value={formData.rank}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, rank: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 focus:border-orange-500">
                    <SelectValue placeholder="Select rank" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {ranks.map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department/Agency *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="Enter department or agency"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badgeId">Badge/Employee ID *</Label>
                <Input
                  id="badgeId"
                  value={formData.badgeId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, badgeId: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="Enter badge or employee ID"
                  required
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="bg-gray-800 border-gray-600 focus:border-orange-500 pr-10"
                    placeholder="Enter password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              className="bg-gray-800 border-gray-600 focus:border-orange-500"
              placeholder="Any additional notes or special permissions..."
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-600 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <StarBorder as="button" type="submit" color="#f97316" className="px-6 py-3">
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </StarBorder>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
