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

  return (
    <div className="text-text-primary">
      {films && <FilmGrid films={films} />}
    </div>
  )
}

export default HomePage
