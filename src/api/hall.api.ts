import api from "./http";

export const HallAPI = {
  get: async () => {
    const { data } = await api.get("/hall")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/hall/${id}`)
    return data
  },
};