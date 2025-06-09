"use client"
import {useTheme} from "@/contexts/theme-context"
import {Moon, Sun} from "lucide-react"

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-gray-700"
      role="switch"
      aria-checked={isDarkMode}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          isDarkMode ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
      />

      {/* Sun icon */}
      <Sun
        className={`absolute left-1 h-3 w-3 text-yellow-500 transition-opacity duration-200 ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Moon icon */}
      <Moon
        className={`absolute right-1 h-3 w-3 text-blue-400 transition-opacity duration-200 ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  )
}
