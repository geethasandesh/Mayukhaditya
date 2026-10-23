import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../assets/logobg.png"

const links = [
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
]

const navClass = ({ isActive }) =>
  `text-[15px] font-medium transition-colors ${
    isActive ? "text-sunrise" : "text-ink/80 hover:text-ink"
  }`


const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#e8a020]/20 bg-paper/95 backdrop-blur-md">
      <div className="max-w-[1800px] mx-auto px-5 lg:px-10">
        <div className="relative flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center relative z-10" aria-label="Mayukhaditya home">
            <img
              src={logo}
              alt="Mayukhaditya"
              className="h-[2.7rem] md:h-[3.3rem] w-auto object-contain brightness-130"
            />
          </Link>

          {/* Centered nav links */}
          <nav
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-7 xl:gap-9">
              {links.map((link) => (
                <li key={link.to} className="relative flex items-center">
                  <NavLink to={link.to} className={navClass}>
                    {link.label}
                  </NavLink>
                  {link.to === "/services" && (
                    <>
                      <svg className="absolute w-[14px] h-[14px] -bottom-[10px] left-[15%] fill-[#e8a020] pointer-events-none animate-twinkle" viewBox="0 0 24 24">
                        <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
                      </svg>
                      <svg className="absolute w-[10px] h-[10px] -bottom-[15px] left-[45%] fill-[#e8a020] pointer-events-none animate-twinkle delay-500" viewBox="0 0 24 24">
                        <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
                      </svg>
                      <svg className="absolute w-[16px] h-[16px] -top-[4px] -right-[8px] fill-[#e8a020] pointer-events-none animate-twinkle delay-1000" viewBox="0 0 24 24">
                        <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
                      </svg>
                      <svg className="absolute w-[9px] h-[9px] -bottom-[6px] right-[20%] fill-[#e8a020] pointer-events-none animate-twinkle delay-1500" viewBox="0 0 24 24">
                        <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
                      </svg>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden lg:flex items-center shrink-0 relative z-10">
            <div className="relative flex items-center">
              <Link
                to="/contact"
                className="text-sunrise font-semibold hover:brightness-110 transition"
              >
                Contact Us
              </Link>
              <svg className="absolute w-[12px] h-[12px] -bottom-[6px] left-[5%] fill-[#e8a020] pointer-events-none animate-twinkle" viewBox="0 0 24 24">
                <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
              </svg>
              <svg className="absolute w-[8px] h-[8px] -bottom-[10px] left-[35%] fill-[#e8a020] pointer-events-none animate-twinkle delay-500" viewBox="0 0 24 24">
                <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
              </svg>
              <svg className="absolute w-[14px] h-[14px] -top-[4px] -right-[6px] fill-[#e8a020] pointer-events-none animate-twinkle delay-1000" viewBox="0 0 24 24">
                <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
              </svg>
              <svg className="absolute w-[8px] h-[8px] -bottom-[4px] right-[10%] fill-[#e8a020] pointer-events-none animate-twinkle delay-1500" viewBox="0 0 24 24">
                <path d="M12,0 C12,6.6 17.4,12 24,12 C17.4,12 12,17.4 12,24 C12,17.4 6.6,12 0,12 C6.6,12 12,6.6 12,0 Z"/>
              </svg>
            </div>
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

              <div className="py-4">
                <Link
                  to="/contact"
                  className="block w-full text-sunrise py-3 font-semibold hover:brightness-110 transition"
                  onClick={() => setOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
