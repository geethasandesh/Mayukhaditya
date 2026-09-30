import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const methodology = [
  "Business Process Assessment",
  "Solution Design",
  "Blueprint Preparation",
  "Configuration",
  "Development",
  "System Integration",
  "User Acceptance Testing",
  "Training",
  "Go-Live Support",
  "Hypercare",
  "Managed Support",
]

const technologies = [
  "SAP S/4HANA",
  "SAP EWM",
  "SAP BTP",
  "SAP Fiori",
  "SAP ABAP on HANA",
  "SAP Integration Suite",
  "REST APIs",
  "IDocs",
  "RFID",
  "PLC/WCS Integration",
]

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="About Mayukhaditya"
        title="Transforming Supply Chains with SAP Digital Solutions"
        subtitle="Mayukhaditya Private Limited is a technology consulting company specializing in SAP Digital Supply Chain solutions."
      />

      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-4"><b>About Us</b></p>
            <h2 className="text-3xl font-bold text-ink mb-6">
              Business-focused SAP solutions for modern warehouses and logistics
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              We help organizations optimize warehouse operations, manufacturing logistics,
              transportation, and inventory management through SAP S/4HANA, SAP EWM, SAP BTP,
              warehouse automation, and custom SAP developments.
            </p>
            <p className="text-muted leading-relaxed">
              Our team combines deep functional expertise with strong technical capabilities to
              deliver scalable, reliable solutions across manufacturing, FMCG, retail, automotive,
              pharmaceuticals, and third-party logistics industries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl border border-[#e8a020]/25 bg-gradient-to-br from-cream to-paper"
          >
            <p className="text-sunrise uppercase tracking-[0.2em] text-xs font-semibold mb-3">
              Our Objective
            </p>
            <p className="text-ink font-semibold text-lg mb-4 leading-snug">
              Deliver measurable business value by improving operational efficiency, inventory
              accuracy, warehouse throughput, and system automation.
            </p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex gap-2"><span className="text-sunrise">✓</span> SAP Digital Supply Chain specialization</li>
              <li className="flex gap-2"><span className="text-sunrise">✓</span> Strong SAP EWM &amp; automation competency</li>
              <li className="flex gap-2"><span className="text-sunrise">✓</span> End-to-end project and AMS delivery</li>
              <li className="flex gap-2"><span className="text-sunrise">✓</span> Industry-proven integration experience</li>
            </ul>
          </motion.div>
        </div>
      </section>

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
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3"><b>Methodology</b></p>
            <h2 className="text-3xl font-bold text-ink">How We Deliver</h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {methodology.map((step, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                transition={transition}
                className="flex items-start gap-3 p-4 rounded-xl border border-[#e8a020]/20 bg-paper"
              >
                <span className="text-sunrise font-bold text-sm shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-ink font-medium">{step}</p>
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
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3"><b>Technology Expertise</b></p>
            <h2 className="text-3xl font-bold text-ink">Platforms &amp; Capabilities</h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {technologies.map((tech) => (
              <motion.span
                key={tech}
                variants={fadeUp}
                transition={transition}
                className="px-4 py-2 rounded-full border border-[#e8a020]/30 bg-cream text-sm text-sunrise"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-cream border-t border-[#e8a020]/15">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3"><b>Our Commitment</b></p>
            <h2 className="text-3xl font-bold text-ink mb-6">Quality, Innovation &amp; Long-Term Value</h2>
            <p className="text-muted leading-relaxed mb-4">
              We partner with clients to deliver intelligent, scalable, and future-ready SAP supply
              chain solutions that improve operational performance, enable warehouse automation,
              and support sustainable business growth.
            </p>
            <p className="text-muted leading-relaxed">
              Mayukhaditya Private Limited is committed to delivering quality, innovation, and
              long-term value through technology-driven transformation.
            </p>
          </motion.div>
        </div>
      </section>

      <CTA />
    </motion.div>
  )
}

export default About
