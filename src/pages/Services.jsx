import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import Services from "../components/Services"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const serviceCategories = [
  {
    title: "SAP Consulting",
    items: [
      "SAP S/4HANA Supply Chain",
      "SAP Extended Warehouse Management (Basic & Advanced)",
      "SAP Materials Management",
      "SAP Yard Logistics",
      "SAP Warehouse Billing",
      "SAP EWM RF Framework",
      "SAP Fiori Applications",
    ],
  },
  {
    title: "Warehouse Automation",
    items: [
      "Conveyor Integration",
      "Warehouse Control System (WCS)",
      "Material Flow System (MFS)",
      "RFID Integration",
      "Barcode Solutions",
      "PLC Integration",
      "Pick-to-Light / Put-to-Light",
      "Automated Label Printing",
    ],
  },
  {
    title: "SAP Technical Services",
    items: [
      "ABAP on HANA",
      "CDS Views",
      "RAP Development",
      "OData Services",
      "Adobe Forms & Smart Forms",
      "Interfaces (IDoc, REST, SOAP, RFC)",
      "Enhancements (BAdI, User Exits)",
      "Performance Optimization",
    ],
  },
  {
    title: "Managed Services",
    items: [
      "AMS Support",
      "Application Monitoring",
      "Incident Resolution",
      "Performance Tuning",
      "Production Support",
      "Release Management",
      "Upgrade Support",
    ],
  },
]

const process = [
  { step: "01", title: "Assess", desc: "Business process assessment of warehouse and supply chain operations." },
  { step: "02", title: "Design", desc: "Solution design and blueprint preparation aligned to business goals." },
  { step: "03", title: "Build", desc: "Configuration, development, and system integration across SAP and automation." },
  { step: "04", title: "Validate", desc: "User acceptance testing and training for operational readiness." },
  { step: "05", title: "Run", desc: "Go-live support, hypercare, and ongoing managed support." },
]

const ServicesPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="Our Services"
        title="SAP Digital Supply Chain Services"
        subtitle="Consulting, warehouse automation, technical development, and managed services — delivered end to end."
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
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Service Catalog</p>
            <h2 className="text-3xl font-bold text-ink">What We Deliver</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {serviceCategories.map((cat) => (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                transition={transition}
                className="p-8 rounded-xl border border-[#e8a020]/20 bg-paper"
              >
                <h3 className="text-xl font-semibold text-sunrise mb-5">{cat.title}</h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="text-sunrise shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
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
            className="text-center mb-14"
          >
            <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">Methodology</p>
            <h2 className="text-3xl font-bold text-ink">Project Delivery Approach</h2>
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
                className="relative p-5 rounded-xl border border-[#e8a020]/20 bg-cream text-center"
              >
                <span className="text-2xl font-bold text-sunrise">{item.step}</span>
                <h3 className="text-ink font-semibold mt-2 mb-2">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTA />
    </motion.div>
  )
}

export default ServicesPage
