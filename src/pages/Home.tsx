import Footer from "@/components/layout/Footer"
import Hero from "../components/home/hero"
import ProjectList from "../components/home/project-list"
import CTA from "../components/home/cta"
import SEO from "@/components/layout/SEO"
import Skills from "@/components/home/skills"
import Experience from "@/components/home/experience"

const Home = () => {
  return (
    <>
      <SEO
        title="Syed Umair Ali | Full-Stack Engineer & Product Builder"
        description="I build fast, reliable, scalable software — from first API call to production deployment."
        url="https://syedumaircodes.vercel.app/"
      />
      <Hero />
      <Skills />
      <Experience />
      <ProjectList />
      <CTA />
      <Footer />
    </>
  )
}

export default Home
