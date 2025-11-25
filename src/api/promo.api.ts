import api from './http'

export const PromoAPI = {
  validate: async (code: string) => {
    const { data } = await api.get('/promo/validate/code', { params: { code } })
    return data
  },
}
