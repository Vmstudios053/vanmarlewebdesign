import { useEffect, useState } from 'react'

const STATUSES = [
  [0, 'SCENE LADEN'],
  [38, 'LICHT INSTELLEN'],
  [72, 'ASSETS KLAAR'],
  [94, 'START'],
]

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const duration = 2300
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      // ease-out zodat de balk filmisch vertraagt richting 100%
      const eased = 1 - Math.pow(1 - t, 2.2)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setFading(true)
        setTimeout(() => setGone(true), 900)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null

  const status = STATUSES.reduce((acc, [min, label]) => (progress >= min ? label : acc), STATUSES[0][1])

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black transition-opacity duration-[900ms] ease-out"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
      aria-hidden
    >
      <div className="text-center px-6">
        <div className="font-display text-4xl md:text-6xl tracking-wide text-ivory">Van Marle Webdesign</div>
        <div className="mt-3 font-display italic text-lg md:text-xl text-gold-soft/90">webdesign dat werkt</div>
        <div className="mx-auto mt-12 h-px w-64 md:w-80 overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-soft transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 flex items-center justify-center gap-3 text-[0.68rem] tracking-[0.35em] text-muted-2">
          <span>{status}</span>
          <span className="text-gold">·</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
