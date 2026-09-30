import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

export const sapServices = [
  {
    title: "SAP S/4HANA Supply Chain",
    desc: "End-to-end supply chain design and delivery on SAP S/4HANA for logistics, inventory, and operations excellence.",
  },
  {
    title: "SAP Extended Warehouse Management",
    desc: "Basic and Advanced EWM — RF frameworks, HU management, putaway, picking, and warehouse billing.",
  },
  {
    title: "Warehouse Automation",
    desc: "Conveyor, WCS, MFS, RFID, barcode, PLC, pick-to-light, and automated label printing integrations.",
  },
  {
    title: "SAP Materials Management",
    desc: "Procurement, inventory governance, and materials processes tightly aligned with warehouse operations.",
  },
  {
    title: "SAP Yard Logistics & Billing",
    desc: "Yard logistics and warehouse billing solutions that streamline inbound, outbound, and charge processes.",
  },
  {
    title: "SAP Fiori Applications",
    desc: "Role-based Fiori experiences that simplify warehouse and supply chain execution for end users.",
  },
  {
    title: "SAP Technical Services",
    desc: "ABAP on HANA, CDS, RAP, OData, Adobe/Smart Forms, IDoc/REST/SOAP/RFC interfaces, and BAdI enhancements.",
  },
  {
    title: "Managed Services & AMS",
    desc: "Application monitoring, incident resolution, performance tuning, production support, and release management.",
  },
]

const Services = ({ limit, showLink = true }) => {
  const items = limit ? sapServices.slice(0, limit) : sapServices
  const navigate = useNavigate()

  const handleViewAll = () => {
    navigate("/services")
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 50)
  }

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
          <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3"><b>Our Services</b></p>
          <h2 className="text-4xl font-bold text-ink mb-4">SAP Digital Supply Chain Services</h2>
          <p className="text-muted max-w-2xl mx-auto">
            From SAP consulting and warehouse automation to technical development and managed support.
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
              <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-sunrise transition">
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
            <button
              onClick={handleViewAll}
              className="inline-flex border border-[#e8a020]/50 text-sunrise px-8 py-3 rounded-lg font-semibold hover:bg-[#e8a020]/10 transition cursor-pointer"
            >
              View All Services
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Services
