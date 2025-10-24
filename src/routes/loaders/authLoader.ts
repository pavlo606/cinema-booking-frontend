import { AuthAPI } from '@/api/auth.api'
import { redirect } from 'react-router'

export const authRequireLoader = async () => {
  try {
    await AuthAPI.refresh()

    const user = await AuthAPI.me()
    console.log(user)
    return { user }
  } catch {
    return redirect('/auth/login')
  }
}

export const redirectIfAuth = async () => {
  try {
    await AuthAPI.refresh()
    await AuthAPI.me()

    return redirect('/booking')
  } catch {
    return null
  }
}

export const AdminRequireLoader = async () => {
  try {
    await AuthAPI.refresh()

    const user = await AuthAPI.me()

    if (user?.role !== "Admin") return redirect('/auth/login')

    return { user }
  } catch {
    return redirect('/auth/login')
  }
}
