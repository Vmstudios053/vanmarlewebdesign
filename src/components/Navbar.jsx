import { useEffect, useState } from 'react'
import useChapter from '../hooks/useChapter'
import Emblem from './Emblem.jsx'

const LINKS = [
  { href: '#diensten', label: 'Diensten' },
  { href: '#pakketten', label: 'Pakketten' },
  { href: '#werk', label: 'Werk' },
  { href: '#over', label: 'Over mij' },
]

const pretty = (c) => c.charAt(0) + c.slice(1).toLowerCase()

// Minimale vaste nav: merk + links, rechts context van de huidige sectie.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const chapter = useChapter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-night/70 backdrop-blur-md border-b border-white/5 py-3' : 'py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Van Marle Webdesign, naar boven">
            <Emblem size={40} />
            <span className="font-display text-lg leading-none tracking-wide">
              Van Marle
              <small className="block text-[0.6rem] uppercase tracking-[0.32em] text-amber font-body">Webdesign</small>
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hoofdmenu">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.82rem] text-muted hover:text-ivory transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <span key={chapter} className="text-[0.62rem] uppercase tracking-[0.32em] text-amber/80" style={{ animation: 'navCtx 0.5s ease both' }} aria-hidden>
            {pretty(chapter)}
          </span>
          <a href="#contact" className="text-[0.82rem] text-ivory hover:text-amber transition-colors">
            Plan een gesprek <span aria-hidden>→</span>
          </a>
        </div>

        <button
          className="md:hidden text-sm uppercase tracking-[0.2em]"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Sluit' : 'Menu'}
        </button>
      </div>
      <style>{`@keyframes navCtx{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-white/5 bg-night/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5"
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
