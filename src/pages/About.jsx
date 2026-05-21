import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const values = [
  { title: "Excellence", desc: "Rigorous SAP standards on every implementation, migration, and support engagement." },
  { title: "Integrity", desc: "Transparent delivery, honest timelines, and trusted advisor relationships with clients." },
  { title: "Innovation", desc: "Embracing SAP BTP, AI-enabled processes, and clean-core extensibility." },
  { title: "Partnership", desc: "Collaborative co-delivery models aligned with your internal IT and business teams." },
]

const milestones = [
  { year: "2012", event: "Founded as a boutique SAP consulting firm." },
  { year: "2016", event: "Expanded S/4HANA practice and first Fortune 500 go-live." },
  { year: "2020", event: "Launched global delivery center and SAP BTP practice." },
  { year: "2024", event: "150+ SAP projects across manufacturing, retail, and pharma." },
]

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="About Mayukha"
        title="Driving SAP Transformation Worldwide"
        subtitle="We are a dedicated SAP solutions company helping enterprises modernize ERP, embrace the cloud, and unlock operational excellence."
      />

      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-4">Our Mission</p>
            <h2 className="text-3xl font-bold text-white mb-6">
              Empowering enterprises through intelligent SAP solutions
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Mayukha was built on a single belief: every enterprise deserves a world-class SAP
              partner that combines deep functional knowledge with cutting-edge technical delivery.
            </p>
            <p className="text-muted leading-relaxed">
              From SAP ECC landscapes to greenfield S/4HANA on RISE with SAP, we guide clients
              through complex transformations with proven Activate methodologies, certified consultants,
              and a relentless focus on business outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl border border-[#e8a020]/20 bg-gradient-to-br from-smoke to-charcoal"
          >
            <p className="text-5xl font-bold text-sunrise mb-2">12+</p>
            <p className="text-white font-semibold text-lg mb-4">Years of SAP Excellence</p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex gap-2"><span className="text-sunrise">✓</span> SAP Gold Partner ecosystem alignment</li>
              <li className="flex gap-2"><span className="text-sunrise">✓</span> Cross-industry domain expertise</li>
              <li className="flex gap-2"><span className="text-sunrise">✓</span> Certified S/4HANA &amp; BTP architects</li>
              <li className="flex gap-2"><span className="text-sunrise">✓</span> ISO-aligned delivery governance</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-charcoal border-t border-[#e8a020]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="text-center mb-14"
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Our Values</p>
            <h2 className="text-3xl font-bold text-white">What Defines Us</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                transition={transition}
                className="p-6 rounded-xl border border-[#e8a020]/15 bg-smoke"
              >
                <h3 className="text-sunrise font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-ink">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="text-center mb-12"
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Our Journey</p>
            <h2 className="text-3xl font-bold text-white">Company Milestones</h2>
          </motion.div>

          <div className="space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ ...transition, delay: i * 0.1 }}
                className="flex gap-8 py-6 border-l-2 border-[#e8a020]/30 pl-8 relative"
              >
                <span className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-gold" />
                <span className="text-sunrise font-bold text-lg w-16 shrink-0">{m.year}</span>
                <p className="text-muted">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </motion.div>
  )
}

export default About
