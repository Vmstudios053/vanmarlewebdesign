import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'

const Scene3D = lazy(() => import('./Scene3D.jsx'))

gsap.registerPlugin(ScrollTrigger)

const ACTS = [
  {
    eyebrow: "Van Marle Webdesign · 3D-websites voor klusbedrijven en zzp'ers",
    title: ['Uw vakwerk verdient', 'een website die werkt.'],
    lead: 'Cinematische 3D-websites die indruk maken én klanten opleveren — met een online agenda waarin klanten direct een afspraak inplannen.',
    cta: true,
  },
  {
    eyebrow: 'Terwijl u op de bouwplaats staat',
    title: ['Uw website plant', 'de afspraken in.'],
    lead: 'Een live chatbot beantwoordt vragen, plant afspraken in uw agenda en stuurt automatisch een bevestiging en herinnering naar uw klant.',
  },
  {
    eyebrow: 'Gevonden worden waar het telt',
    title: ['SEO die daadwerkelijk', 'klanten oplevert.'],
    lead: 'Geen mooie praatjes maar meetbaar resultaat: bovenaan in Google op de zoekwoorden waarmee uw klant u zoekt.',
    cta: true,
  },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const actRefs = useRef([])
  const [videoFailed, setVideoFailed] = useState(false)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // Langzame filmische zoom op de video tijdens de reis door de hero.
          if (videoRef.current) {
            videoRef.current.style.transform = `scale(${1.02 + self.progress * 0.12})`
          }
          actRefs.current.forEach((el, i) => {
            if (!el) return
            const center = i / (ACTS.length - 1)
            const dist = Math.abs(self.progress - center) / 0.22
            const vis = Math.max(0, 1 - dist)
            el.style.opacity = vis
            el.style.transform = `translateY(${(1 - vis) * 34}px)`
            el.style.pointerEvents = vis > 0.5 ? 'auto' : 'none'
          })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const heroActs = (
    <div className="absolute inset-0 grid place-items-center px-6">
      {ACTS.map((act, i) => (
        <div
          key={i}
          ref={(el) => (actRefs.current[i] = el)}
          className="col-start-1 row-start-1 max-w-3xl text-center"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <p className="eyebrow mb-6">{act.eyebrow}</p>
          <h2 className="display text-5xl md:text-7xl mb-7">
            {act.title[0]}
            <br />
            <span className="text-gold-soft italic">{act.title[1]}</span>
          </h2>
          <p className="lead mx-auto max-w-xl text-lg [text-shadow:0_2px_18px_rgba(0,0,0,0.8)]">{act.lead}</p>
          {act.cta && (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="btn-gold">Plan een gesprek <span aria-hidden>→</span></a>
              <a href="#pakketten" className="btn-ghost">Bekijk de pakketten</a>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  // Reduced motion: statische poster met de eerste akte, geen video of pin.
  if (reduced) {
    const act = ACTS[0]
    return (
      <section id="top" data-chapter="HET IDEE" className="relative min-h-screen" aria-label="Introductie">
        <img src="hero-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/45 to-night" />
        <div className="relative grid min-h-screen place-items-center px-6 text-center">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">{act.eyebrow}</p>
            <h2 className="display text-5xl md:text-7xl mb-7">
              {act.title[0]}
              <br />
              <span className="text-gold-soft italic">{act.title[1]}</span>
            </h2>
            <p className="lead mx-auto max-w-xl text-lg">{act.lead}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="btn-gold">Plan een gesprek <span aria-hidden>→</span></a>
              <a href="#pakketten" className="btn-ghost">Bekijk de pakketten</a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="top" data-chapter="HET IDEE" className="relative h-[340vh]" aria-label="Introductie">
      <div className="sticky top-0 h-screen overflow-hidden bg-night">
        {videoFailed ? (
          <Suspense fallback={<img src="hero-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />}>
            <Scene3D />
          </Suspense>
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            src="hero.mp4"
            poster="hero-poster.jpg"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            aria-hidden
          />
        )}

        {/* Donkere gradient + vignet voor leesbaarheid van de tekst */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/55 via-night/25 to-night/80" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(4,6,11,0.82)_100%)]" aria-hidden />
        <div className="god-rays" aria-hidden />

        {heroActs}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-2" aria-hidden>
          <span className="text-[0.68rem] tracking-[0.3em] uppercase">Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
        </div>
      </div>
    </section>
  )
}
