import useReveal from '../hooks/useReveal'

const PLANS = [
  {
    name: 'Web Start',
    price: '€250',
    period: 'per maand',
    tagline: 'Alles wat een zzp\'er nodig heeft om klanten binnen te halen.',
    features: [
      'Gratis 3D-website inbegrepen',
      'Live chatbot die vragen van bezoekers beantwoordt',
      'Chatbot plant afspraken direct in uw online agenda',
      'Automatische bevestiging én herinnering naar de klant',
      'Hosting, SSL-certificaat en onderhoud',
      'Eén vast aanspreekpunt',
    ],
    cta: 'Start met Web Start',
  },
  {
    name: 'Web Groei',
    price: '€500',
    period: 'per maand',
    tagline: 'Voor klusbedrijven die willen doorgroeien en meer willen laten zien.',
    popular: true,
    features: [
      'Alles uit Web Start',
      'Meer maatwerk in ontwerp en 3D',
      'Blogfunctie: deel projecten en vakkennis',
      'Tot 10 pagina\'s (diensten, projecten, regio\'s)',
      'Doorlopende doorontwikkeling van de site',
    ],
    cta: 'Kies Web Groei',
  },
  {
    name: 'Web Pro',
    price: 'Op aanvraag',
    period: '',
    tagline: 'Maximale vindbaarheid: uw website als beste verkoper.',
    features: [
      'Alles uit Web Groei',
      'Volledige SEO: zoekwoordenonderzoek en content',
      'Lokale vindbaarheid in uw werkgebied',
      'Maandelijkse rapportage: wat levert het op?',
      'Doorlopende optimalisatie op resultaat',
    ],
    cta: 'Vraag Web Pro aan',
  },
]

export default function Pricing() {
  const ref = useReveal()

  return (
    <section ref={ref} id="pakketten" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(91,141,255,0.07),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Drie pakketten</p>
          <h2 className="display text-4xl md:text-6xl mb-6">
            Geen grote investering vooraf.<br />
            <span className="text-gold-soft italic">Gewoon een vast bedrag per maand.</span>
          </h2>
          <p className="lead text-lg">
            De website krijgt u er gratis bij. U betaalt voor wat de site voor u dóét: afspraken inplannen, vragen beantwoorden en klanten opleveren. Maandelijks, transparant, zonder verrassingen.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 items-stretch">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              data-reveal
              className={`card relative flex flex-col p-8 ${
                plan.popular ? 'border-gold/50 shadow-[0_0_60px_rgba(217,180,90,0.12)] lg:-translate-y-3' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-4 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-night">
                  Meest gekozen
                </span>
              )}
              <h3 className="font-display text-2xl">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl text-gold-soft">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-2">{plan.period}</span>}
              </div>
              <p className="lead mt-4 text-[0.95rem]">{plan.tagline}</p>
              <ul className="mt-7 flex flex-col gap-3.5 text-[0.93rem]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-muted">
                    <span className="mt-0.5 text-gold" aria-hidden>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a href="#contact" className={plan.popular ? 'btn-gold w-full justify-center' : 'btn-ghost w-full justify-center'}>
                  {plan.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-10 text-center text-sm text-muted-2">
          Maandelijks opzegbaar na het eerste jaar · Geen opstartkosten · Binnen twee weken live
        </p>
      </div>
    </section>
  )
}
