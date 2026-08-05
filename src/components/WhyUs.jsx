import { motion } from "framer-motion"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const points = [
  {
    title: "Experienced SAP Supply Chain Consultants",
    desc: "Deep functional expertise paired with strong technical capability across EWM and logistics.",
  },
  {
    title: "End-to-End Project Delivery",
    desc: "From process assessment and blueprint through go-live, hypercare, and managed support.",
  },
  {
    title: "Warehouse Automation Expertise",
    desc: "Proven delivery of WCS, conveyor, RFID, PLC, and material flow system integrations.",
  },
  {
    title: "Strong SAP EWM Competency",
    desc: "Basic and Advanced EWM with RF frameworks, HU management, and production integration.",
  },
  {
    title: "Proven Integration Experience",
    desc: "Reliable interfaces across IDoc, REST, SOAP, RFC, and real-time automation platforms.",
  },
  {
    title: "Production Support Excellence",
    desc: "AMS, monitoring, incident resolution, and performance tuning for stable peak operations.",
  },
  {
    title: "Business-Focused Solutions",
    desc: "Designs that improve efficiency, inventory accuracy, throughput, and automation ROI.",
  },
  {
    title: "Agile Delivery Methodology",
    desc: "Iterative delivery that keeps stakeholders aligned and accelerates time to value.",
  },
]

const WhyUs = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={fadeUp}
          transition={transition}
          className="text-center mb-16"
        >
          <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Why Choose Us</p>
          <h2 className="text-4xl font-bold text-ink">Your SAP Supply Chain Partner</h2>
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
              className="p-6 rounded-xl border border-[#e8a020]/20 bg-paper hover:border-[#e8a020]/40 transition group"
            >
              <div className="w-10 h-10 rounded-lg border border-[#e8a020]/30 flex items-center justify-center text-sunrise mb-4 group-hover:bg-[#e8a020]/10 transition">
                ◆
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">{point.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUs
