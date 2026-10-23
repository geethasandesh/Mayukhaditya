import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { fadeUp, transition } from "../utils/motion"
import { btnSunrise, borderSunrise } from "../utils/gradient"

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[70vh] flex items-center justify-center py-24 px-6 bg-paper"
    >
      <Helmet>
        <title>404 - Page Not Found | Mayukhaditya</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>

      <motion.div
        {...fadeUp}
        transition={transition}
        className={`max-w-xl w-full text-center p-10 md:p-14 rounded-2xl border ${borderSunrise} bg-cream`}
      >
        <p className="text-6xl md:text-8xl font-black text-sunrise mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-4">Page Not Found</h1>
        <p className="text-muted text-sm md:text-base leading-relaxed mb-8">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className={`inline-flex items-center justify-center px-8 py-3 rounded text-sm font-semibold ${btnSunrise}`}
        >
          Return to Homepage
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default NotFound
