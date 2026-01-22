import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Menu, X } from "lucide-react";

interface NavigationProps {
  minimal?: boolean;
}

export default function Navigation({ minimal }: NavigationProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (path: string) =>
    currentPath === path
      ? "text-blue-400 font-medium"
      : "text-slate-300 hover:text-blue-400 transition-colors";

  const mobileLinkClass = (path: string) =>
    currentPath === path
      ? "text-blue-400 font-medium bg-blue-500/10"
      : "text-slate-300 hover:text-blue-400 hover:bg-blue-500/5";

  const navLinks = [
    { path: "/worm-status", label: "Status", hasIndicator: true },
    { path: "/simulation", label: "Simulation" },
    { path: "/concepts", label: "Concepts" },
    { path: "/history", label: "History" },
    { path: "/about", label: "About" },
  ];

  return (
    <>
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
                {navLinks.map(({ path, label, hasIndicator }) => (
                  <Link key={path} to={path} className={`${linkClass(path)} flex items-center gap-2`}>
                    {hasIndicator && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                    )}
                    {label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 bg-blue-500 text-white rounded"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
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

      {!minimal && (
        <>
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-72 bg-slate-950 border-l border-blue-500/20 z-50 transform transition-transform duration-300 ease-out md:hidden ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
              <span className="text-lg font-light text-white">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col py-4">
              {navLinks.map(({ path, label, hasIndicator }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${mobileLinkClass(path)} flex items-center gap-3 px-6 py-4 font-mono text-sm transition-colors`}
                >
                  {hasIndicator && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                  )}
                  {label}
                </Link>
              ))}
              <div className="px-6 pt-6">
                <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono">
                    Book Tickets
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
