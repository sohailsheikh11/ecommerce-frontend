import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../api'
import { errorMessage } from '../api/client'
import ProductCard from '../components/ProductCard'
import { ErrorBox, Spinner } from '../components/ui'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const query = params.get('q') ?? ''
  const sort = params.get('sort') ?? 'default'
  const categoryParam = params.get('category') ?? 'all'

  useEffect(() => {
    getProducts()
      .then((d) => setProducts(Array.isArray(d) ? d : d.items ?? d.products ?? []))
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  )

  // Case-insensitive match; ignore a category the backend doesn't have.
  const category = categories.find((c) => c.toLowerCase() === categoryParam.toLowerCase()) ?? 'all'

  const set = (key, value, empty) => {
    const next = new URLSearchParams(params)
    if (!value || value === empty) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const visible = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        p.name?.toLowerCase().includes(query.toLowerCase())
    )
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'new') list = [...list].sort((a, b) => (b.id > a.id ? 1 : -1))
    return list
  }, [products, query, category, sort])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Shop</h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="input sm:flex-1"
          placeholder="Search products…"
          value={query}
          onChange={(e) => set('q', e.target.value, '')}
        />
        <select className="input sm:w-48" value={category} onChange={(e) => set('category', e.target.value, 'all')}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select className="input sm:w-48" value={sort} onChange={(e) => set('sort', e.target.value, 'default')}>
          <option value="default">Sort: Featured</option>
          <option value="new">Newest</option>
          <option value="low">Price: Low to high</option>
          <option value="high">Price: High to low</option>
        </select>
      </div>

      <ErrorBox message={error} />
      {loading ? (
        <Spinner />
      ) : visible.length === 0 ? (
        <p className="py-16 text-center text-ink/50">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
