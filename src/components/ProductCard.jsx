import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Heart, ShoppingBag } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { money, productImage } from '../utils'
import SmartImage from './SmartImage'

export default function ProductCard({ product }) {
  const { user } = useAuth()
  const { addItem, busy } = useCart()
  const wishlist = useWishlist()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  const href = product.demo ? '/shop' : `/products/${product.id}`
  const discount = product.discount ?? product.discount_percent
  const badge = product.badge || (discount ? `-${discount}%` : null)
  const oldPrice = discount ? Number(product.price) / (1 - discount / 100) : null
  const liked = wishlist.has(product.id)

  const add = async () => {
    if (!product.demo && !user) return navigate('/login')
    try {
      await addItem(product.id, 1, product)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } catch {
      /* surfaced on product page */
    }
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl bg-beige shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-ink/10">
        <Link to={href} className="block aspect-[4/5]">
          <SmartImage
            src={productImage(product)}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${
              badge === 'Hot' ? 'bg-ink text-white' : 'bg-[#C2603E] text-white'
            }`}
          >
            {badge}
          </span>
        )}

        <button
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
          onClick={() => wishlist.toggle(product.id)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-all duration-300 hover:scale-110"
        >
          <Heart size={17} className={liked ? 'fill-[#C2603E] text-[#C2603E]' : 'text-ink'} />
        </button>

        <button
          onClick={add}
          disabled={busy}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-semibold text-white opacity-0 transition-all duration-300 hover:bg-black group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 disabled:opacity-60 max-lg:translate-y-0 max-lg:opacity-100"
        >
          {added ? <Check size={15} /> : <ShoppingBag size={15} />}
          {added ? 'Added' : 'Add to cart'}
        </button>
      </div>

      <div className="px-1 pt-3">
        <Link to={href} className="block truncate text-sm font-semibold transition-colors hover:text-ink/70">
          {product.name}
        </Link>
        {product.category && <p className="text-xs text-ink/50">{product.category}</p>}
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold">{money(product.price)}</span>
          {oldPrice && <span className="text-xs text-ink/40 line-through">{money(oldPrice)}</span>}
        </p>
      </div>
    </div>
  )
}
