import { Link } from 'react-router-dom'
import { categories } from '../data/demo'
import SmartImage from './SmartImage'

export default function CategoryList() {
  return (
    <section id="categories" className="scroll-mt-24 py-12 sm:py-16">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/shop?category=${encodeURIComponent(c.name)}`}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <span className="block aspect-square w-full max-w-[7.5rem] overflow-hidden rounded-full border-4 border-white bg-beige shadow-md shadow-ink/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <SmartImage
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </span>
            <span>
              <span className="block text-sm font-semibold">{c.name}</span>
              <span className="block text-xs text-ink/50">{c.count} Items</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
