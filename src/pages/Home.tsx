import Footer from "@/components/shared/Footer"
import Hero from "../components/home/hero"
import ProjectList from "../components/home/project-list"
import Resources from "../components/home/resources"
import SEO from "@/components/shared/SEO"
import Skills from "@/components/home/skills"

const Home = () => {
  return (
    <>
      <SEO
        title="Syed Umair Ali | Full-Stack Engineer & Product Builder"
        description="I specialize in end-to-end execution. From data to deployment, my focus is on shipping real products."
        url="https://syedumaircodes.vercel.app/"
      />
      <Hero />
      <Skills />
      <ProjectList />
      <Resources />
      <Footer />
    </>
  )
}

export default Home
