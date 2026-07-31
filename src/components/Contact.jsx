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
          Vertel me kort waar u naartoe wilt. Binnen één werkdag hoort u wat er mogelijk is, welk pakket past en wanneer u live kunt zijn.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:info@vanmarlewebdesign.nl?subject=Plan%20een%20gesprek" className="btn-gold">
            Plan een gesprek <span aria-hidden>→</span>
          </a>
          <a href="mailto:info@vanmarlewebdesign.nl" className="btn-ghost">info@vanmarlewebdesign.nl</a>
        </div>
        <p data-reveal className="mt-8 text-sm text-muted-2">
          Reactie binnen één werkdag · Werkzaam in heel Nederland
        </p>
      </div>
    </section>
  )
}
