import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/#categories' },
  { label: 'Deals', to: '/#deals' },
  { label: 'New Arrivals', to: '/shop?sort=new' },
]

const iconBtn =
  'relative grid h-10 w-10 place-items-center rounded-full text-ink/80 transition-all duration-300 hover:bg-beige hover:text-ink'

export default function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const wishlist = useWishlist()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const isActive = (to) => !/[#?]/.test(to) && pathname === to

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setMobileOpen(false)
  }

  const pages = [
    { label: 'Cart', to: '/cart' },
    { label: 'Your Orders', to: '/orders' },
    ...(user
      ? []
      : [
          { label: 'Login', to: '/login' },
          { label: 'Register', to: '/register' },
        ]),
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-sand/50 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Shopio<span className="text-[#C2603E]">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`relative text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-ink after:transition-all after:duration-300 hover:text-ink ${
                isActive(l.to) ? 'text-ink after:w-full' : 'text-ink/60 after:w-0 hover:after:w-full'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setPagesOpen(true)}
            onMouseLeave={() => setPagesOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-ink/60 transition-colors duration-300 hover:text-ink"
              aria-expanded={pagesOpen}
              onClick={() => setPagesOpen((o) => !o)}
            >
              Pages
              <ChevronDown size={14} className={`transition-transform duration-300 ${pagesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`absolute left-1/2 top-full w-44 -translate-x-1/2 pt-3 transition-all duration-300 ${
                pagesOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-sand/60 bg-white p-1.5 shadow-xl shadow-ink/5">
                {pages.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    onClick={() => setPagesOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm text-ink/80 transition-colors hover:bg-cream hover:text-ink"
                  >
                    {p.label}
                  </Link>
                ))}
                {user && (
                  <button
                    onClick={() => {
                      logout()
                      setPagesOpen(false)
                      navigate('/')
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm text-ink/80 transition-colors hover:bg-cream hover:text-ink"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {searchOpen ? (
            <form onSubmit={submitSearch} className="flex items-center">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search products…"
                className="h-10 w-36 rounded-full border border-sand bg-white px-4 text-sm outline-none transition-all duration-300 focus:border-ink sm:w-56"
              />
            </form>
          ) : (
            <button aria-label="Search" className={iconBtn} onClick={() => setSearchOpen(true)}>
              <Search size={19} />
            </button>
          )}
          <button
            aria-label="Account"
            className={`${iconBtn} hidden sm:grid`}
            onClick={() => navigate(user ? '/orders' : '/login')}
          >
            <User size={19} />
          </button>
          <button aria-label="Wishlist" className={`${iconBtn} hidden sm:grid`}>
            <Heart size={19} />
            {wishlist.count > 0 && <Badge>{wishlist.count}</Badge>}
          </button>
          <Link aria-label="Cart" to="/cart" className={iconBtn}>
            <ShoppingBag size={19} />
            <Badge>{count}</Badge>
          </Link>
          <button
            aria-label="Menu"
            className={`${iconBtn} lg:hidden`}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-sand/50 bg-cream transition-all duration-300 lg:hidden ${
          mobileOpen ? 'max-h-[28rem]' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
          {[...links, ...pages].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-beige/60"
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={() => {
                logout()
                setMobileOpen(false)
                navigate('/')
              }}
              className="rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink/80 hover:bg-beige/60"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

function Badge({ children }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ink px-1 text-[10px] font-semibold text-white">
      {children}
    </span>
  )
}
