import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { promos } from '../data/demo'
import SmartImage from './SmartImage'

export default function PromoBanners() {
  return (
    <section id="deals" className="grid scroll-mt-24 gap-5 md:grid-cols-2">
      {promos.map((p) => (
        <article
          key={p.tag}
          className={`group relative flex min-h-[18rem] overflow-hidden rounded-3xl ${p.tone} transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10`}
        >
          <SmartImage
            src={p.image}
            alt=""
            className="absolute inset-y-0 right-0 h-full w-3/5 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-y-0 right-0 w-3/5 bg-gradient-to-r from-[var(--tone)] to-transparent" style={{ '--tone': p.tone.slice(4, -1) }} />
          <div className="relative z-10 flex max-w-[60%] flex-col items-start justify-center gap-3 p-7 sm:p-9">
            <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink/70">
              {p.tag}
            </span>
            <h3 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{p.title}</h3>
            <p className="text-sm text-ink/60">{p.sub}</p>
            <Link to={p.to} className="btn-primary mt-2 !px-5 !py-2.5">
              {p.cta}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
