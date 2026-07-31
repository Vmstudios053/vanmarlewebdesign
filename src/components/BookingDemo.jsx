import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'

const CHAT = [
  { from: 'bot', text: 'Goedemiddag! Waarmee kan ik u helpen?' },
  { from: 'user', text: 'Wat kost het schilderen van een woonkamer?' },
  { from: 'bot', text: 'Dat hangt af van de oppervlakte. Zal ik een vrijblijvende offerte-afspraak inplannen?' },
  { from: 'user', text: 'Ja, graag. Kan het donderdag?' },
  { from: 'bot', text: 'Donderdag 10:00 uur staat genoteerd ✓ U ontvangt direct een bevestiging per mail en een dag vooraf een herinnering.' },
]

export default function BookingDemo() {
  const ref = useReveal()
  const [visible, setVisible] = useState(0)
  const chatRef = useRef(null)

  useEffect(() => {
    const el = chatRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0
          const timer = setInterval(() => {
            i += 1
            setVisible(i)
            if (i >= CHAT.length) clearInterval(timer)
          }, 900)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} data-chapter="DE AGENDA" data-bg="#101a38" className="relative py-28 md:py-40">
      <span className="section-no" aria-hidden>04</span>
      <div className="relative mx-auto max-w-6xl px-6 grid gap-14 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <p className="eyebrow mb-5">De agenda-module</p>
          <h2 className="display text-4xl md:text-6xl mb-6">
            Uw beste medewerker<br />
            <span className="text-gold-soft italic">slaapt nooit.</span>
          </h2>
          <p className="lead text-lg mb-5">
            De meeste klanten zoeken 's avonds een vakman — precies wanneer u de telefoon niet opneemt. De chatbot op uw website beantwoordt hun vragen, plant de afspraak in uw agenda en bevestigt automatisch.
          </p>
          <ul className="flex flex-col gap-4 text-muted">
            <li className="flex gap-3"><span className="text-gold" aria-hidden>✓</span> Beantwoordt vragen over prijzen, diensten en beschikbaarheid</li>
            <li className="flex gap-3"><span className="text-gold" aria-hidden>✓</span> Plant afspraken rechtstreeks in uw online agenda</li>
            <li className="flex gap-3"><span className="text-gold" aria-hidden>✓</span> Stuurt automatisch een bevestiging naar de klant</li>
            <li className="flex gap-3"><span className="text-gold" aria-hidden>✓</span> Herinnert de klant vooraf — minder no-shows</li>
          </ul>
        </div>

        <div data-reveal ref={chatRef} className="card p-6 md:p-8">
          <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="text-sm text-muted">Live chatbot · reageert direct</span>
          </div>
          <div className="flex min-h-[320px] flex-col gap-3">
            {CHAT.slice(0, visible).map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.92rem] leading-relaxed ${
                  m.from === 'bot'
                    ? 'self-start bg-night-3 text-ivory rounded-bl-sm'
                    : 'self-end bg-gold/15 text-gold-soft rounded-br-sm'
                }`}
                style={{ animation: 'fadeInUp 0.4s ease both' }}
              >
                {m.text}
              </div>
            ))}
          </div>
          <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
      </div>
    </section>
  )
}
