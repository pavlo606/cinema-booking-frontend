import { NavLink } from 'react-router'
import logo from '@/assets/cinema-logo.svg'
import { Film, Grid3x3, Home, Tags, CalendarClock } from 'lucide-react'

const links = [
  { to: '/admin', label: 'Dashboard', icon: <Home size={18} />, exact: true },
  { to: '/admin/films', label: 'Films', icon: <Film size={18} /> },
  { to: '/admin/film-categories', label: 'Film Categories', icon: <Tags size={18} /> },
  { to: '/admin/halls', label: 'Halls', icon: <Grid3x3 size={18} /> },
  { to: '/admin/screenings', label: 'Screenings', icon: <CalendarClock size={18} /> },
]

const Sidebar = () => {
  return (
    <aside className="w-64 bg-bg-dark text-white flex flex-col p-4 space-y-3 min-h-screen sticky top-0 h-fit">
      <div className='flex items-center gap-2 mb-6'>
        <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white">
          <img src={logo} className="p-1" alt="" />
        </div>
        <h2 className="text-2xl font-bold mb-0">Admin Panel</h2>
      </div>
      {links.map(({ to, label, icon, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
             ${isActive ? 'bg-accent text-black' : 'hover:bg-accent/50'}`
          }
        >
          {icon}
          <span>{label}</span>
        </NavLink>
      ))}
      <div className='grow'></div>
      <div>
        <NavLink to="/">To main page</NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
