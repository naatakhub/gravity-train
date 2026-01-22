import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-blue-500/20 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.png" alt="Gravity Train" className="h-9 w-auto" />
            <span className="text-xl font-light tracking-wide text-white">
              Gravity<span className="text-blue-400">Train</span>
            </span>
          </div>
          <div className="flex items-center gap-6 font-mono text-sm">
            <Link to="/worm-status" className="text-slate-400 hover:text-blue-400 transition-colors">Status</Link>
            <Link to="/simulation" className="text-slate-400 hover:text-blue-400 transition-colors">Simulation</Link>
            <Link to="/concepts" className="text-slate-400 hover:text-blue-400 transition-colors">Concepts</Link>
            <Link to="/history" className="text-slate-400 hover:text-blue-400 transition-colors">History</Link>
            <Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About</Link>
            <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">Naatak</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-500/10 text-center">
          <p className="text-blue-900 text-xs font-mono tracking-wide">
            AN INTERACTIVE LOBBY EXPERIENCE FOR "HOLE" — A NAATAK PRODUCTION © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
