import { Suspense, lazy } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll'
import useReducedMotion from './hooks/useReducedMotion'
import Preloader from './components/Preloader.jsx'
import BackgroundDirector from './components/BackgroundDirector.jsx'
import Navbar from './components/Navbar.jsx'
import ChapterHUD from './components/ChapterHUD.jsx'
import Hero from './components/Hero.jsx'
import TradeStrip from './components/TradeStrip.jsx'
import Features from './components/Features.jsx'
import Journey3D from './components/Journey3D.jsx'
import BookingDemo from './components/BookingDemo.jsx'
import Showcase from './components/Showcase.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Lazy: het centrale 3D-object laadt als eigen chunk buiten de eerste paint.
const Scene3D = lazy(() => import('./components/Scene3D.jsx'))

// Eén doorlopende reis door een stille zomernacht:
// HET IDEE → HET ONTWERP → DE BOUW → DE AGENDA → SEO → LIVE.
export default function App() {
  useSmoothScroll()
  const reduced = useReducedMotion()

  return (
    <div className="grain">
      <Preloader />
      <BackgroundDirector />
      {!reduced && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}
      <div className="moonglow" aria-hidden />
      <Navbar />
      <ChapterHUD />
      <main className="relative z-10">
        <Hero />
        <TradeStrip />
        <Features />
        <Journey3D />
        <BookingDemo />
        <Showcase />
        <Pricing />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
