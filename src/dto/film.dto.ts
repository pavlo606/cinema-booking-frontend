import type { FilmCategory } from "./film-category.dto"
import type { Screening } from "./screening.dto"

export interface Film {
  id: number
  name: string
  duration: number
  posterURL: string
  description: string
  categories: FilmCategory[]
  screenings: Screening[]
  createdAt: string
  updatedAt: string
}