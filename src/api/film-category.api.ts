import api from "./http";

export const FilmCategoryAPI = {
  get: async () => {
    const { data } = await api.get("/film-category")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/film-category/${id}`)
    return data
  },
};