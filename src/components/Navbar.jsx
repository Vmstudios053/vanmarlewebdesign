import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#diensten', label: 'Diensten' },
  { href: '#pakketten', label: 'Pakketten' },
  { href: '#werk', label: 'Werk' },
  { href: '#proces', label: 'Proces' },
  { href: '#over', label: 'Over mij' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-night/80 backdrop-blur-md border-b border-line py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Van Marle Webdesign, naar boven">
          <img src="/logo.png" alt="Logo Van Marle Webdesign" width="34" height="34" className="rounded-full" />
          <span className="font-display text-lg leading-none">
            Van Marle
            <small className="block text-[0.62rem] uppercase tracking-[0.3em] text-gold font-body">Webdesign</small>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hoofdmenu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted hover:text-ivory transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold !py-2.5 !px-5 text-sm">Plan een gesprek</a>
        </nav>

        <button
          className="md:hidden text-sm uppercase tracking-[0.2em]"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Sluit' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-line bg-night/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5"
          aria-label="Mobiel menu"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-muted hover:text-ivory" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold w-fit" onClick={() => setOpen(false)}>Plan een gesprek</a>
        </nav>
      )}
    </header>
  )
}
