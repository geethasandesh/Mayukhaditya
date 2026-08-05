import { useState, useRef, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../assets/logobg.png"
import { btnSunrise } from "../utils/gradient"

const links = [
  { to: "/services", label: "Services" },
  { to: "/sap-modules", label: "SAP Modules" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

const regions = ["Global", "Americas", "EMEA", "APAC", "India"]

const navClass = ({ isActive }) =>
  `text-[15px] font-medium transition-colors ${
    isActive ? "text-sunrise" : "text-ink/80 hover:text-ink"
  }`

const contactBtnClass = `inline-flex items-center gap-2 ${btnSunrise} px-5 py-2.5 text-[15px]`

const GlobeIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 21a9 9 0 100-18 9 9 0 000 18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.6 3.5 5.8 3.5 9s-1.3 6.4-3.5 9M12 3c-2.2 2.6-3.5 5.8-3.5 9s1.3 6.4 3.5 9"
    />
  </svg>
)

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [globalOpen, setGlobalOpen] = useState(false)
  const [region, setRegion] = useState("Global")
  const globalRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (globalRef.current && !globalRef.current.contains(e.target)) {
        setGlobalOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#e8a020]/20 bg-paper/95 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="relative flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center relative z-10" aria-label="Mayukhaditya home">
            <img
              src={logo}
              alt="Mayukhaditya"
              className="h-9 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Centered nav links */}
          <nav
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-7 xl:gap-9">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={navClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop utilities + CTA */}
          <div className="hidden lg:flex items-center gap-6 shrink-0 relative z-10">
            <div className="relative" ref={globalRef}>
              <button
                type="button"
                onClick={() => setGlobalOpen(!globalOpen)}
                className="flex items-center gap-2 text-ink/80 hover:text-ink text-[15px] font-medium transition-colors"
                aria-expanded={globalOpen}
                aria-haspopup="listbox"
              >
                <GlobeIcon />
                <span>{region}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${globalOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {globalOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 min-w-[140px] py-1 bg-paper border border-[#e8a020]/25 shadow-xl"
                    role="listbox"
                  >
                    {regions.map((r) => (
                      <li key={r}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={region === r}
                          onClick={() => {
                            setRegion(r)
                            setGlobalOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            region === r
                              ? "text-sunrise bg-[#e8a020]/10"
                              : "text-ink/70 hover:text-ink hover:bg-[#e8a020]/5"
                          }`}
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className={contactBtnClass}>
              Contact us
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden text-ink p-2 -mr-2 relative z-10 ml-auto"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#e8a020]/20 bg-paper overflow-hidden"
          >
            <nav className="px-5 py-5 flex flex-col gap-1" aria-label="Mobile navigation">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-3 text-base font-medium border-b border-[#e8a020]/10 ${
                      isActive ? "text-sunrise" : "text-ink/80"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="flex items-center gap-3 py-4 border-b border-[#e8a020]/10">
                <GlobeIcon />
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-transparent text-ink/80 text-sm focus:outline-none"
                >
                  {regions.map((r) => (
                    <option key={r} value={r} className="bg-paper text-ink">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={`mt-3 w-full justify-center py-3 ${contactBtnClass}`}
              >
                Contact us
                <span aria-hidden>→</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
