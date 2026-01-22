import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface NavigationProps {
  minimal?: boolean;
}

export default function Navigation({ minimal }: NavigationProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClass = (path: string) =>
    currentPath === path
      ? "text-blue-400 font-medium"
      : "text-slate-300 hover:text-blue-400 transition-colors";

  return (
    <nav className="border-b border-blue-500/20 backdrop-blur-sm bg-slate-950/90 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="Gravity Train" className="h-9 w-auto" />
          <span className="text-xl font-light tracking-wide text-white">
            Gravity<span className="text-blue-400">Train</span>
          </span>
        </Link>
        {minimal ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/concepts" className="text-slate-300 hover:text-blue-400 transition-colors text-sm hidden sm:block">Concepts</Link>
            <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 text-xs sm:text-sm px-2 sm:px-4">
                <span className="hidden sm:inline">Book Tickets</span>
                <span className="sm:hidden">Book</span>
                <ExternalLink className="ml-1 sm:ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-6 font-mono text-sm">
              <Link to="/worm-status" className={`${linkClass("/worm-status")} flex items-center gap-2`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Status
              </Link>
              <Link to="/simulation" className={linkClass("/simulation")}>Simulation</Link>
              <Link to="/concepts" className={linkClass("/concepts")}>Concepts</Link>
              <Link to="/about" className={linkClass("/about")}>About</Link>
            </div>
            <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono text-xs sm:text-sm px-2 sm:px-4">
                <span className="hidden sm:inline">Book Tickets</span>
                <span className="sm:hidden">Book</span>
                <ExternalLink className="ml-1 sm:ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
