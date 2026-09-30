import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import bgVideo from "../assets/bgvideo.mp4"
import { fadeUp, staggerContainer, transition } from "../utils/motion"
import { sunriseGradient } from "../utils/gradient"
import logo from "../assets/logobg1.png"

const contactBtnClass = `inline-flex items-center gap-2 ${sunriseGradient} px-6 py-2 text-sm text-black font-semibold rounded hover:from-gold hover:via-gold hover:to-gold hover:text-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`

const solutions = [
  { title: "SAP EWM", to: "/services" },
  { title: "Warehouse Automation", to: "/services" },
  { title: "S/4HANA Supply Chain", to: "/services" },
  { title: "SAP BTP & Integration", to: "/services" },
]

const GridIcon = () => (
  <div className="grid grid-cols-2 gap-1 w-5 h-5" aria-hidden>
    <span className="bg-white/80 w-2 h-2" />
    <span className="bg-white/80 w-2 h-2" />
    <span className="bg-white/80 w-2 h-2" />
    <span className="bg-white/80 w-2 h-2" />
  </div>
)

const NetworkOverlay = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <defs>
      <pattern id="dots" width="48" height="48" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="white" opacity="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
    <line x1="5%" y1="20%" x2="25%" y2="35%" stroke="white" strokeWidth="0.5" opacity="0.25" />
    <line x1="25%" y1="35%" x2="45%" y2="25%" stroke="white" strokeWidth="0.5" opacity="0.25" />
    <line x1="45%" y1="25%" x2="70%" y2="40%" stroke="white" strokeWidth="0.5" opacity="0.25" />
    <line x1="70%" y1="40%" x2="90%" y2="30%" stroke="white" strokeWidth="0.5" opacity="0.25" />
    <line x1="15%" y1="60%" x2="35%" y2="75%" stroke="white" strokeWidth="0.5" opacity="0.25" />
    <line x1="35%" y1="75%" x2="55%" y2="65%" stroke="white" strokeWidth="0.5" opacity="0.25" />
    <line x1="55%" y1="65%" x2="80%" y2="80%" stroke="white" strokeWidth="0.5" opacity="0.25" />
    <line x1="60%" y1="15%" x2="75%" y2="55%" stroke="white" strokeWidth="0.5" opacity="0.2" />
    <line x1="20%" y1="45%" x2="50%" y2="50%" stroke="white" strokeWidth="0.5" opacity="0.2" />
  </svg>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <NetworkOverlay />

      <div className="relative z-10 flex flex-col min-h-screen pt-[72px]">
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 lg:py-24"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={fadeUp}
            transition={transition}
            className="mb-6"
          >
            <img src={logo} alt="Mayukhaditya" className="h-16 md:h-24 object-contain mx-auto drop-shadow-md" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ ...transition, delay: 0.06 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans text-white leading-tight mb-6 max-w-4xl drop-shadow-lg"
          >
            Transforming Supply Chains with SAP Digital Solutions
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ ...transition, delay: 0.12 }}
            className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-2xl drop-shadow-md"
          >
            Optimize warehouse operations, manufacturing logistics, transportation, and inventory
            management with SAP S/4HANA, EWM, BTP, and warehouse automation.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ ...transition, delay: 0.18 }}>
            <Link 
              to="/contact" 
              className={`group relative inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-black rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${sunriseGradient}`}
            >
              {/* Falling White Curtain Background */}
              <span className="absolute inset-0 w-full h-full bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-in-out" aria-hidden="true" />
              
              {/* Button Text & Icon (Z-10 keeps it above the curtain) */}
              <span className="relative z-10 flex items-center gap-2">
                Get started
                <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="px-5 lg:px-12 pb-10 lg:pb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <p className="text-center text-[20px] uppercase tracking-[0.25em] text-white/70 font-medium mb-6">
            <b>Our Core Capabilities</b>
          </p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/15 bg-white/5 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {solutions.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group relative flex flex-col justify-between min-h-[140px] p-6 hover:bg-white/10 transition-colors"
              >
                <div>
                  <GridIcon />
                  <p className="mt-5 text-[15px] uppercase tracking-[0.25em] text-white/60 font-medium">
                    Solution
                  </p>
                  <h3 className="mt-2 text-lg md:text-xl font-semibold text-white group-hover:text-sunrise transition-colors">
                    {item.title}
                  </h3>
                </div>
                <span
                  className="absolute bottom-6 right-6 text-white/70 group-hover:text-sunrise group-hover:translate-x-0.5 transition-all"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
