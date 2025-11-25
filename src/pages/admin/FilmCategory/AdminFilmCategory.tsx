import { FilmCategoryAPI } from '@/api/film-category.api'
import Badge from '@/components/ui/Badge'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import SubmitButtons from '@/components/ui/SubmitButtons'
import type { FilmCategory } from '@/dto/film-category.dto'
import { Check, Pencil, Plus, Trash, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AdminFilmCategory = () => {
  const [currentCategories, setCurrentCategories] = useState<FilmCategory[]>()
  const [editCategory, setEditCategory] = useState<number | undefined>()
  const [isCreateCategory, setIsCreateCategory] = useState<boolean>(false)
  const [editInputValue, setEditInputValue] = useState<string>('')
  const [createInputValue, setCreateInputValue] = useState<string>('')

  useEffect(() => {
    FilmCategoryAPI.get().then((res) => {
      setCurrentCategories(res)
    })
  }, [])

  const startCreate = () => {
    setIsCreateCategory(false)
    setEditInputValue('')
  }

  const startEdit = (category: FilmCategory) => {
    setEditCategory(category.id)
    setEditInputValue(category.name)
  }

  const deleteCategory = (id: number) => {
    if (!confirm("Are you sure you want to delete category")) return

    FilmCategoryAPI.delete(id).then(() => {
      FilmCategoryAPI.get().then((res) => {
        setCurrentCategories(res)
      })
    })
  }

  const submitCreate = () => {
    if (!createInputValue) return toast.error('You need to enter category name')

    FilmCategoryAPI.create(createInputValue)
      .then(() => {
        setIsCreateCategory(false)
        setCreateInputValue("")
        FilmCategoryAPI.get().then((res) => {
          setCurrentCategories(res)
        })
      })
      .catch((err) => {
        if (err.status === 409) {
          toast.error('Category with this name already exist')
        }
      })
  }

  const submitEdit = () => {
    if (editCategory === undefined) return
    if (!editInputValue) return toast.error('You need to enter category name')

    FilmCategoryAPI.update(editCategory, editInputValue)
      .then(() => {
        setEditCategory(undefined)
        FilmCategoryAPI.get().then((res) => {
          setCurrentCategories(res)
        })
      })
      .catch((err) => {
        if (err.status === 409) {
          toast.error('Category with this name already exist')
        }
      })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary">Categories</h2>
        {isCreateCategory ? (
          <div className="flex items-center">
            <div className="flex w-96 gap-5">
              <Input
                placeholder="New category name"
                value={createInputValue}
                onChange={(e) => setCreateInputValue(e.target.value)}
              />
              <SubmitButtons onCancel={startCreate} onSubmit={submitCreate} />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreateCategory(true)}
            className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            <Plus size={18} />
            Add category
          </button>
        )}
      </div>
      <div className="flex gap-10 pt-5 border-t border-gray-600 items-center">
        {currentCategories?.map((category) => (
          <>
            <div className="flex flex-col items-center">
              {editCategory === category.id ? (
                <>
                  <div className="flex justify-around w-full mb-1">
                    <IconButton
                      onClick={() => submitEdit()}
                      icon={<Check size={18} />}
                      color="text-green"
                    />
                    <IconButton
                      onClick={() => setEditCategory(undefined)}
                      icon={<X size={18} />}
                      color="text-red"
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      value={editInputValue}
                      onChange={(e) => setEditInputValue(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-around w-full mb-1">
                    <IconButton
                      onClick={() => startEdit(category)}
                      icon={<Pencil size={18} />}
                      color="text-blue"
                    />
                    <IconButton
                      onClick={() => deleteCategory(category.id)}
                      icon={<Trash size={18} />}
                      color="text-red"
                    />
                  </div>
                  <Badge>{category.name}</Badge>
                </>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default AdminFilmCategory
