import type { Screening } from "./screening.dto"
import type { Seat } from "./seat.dto"

export interface Booking {
  id: number
  userId: number
  screeningId: number
  seatId: number
  status: string
  screening: Screening
  seat: Seat
  createdAt: string
  updatedAt: string
}
