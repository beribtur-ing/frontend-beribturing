import {useTheme} from "../contexts/theme-context"
import {Moon, Sun} from "lucide-react"

export function FancyDarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
      <button
        onClick={toggleDarkMode}
        className="relative inline-flex h-8 w-14 items-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:from-blue-600 dark:to-purple-600"
        role="switch"
        aria-checked={isDarkMode}
      >
        <span className="sr-only">Toggle dark mode</span>

        {/* Toggle circle */}
        <span
          className={`${
            isDarkMode ? "translate-x-7" : "translate-x-1"
          } inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          {/* Icon inside the circle */}
          <div className="flex h-full w-full items-center justify-center">
            {isDarkMode ? <Moon className="h-3 w-3 text-blue-600" /> : <Sun className="h-3 w-3 text-yellow-600" />}
          </div>
        </span>

        {/* Background icons */}
        <Sun
          className={`absolute left-1.5 h-4 w-4 text-white transition-opacity duration-300 ${
            isDarkMode ? "opacity-0" : "opacity-70"
          }`}
        />
        <Moon
          className={`absolute right-1.5 h-4 w-4 text-white transition-opacity duration-300 ${
            isDarkMode ? "opacity-70" : "opacity-0"
          }`}
        />
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
    </div>
  )
}
