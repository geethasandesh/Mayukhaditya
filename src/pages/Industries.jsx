import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const industries = [
  {
    title: "Manufacturing",
    desc: "SAP PP, QM, and PM solutions for discrete and process manufacturing with MES integration.",
  },
  {
    title: "Retail & Consumer",
    desc: "Omnichannel SAP Retail, demand planning, and S/4HANA Fashion for high-volume distribution.",
  },
  {
    title: "Pharma & Life Sciences",
    desc: "GxP-compliant SAP deployments with batch traceability, validation, and regulatory reporting.",
  },
  {
    title: "Oil & Gas / Energy",
    desc: "SAP IS-Oil, joint venture accounting, and asset-intensive maintenance workflows.",
  },
  {
    title: "Automotive",
    desc: "Just-in-sequence logistics, EDI integration, and supplier collaboration on SAP.",
  },
  {
    title: "Public Sector",
    desc: "Funds management, grant accounting, and public sector budget control on SAP.",
  },
]

const Industries = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="Industries"
        title="SAP Solutions Tailored to Your Sector"
        subtitle="Industry-specific templates, best practices, and accelerators for faster, lower-risk SAP transformations."
      />

      <section className="py-24 bg-charcoal">
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
                className="group p-8 rounded-xl border border-[#e8a020]/15 bg-smoke hover:border-[#e8a020]/40 transition"
              >
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-sunrise transition">
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
