import api from "./http";

export const FilmsAPI = {
  get: async () => {
    const { data } = await api.get("/film")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/film/${id}`)
    return data
  }
};