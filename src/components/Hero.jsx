import { Link } from 'react-router-dom'
import { RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import { heroImage } from '../data/demo'
import SmartImage from './SmartImage'

const perks = [
  { icon: Truck, title: 'Free Shipping', text: 'On all orders over $50' },
  { icon: RefreshCw, title: 'Easy Returns', text: '30 days return policy' },
  { icon: ShieldCheck, title: 'Secure Payment', text: '100% secure checkout' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-beige">
      <div className="grid lg:grid-cols-2">
        <div className="relative z-10 flex flex-col items-start justify-center gap-6 px-6 pb-10 pt-10 sm:px-12 lg:min-h-[34rem] lg:pb-40 lg:pt-12">
          <span className="rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink/70 shadow-sm">
            New Collection 2024
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Elevate Your
            <br />
            Everyday Style
          </h1>
          <p className="max-w-md text-base leading-relaxed text-ink/65">
            Discover premium quality products crafted for comfort, style and performance.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">
              Shop Now
            </Link>
            <Link to="/shop?sort=new" className="btn-ghost">
              View Collection
            </Link>
          </div>
        </div>

        <div className="relative h-72 sm:h-96 lg:h-auto">
          <SmartImage
            src={heroImage}
            alt="Models in neutral tones next to minimalist furniture"
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-beige to-transparent lg:block" />
        </div>
      </div>

      {/* Value proposition strip */}
      <div className="relative z-10 p-4 pt-0 lg:absolute lg:inset-x-8 lg:bottom-8 lg:p-0">
        <ul className="grid divide-y divide-sand/60 rounded-2xl bg-white/95 p-2 shadow-xl shadow-ink/10 backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 px-4 py-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-ink">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-ink/55">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
