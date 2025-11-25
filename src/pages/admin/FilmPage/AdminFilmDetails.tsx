import { FilmCategoryAPI } from '@/api/film-category.api'
import { FilmsAPI } from '@/api/films.api'
import { ShowtimeCard } from '@/components/filmDetails/ShowTimeCard'
import Badge from '@/components/ui/Badge'
import CustomSelect from '@/components/ui/CustomSelect'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import PhotoInput from '@/components/ui/PhotoInput'
import SubmitButtons from '@/components/ui/SubmitButtons'
import type { FilmCategory } from '@/dto/film-category.dto'
import type { Film } from '@/dto/film.dto'
import { ArrowLeft, Pencil, Plus, Trash } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

type Fields = 'poster' | 'name' | 'categories' | 'duration' | 'description'
type InputsTypes = {
  name: string
  duration: number
  description: string
  categories: number[]
}

const AdminFilmDetails = () => {
  const { id: filmId } = useParams()
  const navigate = useNavigate()

  const [film, setFilm] = useState<Film | undefined>(undefined)
  const [editField, setEditField] = useState<Fields | undefined>(undefined)
  const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false)
  const [categoriesOptions, setCategoriesOptions] = useState<FilmCategory[]>()
  const [selectedCategory, setSelectedCategory] = useState<FilmCategory>()
  const [selectedPhoto, setSelectedPhoto] = useState<File>()
  const [inputValues, setInputValues] = useState<InputsTypes>({
    name: '',
    duration: 0,
    description: '',
    categories: [],
  })

  const fetchData = (filmId: number) => {
    FilmsAPI.getById(filmId).then((_film: Film) => {
      setFilm(_film)
      setDefaultInputs(_film)
      FilmCategoryAPI.get().then((_filmCategories: FilmCategory[]) => {
        setCategoriesOptions(
          _filmCategories
            .filter((category) => !_film.categories.some((a) => a.id == category.id))
        )
      })
    })
  }

  useEffect(() => {
    if (filmId) fetchData(+filmId)
  }, [filmId])

  const startEdit = (field: Fields) => {
    setEditField(field)
  }

  const endEdit = () => {
    setEditField(undefined)
    setDefaultInputs()
  }

  const confirmEdit = (field: Fields, value: string | number | number[]) => {
    if (!film) return toast.error('Error')
    if (!value) return toast.error('You cannot make field empty')

    FilmsAPI.update(film.id, { [field]: value }).then(() => {
      FilmsAPI.getById(film.id).then((res: Film) => {
        setFilm(res)
        setDefaultInputs(res)
        setEditField(undefined)
        if (filmId) fetchData(+filmId)
      })
    })
  }

  const confirmPosterEdit = (file?: File) => {
    if (!film) return toast.error('Error')
    if (!file) return toast.error('You need to choose image')

    FilmsAPI.update(film.id, {}, file).then(() => {
      FilmsAPI.getById(film.id).then((res: Film) => {
        setFilm(res)
        setDefaultInputs(res)
        setEditField(undefined)
        if (filmId) fetchData(+filmId)
      })
    })
  }

  const cancelSelect = () => {
    setSelectedCategory(undefined)
    setIsCreatingCategory(false)
  }

  const setDefaultInputs = (_film = film) => {
    if (!_film) return
    setInputValues({
      name: _film.name,
      duration: _film.duration,
      description: _film.description,
      categories: _film.categories.map((category) => category.id),
    })
    setSelectedCategory(undefined)
  }

  if (!film)
    return (
      <div className="flex justify-center items-center h-[60vh] text-text-secondary">
        Loading...
      </div>
    )

  return (
    <div>
      <IconButton icon={<ArrowLeft size={18} />} onClick={() => navigate('/admin/films')} />
      <section className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:w-1/3 flex items-start gap-4 mr-3">
          {editField === 'poster' ? (
            <>
              <PhotoInput onChange={setSelectedPhoto} />
              <SubmitButtons onSubmit={() => confirmPosterEdit(selectedPhoto)} onCancel={endEdit} />
            </>
          ) : (
            <>
              <img
                src={film.posterURL}
                alt={film.name}
                className="w-full rounded-2xl object-cover shadow-lg"
              />
              <IconButton onClick={() => startEdit('poster')} icon={<Pencil size={18} />} />
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-3">
              {editField === 'name' ? (
                <>
                  <Input
                    type="text"
                    className="text-3xl font-bold text-text-primary"
                    value={inputValues.name}
                    onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })}
                  />
                  <SubmitButtons
                    onSubmit={() => confirmEdit('name', inputValues.name)}
                    onCancel={endEdit}
                  />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-text-primary mb-0">{film.name}</h1>
                  <IconButton onClick={() => startEdit('name')} icon={<Pencil size={18} />} />
                </>
              )}
            </div>
            <div className="flex items-center gap-4 mb-3">
              {editField === 'categories' ? (
                <div className="flex gap-2 items-center">
                  {film.categories.map((category) => (
                    <div className="flex flex-col items-center">
                      <IconButton
                        onClick={() =>
                          confirmEdit(
                            'categories',
                            inputValues.categories.filter((id) => id !== category.id)
                          )
                        }
                        icon={<Trash size={18} />}
                        color="text-red"
                      />
                      <Badge>{category.name}</Badge>
                    </div>
                  ))}
                  {isCreatingCategory ? (
                    <>
                      <CustomSelect<FilmCategory>
                        className="w-48"
                        options={categoriesOptions}
                        value={selectedCategory}
                        onChange={(newValue: any) => setSelectedCategory(newValue)}
                      />
                      <SubmitButtons
                        onSubmit={() => {
                          if (!selectedCategory) return
                          confirmEdit('categories', [
                            ...inputValues.categories,
                            selectedCategory.id,
                          ])
                        }}
                        onCancel={cancelSelect}
                      />
                    </>
                  ) : (
                    <SubmitButtons
                      onSubmit={() => setIsCreatingCategory(true)}
                      onCancel={endEdit}
                      sumbitIcon={<Plus size={18} />}
                    />
                  )}
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    {film.categories.map((category) => (
                      <Badge>{category.name}</Badge>
                    ))}
                  </div>
                  <IconButton
                    onClick={() => setEditField('categories')}
                    icon={<Pencil size={18} />}
                  />
                </>
              )}
            </div>
            <div className="flex items-center gap-4 mb-4">
              {editField === 'duration' ? (
                <>
                  <Input
                    type="text"
                    className="text-3xl font-bold text-text-primary"
                    value={inputValues.duration}
                    onChange={(e) => setInputValues({ ...inputValues, duration: +e.target.value })}
                  />
                  <SubmitButtons
                    onSubmit={() => confirmEdit('duration', inputValues.duration)}
                    onCancel={endEdit}
                  />
                </>
              ) : (
                <>
                  <p className="text-text-secondary mb-0">{film.duration} min</p>
                  <IconButton onClick={() => startEdit('duration')} icon={<Pencil size={18} />} />
                </>
              )}
            </div>
            <div className="flex items-center gap-4 mb-4">
              {editField === 'description' ? (
                <>
                  <textarea
                    className="text-text-primary w-full border rounded-2xl p-4 h-100 overflow-auto"
                    value={inputValues.description}
                    onChange={(e) =>
                      setInputValues({ ...inputValues, description: e.target.value })
                    }
                  />
                  <SubmitButtons
                    onSubmit={() => confirmEdit('description', inputValues.description)}
                    onCancel={endEdit}
                  />
                </>
              ) : (
                <>
                  <p className="text-text-muted leading-relaxed">{film.description}</p>
                  <IconButton
                    onClick={() => startEdit('description')}
                    icon={<Pencil size={18} />}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Screenings */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-6">Session schedule</h2>

        {film.screenings?.length === 0 ? (
          <p className="text-textSecondary">No sessions at that moment.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {film.screenings?.map((showtime) => (
              <ShowtimeCard
                key={showtime.id}
                showtime={showtime}
                // onSelect={() => navigate(`/booking/${showtime.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AdminFilmDetails
