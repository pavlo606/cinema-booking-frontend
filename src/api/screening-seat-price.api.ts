import api from './http'

interface UpdateForScreeningDTO {
  screeningId: number
  priceSettings: {
    categoryId: number
    price: number
  }[]
}

export const ScreeningSeatPriceAPI = {
  updateForScreening: async (dto: UpdateForScreeningDTO) => {
    const { data } = await api.post('/screening-seat-price/update-screening', dto)
    return data
  },
}