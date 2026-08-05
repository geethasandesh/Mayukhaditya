import { motion } from "framer-motion"
import CountUp from "./CountUp"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"
import { textSunrise, borderSunrise } from "../utils/gradient"

const stats = [
  { end: 99, suffix: "%+", label: "Inventory Accuracy Delivered" },
  { end: 4, suffix: "+", label: "Core Service Practice Areas" },
  { end: 10, suffix: "+", label: "Industries Served" },
  { end: 24, suffix: "/7", label: "Production Support Ready" },
]

const Stats = () => {
  return (
    <section className={`py-20 lg:py-28 border-y ${borderSunrise} bg-cream`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col gap-14 lg:gap-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.h2
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="text-3xl md:text-4xl lg:text-5xl font-sans leading-tight text-ink"
          >
            Measurable value across the digital supply chain
          </motion.h2>

          <motion.p
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={{ ...transition, delay: 0.08 }}
            className="text-muted leading-relaxed text-base md:text-lg"
          >
            We deliver scalable, reliable, and business-focused SAP solutions that improve
            operational efficiency, inventory accuracy, warehouse throughput, and system
            automation — across manufacturing, FMCG, retail, automotive, pharmaceuticals,
            and third-party logistics.
          </motion.p>
        </div>

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
              className={`text-center p-6 rounded-xl border ${borderSunrise} bg-paper`}
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
