import api from './http'

export const UserAPI = {
  getMe: async () => {
    const { data } = await api.get('/user/me')
    return data
  },

  update: async (username: string) => {
    const { data } = await api.patch(`/user`, { username })
    return data
  },
}
