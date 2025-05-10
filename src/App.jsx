"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import StudentList from "./pages/StudentList"
import StudentDetails from "./pages/StudentDetails"
import AddStudent from "./pages/AddStudent"
import LoadingSpinner from "./components/LoadingSpinner"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-student"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
