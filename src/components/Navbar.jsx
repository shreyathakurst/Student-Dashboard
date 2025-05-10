"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Student Manager
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>

            {currentUser ? (
              <>
                <Link to="/add-student" className="hover:text-blue-200 transition-colors">
                  Add Student
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
