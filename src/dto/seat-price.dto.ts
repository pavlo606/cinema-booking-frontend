import type { SeatCategory } from "./seat-category.dto";

export interface SeatPrice {
  id: number
  screeningId: number;
  categoryId: number;
  price: string;
  category: SeatCategory
  createdAt: string
  updatedAt: string
}