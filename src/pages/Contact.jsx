import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Turnstile } from "@marsidev/react-turnstile"
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

import { fadeUp, transition, viewport } from "../utils/motion"

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

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    interest: 'SAP EWM Implementation',
    message: '',
    hp_ref_code: '', // honeypot
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [turnstileToken, setTurnstileToken] = useState(null)
  const turnstileRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTurnstileSuccess = useCallback((token) => {
    setTurnstileToken(token)
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null)
  }, [])

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit your message. Please try again or email us directly at info@mayukhaditya.com.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Unable to connect to the server. Please check your internet connection or email us directly at info@mayukhaditya.com.')
      // Reset turnstile on failure so the user can retry
      setTurnstileToken(null)
      turnstileRef.current?.reset()
    } finally {
      setLoading(false)
    }
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
                  <div className="w-12 h-12 rounded-full bg-sunrise flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">Message Received</h3>
                  <p className="text-muted text-sm max-w-md mx-auto mb-6">
                    Thank you for reaching out. We have received your inquiry and sent a confirmation email to <strong>{formData.email}</strong>. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        interest: 'SAP EWM Implementation',
                        message: '',
                        hp_ref_code: '',
                      })
                      setTurnstileToken(null)
                      turnstileRef.current?.reset()
                    }}
                    className="text-xs text-sunrise hover:underline font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 md:p-10 rounded-2xl border border-[#e8a020]/25 bg-cream space-y-5"
                >
                  {/* Honeypot – visually hidden, traps bots */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="hp_ref_code">Ref Code</label>
                    <input
                      type="text"
                      id="hp_ref_code"
                      name="hp_ref_code"
                      value={formData.hp_ref_code}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      data-lpignore="true"
                      data-1p-ignore
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Name</b></label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Company</b></label>
                      <input
                        required
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-sunrise uppercase tracking-wider mb-2"><b>Interest</b></label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink focus:outline-none focus:border-[#e8a020] transition"
                      >
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
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-paper border border-[#e8a020]/25 text-ink placeholder:text-muted focus:outline-none focus:border-[#e8a020] transition resize-none"
                      placeholder="Describe your warehouse, logistics, or SAP project needs..."
                    />
                  </div>

                  {/* Cloudflare Turnstile widget */}
                  {TURNSTILE_SITE_KEY && (
                    <div className="flex justify-center">
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={TURNSTILE_SITE_KEY}
                        onSuccess={handleTurnstileSuccess}
                        onError={handleTurnstileError}
                        onExpire={handleTurnstileExpire}
                        options={{ theme: 'light', size: 'normal' }}
                      />
                    </div>
                  )}

                  {error && (
                    <div
                      role="alert"
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300 text-xs md:text-sm leading-relaxed"
                    >
                      <p className="font-semibold mb-1 text-red-800 dark:text-red-200">Unable to send message</p>
                      <p>{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || (TURNSTILE_SITE_KEY && !turnstileToken)}
                    className="w-full bg-[#e8a020] bg-sunrise text-black py-3.5 rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Inquiry...
                      </>
                    ) : (
                      'Send Inquiry'
                    )}
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
