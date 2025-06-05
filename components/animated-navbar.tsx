"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Shield, Menu, X, Home, FileText, User, Settings, LogOut } from "lucide-react"
import Dock from "@/components/dock"
import { usePathname } from "next/navigation"
import StarBorder from "@/components/star-border"

interface AnimatedNavbarProps {
  userName?: string
  userRole?: string
}

export function AnimatedNavbar({ userName, userRole }: AnimatedNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/",
    },
    {
      label: "Dashboard",
      href:
        userRole === "admin" ? "/dashboard/admin" : userRole === "officer" ? "/dashboard/officer" : "/dashboard/user",
      icon: <FileText className="h-5 w-5" />,
      active: pathname.includes("/dashboard"),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
      active: pathname === "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/settings",
    },
  ]

  const dockItems = navItems.map((item) => ({
    icon: item.icon,
    label: item.label,
    onClick: () => {
      window.location.href = item.href
    },
    className: item.active ? "border-orange-500" : "",
  }))

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <Shield className="h-8 w-8 text-orange-500" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent"
              >
                BlockSentinel
              </motion.span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -3 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      item.active
                        ? "text-orange-500 bg-orange-500/10"
                        : "text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                    } transition-all duration-200`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              {userName && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="ml-4"
                >
                  <StarBorder as="div" color="#f97316" className="px-4 py-2">
                    <span className="text-sm font-medium">{userName}</span>
                  </StarBorder>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-4 rounded-md text-base font-medium ${
                      item.active
                        ? "text-orange-500 bg-orange-500/10"
                        : "text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                    } transition-all duration-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <Link
                  href="/auth"
                  className="flex items-center space-x-3 px-3 py-4 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </motion.div>

              {userName && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-3 py-4 mt-6 border-t border-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-500 font-bold">
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{userName}</p>
                      <p className="text-sm text-gray-400">{userRole}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Navigation (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:block">
        <Dock
          items={dockItems}
          className="bg-gray-900/80 backdrop-blur-md"
          magnification={60}
          baseItemSize={40}
          panelHeight={56}
        />
      </div>
    </>
  )
}
