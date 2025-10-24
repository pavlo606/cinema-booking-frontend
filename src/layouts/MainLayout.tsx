import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const MainLayout = () => (
  <>
    <Header />
    <main className="p-4">
      <Outlet />
    </main>
    <Footer />
  </>
)

export default MainLayout