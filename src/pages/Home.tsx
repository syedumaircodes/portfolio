import Footer from "@/components/shared/Footer"
import Hero from "../components/home/hero"
import ProjectList from "../components/home/project-list"
import Resources from "../components/home/resources"
import SEO from "@/components/shared/SEO"
import Skills from "@/components/home/skills"
import Experience from "@/components/home/experience"

const Home = () => {
  return (
    <>
      <SEO
        title="Syed Umair Ali | Full-Stack Engineer & Product Builder"
        description="I build full-stack products that ship — from pixel-perfect frontends to real-time backend systems."
        url="https://syedumaircodes.vercel.app/"
      />
      <Hero />
      <Skills />
      <Experience />
      <ProjectList />
      <Resources />
      <Footer />
    </>
  )
}

export default Home
