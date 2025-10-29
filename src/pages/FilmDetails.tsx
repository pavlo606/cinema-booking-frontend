import { FilmsAPI } from '@/api/films.api'
import { MovieInfo } from '@/components/filmDetails/FilmInfo'
import { ShowtimeCard } from '@/components/filmDetails/ShowTimeCard'
import type { Film } from '@/dto/film.dto'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const FilmDetails = () => {
  const { id: filmId } = useParams()
  const navigate = useNavigate();

  const [film, setFilm] = useState<Film | undefined>(undefined);

  useEffect(() => {
    if (filmId)
      FilmsAPI.getById(+filmId).then((res) => {
        console.log(res)
        setFilm(res)
      })
  }, [filmId])

  if (!film) return (
      <div className="flex justify-center items-center h-[60vh] text-textSecondary">
        Loading...
      </div>
    );

  return (
    <div>
      <MovieInfo film={film} />
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-6">
          Session schedule
        </h2>

        {film.screenings.length === 0 ? (
          <p className="text-textSecondary">No sessions at that moment.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {film.screenings.map((showtime) => (
              <ShowtimeCard
                key={showtime.id}
                showtime={showtime}
                onSelect={() => navigate(`/booking/${showtime.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default FilmDetails
