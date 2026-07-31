import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useChapter, { CHAPTERS } from '../hooks/useChapter'

gsap.registerPlugin(ScrollTrigger)

const pretty = (c) => c.charAt(0) + c.slice(1).toLowerCase()

// Zwevende pill onderin het midden (zoals klimt's 'Our Wines') plus een
// subtiele voortgangsrail rechts.
export default function ChapterHUD() {
  const chapter = useChapter()
  const [atTop, setAtTop] = useState(true)
  const fillRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (fillRef.current) fillRef.current.style.height = `${self.progress * 100}%`
      },
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      progress.kill()
    }
  }, [])

  const goNext = () => {
    const sections = Array.from(document.querySelectorAll('[data-chapter]'))
    const i = sections.findIndex((s) => s.dataset.chapter === chapter)
    const next = sections[i + 1] || document.querySelector('#contact')
    next?.scrollIntoView({ behavior: 'smooth' })
  }

  const label = atTop ? 'Ontdek de reis' : pretty(chapter)
  const index = CHAPTERS.indexOf(chapter)

  return (
    <>
      <button
        onClick={goNext}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 flex items-center gap-3 rounded-full border border-amber/25 bg-night/55 px-6 py-3 backdrop-blur-md transition-colors hover:border-amber/60 cursor-pointer"
        aria-label={`Huidig hoofdstuk: ${pretty(chapter)}. Naar het volgende hoofdstuk.`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
        </span>
        <span key={label} className="text-[0.72rem] tracking-[0.3em] uppercase text-ivory/90" style={{ animation: 'pillIn 0.5s ease both' }}>
          {label}
        </span>
        <span className="text-amber/80" aria-hidden>↓</span>
        <style>{`@keyframes pillIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </button>

      <div className="pointer-events-none fixed bottom-7 right-6 md:right-8 z-40 hidden md:flex flex-col items-center gap-2" aria-hidden>
        <span className="text-[0.6rem] tracking-[0.25em] text-muted-2 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="h-24 w-px overflow-hidden bg-white/12">
          <div ref={fillRef} className="w-full bg-gradient-to-b from-amber to-ember" style={{ height: '0%' }} />
        </div>
        <span className="text-[0.6rem] tracking-[0.25em] text-muted-2 tabular-nums">
          {String(CHAPTERS.length).padStart(2, '0')}
        </span>
      </div>
    </>
  )
}
