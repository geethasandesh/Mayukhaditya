import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const modules = [
  { code: "FI/CO", name: "Financial Accounting & Controlling", desc: "General ledger, accounts payable/receivable, asset accounting, cost centers, and profitability analysis." },
  { code: "MM", name: "Materials Management", desc: "Procurement, inventory management, vendor evaluation, and material master governance." },
  { code: "SD", name: "Sales & Distribution", desc: "Order-to-cash, pricing, billing, shipping, and customer master management." },
  { code: "PP", name: "Production Planning", desc: "MRP, capacity planning, shop floor control, and manufacturing order execution." },
  { code: "QM", name: "Quality Management", desc: "Inspection plans, quality notifications, and certificates in regulated industries." },
  { code: "PM", name: "Plant Maintenance", desc: "Preventive maintenance, work orders, equipment history, and shutdown planning." },
  { code: "HR/HCM", name: "Human Capital Management", desc: "Organizational management, payroll integration, time management, and talent processes." },
  { code: "WM/EWM", name: "Warehouse Management", desc: "Inbound/outbound logistics, slotting, wave picking, and extended warehouse processes." },
  { code: "PS", name: "Project Systems", desc: "Project structures, networks, milestones, and revenue recognition for project-centric businesses." },
  { code: "TM", name: "Transportation Management", desc: "Freight planning, carrier selection, shipment execution, and logistics charge management." },
]

const SapModules = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="SAP Modules"
        title="Deep Functional Expertise Across SAP"
        subtitle="Certified consultants for every core SAP module — from finance and logistics to HR and warehouse management."
      />

      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {modules.map((mod) => (
              <motion.div
                key={mod.code}
                variants={fadeUp}
                transition={transition}
                className="p-6 rounded-xl border border-[#e8a020]/15 bg-smoke hover:border-[#e8a020]/35 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 px-3 py-1 text-xs font-bold text-ink bg-sunrise rounded">
                    {mod.code}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{mod.name}</h3>
                    <p className="text-sm text-muted leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTA title="Need expertise in a specific SAP module?" />
    </motion.div>
  )
}

export default SapModules
