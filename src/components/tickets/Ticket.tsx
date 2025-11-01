import { BookingAPI } from '@/api/booking.api'
import type { Booking } from '@/dto/booking.dto'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { Link } from 'react-router'

interface TicketParams {
  booking: Booking
}

const Ticket = ({ booking }: TicketParams) => {
  const date = new Date(booking.screening.startTime)
  const timeStr = date.toLocaleTimeString('uk-UA', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
  })
  const dayStr = date.toLocaleDateString('en-EN', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  const HandleDelete = () => {
    const check = confirm('Are you sure, you want to delete your booking?')
    if (check) {
      BookingAPI.delete(booking.id).then(() => {
        toast.success('Booking has been canceled')
      })
    }
  }

  return (
    <div className="bg-bgDark border border-border rounded-xl p-4 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <span className="text-primary font-bold text-2xl">{booking.screening.film.name}</span>
          <span className="text-text-primary font-semibold">{dayStr}</span>
        </div>
        <Link to={`/booking/${booking.screening.id}`} className="text-text-secondary text-sm hover:text-accent">
          {booking.screening.hall.name}
        </Link>
      </div>
      <div className="text-2xl font-semibold text-accent mb-2">{timeStr}</div>
      <div className="flex justify-between">
        <p>
          Row: {booking.seat.row}, Seat: {booking.seat.column}
        </p>
        <button onClick={HandleDelete} className="cursor-pointer text-primary hover:">
          <Trash2 />
        </button>
      </div>
    </div>
  )
}

export default Ticket
