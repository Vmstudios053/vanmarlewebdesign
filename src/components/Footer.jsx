import Emblem from './Emblem.jsx'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Emblem size={44} alt="Logo Van Marle Webdesign" />
            <span className="font-display text-lg">Van Marle Webdesign</span>
          </div>
          <p className="lead text-sm">
            Cinematische 3D-websites met online agenda en SEO, voor klusbedrijven, schilders, bouw- en timmerbedrijven, stukadoors en renovatiespecialisten. Ontworpen en gebouwd in Nederland.
          </p>
          <p className="text-sm text-gold/80">
            Gebouwd met vakmanschap en een christelijke werkethiek van eerlijkheid en toewijding.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-[0.7rem] uppercase tracking-[0.3em] text-muted-2">Navigatie</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-muted">
            <li><a href="#top" className="hover:text-ivory transition-colors">Home</a></li>
            <li><a href="#diensten" className="hover:text-ivory transition-colors">Diensten</a></li>
            <li><a href="#pakketten" className="hover:text-ivory transition-colors">Pakketten</a></li>
            <li><a href="#werk" className="hover:text-ivory transition-colors">Werk</a></li>
            <li><a href="#over" className="hover:text-ivory transition-colors">Over mij</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-[0.7rem] uppercase tracking-[0.3em] text-muted-2">Contact</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-muted">
            <li><a href="mailto:info@vanmarlewebdesign.nl" className="hover:text-ivory transition-colors">info@vanmarlewebdesign.nl</a></li>
            <li><a href="#contact" className="hover:text-ivory transition-colors">Plan een gesprek</a></li>
            <li className="text-muted-2">Reactie binnen één werkdag</li>
            <li className="text-muted-2">Werkzaam in heel Nederland</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-line px-6 pt-6 text-xs text-muted-2 sm:flex-row">
        <span>© {new Date().getFullYear()} Van Marle Webdesign</span>
        <span>Ontworpen & gebouwd door Sven van Marle</span>
      </div>
    </footer>
  )
}
