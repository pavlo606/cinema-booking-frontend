import { PromoAPI } from '@/api/promo.api'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import type { PromoCode } from '@/dto/promo.dto'
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AdminPromoPage = () => {
  const [promos, setPromos] = useState<PromoCode[]>([])
  // const [films, setFilms] = useState<Film[]>([])
  // const [halls, setHalls] = useState<Hall[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [inputCode, setInputCode] = useState<string>('')
  const [inputDiscount, setInputDiscount] = useState<number>(0)
  const [inputDate, setInputDate] = useState<string>('')
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)
  // const [isPricesModalOpen, setPricesModalOpen] = useState<boolean>(false)
  // const [modalScreening, setModalScreening] = useState<Screening | null>(null)

  useEffect(() => {
    update()
  }, [])

  const update = () => {
    PromoAPI.getAll().then((res: PromoCode[]) => {
      setPromos(res)
    })
  }

  const startEdit = (id: number) => {
    setIsCreateMode(false)
    setEditId(id)
    const selectedPromo = promos.find((promo) => promo.id === id)
    if (selectedPromo) {
      setInputCode(selectedPromo.code)
      setInputDiscount(selectedPromo.discount)
      const date = new Date(selectedPromo.expiresAt)
      setInputDate(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
      )
    }
  }

  const endEdit = () => {
    setIsCreateMode(false)
    setEditId(null)
  }

  const confirmUpdate = () => {
    if (!editId || !inputCode || !inputDiscount || !inputDate) return

    PromoAPI.update(editId, inputCode, inputDiscount, inputDate)
      .then(() => {
        toast.success('Promo Updated')
        setEditId(null)
        setIsCreateMode(false)
        update()
      })
      .catch(() => {
        toast.error('Error')
      })
  }

  const confirmCreate = () => {
    if (!inputCode || !inputDiscount || !inputDate) return

    PromoAPI.create(inputCode, inputDiscount, inputDate)
      .then(() => {
        toast.success('Promo Created')
        setEditId(null)
        setIsCreateMode(false)
        update()
      })
      .catch(() => {
        toast.error('Error')
      })
  }

  const handleAddPromo = () => {
    setIsCreateMode(true)
    setEditId(null)
    setInputDate('')
    setInputCode('')
    setInputDiscount(0)
  }

  const deletePromo = (id: number) => {
    if (!confirm('Are you sure you want to delete')) return

    PromoAPI.delete(id)
      .then(() => {
        toast.success('Promo Deleted')
        setEditId(null)
        setIsCreateMode(false)
        update()
      })
      .catch(() => {
        toast.error('Error')
      })
  }

  const onDiscountChange = (e: any) => {
    const val = +e.target.value || 0
    if (val < 0 || val > 100) return
    setInputDiscount(val)
  }

  return (
    <div className="min-h-screen bg-bgDark text-textPrimary p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Promo Codes</h2>
        <button
          onClick={handleAddPromo}
          className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Promo
        </button>
      </div>

      <div className="bg-surface p-4 rounded-xl shadow-xl">
        <table className="w-full text-left">
          <thead className="text-textSecondary border-b border-gray-700">
            <tr>
              <th className="py-3">Code</th>
              <th className="py-3">Discount</th>
              <th className="py-3">Expires At</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isCreateMode && (
              <tr>
                <td className="py-4 px-3">
                  <Input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                </td>
                <td>
                  <Input type="text" value={inputDiscount} onChange={onDiscountChange} />
                </td>
                <td className="px-3">
                  <Input
                    type="datetime-local"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                  />
                </td>
                <td className="py-3 px-3 text-right flex gap-2 justify-end">
                  <IconButton
                    onClick={confirmCreate}
                    icon={<Check size={18} />}
                    color="text-green"
                  />
                  <IconButton onClick={endEdit} icon={<X size={18} />} color="text-red" />
                </td>
              </tr>
            )}
            {promos.map((promo) => (
              <tr key={promo.id} className="border-b border-gray-800">
                {editId === promo.id ? (
                  <>
                    <td className="py-4 px-3">
                      <Input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                      />
                    </td>
                    <td>
                      <Input type="text" value={inputDiscount} onChange={onDiscountChange} />
                    </td>
                    <td className="px-3">
                      <Input
                        type="datetime-local"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-3 text-right flex gap-2 justify-end">
                      <IconButton
                        onClick={confirmUpdate}
                        icon={<Check size={18} />}
                        color="text-green"
                      />
                      <IconButton onClick={endEdit} icon={<X size={18} />} color="text-red" />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-4">
                      <p>{promo.code}</p>
                    </td>
                    <td>
                      <p>{promo.discount} %</p>
                    </td>
                    <td>{new Date(promo.expiresAt).toLocaleString()}</td>
                    <td className="py-3 px-3 text-right flex gap-2 justify-end">
                      <IconButton
                        onClick={() => startEdit(promo.id)}
                        icon={<Pencil size={18} />}
                        color="text-blue"
                      />
                      <IconButton
                        onClick={() => deletePromo(promo.id)}
                        icon={<Trash2 size={18} />}
                        color="text-red"
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPromoPage
