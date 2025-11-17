import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Film } from '@/dto/film.dto'
import { FilmsAPI } from '@/api/films.api'
import { useNavigate } from 'react-router'

const AdminFilmPage = () => {
  const [films, setFilms] = useState<Film[]>([])
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you ant to delete film?')) {
      FilmsAPI.delete(id).then(() => {
        updateFilms()
      })
    }
  }

  const handleAddFilm = () => {
    navigate("/admin/films/new")
  }

  const updateFilms = () => {
    FilmsAPI.get().then((res) => {
      setFilms(res)
    })
  }

  useEffect(() => {
    updateFilms()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary">Films</h2>
        <button
          onClick={handleAddFilm}
          className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add film
        </button>
      </div>

      <div className="bg-surface p-4 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-sm text-text-secondary">
          <thead className="border-b border-gray-700 text-text-primary">
            <tr>
              <th className="py-2 px-3">Poster</th>
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Categories</th>
              <th className="py-2 px-3">Duration</th>
              <th className="py-2 px-3">Creation date</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film) => (
              <tr
                key={film.id}
                className="border-b border-gray-800 hover:bg-bg-dark transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="w-16 h-24 overflow-hidden rounded-lg">
                    <img
                      src={film.posterURL}
                      alt={film.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3 px-3 text-text-primary font-medium">{film.name}</td>
                <td className="py-3 px-3">
                  <p className="line-clamp-5 w-36">
                    {film.categories.map((category) => category.name).join(', ')}
                  </p>
                </td>
                <td className="py-3 px-3">{film.duration} min</td>
                <td className="py-3 px-3">{new Date(film.createdAt).toUTCString()}</td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => navigate(`/admin/films/${film.id}/edit`)}
                    className="text-blue-400 hover:text-blue-300 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(film.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {films.length === 0 && (
          <p className="text-center text-text-secondary py-6">Фільмів ще немає.</p>
        )}
      </div>
    </div>
  )
}

export default AdminFilmPage
