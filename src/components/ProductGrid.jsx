import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getProducts } from '../api'
import { trending as demoProducts } from '../data/demo'
import ProductCard from './ProductCard'

// Shows the first 5 products from the API; falls back to demo data if the
// backend is unreachable or empty so the landing page never looks blank.
export default function ProductGrid() {
  const [products, setProducts] = useState(demoProducts)

  useEffect(() => {
    getProducts()
      .then((d) => {
        const list = Array.isArray(d) ? d : d.items ?? d.products ?? []
        if (list.length) setProducts(list.slice(0, 5))
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Trending Products</h2>
        <Link
          to="/shop"
          className="group flex items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors duration-300 hover:text-ink"
        >
          View All
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
