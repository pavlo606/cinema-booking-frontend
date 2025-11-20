import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import { SeatCategoryAPI } from '@/api/seat-category.api'
import type { SeatCategory } from '@/dto/seat-category.dto'
import type { Screening } from '@/dto/screening.dto'
import { ScreeningSeatPriceAPI } from '@/api/screening-seat-price.api'
import { toast } from 'react-toastify'

interface EditPricesModalParams {
  isOpen: any
  onClose: any
  screening: Screening | null
}

export default function EditPricesModal({ isOpen, onClose, screening }: EditPricesModalParams) {
  const [prices, setPrices] = useState<any>({})
  const [categories, setCategories] = useState<SeatCategory[]>([])

  useEffect(() => {
    if (screening) {
      console.log(screening)

      let initPrices = {}
      screening.seatPrices.map((seatPrice) => {
        initPrices = { ...initPrices, [seatPrice.categoryId]: seatPrice.price }
      })
      setPrices(initPrices)
    }

    SeatCategoryAPI.get().then((res: SeatCategory[]) => {
      setCategories(res)
    })
  }, [screening])

  const handleChange = (categoryId: number, value: string) => {
    const num = value
    if (num.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      setPrices({ ...prices, [categoryId]: num })
    }
  }

  const handleSave = () => {
    if (!screening) return

    ScreeningSeatPriceAPI.updateForScreening({
      screeningId: screening.id,
      priceSettings: Object.keys(prices).map((categoryId) => ({
        categoryId: Number(categoryId),
        price: prices[categoryId],
      })),
    }).then(() => {
      onClose()
      toast.success('Prices updated')
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-white border-neutral-700">
        <DialogHeader>
          <DialogTitle>Set Seat Prices</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }} />
                <span>{cat.name}</span>
              </div>

              <Input
                type="text"
                value={prices[cat.id] ?? ''}
                onChange={(e) => handleChange(cat.id, e.target.value)}
                className="w-24 bg-neutral-800 border-neutral-700 text-white"
                placeholder="Price"
                min={0}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className="text-primary text-sm px-3 py-1 rounded-lg font-medium hover:bg-bg-dark/80 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-accent text-bg-dark text-sm px-3 py-1 rounded-lg font-medium hover:bg-accent/80 transition"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
