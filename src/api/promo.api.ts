import api from './http'

export const PromoAPI = {
  create: async (code: string, discount: number, expiresAt: string) => {
    const { data } = await api.post('/promo', { code, discount, expiresAt })
    return data
  },

  validate: async (code: string) => {
    const { data } = await api.get('/promo/validate/code', { params: { code } })
    return data
  },

  getAll: async () => {
    const { data } = await api.get('/promo')
    return data
  },
  
  update: async (id: number, code: string, discount: number, expiresAt: string) => {
    const { data } = await api.patch(`/promo/${id}`, { code, discount, expiresAt })
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/promo/${id}`)
    return data
  },
}
