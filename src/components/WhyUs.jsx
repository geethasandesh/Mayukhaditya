import { motion } from "framer-motion"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const points = [
  {
    title: "SAP-Certified Consultants",
    desc: "Functional and technical experts across FI/CO, MM, SD, PP, HR, and BASIS.",
  },
  {
    title: "End-to-End Delivery",
    desc: "From discovery and blueprint to go-live, hypercare, and AMS support.",
  },
  {
    title: "Industry Best Practices",
    desc: "Proven methodologies aligned with SAP Activate and clean-core principles.",
  },
  {
    title: "Global Delivery Model",
    desc: "Onshore leadership with scalable offshore execution for cost efficiency.",
  },
]

const WhyUs = () => {
  return (
    <section className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={fadeUp}
          transition={transition}
          className="text-center mb-16"
        >
          <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Why Mayukha</p>
          <h2 className="text-4xl font-bold text-white">Your Trusted SAP Partner</h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
        >
          {points.map((point) => (
            <motion.div
              key={point.title}
              variants={fadeUp}
              transition={transition}
              className="p-6 rounded-xl border border-[#e8a020]/15 bg-smoke hover:border-[#e8a020]/35 transition group"
            >
              <div className="w-10 h-10 rounded-lg border border-[#e8a020]/30 flex items-center justify-center text-sunrise mb-4 group-hover:bg-[#e8a020]/10 transition">
                ◆
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUs
