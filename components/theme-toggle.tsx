"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"

  const handleToggle = () => {
    setIsAnimating(true)
    setTheme(theme === "light" ? "dark" : "light")
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (!mounted) {
    return (
      <div className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition-colors duration-300">
        <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center">
          <Sun className="h-4 w-4 text-yellow-500" />
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className={`relative w-16 h-8 rounded-full p-1 transition-all duration-700 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-105 ${
        isDark
          ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 shadow-lg shadow-purple-500/25"
          : "bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25"
      } ${isAnimating ? "scale-110" : ""}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background stars for dark mode */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full theme-toggle-twinkle" />
        <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white rounded-full theme-toggle-twinkle" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1.5 left-4 w-0.5 h-0.5 bg-white rounded-full theme-toggle-twinkle" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1.5 left-8 w-0.5 h-0.5 bg-white rounded-full theme-toggle-twinkle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-2 right-8 w-0.5 h-0.5 bg-white rounded-full theme-toggle-twinkle" style={{ animationDelay: "2s" }} />
      </div>

      {/* Background clouds for light mode */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
          !isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1 left-1 w-2 h-1 bg-white/60 rounded-full theme-toggle-drift" />
        <div className="absolute top-2 right-1 w-1.5 h-0.5 bg-white/40 rounded-full theme-toggle-drift" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1 left-3 w-1 h-0.5 bg-white/50 rounded-full theme-toggle-drift" style={{ animationDelay: "2s" }} />
        <div className="absolute top-0.5 left-6 w-1 h-0.5 bg-white/30 rounded-full theme-toggle-drift" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Toggle circle with icon */}
      <div
        className={`relative w-6 h-6 rounded-full shadow-xl transform transition-all duration-700 ease-in-out flex items-center justify-center ${
          isDark 
            ? "translate-x-8 bg-gradient-to-br from-slate-100 to-slate-300 theme-toggle-glow" 
            : "translate-x-0 bg-gradient-to-br from-yellow-100 to-white"
        } ${isAnimating ? "scale-110 rotate-180" : ""}`}
      >
        {/* Sun icon with rays */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isDark
              ? "opacity-0 rotate-180 scale-0"
              : "opacity-100 rotate-0 scale-100 theme-toggle-float"
          }`}
        >
          <Sun className="h-4 w-4 text-yellow-600 drop-shadow-sm" />
          
          {/* Sun rays */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 w-0.5 h-1.5 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-3 opacity-80" />
            <div className="absolute bottom-0 left-1/2 w-0.5 h-1.5 bg-yellow-400 rounded-full transform -translate-x-1/2 translate-y-3 opacity-80" />
            <div className="absolute left-0 top-1/2 w-1.5 h-0.5 bg-yellow-400 rounded-full transform -translate-y-1/2 -translate-x-3 opacity-80" />
            <div className="absolute right-0 top-1/2 w-1.5 h-0.5 bg-yellow-400 rounded-full transform -translate-y-1/2 translate-x-3 opacity-80" />
            
            {/* Diagonal rays */}
            <div className="absolute top-1 left-1 w-1 h-0.5 bg-yellow-400 rounded-full transform rotate-45 -translate-x-2 -translate-y-2 opacity-60" />
            <div className="absolute top-1 right-1 w-1 h-0.5 bg-yellow-400 rounded-full transform -rotate-45 translate-x-2 -translate-y-2 opacity-60" />
            <div className="absolute bottom-1 left-1 w-1 h-0.5 bg-yellow-400 rounded-full transform -rotate-45 -translate-x-2 translate-y-2 opacity-60" />
            <div className="absolute bottom-1 right-1 w-1 h-0.5 bg-yellow-400 rounded-full transform rotate-45 translate-x-2 translate-y-2 opacity-60" />
          </div>
        </div>
        
        {/* Moon icon with craters */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isDark
              ? "opacity-100 rotate-0 scale-100 theme-toggle-float"
              : "opacity-0 rotate-180 scale-0"
          }`}
        >
          <div className="relative">
            <Moon className="h-4 w-4 text-slate-600 drop-shadow-sm" />
            {/* Moon craters */}
            <div className="absolute top-0.5 left-1 w-0.5 h-0.5 bg-slate-400 rounded-full opacity-60" />
            <div className="absolute bottom-1 right-0.5 w-0.5 h-0.5 bg-slate-400 rounded-full opacity-40" />
            <div className="absolute top-1.5 right-1 w-0.5 h-0.5 bg-slate-400 rounded-full opacity-50" />
          </div>
        </div>
      </div>

      {/* Ambient glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 ${
          isDark
            ? "shadow-inner shadow-purple-300/20"
            : "shadow-inner shadow-yellow-300/20"
        }`}
      />
    </button>
  )
}