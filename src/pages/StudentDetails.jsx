"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import api from "../services/api"
import LoadingSpinner from "../components/LoadingSpinner"

function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await api.get(`/students/${id}`)
        setStudent(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch student details. Please try again later.")
        setLoading(false)
      }
    }

    fetchStudentDetails()
  }, [id])

  if (loading) return <LoadingSpinner />

  if (error) return <div className="text-red-500 text-center">{error}</div>

  if (!student) return <div className="text-center">Student not found</div>

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&size=128&background=random&color=fff`

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={avatarUrl || "/placeholder.svg"}
            alt={student.name}
            className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Academic Information</h2>
            <p className="text-gray-700">
              <span className="font-medium">Course:</span> {student.course}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Grade:</span> {student.grade}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Enrollment Date:</span> {student.enrollmentDate}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <p className="text-gray-700">
              <span className="font-medium">Address:</span> {student.address}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> {student.phone}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Link to="/" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails
