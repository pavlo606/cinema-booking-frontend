import api from "./http";

export const SeatCategoryAPI = {
  get: async () => {
    const { data } = await api.get("/seat-category")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/seat-category/${id}`)
    return data
  },
};