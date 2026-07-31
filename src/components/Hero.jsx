import GhostTitle from './GhostTitle.jsx'
import useReducedMotion from '../hooks/useReducedMotion'

// Openingsscene: grote serif-kop met ghost-echo over het centrale 3D-object.
export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="top"
      data-chapter="HET IDEE"
      data-bg="#0a1128"
      className="relative flex min-h-[118vh] flex-col items-center justify-center px-6 text-center"
      aria-label="Introductie"
    >
      {reduced && (
        <img src="hero-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      )}
      <span className="section-no" aria-hidden>01</span>

      <div className="relative max-w-4xl">
        <p className="eyebrow mb-8">Van Marle Webdesign · 3D-websites voor klusbedrijven en zzp'ers</p>
        <GhostTitle echo="Vakwerk" className="text-6xl md:text-8xl mb-8">
          Uw vakwerk verdient<br />
          <span className="text-gold-soft italic">een website die werkt.</span>
        </GhostTitle>
        <p className="lead mx-auto max-w-xl text-lg [text-shadow:0_2px_18px_rgba(4,8,24,0.9)]">
          Cinematische 3D-websites die indruk maken én klanten opleveren — met een online agenda waarin klanten direct een afspraak inplannen, en SEO die daadwerkelijk gevonden wordt.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="btn-gold">Plan een gesprek <span aria-hidden>→</span></a>
          <a href="#pakketten" className="btn-ghost">Bekijk de pakketten</a>
        </div>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-2" aria-hidden>
        <span className="block h-10 w-px bg-gradient-to-b from-amber/70 to-transparent" />
      </div>
    </section>
  )
}
