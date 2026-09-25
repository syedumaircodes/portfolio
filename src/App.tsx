import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { HelmetProvider } from "react-helmet-async"

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
