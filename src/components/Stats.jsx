import { motion } from "framer-motion"
import CountUp from "./CountUp"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"
import { textSunrise, borderSunrise } from "../utils/gradient"

const stats = [
  { end: 150, suffix: "+", label: "SAP Projects Delivered" },
  { end: 12, suffix: "+", label: "Years SAP Expertise" },
  { end: 98, suffix: "%", label: "Client Retention Rate" },
  { end: 24, suffix: "/7", label: "Managed SAP Support" },
]

const Stats = () => {
  return (
    <section className={`py-20 lg:py-28 border-y ${borderSunrise} bg-charcoal`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col gap-14 lg:gap-16">
        {/* Row 1: heading left, paragraph right */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.h2
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className={`text-3xl md:text-4xl lg:text-5xl font-sans leading-tight text-white`}
          >
            Innovation begins here
          </motion.h2>

          <motion.p
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={{ ...transition, delay: 0.08 }}
            className="text-muted leading-relaxed text-base md:text-lg"
          >
            Accely offers top-tier SAP consulting services using refined methodologies and
            innovation, thus creating a synergy of the latest technology and vast accumulated
            experience. Renowned for our technical expertise and rapid return on investment
            (ROI), we serve small-medium businesses to Fortune 500 Companies. We deliver
            high-value, end-to-end solutions as an SAP Value Added Reseller (VAR) partner.
          </motion.p>
        </div>

        {/* Row 2: stats in a single row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              transition={transition}
              className={`text-center p-6 rounded-xl border ${borderSunrise} bg-smoke/50`}
            >
              <p className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textSunrise}`}>
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  delay={index * 0.15}
                  duration={2.5}
                />
              </p>
              <p className="text-sm text-muted mt-3 leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
