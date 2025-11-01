import type { SeatCategory } from "./seat-category.dto"

export interface Seat {
  id: number
  hallId: number
  categoryId: number
  row: number
  column: number
  category: SeatCategory
  createdAt: string
  updatedAt: string
}
