import { BookingAPI } from '@/api/booking.api'
import { ScreeningAPI } from '@/api/screening.api'
import ConfirmBookingModal from '@/components/booking/ConfirmBookingModal'
import SeatComponent from '@/components/booking/SeatComponent'
import type { Booking } from '@/dto/booking.dto'
import type { Screening } from '@/dto/screening.dto'
import type { Seat } from '@/dto/seat.dto'
import { useScreeningSocket } from '@/hooks/UseScreeningSocket'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function BookingPage() {
  const { id: screeningId } = useParams()
  const [seats, setSeats] = useState<Seat[]>([])
  const [screening, setScreening] = useState<Screening>()
  const [bookings, setBookings] = useState<Booking[]>()
  const [selected, setSelcted] = useState<number | undefined>()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useScreeningSocket(Number(screeningId), (updateBookings) => {
    console.log(updateBookings)
    setBookings(updateBookings)
  })

  const update = (_screeningId: string | undefined) => {
    if (screeningId) {
      ScreeningAPI.getById(+screeningId).then((data: Screening) => {
        setScreening(data)
        setBookings(data.bookings)
        setSeats(data.hall.seats)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    update(screeningId)
  }, [screeningId])

  const handleBooking = () => {
    setIsModalOpen(true)
    // if (selected && screening) {
    //   const seat = seats.find((seat) => seat.id === selected)
    //   const msg = `Do you want to book a seat with row: ${seat?.row} and column: ${seat?.column}, at the ${new Date(screening.startTime).toLocaleTimeString('uk-UA', { timeZone: 'UTC' })}`
    //   if (!confirm(msg)) return

    //   BookingAPI.create(screening.id, selected)
    //     .then(() => {
    //       setSelcted(undefined)
    //       if (screeningId) {
    //         ScreeningAPI.getById(+screeningId).then((data: Screening) => {
    //           setScreening(data)
    //           setBookings(data.bookings)
    //           setSeats(data.hall.seats)
    //           setLoading(false)
    //         })
    //       }
    //     })
    //     .catch(() => {
    //       alert('This seat is taken')
    //     })
    // } else {
    //   alert('Choose one seat!')
    // }
  }

  const onModalClose = () => {
    setIsModalOpen(!isModalOpen)
    update(screeningId)
  }

  if (loading) return <p className="text-center text-text-secondary">Завантаження...</p>

  return (
    <div className="flex flex-col items-center min-h-[80vh] p-8">
      <ConfirmBookingModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        seatId={selected}
        screeningId={+(screeningId || 0)}
      />

      <h1 className="text-3xl font-semibold text-gray-100 mb-8">{screening?.hall.name}</h1>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="text-center text-gray-400 mb-4">Screen</div>
        <div className="bg-gray-600 h-1 w-full mb-6" />

        <div className="grid gap-2">
          {seats.map((seat) => (
            <SeatComponent
              key={seat.id}
              onClick={() => setSelcted(seat.id)}
              seat={seat}
              selected={selected}
              disabled={
                !!bookings?.find((val) => val.seatId === seat.id && val.status === 'Booked')
              }
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleBooking}
        disabled={!selected}
        className="mt-8 bg-primary/80 hover:bg-primary/50 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer disabled:bg-primary/50 disabled:cursor-default"
      >
        Submit booking
      </button>
      <div className="flex flex-wrap gap-4 mt-8">
        {screening?.seatPrices &&
          screening?.seatPrices.map((seatPrice) => (
            <div key={seatPrice.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-md`}
                style={{ backgroundColor: seatPrice.category.color }}
              ></div>
              <p className="ml-1">
                - {seatPrice.category.name} ({seatPrice.price} ₴)
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}
