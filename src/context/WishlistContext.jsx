import { createContext, useContext, useState } from 'react'

const KEY = 'shop_wishlist'
const WishlistContext = createContext(null)

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(load)

  const toggle = (id) =>
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* storage unavailable */
      }
      return next
    })

  return (
    <WishlistContext.Provider value={{ ids, count: ids.length, has: (id) => ids.includes(id), toggle }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
