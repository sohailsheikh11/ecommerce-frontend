import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as api from '../api'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

// Backend cart shape is unknown; accept { items: [...] } or a bare array.
export const cartItems = (cart) => (Array.isArray(cart) ? cart : cart?.items ?? [])

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState(null)
  const [busy, setBusy] = useState(false)
  // Demo (placeholder) products only bump the badge; they are not sent to the API.
  const [demoCount, setDemoCount] = useState(0)

  const refresh = useCallback(async () => {
    if (!user) return setCart(null)
    try {
      setCart(await api.getCart())
    } catch {
      setCart(null)
    }
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addItem = async (productId, quantity = 1, product) => {
    if (product?.demo) {
      setDemoCount((c) => c + quantity)
      return
    }
    setBusy(true)
    try {
      await api.addCartItem(productId, quantity)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  const items = cartItems(cart)
  const count = items.reduce((n, i) => n + (i.quantity ?? 1), 0) + demoCount

  return (
    <CartContext.Provider value={{ cart, items, count, busy, addItem, refresh }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
