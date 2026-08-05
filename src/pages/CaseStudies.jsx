import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTA from "../components/CTA"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const caseStudies = [
  {
    title: "High-Volume Warehouse Automation",
    challenge:
      "A large distribution center handling thousands of handling units daily experienced packing mismatches, delayed warehouse processing, and manual intervention due to high transaction volumes.",
    solution: [
      "SAP EWM implementation",
      "WCS Integration",
      "RF Process Optimization",
      "Automated HU Management",
      "Background Processing Optimization",
      "Performance Improvements",
    ],
    results: [
      "99%+ inventory accuracy",
      "Significant reduction in packing mismatches",
      "Improved warehouse throughput",
      "Faster outbound processing",
      "Reduced manual corrections",
      "Stable production performance under peak load",
    ],
  },
  {
    title: "End-to-End Warehouse Management Implementation",
    challenge:
      "The organization needed a complete warehouse management blueprint covering structure, strategies, inventory, and production integration with RF enablement.",
    solution: [
      "Warehouse Structure Configuration",
      "Bin Management",
      "Putaway & Picking Strategies",
      "HU Management",
      "Physical Inventory & Replenishment",
      "Production Integration",
      "RF Enablement",
    ],
    results: [
      "Real-time inventory visibility",
      "Optimized warehouse utilization",
      "Reduced picking time",
      "Improved stock accuracy",
      "Better operational control",
    ],
  },
  {
    title: "SAP EWM and Conveyor Integration",
    challenge:
      "Manual warehouse movements created delays between conveyor systems and SAP, limiting throughput and process reliability.",
    solution: [
      "Real-time SAP-WCS integration",
      "Automated warehouse task creation",
      "Barcode validation",
      "Error handling framework",
      "Exception monitoring",
    ],
    results: [
      "Reduced manual intervention",
      "Faster material movement",
      "Increased process reliability",
      "Improved system visibility",
      "Better warehouse productivity",
    ],
  },
  {
    title: "SAP Production Warehouse Integration",
    challenge:
      "Production continuity depended on reliable warehouse supply, staging, consumption posting, and finished goods receipt processes.",
    solution: [
      "Production Supply",
      "Line Feeding & Staging",
      "Consumption Posting",
      "Finished Goods Receipt",
      "Warehouse Replenishment",
    ],
    results: [
      "Improved production continuity",
      "Reduced material shortages",
      "Better inventory control",
      "Increased warehouse efficiency",
    ],
  },
]

const CaseStudies = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="Case Studies"
        title="Proven Supply Chain Outcomes"
        subtitle="Real engagements where Mayukhaditya delivered SAP EWM, warehouse automation, and production-integrated logistics results."
      />

      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <motion.div
            className="grid gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {caseStudies.map((cs, index) => (
              <motion.article
                key={cs.title}
                variants={fadeUp}
                transition={transition}
                className="rounded-2xl border border-[#e8a020]/20 bg-cream overflow-hidden"
              >
                <div className="border-b border-[#e8a020]/15 px-8 py-6 bg-paper">
                  <p className="text-sunrise text-xs uppercase tracking-[0.25em] mb-2">
                    Case Study {index + 1}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-ink">{cs.title}</h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#e8a020]/15">
                  <div className="p-8">
                    <h3 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-3">
                      Challenge
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{cs.challenge}</p>
                  </div>

                  <div className="p-8">
                    <h3 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-3">
                      Solution
                    </h3>
                    <ul className="space-y-2">
                      {cs.solution.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted">
                          <span className="text-sunrise shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8">
                    <h3 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-3">
                      Results
                    </h3>
                    <ul className="space-y-2">
                      {cs.results.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted">
                          <span className="text-sunrise shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <CTA title="Want similar results for your warehouse?" />
    </motion.div>
  )
}

export default CaseStudies
