import { X } from "lucide-react";
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import logo from "@/assets/cinema-logo.svg"

const MobileMenu = ({
  onClose,
  user,
  onLogout,
}: {
  onClose: () => void
  user: { email: string; role?: string } | null
  onLogout: () => Promise<void>
}) => {
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="absolute right-0 top-0 w-80 h-full bg-bg-dark/95 backdrop-blur-md p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white">
              <img src={logo} className='p-1' alt="" />
            </div>
            <span className="text-text-primary font-semibold">CinemaBooking</span>
          </Link>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-surface">
            <X className="w-5 h-5 text-text-primary" />
          </button>
        </div>
        <div className="mb-2">
          <SearchBar />
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            onClick={onClose}
            to="/"
            className="px-3 py-2 rounded-md text-text-primary hover:bg-surface"
          >
            Movies
          </Link>
          <Link
            onClick={onClose}
            to="/schedule"
            className="px-3 py-2 rounded-md text-text-primary hover:bg-surface"
          >
            Schedule
          </Link>
          <Link
            onClick={onClose}
            to="/my-tickets"
            className="px-3 py-2 rounded-md text-text-primary hover:bg-surface"
          >
            My Tikets
          </Link>
          <Link
            onClick={onClose}
            to="/about"
            className="px-3 py-2 rounded-md text-text-primary hover:bg-surface"
          >
            About CinemaBooking
          </Link>
        </nav>

        <div className="mt-6 border-t border-surface/40 pt-4">
          {user ? (
            <>
              <div className="text-sm text-text-secondary mb-2">{user.email}</div>
              <Link
                onClick={onClose}
                to="/profile"
                className="block px-3 py-2 rounded-md text-text-primary hover:bg-surface"
              >
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link
                  onClick={onClose}
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-text-primary hover:bg-surface"
                >
                  Admin Pannel
                </Link>
              )}
              <button
                onClick={async () => {
                  await onLogout()
                  onClose()
                }}
                className="mt-3 w-full text-left px-3 py-2 rounded-md text-text-primary hover:bg-surface"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                onClick={onClose}
                to="/auth/login"
                className="block px-3 py-2 rounded-md text-text-primary hover:bg-surface"
              >
                Login
              </Link>
              <Link
                onClick={onClose}
                to="/auth/register"
                className="block px-3 py-2 rounded-md text-primary hover:bg-surface"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMenu