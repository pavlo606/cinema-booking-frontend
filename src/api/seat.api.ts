import api from './http'

interface UpdateForHallDTO {
  hallId: number
  seats: {
    categoryId: number
    row: number
    column: number
  }[]
}

export const SeatAPI = {
  get: async () => {
    const { data } = await api.get('/seat')
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/seat/${id}`)
    return data
  },

  updateForHall: async (dto: UpdateForHallDTO) => {
    const { data } = await api.post(`/seat/update-hall`, dto)
    return data
  },
}
