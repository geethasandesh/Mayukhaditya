import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import Services from "../components/Services"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const process = [
  { step: "01", title: "Discover", desc: "Assess current SAP landscape, business goals, and transformation readiness." },
  { step: "02", title: "Design", desc: "Solution architecture, fit-gap analysis, and SAP Activate workstream planning." },
  { step: "03", title: "Build", desc: "Configuration, development, data migration, and integrated testing cycles." },
  { step: "04", title: "Deploy", desc: "Cutover execution, go-live support, hypercare, and knowledge transfer." },
  { step: "05", title: "Operate", desc: "AMS, continuous improvement, and innovation on SAP BTP and analytics." },
]

const modules = [
  "SAP FI/CO", "SAP MM", "SAP SD", "SAP PP", "SAP QM",
  "SAP PM", "SAP HR/HCM", "SAP WM/EWM", "SAP PS", "SAP TM",
]

const ServicesPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="SAP Services"
        title="Full-Spectrum SAP Consulting"
        subtitle="From greenfield S/4HANA implementations to managed support — Mayukha delivers end-to-end SAP excellence."
      />

      <Services showLink={false} />

      <section className="py-24 bg-cream border-t border-[#e8a020]/15">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="text-center mb-14"
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Methodology</p>
            <h2 className="text-3xl font-bold text-ink">SAP Activate Delivery Process</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-5 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {process.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                transition={transition}
                className="relative p-5 rounded-xl border border-[#e8a020]/20 bg-paper text-center"
              >
                <span className="text-2xl font-bold text-sunrise">{item.step}</span>
                <h3 className="text-ink font-semibold mt-2 mb-2">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="text-center mb-12"
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Functional Coverage</p>
            <h2 className="text-3xl font-bold text-ink">SAP Module Expertise</h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {modules.map((mod) => (
              <motion.span
                key={mod}
                variants={fadeUp}
                transition={transition}
                className="px-4 py-2 rounded-full border border-[#e8a020]/30 bg-cream text-sm text-sunrise"
              >
                {mod}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <CTA />
    </motion.div>
  )
}

export default ServicesPage
