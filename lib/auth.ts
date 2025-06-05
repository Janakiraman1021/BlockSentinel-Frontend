"use client"

// Simple authentication utility
export const auth = {
  // Check if user is logged in
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("blocksentinel_user") !== null
  },

  // Get current user
  getCurrentUser: () => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("blocksentinel_user")
    return user ? JSON.parse(user) : null
  },

  // Login user
  login: (userData: any) => {
    localStorage.setItem("blocksentinel_user", JSON.stringify(userData))
    localStorage.setItem("blocksentinel_token", "mock_token_" + Date.now())
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("blocksentinel_user")
    localStorage.removeItem("blocksentinel_token")
  },

  // Register user
  register: (userData: any) => {
    // In a real app, this would make an API call
    const user = {
      id: Date.now(),
      ...userData,
      role: "user",
      createdAt: new Date().toISOString(),
    }
    auth.login(user)
    return user
  },
}
