import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Activity, Play, Lightbulb, BookOpen, Info } from "lucide-react";

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

  const navLinks = [
    { path: "/worm-status", label: "Worm Status", icon: Activity, hasIndicator: true },
    { path: "/simulation", label: "Sim", icon: Play },
    { path: "/concepts", label: "Concepts", icon: Lightbulb },
    { path: "/history", label: "History", icon: BookOpen },
    { path: "/about", label: "About", icon: Info },
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
              <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono text-xs sm:text-sm px-2 sm:px-4">
                  <span className="hidden sm:inline">Book Tickets</span>
                  <span className="sm:hidden">Tickets</span>
                  <ExternalLink className="ml-1 sm:ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </nav>

      {!minimal && (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-blue-500/20 z-50 md:hidden safe-area-bottom">
          <div className="flex justify-around items-center py-2 px-1">
            {navLinks.map(({ path, label, icon: Icon, hasIndicator }) => {
              const isActive = currentPath === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                    isActive
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-slate-400 active:bg-slate-800"
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {hasIndicator && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
