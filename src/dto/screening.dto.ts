import type { Booking } from "./booking.dto"
import type { Film } from "./film.dto"
import type { Hall } from "./hall.dto"
import type { SeatPrice } from "./seat-price.dto"

export interface Screening {
  id: number
  filmId: number
  hallId: number
  startTime: string
  endTime: string
  hall: Hall
  seatPrices: SeatPrice[]
  bookings: Booking[]
  film: Film
  createdAt: string
  updatedAt: string
}