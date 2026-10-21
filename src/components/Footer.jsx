export default function Footer() {
  return (
    <footer className="mt-12 border-t border-sand/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-ink/50 sm:flex-row">
        <p className="text-sm font-extrabold text-ink">
          Shopio<span className="text-[#C2603E]">.</span>
        </p>
        <p>© {new Date().getFullYear()} Shopio. All rights reserved.</p>
      </div>
    </footer>
  )
}
