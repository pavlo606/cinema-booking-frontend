import type { Film } from '@/dto/film.dto'
import api from './http'

export const FilmsAPI = {
  get: async () => {
    const { data } = await api.get('/film')
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/film/${id}`)
    return data
  },

  search: async (prompt: string): Promise<Array<{ id: string; name: string }>> => {
    const { data } = await api.get(`/film/search/${prompt}`)
    return data
  },

  getByDate: async (date: string) => {
    const { data } = await api.get(`/film/by/date?date=${date}`)
    return data
  },

  update: async (id: number, params: Partial<Film>, file?: File) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(params))
    if (file) formData.append('poster', file)
    console.log(formData.get('poster'))
    const { data } = await api.patch(`/film/${id}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    return data
  },
}
