import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeUp, transition, viewport } from "../utils/motion"
import { btnSunrise, borderSunrise } from "../utils/gradient"

const CTA = ({
  title = "Ready to transform your digital supply chain?",
  subtitle = "Partner with Mayukhaditya for SAP EWM, warehouse automation, and managed supply chain excellence.",
  showServicesLink = true,
}) => {
  return (
    <section className="py-24 px-6 bg-paper">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={fadeUp}
        transition={transition}
        className={`max-w-5xl mx-auto rounded-2xl border ${borderSunrise} bg-gradient-to-br from-cream to-paper p-10 md:p-14 text-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,160,32,0.08),transparent_70%)]" />
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">{title}</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">{subtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className={`${btnSunrise} px-8 py-3`}>
              Schedule Consultation
            </Link>
            {showServicesLink && (
              <Link
                to="/services"
                className="border border-[#e8a020]/50 text-sunrise px-8 py-3 font-semibold hover:bg-[#e8a020]/10 transition"
              >
                View Our Services
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default CTA
