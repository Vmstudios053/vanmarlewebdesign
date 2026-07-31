import { useEffect, useState } from 'react'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1400)
      setProgress(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setGone(true), 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-night transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
      aria-hidden
    >
      <div className="text-center">
        <div className="font-display text-4xl tracking-wide">Van Marle</div>
        <div className="mt-1 text-[0.7rem] uppercase tracking-[0.4em] text-gold">webdesign</div>
        <div className="mx-auto mt-8 h-px w-48 overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-soft transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-xs text-muted-2">Fundament leggen · {progress}%</div>
      </div>
    </div>
  )
}
