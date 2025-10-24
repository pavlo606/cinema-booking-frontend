import { Link } from 'react-router'

const Header = () => {
  return (
    <div className="flex gap-2">
      <Link to="/">Home</Link>
      <Link to="/booking">Booking</Link>
    </div>
  )
}

export default Header
