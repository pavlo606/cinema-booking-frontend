import { useEffect, useState } from 'react'
import { FilmsAPI } from '@/api/films.api'
import { FilmGrid } from '@/components/home/FilmGrid'
import type { Film } from '@/dto/film.dto'

const HomePage = () => {
  const [films, setFilms] = useState<Film[]>()

  useEffect(() => {
    FilmsAPI.get().then((res) => {
      setFilms(res)
    })
  }, [])

  if (!films)
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-text-primary text-center">No movies</h2>
      </div>
    )

  return <div className="text-text-primary">{films && <FilmGrid films={films} />}</div>
}

export default HomePage
