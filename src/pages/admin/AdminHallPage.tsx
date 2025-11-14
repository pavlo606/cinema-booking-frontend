import { HallAPI } from '@/api/hall.api'
import type { Hall } from '@/dto/hall.dto'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const AdminHallPage = () => {
  const navigate = useNavigate()
  const [halls, setHalls] = useState<Hall[]>()

  useEffect(() => {
    HallAPI.get().then((res: Hall[]) => {
      setHalls(res)
    })
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">Halls</h1>
        <button
          // onClick={handleAddFilm}
          className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add hall
        </button>
      </div>
      <div className="bg-surface p-4 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-sm text-text-secondary">
          <thead className="border-b border-gray-700 text-text-primary">
            <tr>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Seats count</th>
              <th className="py-2 px-3">Creation date</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls?.map((hall) => (
              <tr
                key={hall.id}
                className="border-b border-gray-800 hover:bg-bg-dark transition-colors"
              >
                <td className="py-3 px-4">
                  {hall.name}
                </td>
                <td className="py-3 px-3 text-text-primary font-medium">{hall.seats.length}</td>
                <td className="py-3 px-3">{new Date(hall.createdAt).toUTCString()}</td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => navigate(`/admin/halls/${hall.id}/edit`)}
                    className="text-blue-400 hover:text-blue-300 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    // onClick={() => handleDelete(film.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminHallPage
