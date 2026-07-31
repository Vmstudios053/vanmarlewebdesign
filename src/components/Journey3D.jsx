import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { heroState } from '../scrollState'
import useReducedMotion from '../hooks/useReducedMotion'

const Scene3D = lazy(() => import('./Scene3D.jsx'))

gsap.registerPlugin(ScrollTrigger)

// De klim: scroll-gestuurde camera door de 3D-scene, met als top
// de afgebouwde 3D-website van een klusbedrijf die langzaam in beeld draait.
export default function Journey3D() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const climaxRef = useRef(null)
  const [inView, setInView] = useState(false)
  const reduced = useReducedMotion()

  // Lazy: mount de canvas pas als de sectie in de buurt van het beeld komt.
  useEffect(() => {
    if (reduced) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [reduced])

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          heroState.progress = self.progress
          if (introRef.current) {
            const v = Math.max(0, 1 - self.progress * 3.2)
            introRef.current.style.opacity = v
            introRef.current.style.transform = `translateY(${(1 - v) * -20}px)`
          }
          if (climaxRef.current) {
            const v = Math.min(1, Math.max(0, (self.progress - 0.78) * 5))
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
      <section data-chapter="DE BOUW" className="relative" aria-label="De bouw in 3D">
        <img src="scene-poster.jpg" alt="3D-scene van een huis dat wordt opgebouwd" className="w-full object-cover max-h-[80vh]" />
        <p className="mx-auto max-w-2xl px-6 py-10 text-center lead">
          Zo bouw ik uw website: als een huis, laag voor laag. Het resultaat is een 3D-website die uw vakwerk laat zien.
        </p>
      </section>
    )
  }

  return (
    <section ref={sectionRef} data-chapter="DE BOUW" className="relative h-[320vh]" aria-label="De bouw in 3D">
      <div className="sticky top-0 h-screen overflow-hidden bg-night">
        {inView && (
          <Suspense fallback={<img src="scene-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />}>
            <Scene3D />
          </Suspense>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,6,11,0.85)_100%)]" aria-hidden />
        <div className="god-rays" aria-hidden />

        <div ref={introRef} className="absolute inset-x-0 top-[16vh] px-6 text-center">
          <p className="eyebrow mb-5">Hoofdstuk · de bouw</p>
          <h2 className="display text-4xl md:text-6xl">
            Scroll — en zie uw website<br />
            <span className="text-gold-soft italic">gebouwd worden.</span>
          </h2>
        </div>

        <div ref={climaxRef} className="absolute inset-x-0 bottom-[14vh] px-6 text-center" style={{ opacity: 0 }}>
          <p className="mx-auto max-w-xl rounded-full bg-night/55 px-6 py-3 backdrop-blur-sm text-sm text-ivory/90 border border-white/5 w-fit">
            De top: een 3D-website voor een klusbedrijf — precies wat u op deze pagina beleeft, maar dan voor úw bedrijf.
          </p>
        </div>
      </div>
    </section>
  )
}
