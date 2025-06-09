"use client"


import { Link } from "@/i18n/navigation"
import {ArrowLeft, Home} from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔍</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Product Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the product you're looking for. It may have been removed or the link might be
          incorrect.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Homepage
          </Link>

          <div>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
