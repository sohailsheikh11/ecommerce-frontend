import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api'
import { errorMessage } from '../api/client'
import ProductCard from '../components/ProductCard'
import { ErrorBox, Spinner } from '../components/ui'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    getProducts()
      .then((d) => setProducts(Array.isArray(d) ? d : d.items ?? d.products ?? []))
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  )

  const visible = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        p.name?.toLowerCase().includes(query.toLowerCase())
    )
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [products, query, category, sort])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="input sm:flex-1"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="input sm:w-44" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All categories' : c}
            </option>
          ))}
        </select>
        <select className="input sm:w-44" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to high</option>
          <option value="high">Price: High to low</option>
        </select>
      </div>

      <ErrorBox message={error} />
      {loading ? (
        <Spinner />
      ) : visible.length === 0 ? (
        <p className="py-16 text-center text-slate-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
