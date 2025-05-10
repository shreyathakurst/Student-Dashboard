import { Link } from "react-router-dom"

function StudentCard({ student }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&color=fff`

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={avatarUrl || "/placeholder.svg"} alt={student.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Course:</span> {student.course}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Grade:</span> {student.grade}
          </p>
        </div>

        <Link
          to={`/students/${student.id}`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default StudentCard
