import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const industries = [
  {
    title: "FMCG",
    desc: "High-volume distribution and warehouse automation for fast-moving consumer goods networks.",
  },
  {
    title: "Retail",
    desc: "Omnichannel inventory accuracy, outbound excellence, and scalable warehouse operations.",
  },
  {
    title: "Manufacturing",
    desc: "Production supply, line feeding, staging, and finished goods warehouse integration.",
  },
  {
    title: "Automotive",
    desc: "Just-in-sequence logistics, material flow reliability, and tightly integrated warehouse processes.",
  },
  {
    title: "Consumer Goods",
    desc: "Optimized putaway, picking, and replenishment strategies for consumer product warehouses.",
  },
  {
    title: "Pharmaceutical",
    desc: "Controlled warehouse processes with accurate inventory, batch visibility, and reliable execution.",
  },
  {
    title: "Chemical",
    desc: "Specialized handling, storage strategies, and logistics controls for chemical supply chains.",
  },
  {
    title: "Logistics & Distribution",
    desc: "High-throughput distribution centers with RF, HU management, and outbound optimization.",
  },
  {
    title: "3PL Warehousing",
    desc: "Multi-client warehouse models, billing enablement, and flexible automation integrations.",
  },
]

const Industries = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="Industries Served"
        title="Supply Chain Solutions Across Sectors"
        subtitle="We deliver SAP Digital Supply Chain solutions for manufacturing, FMCG, retail, automotive, pharmaceuticals, chemicals, logistics, and 3PL warehousing."
      />

      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {industries.map((ind) => (
              <motion.div
                key={ind.title}
                variants={fadeUp}
                transition={transition}
                className="group p-8 rounded-xl border border-[#e8a020]/20 bg-paper hover:border-[#e8a020]/45 transition"
              >
                <h3 className="text-xl font-semibold text-ink mb-3 group-hover:text-sunrise transition">
                  {ind.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTA title="Discuss SAP for your industry" />
    </motion.div>
  )
}

export default Industries
