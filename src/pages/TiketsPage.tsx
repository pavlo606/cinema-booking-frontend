import { BookingAPI } from '@/api/booking.api'
import Ticket from '@/components/tickets/Ticket'
import type { Booking } from '@/dto/booking.dto'
import { useEffect, useState } from 'react'

const TiketsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>()

  useEffect(() => {
    BookingAPI.getForUser().then(setBookings)
  }, [])

  if (!bookings) return <h2 className="text-2xl font-semibold mb-6 text-text-primary">You have no tickets</h2>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-text-primary">Your active tickets</h2>
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <Ticket booking={booking} />
        ))}
      </div>
    </div>
  )
}

export default TiketsPage
