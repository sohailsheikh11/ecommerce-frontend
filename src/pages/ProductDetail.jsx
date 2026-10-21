import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct } from '../api'
import { errorMessage } from '../api/client'
import { ErrorBox, Spinner } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { money, productImage } from '../utils'

export default function ProductDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { addItem, busy } = useCart()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch((e) => setError(errorMessage(e)))
  }, [id])

  const add = async () => {
    if (!user) return navigate('/login')
    try {
      await addItem(product.id, qty)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (e) {
      setError(errorMessage(e))
    }
  }

  if (error && !product) return <ErrorBox message={error} />
  if (!product) return <Spinner />

  const outOfStock = product.stock !== undefined && product.stock <= 0

  return (
    <div>
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to products
      </Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <img
          src={productImage(product)}
          alt={product.name}
          className="w-full rounded-xl bg-slate-100 object-cover"
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-3xl font-semibold text-brand-600">{money(product.price)}</p>
          <p className="text-slate-600">{product.description}</p>
          {product.stock !== undefined && (
            <p className={`text-sm ${outOfStock ? 'text-red-600' : 'text-green-600'}`}>
              {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
            </p>
          )}
          <ErrorBox message={error} />
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max={product.stock || undefined}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="input w-20"
            />
            <button className="btn-primary" disabled={busy || outOfStock} onClick={add}>
              {added ? 'Added ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
