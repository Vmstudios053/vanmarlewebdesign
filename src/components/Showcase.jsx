import useReveal from '../hooks/useReveal'

export default function Showcase() {
  const ref = useReveal()

  return (
    <section ref={ref} id="werk" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow mb-5">Live project</p>
          <h2 className="display text-4xl md:text-6xl mb-6">
            Zie het werk<br />
            <span className="text-gold-soft italic">in beweging.</span>
          </h2>
        </div>

        <article data-reveal className="card mt-14 overflow-hidden md:grid md:grid-cols-2">
          <a
            href="https://vmstudios053.github.io/klusbedrijf-de-zegen-3d/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[420px]"
            aria-label="Bekijk de live site van Klusbedrijf De Zegen"
          >
            <img
              src="portfolio-klusbedrijf.jpg"
              alt="3D-website van Klusbedrijf De Zegen"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
          </a>
          <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
            <p className="text-[0.68rem] uppercase tracking-[0.25em] text-blue">Klusbedrijf · 3D-website met agenda</p>
            <h3 className="font-display text-3xl">Klusbedrijf De Zegen</h3>
            <p className="lead">
              Een 3D-website voor een klusbedrijf: een interactief huis dat meebeweegt met de scroll, duidelijke diensten en een aanvraagroute die direct in de agenda binnenkomt. Precies wat u hier op deze pagina ziet — maar dan voor úw bedrijf.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://vmstudios053.github.io/klusbedrijf-de-zegen-3d/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Bekijk de live site <span aria-hidden>→</span>
              </a>
              <span className="text-sm text-muted-2">Three.js · Agenda · SEO</span>
            </div>
          </div>
        </article>

        <div className="mt-14 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['14', 'dagen tot livegang'],
            ['100%', 'op maat gebouwd'],
            ['0', 'templates gebruikt'],
            ['1', 'vast aanspreekpunt'],
          ].map(([num, label]) => (
            <div key={label} data-reveal className="card px-6 py-8">
              <div className="font-display text-5xl text-gold-soft">{num}</div>
              <div className="mt-2 text-sm text-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
