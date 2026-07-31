import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3D from './Scene3D.jsx'
import { heroState } from '../scrollState'

gsap.registerPlugin(ScrollTrigger)

const ACTS = [
  {
    eyebrow: "Van Marle Webdesign · 3D-websites voor klusbedrijven en zzp'ers",
    title: ['Uw vakwerk verdient', 'een website die werkt.'],
    lead: "Cinematische 3D-websites die indruk maken én klanten opleveren — met een online agenda waarin klanten direct een afspraak inplannen.",
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
  const actRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          heroState.progress = self.progress

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
  }, [])

  return (
    <section ref={sectionRef} id="top" className="relative h-[340vh]" aria-label="Introductie">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Scene3D />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,6,11,0.85)_100%)]" />

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
              <p className="lead mx-auto max-w-xl text-lg">{act.lead}</p>
              {act.cta && (
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <a href="#pakketten" className="btn-gold">Bekijk de pakketten <span aria-hidden>→</span></a>
                  <a href="#contact" className="btn-ghost">Plan een gesprek</a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-2" aria-hidden>
          <span className="text-[0.68rem] tracking-[0.3em] uppercase">Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
        </div>

        <div className="absolute bottom-8 left-8 hidden md:block text-[0.68rem] tracking-[0.25em] uppercase text-muted-2" aria-hidden>
          Van Marle Webdesign · Nederland
        </div>
        <div className="absolute bottom-8 right-8 hidden md:block text-[0.68rem] tracking-[0.25em] uppercase text-muted-2" aria-hidden>
          3D · Agenda · SEO
        </div>
      </div>
    </section>
  )
}
