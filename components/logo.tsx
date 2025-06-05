import { Database, Shield } from "lucide-react"

export default function Logo({ size = "default" }) {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-10 w-10",
  }

  const sizeClass = sizeClasses[size] || sizeClasses.default

  return (
    <div className="relative flex items-center justify-center">
      <Database className={`${sizeClass} text-orange-500`} />
      <Shield className={`${sizeClass} absolute text-orange-300 opacity-70`} />
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-orange-300/20 rounded-full blur-sm"></div>
    </div>
  )
}
