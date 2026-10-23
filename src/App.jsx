import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import Layout from "./components/Layout"

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const ServicesPage = lazy(() => import("./pages/Services"))
const CaseStudies = lazy(() => import("./pages/CaseStudies"))
const Industries = lazy(() => import("./pages/Industries"))
const Contact = lazy(() => import("./pages/Contact"))
const NotFound = lazy(() => import("./pages/NotFound"))

const PageFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#e8a020]/20 border-t-[#e8a020] animate-spin" />
  </div>
)

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
