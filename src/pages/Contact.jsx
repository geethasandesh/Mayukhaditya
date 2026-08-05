import { useState } from "react"
import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

const contactInfo = [
  { label: "Company", value: "Mayukhaditya Private Limited", href: null },
  { label: "Email", value: "contact@mayukhaditya.com", href: "mailto:contact@mayukhaditya.com" },
  { label: "Focus", value: "SAP Digital Supply Chain · EWM · Warehouse Automation", href: null },
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
        title="Start Your Supply Chain Transformation"
        subtitle="Tell us about your warehouse, logistics, or SAP landscape. Our consultants will help you identify the right digital supply chain path."
      />

      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16">
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            <motion.div variants={fadeUp} transition={transition}>
              <h2 className="text-2xl font-bold text-ink mb-4">Get in Touch</h2>
              <p className="text-muted text-sm leading-relaxed">
                Whether you need SAP EWM implementation, warehouse automation, production
                warehouse integration, or AMS support — we are ready to help.
              </p>
            </motion.div>

            {contactInfo.map((item) => (
              <motion.div key={item.label} variants={fadeUp} transition={transition}>
                <p className="text-sunrise text-xs uppercase tracking-wider mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-ink hover:text-sunrise transition">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-ink">{item.value}</p>
                )}
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="p-5 rounded-xl border border-[#e8a020]/25 bg-cream"
            >
              <p className="text-sm text-muted">
                <span className="text-sunrise font-semibold">Inquiry Types:</span> SAP EWM,
                Warehouse Automation, S/4HANA Supply Chain, Technical Development, AMS Support
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
              <div className="p-10 rounded-2xl border border-[#e8a020]/30 bg-cream text-center">
                <p className="text-3xl text-sunrise mb-3">✓</p>
                <h3 className="text-xl font-bold text-ink mb-2">Message Received</h3>
                <p className="text-muted text-sm">
                  Thank you for reaching out. A Mayukhaditya consultant will contact you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-2xl border border-[#e8a020]/25 bg-cream space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Company</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
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
                      className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Interest</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink focus:outline-none focus:border-[#e8a020] transition">
                      <option>SAP EWM Implementation</option>
                      <option>Warehouse Automation</option>
                      <option>SAP S/4HANA Supply Chain</option>
                      <option>SAP Technical Services</option>
                      <option>Managed Services / AMS</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-sunrise uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition resize-none"
                    placeholder="Describe your warehouse, logistics, or SAP project needs..."
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
