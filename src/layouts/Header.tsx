import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router'

const Header = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login")
  }

  return (
    <div className="flex gap-2">
      <Link to="/">Home</Link>
      <Link to="/booking">Booking</Link>
      <button onClick={handleLogout} className="mt-4 bg-primary text-white py-2 rounded-lg font-medium hover:text-white hover:bg-red-700 transition-colors">
        Login
      </button>
    </div>
  )
}

export default Header
