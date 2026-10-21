import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as api from '../api'
import { errorMessage } from '../api/client'
import { ErrorBox } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { money, productImage } from '../utils'

// Item shape is flexible: { product: {...}, quantity } or flat fields.
const normalize = (i) => {
  const p = i.product ?? i
  return {
    key: i.id ?? i.product_id ?? p.id,
    name: p.name ?? i.name,
    price: Number(p.price ?? i.price ?? 0),
    quantity: i.quantity ?? 1,
    image: productImage(p),
  }
}

export default function Cart() {
  const { user } = useAuth()
  const { items, refresh } = useCart()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [placing, setPlacing] = useState(false)

  if (!user)
    return (
      <p className="py-16 text-center">
        <Link to="/login" className="text-brand-600 hover:underline">Login</Link> to view your cart.
      </p>
    )

  const rows = items.map(normalize)
  const total = rows.reduce((s, r) => s + r.price * r.quantity, 0)

  const placeOrder = async () => {
    setError('')
    setPlacing(true)
    try {
      const order = await api.checkout()
      await refresh()
      navigate('/orders', { state: { placed: order?.id ?? order?.order_id ?? true } })
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setPlacing(false)
    }
  }

  if (rows.length === 0)
    return (
      <div className="py-16 text-center text-slate-500">
        Your cart is empty. <Link to="/" className="text-brand-600 hover:underline">Browse products</Link>
      </div>
    )

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3">
            <img src={r.image} alt={r.name} className="h-20 w-20 rounded-lg bg-slate-100 object-cover" />
            <div className="flex-1">
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-slate-500">
                {money(r.price)} × {r.quantity}
              </p>
            </div>
            <p className="font-semibold">{money(r.price * r.quantity)}</p>
          </div>
        ))}
      </div>
      <aside className="h-fit space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold">Order summary</h2>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Total</span>
          <span className="text-lg font-semibold">{money(total)}</span>
        </div>
        <ErrorBox message={error} />
        <button className="btn-primary w-full" disabled={placing} onClick={placeOrder}>
          {placing ? 'Placing order…' : 'Checkout'}
        </button>
      </aside>
    </div>
  )
}
