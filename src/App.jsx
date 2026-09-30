import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import ServicesPage from "./pages/Services"
import CaseStudies from "./pages/CaseStudies"
import Industries from "./pages/Industries"
import Contact from "./pages/Contact"

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
