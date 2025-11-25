import { FilmCategoryAPI } from '@/api/film-category.api'
import { FilmsAPI } from '@/api/films.api'
import Badge from '@/components/ui/Badge'
import CustomSelect from '@/components/ui/CustomSelect'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import PhotoInput from '@/components/ui/PhotoInput'
import SubmitButtons from '@/components/ui/SubmitButtons'
import type { FilmCategory } from '@/dto/film-category.dto'
import { ArrowLeft, Plus, Trash } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

type InputsTypes = {
  name: string
  duration: number
  description: string
  categories: FilmCategory[]
}

const AdminFilmCreate = () => {
  const navigate = useNavigate()

  const [allCategories, setAllCategories] = useState<FilmCategory[]>()
  const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<FilmCategory>()
  const [selectedPhoto, setSelectedPhoto] = useState<File>()
  const [inputValues, setInputValues] = useState<InputsTypes>({
    name: '',
    duration: 0,
    description: '',
    categories: [],
  })

  const fetchData = () => {
    FilmCategoryAPI.get().then((_filmCategories: FilmCategory[]) => {
      setAllCategories(_filmCategories)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const confirmCreate = () => {
    if (!inputValues.description || !inputValues.duration || !inputValues.name)
      return toast.error('You need to fill all required felds (*)')
    FilmsAPI.create(
      { ...inputValues, categories: inputValues.categories.map((category) => category.id) },
      selectedPhoto
    ).then(() => {
      toast.success('Film created!')
      navigate('/admin/films')
    })
  }

  const cancelSelect = () => {
    setSelectedCategory(undefined)
    setIsCreatingCategory(false)
  }

  return (
    <div>
      <IconButton icon={<ArrowLeft size={18} />} onClick={() => navigate('/admin/films')} />
      <section className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:w-1/3 flex items-start gap-4 mr-3">
          <PhotoInput onChange={setSelectedPhoto} />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <p>Title*</p>
              <Input
                type="text"
                className="text-3xl font-bold text-text-primary"
                value={inputValues.name}
                onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex gap-2 items-center">
                <p>Categories </p>
                {inputValues.categories.map((category) => (
                  <div className="flex flex-col items-center">
                    <IconButton
                      onClick={() =>
                        setInputValues({
                          ...inputValues,
                          categories: inputValues.categories.filter((id) => id.id !== category.id),
                        })
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
                      options={allCategories?.filter(
                        (category) => !inputValues.categories.some((a) => a.id === category.id)
                      )}
                      value={selectedCategory}
                      onChange={(newValue: any) => setSelectedCategory(newValue)}
                    />
                    <SubmitButtons
                      onSubmit={() => {
                        if (!selectedCategory) return
                        setInputValues({
                          ...inputValues,
                          categories: [...inputValues.categories, selectedCategory],
                        })
                        setIsCreatingCategory(false)
                        setSelectedCategory(undefined)
                      }}
                      onCancel={cancelSelect}
                    />
                  </>
                ) : (
                  <IconButton
                    icon={<Plus size={18} />}
                    onClick={() => setIsCreatingCategory(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <p>Duration*</p>
              <Input
                type="text"
                className="text-3xl font-bold text-text-primary"
                value={inputValues.duration}
                onChange={(e) => setInputValues({ ...inputValues, duration: +e.target.value })}
              />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <p>Description*</p>
              <textarea
                className="bg-bg-dark text-text-primary w-full border rounded-2xl p-4 h-100 overflow-auto"
                value={inputValues.description}
                onChange={(e) => setInputValues({ ...inputValues, description: e.target.value })}
              />
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={confirmCreate}
        className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg hover:opacity-90 transition mt-5"
      >
        Create Film
      </button>
    </div>
  )
}

export default AdminFilmCreate
