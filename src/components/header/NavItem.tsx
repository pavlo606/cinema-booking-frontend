import clsx from "clsx";
import { NavLink } from "react-router";

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'px-3 py-2 rounded-md text-sm font-medium',
        isActive ? 'text-primary underline-offset-4' : 'text-text-primary/90 hover:text-primary'
      )
    }
  >
    {children}
  </NavLink>
)

export default NavItem