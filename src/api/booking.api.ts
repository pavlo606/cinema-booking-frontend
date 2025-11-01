import api from './http'

export const BookingAPI = {
  create: async (screeningId: number, seatId: number) => {
    const { data } = await api.post('/booking', { screeningId, seatId })
    return data
  },

  getForUser: async () => {
    const { data } = await api.get('/booking/for/user')
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/booking/${id}`)
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/booking/${id}`)
    return data
  }
}
