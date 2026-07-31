import useReveal from '../hooks/useReveal'

const VALUES = [
  {
    title: 'Eerlijk werk',
    text: 'Vaste prijzen, geen verrassingen achteraf en geen functies die u niet nodig hebt. Als iets goedkoper of eenvoudiger kan, zeg ik dat.',
    verse: '"Alwat gij doet, doet dat van harte, als voor den Heere." — Kolossenzen 3 : 23',
  },
  {
    title: 'Betrouwbaar',
    text: 'Afspraken staan. U weet wanneer u iets van mij hoort, wat er opgeleverd wordt en wanneer de site live gaat.',
    verse: '"Bevel den HEERE uw werken, en uw gedachten zullen bevestigd worden." — Spreuken 16 : 3',
  },
  {
    title: 'Dienstbaar',
    text: 'Uw succes is de opdracht. Ik denk mee over uw klant, uw aanbod en uw groei — ook na de oplevering.',
    verse: '"Laat ons niet liefhebben met den woorde, maar met de daad en waarheid." — 1 Johannes 3 : 18',
  },
]

export default function About() {
  const ref = useReveal()

  return (
    <section ref={ref} id="over" data-bg="#0a1128" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div data-reveal className="flex flex-col gap-6">
            <p className="eyebrow">Wie het bouwt</p>
            <h2 className="display text-4xl md:text-6xl">
              Vakmanschap met<br />
              <span className="text-gold-soft italic">een fundament.</span>
            </h2>
            <p className="lead text-lg">
              Ik ben Sven van Marle. Ik bouw websites voor vakmensen die serieus genomen willen worden: klusbedrijven, zzp'ers en jonge merken. Geen verkooppraatjes, wel eerlijk advies over wat u nodig hebt — en wat niet.
            </p>
            <p className="lead text-lg">
              Mijn werk rust op twee dingen: technisch vakmanschap en een christelijke werkethiek. Dat betekent afspraken nakomen, transparant zijn over prijs en planning, en uw belang boven mijn omzet stellen.
            </p>
          </div>
          <figure data-reveal className="card overflow-hidden">
            <img
              src="founder-office.jpg"
              alt="Sven van Marle werkt aan een website in zijn studio"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="px-6 py-4 text-sm text-muted-2">Sven van Marle · oprichter & bouwer</figcaption>
          </figure>
        </div>

        <div data-reveal className="mx-auto mt-28 max-w-3xl text-center">
          <p className="eyebrow mb-6">Het fundament</p>
          <blockquote className="font-display text-3xl md:text-4xl italic leading-snug text-ivory">
            "Zo de HEERE het huis niet bouwt, tevergeefs arbeiden zijn bouwlieden daaraan."
          </blockquote>
          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-gold">Psalm 127 : 1 · Statenvertaling</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} data-reveal className="card flex flex-col gap-4 p-8">
              <h3 className="font-display text-2xl">{v.title}</h3>
              <p className="lead text-[0.93rem]">{v.text}</p>
              <em className="mt-auto pt-3 text-[0.82rem] text-gold/70 not-italic font-display italic">{v.verse}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
