import api from "./http";

export const SeatCategoryAPI = {
  create: async (name: string, color: string) => {
    const { data } = await api.post(`/seat-category/`, {name, color})
    return data
  },

  get: async () => {
    const { data } = await api.get("/seat-category")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/seat-category/${id}`)
    return data
  },

  update: async (id: number, name: string, color: string) => {
    const { data } = await api.patch(`/seat-category/${id}`, {name, color})
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/seat-category/${id}`)
    return data
  },
};