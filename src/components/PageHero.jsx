import { motion } from "framer-motion"
import { fadeUp, transition } from "../utils/motion"

const PageHero = ({ label, title, subtitle }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#e8a020]/20 bg-gradient-to-b from-cream to-paper pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,160,32,0.1),transparent_55%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e8a020] to-transparent opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.p
          {...fadeUp}
          transition={transition}
          className="text-sunrise font-semibold uppercase tracking-[0.3em] text-sm mb-4"
        >
          {label}
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ ...transition, delay: 0.08 }}
          className="text-4xl md:text-6xl font-bold text-ink max-w-3xl leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            {...fadeUp}
            transition={{ ...transition, delay: 0.16 }}
            className="mt-6 text-lg text-muted max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default PageHero
