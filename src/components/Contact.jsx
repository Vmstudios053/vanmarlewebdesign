import useReveal from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()

  return (
    <section ref={ref} id="contact" data-bg="#101430" className="relative py-28 md:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(217,180,90,0.08),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p data-reveal className="eyebrow mb-6">Klaar om te bouwen</p>
        <h2 data-reveal className="display text-4xl md:text-6xl mb-7">
          Laten we uw website maken<br />
          <span className="text-gold-soft italic">zoals u hem bedoeld had.</span>
        </h2>
        <p data-reveal className="lead mx-auto max-w-xl text-lg">
          Vertel me kort wat voor bedrijf u hebt en waar u naartoe wilt. Binnen één werkdag hoort u wat er mogelijk is, welk pakket past en wanneer u live kunt zijn — vrijblijvend en in gewoon Nederlands.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:info@vanmarlewebdesign.nl?subject=Offerte%20aanvragen" className="btn-gold">
            Vraag vrijblijvend een offerte aan <span aria-hidden>→</span>
          </a>
          <a href="mailto:info@vanmarlewebdesign.nl?subject=Plan%20een%20gesprek" className="btn-ghost">Plan een gesprek</a>
        </div>
        <ul data-reveal className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-2">
          <li className="flex items-center gap-2"><span className="text-amber" aria-hidden>✓</span> Reactie binnen één werkdag</li>
          <li className="flex items-center gap-2"><span className="text-amber" aria-hidden>✓</span> Vrijblijvende offerte</li>
          <li className="flex items-center gap-2"><span className="text-amber" aria-hidden>✓</span> Werkzaam in heel Nederland</li>
        </ul>
      </div>
    </section>
  )
}
