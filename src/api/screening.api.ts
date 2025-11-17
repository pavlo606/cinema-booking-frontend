import type { Screening } from "@/dto/screening.dto";
import api from "./http";

export const ScreeningAPI = {
  create: async (screening: Partial<Screening>) => {
    const { data } = await api.post(`/screening`, screening)
    return data
  },

  get: async () => {
    const { data } = await api.get("/screening")
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/screening/${id}`)
    return data
  },

  update: async (id: number, screening: Partial<Screening>) => {
    const { data } = await api.patch(`/screening/${id}`, screening)
    return data
  },
};