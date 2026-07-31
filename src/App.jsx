import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import BookingDemo from './components/BookingDemo.jsx'
import Pricing from './components/Pricing.jsx'
import Showcase from './components/Showcase.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useSmoothScroll()

  return (
    <div className="grain">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BookingDemo />
        <Pricing />
        <Showcase />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
