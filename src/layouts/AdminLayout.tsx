import Sidebar from '@/components/admin/Sidebar'
import ScrollToTop from '@/utils/ScrollToTop'
import { Outlet, useLoaderData } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import type { User } from '@/dto/user.dto'

const AdminLayout = () => {
  const loaderData = useLoaderData() as { user: User }
  if (loaderData) {
    const { user: loadedUser } = loaderData

    const { setUser } = useAuth()

    useEffect(() => {
      setUser(loadedUser)
    }, [loadedUser])
  }

  return (
    <div className="flex min-h-screen bg-bg-dark text-text-primary">
      <ScrollToTop />
      <Sidebar />
      <main className="flex-1 p-6 bg-surface rounded-tl-2xl overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
