import { SeatCategoryAPI } from '@/api/seat-category.api'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import type { SeatCategory } from '@/dto/seat-category.dto'
import { Check, Pencil, Plus, Trash, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { toast } from 'react-toastify'

interface SeatCategoryPanelParams {}

const SeatCategoryPanel = ({}: SeatCategoryPanelParams) => {
  const [seatCategories, setSeatCategories] = useState<SeatCategory[]>()
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [inputColor, setInputColor] = useState<string>('')
  const [inputName, setInputName] = useState<string>('')

  useEffect(() => {
    update()
  }, [])

  const update = () => {
    SeatCategoryAPI.get().then((res: SeatCategory[]) => {
      setSeatCategories(res)
    })
  }

  const startEdit = (category: SeatCategory) => {
    setEditId(category.id)
    setInputColor(category.color)
    setInputName(category.name)
  }

  const startCreate = () => {
    setIsCreateMode(true)
    setEditId(null)
    setInputColor("")
    setInputName("")
  }

  const confirmCreate = () => {
    SeatCategoryAPI.create(inputName, inputColor).then(() => {
      update()
      setIsCreateMode(false)
      toast.success("Seat category created")
    }).catch(() => {
      toast.error("Error")
    })
  }

  const handleDelete = (id: number) => {
    SeatCategoryAPI.delete(id).then(() => {
      update()
    })
  }

  const confirmEdit = () => {
    if (!editId || !inputColor || !inputName) return toast.error('Error')

    SeatCategoryAPI.update(editId, inputName, inputColor).then(() => {
      update()
      setEditId(null)
      setInputColor('')
      setInputName('')
      toast.success("Seat category updated")
    })
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mt-8">
        {seatCategories &&
          seatCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-2">
              {editId === category.id ? (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <IconButton
                      onClick={confirmEdit}
                      icon={<Check size={18} />}
                      color="text-green"
                    />
                    <IconButton
                      onClick={() => setEditId(null)}
                      icon={<X size={18} />}
                      color="text-red"
                    />
                  </div>
                  <div className="flex items-center flex-col gap-2">
                    <HexColorPicker color={inputColor} onChange={setInputColor} />
                    <Input value={inputName} onChange={(e) => setInputName(e.target.value)} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <IconButton
                      onClick={() => startEdit(category)}
                      icon={<Pencil size={18} />}
                      color="text-blue"
                    />
                    <IconButton
                      onClick={() => handleDelete(category.id)}
                      icon={<Trash size={18} />}
                      color="text-red"
                    />
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-md`}
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <p className="ml-1">- {category.name}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        {isCreateMode ? (
          <div className='flex'>
            <div className="flex items-center flex-col gap-2">
              <HexColorPicker color={inputColor} onChange={setInputColor} />
              <Input value={inputName} onChange={(e) => setInputName(e.target.value)} />
            </div>
            <div className="flex items-center justify-center flex-col h-full">
              <IconButton onClick={confirmCreate} icon={<Check size={18} />} color="text-green" />
              <IconButton onClick={() => setIsCreateMode(false)} icon={<X size={18} />} color="text-red" />
            </div>
          </div>
        ) : (
          <button
            onClick={startCreate}
            className="rounded-md text-sm font-medium transition hover:bg-bg-dark cursor-pointer"
          >
            <Plus />
          </button>
        )}
      </div>
    </div>
  )
}

export default SeatCategoryPanel
