import Hero from "../components/Hero"
import Stats from "../components/Stats"
import Services from "../components/Services"
import WhyUs from "../components/WhyUs"
import CTA from "../components/CTA"

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Services limit={4} />
      <WhyUs />
      <CTA />
    </>
  )
}

export default Home
