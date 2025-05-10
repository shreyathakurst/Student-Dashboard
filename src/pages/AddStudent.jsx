"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function AddStudent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    grade: "",
    enrollmentDate: "",
    address: "",
    phone: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const courses = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Engineering"]
  const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.course) {
      newErrors.course = "Course is required"
    }

    if (!formData.grade) {
      newErrors.grade = "Grade is required"
    }

    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = "Enrollment date is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await api.post("/students", formData)
      navigate("/")
    } catch (err) {
      setSubmitError("Failed to add student. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Student</h1>

        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{submitError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Course *
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.course ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                Grade *
              </label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.grade ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
            </div>

            <div>
              <label htmlFor="enrollmentDate" className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment Date *
              </label>
              <input
                type="date"
                id="enrollmentDate"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.enrollmentDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.enrollmentDate && <p className="text-red-500 text-xs mt-1">{errors.enrollmentDate}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudent
