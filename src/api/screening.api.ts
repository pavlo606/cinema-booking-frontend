import api from "./http";

export const ScreeningAPI = {
  get: async () => {
    const { data } = await api.get("/screening")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/screening/${id}`)
    return data
  },
};