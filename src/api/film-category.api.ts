import api from './http'

export const FilmCategoryAPI = {
  get: async () => {
    const { data } = await api.get('/film-category')
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/film-category/${id}`)
    return data
  },

  create: async (name: string) => {
    const { data } = await api.post(`/film-category`, { name })
    return data
  },

  update: async (id: number, name: string) => {
    const { data } = await api.patch(`/film-category/${id}`, { name })
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/film-category/${id}`)
    return data
  },
}
