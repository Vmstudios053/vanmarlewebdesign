import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const CHAPTERS = ['HET IDEE', 'HET ONTWERP', 'DE BOUW', 'DE AGENDA', 'SEO', 'LIVE']

// Volgt welk hoofdstuk in beeld is via de [data-chapter]-secties.
export default function useChapter() {
  const [chapter, setChapter] = useState(CHAPTERS[0])

  useEffect(() => {
    const triggers = gsap.utils.toArray('[data-chapter]').map((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) setChapter(sec.dataset.chapter)
        },
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return chapter
}
