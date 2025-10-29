import api from "./http";

export const FilmsAPI = {
  get: async () => {
    const { data } = await api.get("/film")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/film/${id}`)
    return data
  },

  search: async (prompt: string): Promise<Array<{ id: string; name: string }>> => {
    const { data } = await api.get(`/film/search/${prompt}`)
    return data
  }
};