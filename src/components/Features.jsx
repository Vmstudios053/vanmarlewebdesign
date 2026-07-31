import useReveal from '../hooks/useReveal'

const FEATURES = [
  {
    no: '01',
    tag: '3D & beweging',
    title: 'Een website die indruk maakt',
    text: "Uw klant vergelijkt drie klusbedrijven. Twee hebben een standaard template, één heeft een cinematische 3D-website die het vakwerk laat zien. Wie wordt er gebeld? Beweging en 3D worden ingezet met een doel: vertrouwen wekken en uw verhaal vertellen.",
  },
  {
    no: '02',
    tag: 'Online agenda & chatbot',
    title: 'Afspraken plannen zichzelf in',
    text: 'Een live chatbot beantwoordt vragen van bezoekers — ook om 22:00 uur — en plant afspraken direct in uw online agenda. De klant ontvangt automatisch een bevestiging én een herinnering. U mist geen aanvraag meer, ook niet vanaf de steiger.',
  },
  {
    no: '03',
    tag: 'SEO met resultaat',
    title: 'Gevonden worden door de juiste klant',
    text: "Mooi zijn is niet genoeg; uw website moet gevonden worden. Schone code, snelle laadtijden en teksten rond de zoekwoorden waarmee uw klant écht zoekt — 'badkamer renoveren Apeldoorn', niet 'totaaloplossingen'. SEO die daadwerkelijk klanten oplevert.",
  },
]

export default function Features() {
  const ref = useReveal()

  return (
    <section ref={ref} id="diensten" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow mb-5">Wat u krijgt</p>
          <h2 className="display text-4xl md:text-6xl mb-6">
            Gebouwd voor vakmensen<br />
            <span className="text-gold-soft italic">die geen tijd hebben voor gedoe.</span>
          </h2>
          <p className="lead text-lg">
            U bent goed in uw vak, ik in het mijne. Drie dingen maken het verschil tussen een website die geld kost en een website die geld oplevert.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.no} data-reveal className="card p-8 flex flex-col gap-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-gold/40">{f.no}</span>
                <span className="text-[0.68rem] uppercase tracking-[0.25em] text-blue">{f.tag}</span>
              </div>
              <h3 className="font-display text-2xl">{f.title}</h3>
              <p className="lead text-[0.95rem]">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
