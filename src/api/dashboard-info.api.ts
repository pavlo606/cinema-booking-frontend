import api from './http'

export const DashboardInfoAPI = {
  getCount: async () => {
    const { data } = await api.get('/dashboard-info/count')
    return data
  },
}