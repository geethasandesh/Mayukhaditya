import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t border-[#e8a020]/20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded border border-[#e8a020]/40 flex items-center justify-center text-sunrise font-bold text-sm">
              M
            </span>
            <span className="text-xl font-bold tracking-widest text-ink">MAYUKHA</span>
          </Link>
          <p className="text-muted text-sm max-w-md leading-relaxed">
            Enterprise SAP solutions partner specializing in S/4HANA transformation,
            cloud migration, and managed application services worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/" className="hover:text-sunrise transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-sunrise transition">Services</Link></li>
            <li><Link to="/sap-modules" className="hover:text-sunrise transition">SAP Modules</Link></li>
            <li><Link to="/industries" className="hover:text-sunrise transition">Industries</Link></li>
            <li><Link to="/about" className="hover:text-sunrise transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-sunrise transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-4">SAP Focus</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>S/4HANA Implementation</li>
            <li>ECC Migration</li>
            <li>SAP BTP &amp; Fiori</li>
            <li>AMS &amp; BASIS Support</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e8a020]/15 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Mayukha SAP Solutions. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
