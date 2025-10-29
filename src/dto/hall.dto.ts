import type { Seat } from "./seat.dto"

export interface Hall {
  id: number
  name: string
  seats: Seat[]
  createdAt: string
  updatedAt: string
}
