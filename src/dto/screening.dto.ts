import type { Hall } from "./hall.dto"
import type { SeatPrice } from "./seat-price.dto"

export interface Screening {
  id: number
  filmId: number
  hallId: number
  startTime: Date
  endTime: Date
  hall: Hall
  seatPrices: SeatPrice[]
  createdAt: string
  updatedAt: string
}