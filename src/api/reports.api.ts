import api from './http'

export const ReportsAPI = {
  getTicketsSoldReport: async (params: any) => {
    const { data } = await api.get('/reports/sales', { params })
    return data
  },

  getRevenueReport: async (params: any) => {
    const { data } = await api.get('/reports/revenue', { params })
    return data
  },

  getOccupancyReport: async (params: any) => {
    const { data } = await api.get('/reports/occupancy', { params })
    return data
  },
}
