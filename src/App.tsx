// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import BlogPost from "./pages/BlogPost"
import Resources from "./pages/Resources"
import NotFound from "./pages/NotFound"
import { HelmetProvider } from "react-helmet-async"
// Import MotionConfig, LazyMotion, and domAnimation
import { MotionConfig, LazyMotion, domAnimation } from "motion/react"

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <Router>
            <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/:slug" element={<BlogPost />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </Router>
        </MotionConfig>
      </LazyMotion>
    </HelmetProvider>
  )
}

export default App
