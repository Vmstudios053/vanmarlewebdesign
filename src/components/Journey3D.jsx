import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { director } from '../scrollState'
import GhostTitle from './GhostTitle.jsx'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// DE BOUW: gepind hoofdstuk waarin het centrale object zich opbouwt.
// De tekst reist mee; het huis draait als climax volledig in beeld.
export default function Journey3D() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const climaxRef = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          director.bouwProgress = self.progress
          if (introRef.current) {
            const v = Math.max(0, 1 - self.progress * 3.2)
            introRef.current.style.opacity = v
            introRef.current.style.transform = `translateY(${(1 - v) * -20}px)`
          }
          if (climaxRef.current) {
            const v = Math.min(1, Math.max(0, (self.progress - 0.72) * 4.5))
            climaxRef.current.style.opacity = v
            climaxRef.current.style.transform = `translateY(${(1 - v) * 26}px)`
          }
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  if (reduced) {
    return (
      <section data-chapter="DE BOUW" data-bg="#16213f" className="relative py-24">
        <span className="section-no" aria-hidden>03</span>
        <img src="scene-poster.jpg" alt="3D-scene van een huis dat wordt opgebouwd" className="mx-auto max-h-[70vh] w-full max-w-5xl object-cover" />
        <p className="mx-auto max-w-2xl px-6 py-10 text-center lead">
          Zo bouw ik uw website: als een huis, laag voor laag. Het resultaat is een 3D-website die uw vakwerk laat zien.
        </p>
      </section>
    )
  }

  return (
    <section ref={sectionRef} data-chapter="DE BOUW" data-bg="#16213f" className="relative h-[280vh]" aria-label="De bouw in 3D">
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        <span className="section-no" aria-hidden>03</span>

        <div ref={introRef} className="relative mt-[16vh] px-6 text-center">
          <p className="eyebrow mb-5">Hoofdstuk · de bouw</p>
          <GhostTitle echo="De bouw" className="text-4xl md:text-6xl">
            Scroll — en zie uw website<br />
            <span className="text-gold-soft italic">gebouwd worden.</span>
          </GhostTitle>
        </div>

        <div ref={climaxRef} className="absolute bottom-[13vh] px-6 text-center" style={{ opacity: 0 }}>
          <p className="mx-auto w-fit max-w-xl rounded-full border border-amber/20 bg-night/55 px-6 py-3 text-sm text-ivory/90 backdrop-blur-md">
            De top: een 3D-website voor een klusbedrijf — precies wat u hier beleeft, maar dan voor úw bedrijf.
          </p>
        </div>
      </div>
    </section>
  )
}
