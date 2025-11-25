import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import { toast } from 'react-toastify'
import type { Seat } from '@/dto/seat.dto'
import { SeatAPI } from '@/api/seat.api'
import { ScreeningAPI } from '@/api/screening.api'
import { PromoAPI } from '@/api/promo.api'
import { BookingAPI } from '@/api/booking.api'

interface ConfirmBookingModalParams {
  isOpen: any
  onClose: any
  seatId: number | undefined
  screeningId: number | undefined
}

export default function ConfirmBookingModal({
  isOpen,
  onClose,
  seatId,
  screeningId,
}: ConfirmBookingModalParams) {
  if (!seatId || !screeningId)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-neutral-900 text-white border-neutral-700">
          <DialogHeader>
            <DialogTitle>No seat selected</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={onClose}
              className="text-primary text-sm px-3 py-1 rounded-lg font-medium hover:bg-bg-dark/80 transition"
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

  const [seat, setSeat] = useState<Seat>()
  const [screening, setScreening] = useState<any>()
  const [price, setPrice] = useState<number>(0)
  const [inputPromoVal, setInputPromoVal] = useState<string>("")
  const [dicount, setDicount] = useState<number>(0)
  const [finalPrice, setFinalPrice] = useState<number | null>(null)

  useEffect(() => {
    SeatAPI.getById(seatId).then((res_seat: Seat) => {
      setSeat(res_seat)
      ScreeningAPI.getPrices(screeningId).then((res: any) => {
        setScreening(res)
        setPrice(Number(res.seatPrices.find((s: any) => s.categoryId === res_seat.categoryId).price))
      })
    })
    setInputPromoVal("")
    setDicount(0)
    setFinalPrice(null)
  }, [seatId])

  useEffect(() => {
    setFinalPrice(price - (price * dicount / 100))
  }, [dicount, price])

  const checkPromo = () => {
    PromoAPI.validate(inputPromoVal).then((res: any) => {
      setDicount(res.discount)
    }).catch((err) => {
      if (err.status === 400) {
        toast.error("Invalid promo")
      }
    })
  }

  const confirmBooking = () => {
    BookingAPI.create(screeningId, seatId, inputPromoVal).then(() => {
      onClose()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-white border-neutral-700">
        <DialogHeader>
          <DialogTitle>Confirm booking on {screening?.film.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <p className="m-0">Row: {seat?.row}</p>
          <p className="m-0">Column: {seat?.column}</p>
          <p>Price: <span className={`${dicount && "line-through"}`}>{price}</span> UAH</p>
          <div className="flex mt-2 gap-2">
            <div>
              <Input type="text" value={inputPromoVal} onChange={(e) => setInputPromoVal(e.target.value)} />
            </div>
            <button
              onClick={checkPromo}
              className="text-accent text-sm px-3 py-1 rounded-lg font-medium hover:bg-bg-dark/80 transition"
            >
              Check Promo
            </button>
          </div>
          {finalPrice && dicount > 0 && (
            <div>
              <p>Discout: {dicount} %</p>
              <p>Final price: {finalPrice} UAH</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className="text-primary text-sm px-3 py-1 rounded-lg font-medium hover:bg-bg-dark/80 transition"
          >
            Cancel
          </button>

          <button
            onClick={confirmBooking}
            className="bg-accent text-bg-dark text-sm px-3 py-1 rounded-lg font-medium hover:bg-accent/80 transition"
          >
            Confirm Booking
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
