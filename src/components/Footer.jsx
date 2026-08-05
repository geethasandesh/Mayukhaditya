import { Link } from "react-router-dom"
import logo from "../assets/logobg.png"

const Footer = () => {
  return (
    <footer className="border-t border-[#e8a020]/20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center mb-4" aria-label="Mayukhaditya home">
            <img
              src={logo}
              alt="Mayukhaditya"
              className="h-[2.7rem] md:h-[3.3rem] w-auto object-contain"
            />
          </Link>
          <p className="text-muted text-sm max-w-md leading-relaxed">
            Mayukhaditya Private Limited specializes in SAP Digital Supply Chain solutions —
            helping organizations optimize warehouse operations, manufacturing logistics,
            transportation, and inventory management.
          </p>
        </div>

        <div>
          <h4 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/" className="hover:text-sunrise transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-sunrise transition">Services</Link></li>
            <li><Link to="/case-studies" className="hover:text-sunrise transition">Case Studies</Link></li>
            <li><Link to="/industries" className="hover:text-sunrise transition">Industries</Link></li>
            <li><Link to="/about" className="hover:text-sunrise transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-sunrise transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-4">Focus Areas</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>SAP S/4HANA Supply Chain</li>
            <li>SAP Extended Warehouse Management</li>
            <li>Warehouse Automation</li>
            <li>AMS &amp; Production Support</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e8a020]/15 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Mayukhaditya Private Limited. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
