import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Vaste achtergrondlaag die per sectie vloeiend van kleur verandert
// (donkerblauw → warmer nachtblauw → diep-indigo), zoals klimtwine.
export default function BackgroundDirector() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const triggers = gsap.utils.toArray('[data-bg]').map((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (!self.isActive || !ref.current) return
          gsap.to(ref.current, {
            backgroundColor: sec.dataset.bg,
            duration: reduced ? 0 : 1.5,
            ease: 'sine.inOut',
          })
        },
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [reduced])

  return <div ref={ref} className="fixed inset-0" style={{ backgroundColor: '#0a1128' }} aria-hidden />
}
