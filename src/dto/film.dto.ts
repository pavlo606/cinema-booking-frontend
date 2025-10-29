import type { FilmCategory } from "./film-category.dto"

export interface Film {
  id: number
  name: string
  duration: number
  categories: FilmCategory[]
  posterURL: string
  description: string
  createdAt: string
  updatedAt: string
}