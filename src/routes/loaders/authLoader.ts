import { redirect } from 'react-router'

export const authRequireLoader = async () => {
  try {
    // await AuthService.refresh()

    // const user = await UserService.getMe();

    // return { user };
    return redirect('/auth/login')
    return {  }
  } catch {}
}

export const redirectIfAuth = async () => {
  try {
    // await AuthService.refresh()
    // await UserService.getMe();

    return null
    return redirect('/dashboard')
  } catch {}
}

export const AdminRequireLoader = async () => {
  try {
    // await AuthService.refresh()

    // const user = await UserService.getMe();

    // return { user };
    return redirect('/auth/login')
    return { }
  } catch {}
}
