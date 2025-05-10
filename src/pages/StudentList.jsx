"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import LoadingSpinner from "../components/LoadingSpinner"
import StudentCard from "../components/StudentCard"

function StudentList() {
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [courseFilter, setCourseFilter] = useState("")
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students")
        setStudents(response.data)
        setFilteredStudents(response.data)

        // Extract unique courses for filter dropdown
        const uniqueCourses = [...new Set(response.data.map((student) => student.course))]
        setCourses(uniqueCourses)

        setLoading(false)
      } catch (err) {
        setError("Failed to fetch students. Please try again later.")
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  useEffect(() => {
    if (courseFilter === "") {
      setFilteredStudents(students)
    } else {
      setFilteredStudents(students.filter((student) => student.course === courseFilter))
    }
  }, [courseFilter, students])

  const handleFilterChange = (e) => {
    setCourseFilter(e.target.value)
  }

  if (loading) return <LoadingSpinner />

  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student List</h1>
        <Link
          to="/add-student"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add New Student
        </Link>
      </div>

      <div className="mb-6">
        <label htmlFor="courseFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Course:
        </label>
        <select
          id="courseFilter"
          value={courseFilter}
          onChange={handleFilterChange}
          className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-gray-500 text-center">No students found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentList
