import { FilmsAPI } from '@/api/films.api'
import type { Film } from '@/dto/film.dto'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Schedule = () => {
  const [films, setFilms] = useState<Film[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    FilmsAPI.getByDate(selectedDate).then((data) => {
      setFilms(data)
    })
  }, [selectedDate])

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Screenings Schedule</h2>

      {/* Вибір дати */}
      <div className="flex justify-center mb-8">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-surface text-text-primary border border-accent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Контейнер фільмів */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {films.map((film) => (
          <div
            key={film.id}
            className="bg-surface rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            <div className="aspect-2/3 w-full overflow-hidden rounded-t-2xl">
              <img src={film.posterURL} alt={film.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col grow">
              <h2 className="text-xl font-semibold text-text-primary mb-2">{film.name}</h2>
              <div className="text-text-secondary text-sm mb-3">Aviable screenings</div>

              <div className="flex flex-wrap gap-2">
                {film.screenings.length > 0 ? (
                  film.screenings.map((s) => {
                    const time = new Date(s.startTime).toLocaleTimeString('uk-UA', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    return (
                      <Link
                        key={s.id}
                        to={`/booking/${s.id}`}
                        className="bg-primary hover:bg-accent text-white text-sm font-medium rounded-lg px-3 py-1 transition"
                      >
                        {time}
                      </Link>
                    )
                  })
                ) : (
                  <div className="text-text-secondary text-sm italic">No screenings</div>
                )}
              </div>

              <div className="mt-auto pt-4">
                <Link
                  to={`/film/${film.id}`}
                  className="text-accent hover:underline text-sm font-medium"
                >
                  Film Details →
                </Link>
              </div>
            </div>
          </div>
        ))}

        {films.length === 0 && (
          <div className="col-span-full text-center text-text-secondary italic mt-10">
            No screenings on this date
          </div>
        )}
      </div>
    </div>
  )
}

export default Schedule
