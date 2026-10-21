import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  return (
    <div className="bg-beige/70 text-xs text-ink/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <p className="truncate">
          Free shipping on all orders over $50 <span className="mx-1.5">•</span> Easy Returns
        </p>
        <div className="hidden items-center gap-5 sm:flex">
          <Link to="/shop" className="transition-colors duration-300 hover:text-ink">
            Help &amp; Support
          </Link>
          <Link to="/orders" className="transition-colors duration-300 hover:text-ink">
            Your Order
          </Link>
          {/* UI-only selectors: wire to real currency / i18n when needed */}
          <button className="flex items-center gap-1 transition-colors duration-300 hover:text-ink">
            USD <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-1 transition-colors duration-300 hover:text-ink">
            EN <ChevronDown size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
