import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

export const sapServices = [
  {
    icon: "01",
    title: "SAP S/4HANA Implementation",
    desc: "Greenfield and brownfield migrations with SAP Activate methodology and clean-core architecture.",
  },
  {
    icon: "02",
    title: "ECC to S/4HANA Migration",
    desc: "Selective data transition, system conversion, and landscape consolidation for legacy ECC estates.",
  },
  {
    icon: "03",
    title: "SAP BTP & Integration",
    desc: "Cloud Platform Integration, API management, and extension development on SAP Business Technology Platform.",
  },
  {
    icon: "04",
    title: "SAP Fiori & UX",
    desc: "Modern role-based UX with Fiori launchpad design, custom apps, and mobile-enabled workflows.",
  },
  {
    icon: "05",
    title: "SAP Analytics & BW/4HANA",
    desc: "Embedded analytics, SAC, and data warehouse modernization for real-time enterprise insights.",
  },
  {
    icon: "06",
    title: "SAP BASIS & Security",
    desc: "System administration, HANA tuning, transport management, GRC, and security hardening.",
  },
  {
    icon: "07",
    title: "SAP AMS & Support",
    desc: "Application management services with SLA-driven incident, change, and enhancement support.",
  },
  {
    icon: "08",
    title: "RISE with SAP Advisory",
    desc: "Cloud ERP strategy, subscription modeling, and transformation roadmaps for RISE adoption.",
  },
]

const Services = ({ limit, showLink = true }) => {
  const items = limit ? sapServices.slice(0, limit) : sapServices

  return (
    <section className="py-24 bg-paper" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={fadeUp}
          transition={transition}
          className="text-center mb-16"
        >
          <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">SAP Capabilities</p>
          <h2 className="text-4xl font-bold text-ink mb-4">Our SAP Services</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Full-spectrum SAP consulting — from strategy and implementation to managed operations.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
        >
          {items.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              transition={transition}
              className="group p-6 rounded-xl border border-[#e8a020]/20 bg-cream hover:border-[#e8a020]/45 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-sunrise/70 text-sm font-mono">{service.icon}</span>
              <h3 className="text-lg font-semibold text-ink mt-3 mb-2 group-hover:text-sunrise transition">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {showLink && limit && (
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex border border-[#e8a020]/50 text-sunrise px-8 py-3 rounded-lg font-semibold hover:bg-[#e8a020]/10 transition"
            >
              View All SAP Services
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Services
