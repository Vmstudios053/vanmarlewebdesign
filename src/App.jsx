import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import ChapterHUD from './components/ChapterHUD.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Journey3D from './components/Journey3D.jsx'
import BookingDemo from './components/BookingDemo.jsx'
import Showcase from './components/Showcase.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Eén doorlopende reis: HET IDEE → HET ONTWERP → DE BOUW → DE AGENDA → SEO → LIVE.
export default function App() {
  useSmoothScroll()

  return (
    <div className="grain">
      <Preloader />
      <Navbar />
      <ChapterHUD />
      <main>
        <Hero />
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
