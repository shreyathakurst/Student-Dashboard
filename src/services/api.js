import axios from "axios"
import MockAdapter from "axios-mock-adapter"

// Create axios instance
const api = axios.create({
  baseURL: "/api",
})

// Create mock adapter
const mock = new MockAdapter(api, { delayResponse: 1000 })

// Sample student data
const students = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    course: "Computer Science",
    grade: "A",
    enrollmentDate: "2023-01-15",
    address: "123 Main St, City",
    phone: "555-123-4567",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    course: "Mathematics",
    grade: "B+",
    enrollmentDate: "2023-02-10",
    address: "456 Oak Ave, Town",
    phone: "555-987-6543",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    course: "Physics",
    grade: "A-",
    enrollmentDate: "2023-01-20",
    address: "789 Pine St, Village",
    phone: "555-456-7890",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    course: "Computer Science",
    grade: "B",
    enrollmentDate: "2023-03-05",
    address: "101 Elm St, County",
    phone: "555-789-0123",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    course: "Mathematics",
    grade: "A+",
    enrollmentDate: "2023-02-25",
    address: "202 Maple Dr, State",
    phone: "555-321-6547",
  },
]

// Mock GET request for all students
mock.onGet("/students").reply(200, students)

// Mock GET request for a single student
mock.onGet(/\/students\/\d+/).reply((config) => {
  const id = config.url.split("/").pop()
  const student = students.find((s) => s.id === id)

  if (student) {
    return [200, student]
  } else {
    return [404, { message: "Student not found" }]
  }
})

// Mock POST request to add a student
mock.onPost("/students").reply((config) => {
  const newStudent = JSON.parse(config.data)
  newStudent.id = String(students.length + 1)
  students.push(newStudent)
  return [201, newStudent]
})

export default api
