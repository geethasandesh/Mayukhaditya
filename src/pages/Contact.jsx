import { useState } from "react"
import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const contactInfo = [
  { label: "Email", value: "contact@mayukha.com", href: "mailto:contact@mayukha.com" },
  { label: "Phone", value: "+1 (800) 555-0199", href: "tel:+18005550199" },
  { label: "HQ", value: "Hyderabad, India · Global Delivery", href: null },
]

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="Contact Us"
        title="Start Your SAP Transformation"
        subtitle="Tell us about your SAP landscape, timeline, and goals. Our consultants will respond within one business day."
      />

      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16">
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            <motion.div variants={fadeUp} transition={transition}>
              <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-muted text-sm leading-relaxed">
                Whether you need S/4HANA migration support, SAP AMS, or a full ERP transformation
                partner — we are ready to help.
              </p>
            </motion.div>

            {contactInfo.map((item) => (
              <motion.div key={item.label} variants={fadeUp} transition={transition}>
                <p className="text-sunrise text-xs uppercase tracking-wider mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white hover:text-sunrise transition">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white">{item.value}</p>
                )}
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="p-5 rounded-xl border border-[#e8a020]/20 bg-smoke"
            >
              <p className="text-sm text-muted">
                <span className="text-sunrise font-semibold">SAP Inquiry Types:</span> S/4HANA,
                ECC Migration, BTP, Fiori, AMS, BASIS, Analytics
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
          >
            {submitted ? (
              <div className="p-10 rounded-2xl border border-[#e8a020]/30 bg-smoke text-center">
                <p className="text-3xl text-sunrise mb-3">✓</p>
                <h3 className="text-xl font-bold text-white mb-2">Message Received</h3>
                <p className="text-muted text-sm">
                  Thank you for reaching out. A Mayukha SAP consultant will contact you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-2xl border border-[#e8a020]/20 bg-charcoal space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-smoke border border-[#e8a020]/20 text-white placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Company</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-smoke border border-[#e8a020]/20 text-white placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Email</label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-smoke border border-[#e8a020]/20 text-white placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">SAP Interest</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-smoke border border-[#e8a020]/20 text-white focus:outline-none focus:border-[#e8a020] transition">
                      <option>S/4HANA Implementation</option>
                      <option>ECC to S/4 Migration</option>
                      <option>SAP BTP & Integration</option>
                      <option>SAP AMS & Support</option>
                      <option>RISE with SAP Advisory</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-smoke border border-[#e8a020]/20 text-white placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition resize-none"
                    placeholder="Describe your SAP project or support needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sunrise text-black py-3.5 rounded-lg font-semibold hover:brightness-110 transition"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
