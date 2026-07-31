import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const CHAPTERS = ['HET IDEE', 'HET ONTWERP', 'DE BOUW', 'DE AGENDA', 'SEO', 'LIVE']

// Vaste reis-HUD: hoofdstuk-label linksonder, voortgang rechtsonder.
export default function ChapterHUD() {
  const [chapter, setChapter] = useState(CHAPTERS[0])
  const fillRef = useRef(null)
  const pctRef = useRef(null)

  useEffect(() => {
    const triggers = gsap.utils.toArray('[data-chapter]').map((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) setChapter(sec.dataset.chapter)
        },
      })
    )
    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (fillRef.current) fillRef.current.style.height = `${self.progress * 100}%`
        if (pctRef.current) pctRef.current.textContent = `${Math.round(self.progress * 100)}%`
      },
    })
    return () => {
      triggers.forEach((t) => t.kill())
      progress.kill()
    }
  }, [])

  const index = CHAPTERS.indexOf(chapter)

  return (
    <>
      <div className="pointer-events-none fixed bottom-7 left-6 md:left-8 z-40 hidden sm:block" aria-hidden>
        <div className="rounded-full bg-night/45 px-4 py-2 backdrop-blur-sm border border-white/5">
          <div className="flex items-baseline gap-3">
            <span className="text-[0.62rem] tracking-[0.3em] text-gold tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
            </span>
            <span
              key={chapter}
              className="text-[0.7rem] tracking-[0.35em] text-ivory/90"
              style={{ animation: 'chapterIn 0.6s ease both' }}
            >
              {chapter}
            </span>
          </div>
        </div>
        <style>{`@keyframes chapterIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>

      <div className="pointer-events-none fixed bottom-7 right-6 md:right-8 z-40 hidden sm:flex flex-col items-center gap-2" aria-hidden>
        <div className="h-24 w-px overflow-hidden bg-white/12">
          <div ref={fillRef} className="w-full bg-gradient-to-b from-gold to-gold-soft" style={{ height: '0%' }} />
        </div>
        <span ref={pctRef} className="text-[0.6rem] tracking-[0.2em] text-muted-2 tabular-nums">0%</span>
      </div>
    </>
  )
}
