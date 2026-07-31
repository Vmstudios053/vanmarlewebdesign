import useReveal from '../hooks/useReveal'

const STEPS = [
  {
    when: 'Dag 1 · gratis',
    title: 'Kennismaking',
    text: 'Een open gesprek van een half uur. Ik luister naar uw doel, uw klant en wat u nu mist. U krijgt direct advies — ook als we niet samenwerken.',
  },
  {
    when: 'Dag 2 – 4',
    title: 'Ontwerp & richting',
    text: 'Ik teken de structuur, de sfeer en de teksten. U ziet en keurt het ontwerp goed voordat er één regel code wordt geschreven.',
  },
  {
    when: 'Week 1 – 2',
    title: 'Bouw, 3D & agenda',
    text: 'Met de hand gebouwd: snel, veilig en vindbaar. De chatbot en agenda-module worden ingericht op uw diensten en uw beschikbaarheid.',
  },
  {
    when: 'Binnen 2 weken live',
    title: 'Livegang & groei',
    text: 'De site gaat live op uw eigen domein, met SSL, sitemap en SEO in orde. Daarna blijf ik maandelijks bouwen aan uw vindbaarheid en resultaat.',
  },
]

export default function Process() {
  const ref = useReveal()

  return (
    <section ref={ref} id="proces" data-bg="#0b0e28" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow mb-5">Het proces</p>
          <h2 className="display text-4xl md:text-6xl mb-6">
            Van eerste afspraak<br />
            <span className="text-gold-soft italic">tot live in twee weken.</span>
          </h2>
          <p className="lead text-lg">
            Geen langdurige trajecten en geen onduidelijke facturen. Vier stappen, een vaste planning en helder wat er van u verwacht wordt.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} data-reveal className="card relative overflow-hidden p-8">
              <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] leading-none text-gold/8 select-none" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[0.68rem] uppercase tracking-[0.25em] text-blue">{step.when}</p>
              <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
              <p className="lead mt-3 text-[0.93rem]">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
