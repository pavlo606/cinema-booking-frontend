import api from './http'

export const HallAPI = {
  create: async (name: string) => {
    const { data } = await api.post(`/hall/`, { name })
    return data
  },

  get: async () => {
    const { data } = await api.get('/hall')
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/hall/${id}`)
    return data
  },
}
