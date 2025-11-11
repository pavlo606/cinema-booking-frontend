import api from './http'

interface CreateFilmDTO {
  name: string
  duration: number
  description: string
  categories: number[]
}

export const FilmsAPI = {
  create: async (params: CreateFilmDTO, file?: File) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(params))
    if (file) formData.append('poster', file)

    const { data } = await api.post(`/film`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    return data
  },

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

  update: async (id: number, params: Partial<CreateFilmDTO>, file?: File) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(params))
    if (file) formData.append('poster', file)

    const { data } = await api.patch(`/film/${id}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/film/${id}`)
    return data
  },
}
