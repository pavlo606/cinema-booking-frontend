import { Outlet, useLoaderData } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '@/context/AuthContext'
import type { User } from '@/types/user'
import { useEffect } from 'react'

const MainLayout = () => {
  const loaderData = useLoaderData() as { user: User };
  if (loaderData) {
        const { user: loadedUser } = loaderData;

        const { setUser } = useAuth();

        useEffect(() => {
            setUser(loadedUser);
        }, [loadedUser]);
    }

  return (
    <>
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
