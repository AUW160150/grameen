import Nav from '../components/Nav'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import BrandPartners from '../components/BrandPartners'
import ApifyPower from '../components/ApifyPower'
import Features from '../components/Features'
import CreatorNetwork from '../components/CreatorNetwork'
import Impact from '../components/Impact'
import SignupSection from '../components/SignupSection'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="bg-cream min-h-screen">
      <Nav transparent />
      <Hero />
      <HowItWorks />
      <BrandPartners />
      <ApifyPower />
      <Features />
      <CreatorNetwork />
      <Impact />
      <SignupSection />
      <Footer />
    </div>
  )
}
