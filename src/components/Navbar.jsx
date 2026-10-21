import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  const link = ({ isActive }) =>
    `text-sm font-medium ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-brand-600">
          Shop
        </Link>
        <nav className="flex items-center gap-5">
          <NavLink to="/" end className={link}>
            Products
          </NavLink>
          {user && (
            <NavLink to="/orders" className={link}>
              Orders
            </NavLink>
          )}
          <NavLink to="/cart" className={link}>
            Cart{count > 0 && (
              <span className="ml-1 rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">
                {count}
              </span>
            )}
          </NavLink>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-500 sm:inline">
                {user.name || user.full_name || user.email}
              </span>
              <button
                className="btn-ghost"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
