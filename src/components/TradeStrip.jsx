import useReveal from '../hooks/useReveal'

const BRANCHES = ['Klusbedrijven', 'Schilders', 'Bouwbedrijven', 'Timmerbedrijven', 'Stukadoors', 'Renovatie']

const TRUST = [
  'Reactie binnen één werkdag',
  'Vaste maandprijs, geen verrassingen',
  'Binnen twee weken live',
  'Eén vast aanspreekpunt',
]

// Doelgroep-strook: voor wie Van Marle bouwt, plus concrete zekerheden.
export default function TradeStrip() {
  const ref = useReveal()

  return (
    <section ref={ref} data-bg="#0b142e" className="relative py-16 md:py-20" aria-label="Voor wie ik bouw">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p data-reveal className="eyebrow mb-7">Gebouwd voor de bouw-, klus- en afbouwbranche</p>
        <div data-reveal className="flex flex-wrap items-center justify-center gap-3">
          {BRANCHES.map((b) => (
            <span
              key={b}
              className="rounded-full border border-amber/25 bg-night-3/50 px-5 py-2.5 text-[0.85rem] text-ivory/90 backdrop-blur-sm transition-colors hover:border-amber/60 hover:text-ivory"
            >
              {b}
            </span>
          ))}
        </div>
        <ul data-reveal className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.82rem] text-muted">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="text-amber" aria-hidden>✓</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
