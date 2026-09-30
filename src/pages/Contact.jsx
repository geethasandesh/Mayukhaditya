import { useState } from "react"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import PageHero from "../components/PageHero"
const offices = [
  {
    id: "india",
    legalName: "Mayukhaditya Private Limited",
    city: "Hyderabad",
    address: "F No-201, P No-1103 & 1104, Avantika's Vasista, Hafeezpet, Hyderabad – 500049, Telangana, India",
    mapsQuery: "Avantika's Vasista, Hafeezpet, Hyderabad",
    email: "info@mayukhaditya.com"
  },
  {
    id: "dubai",
    legalName: "Mayukhaditya LLC",
    city: "Dubai",
    address: "Buhaleeba Plaza 503A, Plot 256-0, Al Murqabat Street, Deira, Dubai, United Arab Emirates",
    mapsQuery: "Buhaleeba Plaza, Al Murqabat Street, Deira, Dubai",
    email: "info@mayukhaditya.com"
  }
];

const getMapsUrl = (query) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};
import { fadeUp, staggerContainer, transition, viewport } from "../utils/motion"

/* ─── JSON-LD structured data ─── */
const buildJsonLd = () => {
  const entries = offices.map((o) => {
    const entry = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: o.legalName,
      address: {
        "@type": "PostalAddress",
        streetAddress: o.address,
        addressLocality: o.city,
      },
    }
    if (o.email) entry.email = o.email
    if (o.phone) entry.telephone = o.phone
    if (o.hours) entry.openingHours = o.hours
    return entry
  })
  return JSON.stringify(entries)
}

/* ─── Office Card ─── */
const OfficeCard = ({ office }) => (
  <motion.div
    variants={fadeUp}
    transition={transition}
    className="p-8 rounded-2xl border border-[#e8a020]/20 bg-cream flex flex-col h-full"
  >
    <h3 className="text-2xl font-bold text-ink mb-1">{office.city}</h3>
    <p className="text-sm text-muted mb-6">{office.legalName}</p>

    <address className="not-italic space-y-4 text-sm text-ink flex-1">
      {office.email && (
        <div className="flex gap-3 items-center">
          <span className="text-sunrise"><EmailIcon /></span>
          <a
            href={`mailto:${office.email}`}
            className="hover:text-sunrise transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020] rounded"
          >
            {office.email}
          </a>
        </div>
      )}

      {office.hours && (
        <div className="flex gap-3 items-center">
          <span className="text-sunrise"><ClockIcon /></span>
          <span>
            {office.hours}
            {office.timezone && <span className="text-muted ml-1">({office.timezone})</span>}
          </span>
        </div>
      )}
    </address>


  </motion.div>
)

const contactInfo = [
  { label: "Company", value: "Mayukhaditya Private Limited", href: null },
  { label: "Email", value: "info@mayukhaditya.com", href: "mailto:info@mayukhaditya.com" },
  { label: "Focus", value: "SAP Digital Supply Chain · EWM · Warehouse Automation", href: null },
]

const OfficeListItem = ({ office }) => {
  return (
    <div className="py-5 border-b border-[#e8a020]/15 last:border-0 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-ink font-bold text-lg">{office.city === 'Hyderabad' ? 'India' : office.city}</span>
        <div className="flex items-center gap-4">
          <a href="mailto:info@mayukhaditya.com" className="text-ink hover:underline text-sm font-medium">
            info@mayukhaditya.com
          </a>

        </div>
      </div>
      
      <div>
        <p className="text-sm text-muted leading-relaxed">
          {office.id === 'india' 
            ? "F No - 201, P No - 1103 & 1104, Avantika's Vasista, Hafeezpet, Hyderabad – 500049, Telangana, India" 
            : office.address}
        </p>
      </div>
    </div>
  )
}

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Helmet>
        <script type="application/ld+json">{buildJsonLd()}</script>
      </Helmet>

      <PageHero
        label="Contact Us"
        title="Start Your Supply Chain Transformation"
        subtitle="Tell us about your warehouse, logistics, or SAP landscape. Our consultants will help you identify the right digital supply chain path."
      />

      <section className="py-24 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 xl:gap-20">
          
          {/* Left Column: Info & Offices */}
          <motion.div
            className="space-y-16"
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
          >
            {/* Get in Touch Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-ink mb-4"><b>Get in Touch</b></h2>
                <p className="text-muted text-sm leading-relaxed max-w-lg">
                  Whether you need SAP EWM implementation, warehouse automation, production
                  warehouse integration, or AMS support — we are ready to help.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label}>
                    <p className="text-sunrise text-xs uppercase tracking-wider mb-1 font-bold">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-ink hover:text-sunrise transition font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-ink font-medium">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl border border-[#e8a020]/25 bg-cream max-w-lg">
                <p className="text-sm text-muted">
                  <span className="text-sunrise font-semibold">Inquiry Types:</span> SAP EWM,
                  Warehouse Automation, S/4HANA Supply Chain, Technical Development, AMS Support
                </p>
              </div>
            </div>

            {/* Our Offices */}
            <div>
              <div className="mb-6">
                <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3">
                  <b>Our Offices</b>
                </p>
              </div>

              <div className="flex flex-col">
                {offices.map((office) => (
                  <OfficeListItem key={office.id} office={office} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="lg:pt-0"
          >
            <div className="sticky top-32">
              <div className="mb-8">
                <p className="text-sunrise uppercase tracking-[0.25em] text-sm mb-3"><b>Send a Message</b></p>
                <h2 className="text-3xl font-bold text-ink mb-4">Reach Out to Us</h2>
              </div>

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
                      <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Name</b></label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Company</b></label>
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
                      <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Email</b></label>
                      <input
                        required
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Interest</b></label>
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
                    <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Message</b></label>
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
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
