import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import NavItem from '@/components/NavItem'
import { Menu, X, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import logo from "@/assets/cinema-logo.svg"
import SearchBar from '@/components/SearchBar'
import MobileMenu from '@/components/MobileMenu'

type HeaderProps = {}

export default function Header(_: HeaderProps) {
  const [openMobile, setOpenMobile] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-bg-dark/60 border-b border-surface/40"
        style={{ WebkitBackdropFilter: 'blur(6px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-1">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold shadow-sm">
                  <img src={logo} className='p-1' alt="" />
                </div>
                <span className="text-lg font-semibold text-text-primary">
                  CinemaBook
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                <NavItem to="/">Movies</NavItem>
                <NavItem to="/schedule">Schedule</NavItem>
                <NavItem to="/my-tickets">My Tickets</NavItem>
                <NavItem to="/about">About CinemaBooking</NavItem>
              </nav>
            </div>

            {/* Center: Search (desktop) */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-lg hidden lg:block">
                <SearchBar />
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              {/* User / Auth */}
              <div className="hidden relative lg:inline">
                {user ? (
                  <div className="flex items-center gap-2">
                    <button
                      id="fuck"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface transition"
                      aria-haspopup="menu"
                      aria-label="User menu"
                      onClick={() => setDropdownOpen((s) => !s)}
                    >
                      <User className="w-5 h-5 text-text-primary/90" />
                      <span className="hidden lg:inline text-sm text-text-primary">
                        {user.email}
                      </span>
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-lg ring-1 ring-black/20 overflow-hidden">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-dark/40"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-dark/40"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Admin Pannel
                          </Link>
                        )}
                        <button
                          onClick={async () => {
                            await logout()
                            navigate('/')
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-dark/40"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/auth/login" className="text-sm text-text-primary hover:text-primary">
                      Login
                    </Link>
                    <Link to="/auth/register" className="text-sm text-primary font-medium">
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-surface transition"
                onClick={() => setOpenMobile((s) => !s)}
                aria-label="Open menu"
                aria-expanded={openMobile}
              >
                {openMobile ? (
                  <X className="w-5 h-5 text-text-primary" />
                ) : (
                  <Menu className="w-5 h-5 text-text-primary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Push content down because header fixed */}
      <div className="h-16" />

      {/* Mobile Drawer */}
      {openMobile && (
        <MobileMenu onClose={() => setOpenMobile(false)} user={user} onLogout={logout} />
      )}
    </>
  )
}
