
import { BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { useAuthContext } from "../../lib/auth"
import {useNavigate} from "react-router-dom";

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (isOpen: boolean) => void
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user, signOut } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 mr-3 text-gray-500 rounded-md lg:hidden hover:bg-gray-100"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          <div className="flex items-center">
            <UserCircleIcon className="w-8 h-8 text-gray-400 hidden sm:block" />
            <div className="hidden sm:block ml-3">
              <p className="font-medium text-gray-700 text-sm">{user?.name || "John Doe"}</p>
              <p className="text-gray-500 text-xs">Owner</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 ml-2 text-gray-400 hover:text-gray-600"
              title="Logout"
              aria-label="Logout"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
