import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const EARTH_RADIUS_KM = 6371;
const TUNNEL_LENGTH_KM = 11306; // Cupertino-Delhi chord (non-antipodal points)
const MAX_DEPTH_KM = 3430; // Deepest point reaches outer core boundary
const CURRENT_PROGRESS_KM = 9656; // Distance drilled so far (~85%)

function calculateCurrentDepth(progressKm: number): number {
  const halfTunnel = TUNNEL_LENGTH_KM / 2;
  const distFromMidpoint = Math.abs(progressKm - halfTunnel);
  const minDistFromCenter = EARTH_RADIUS_KM - MAX_DEPTH_KM;
  const distFromCenter = Math.sqrt(distFromMidpoint * distFromMidpoint + minDistFromCenter * minDistFromCenter);
  return Math.max(0, EARTH_RADIUS_KM - distFromCenter);
}

function HolographicDisplay() {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const cycleDuration = 12000;

    const animate = () => {
      const elapsed = Date.now();
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;

      const eased = cycleProgress < 0.5
        ? 2 * cycleProgress * cycleProgress
        : 1 - Math.pow(-2 * cycleProgress + 2, 2) / 2;

      setDisplayProgress(Math.floor(eased * CURRENT_PROGRESS_KM));
      setScanLine((elapsed / 4000) % 1);
      setTime(new Date());
      requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const progressPercent = (displayProgress / TUNNEL_LENGTH_KM) * 100;
  const currentDepth = calculateCurrentDepth(displayProgress);

  const tunnelY = 115;
  const startX = 67, endX = 433;
  const wormX = startX + ((endX - startX) * progressPercent / 100);

  return (
    <div className="relative">
      {/* Holographic Frame */}
      <div className="relative bg-slate-950/90 rounded-sm overflow-hidden border border-blue-500/30">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/70" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400/70" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/70" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400/70" />

        {/* Scan line effect */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent pointer-events-none"
          style={{ top: `${scanLine * 100}%` }}
        />

        {/* Main visualization */}
        <div className="p-4 sm:p-8">
          <svg className="w-full" viewBox="0 0 500 320">
            <defs>
              <linearGradient id="holoGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Subtle grid */}
            {[...Array(11)].map((_, i) => (
              <line key={`v${i}`} x1={50 + i * 40} y1="40" x2={50 + i * 40} y2="240" stroke="#3B82F6" strokeWidth="0.3" opacity="0.2" />
            ))}
            {[...Array(6)].map((_, i) => (
              <line key={`h${i}`} x1="50" y1={40 + i * 40} x2="450" y2={40 + i * 40} stroke="#3B82F6" strokeWidth="0.3" opacity="0.2" />
            ))}

            {/* Earth cross-section */}
            <ellipse cx="250" cy="140" rx="190" ry="95" fill="none" stroke="#1E3A5F" strokeWidth="1.5" opacity="0.6" />
            <ellipse cx="250" cy="140" rx="140" ry="70" fill="none" stroke="#B45309" strokeWidth="1" opacity="0.5" />
            <ellipse cx="250" cy="140" rx="60" ry="30" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.7" />

            {/* Layer fills */}
            <ellipse cx="250" cy="140" rx="60" ry="30" fill="#F59E0B" opacity="0.2" />

            {/* Tunnel path - offset chord */}
            <line x1={startX} y1={tunnelY} x2={endX} y2={tunnelY} stroke="#1E3A5F" strokeWidth="2" />

            {/* Progress line with glow */}
            <line x1={startX} y1={tunnelY} x2={wormX} y2={tunnelY} stroke="#3B82F6" strokeWidth="2" filter="url(#glow)" />

            {/* Origin point */}
            <circle cx={startX} cy={tunnelY} r="6" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
            <circle cx={startX} cy={tunnelY} r="2" fill="#3B82F6" />

            {/* Destination point */}
            <circle cx={endX} cy={tunnelY} r="6" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />

            {/* The Worm */}
            <g transform={`translate(${wormX}, ${tunnelY})`}>
              <circle cx="0" cy="0" r="12" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.5" filter="url(#glowStrong)" />
              <circle cx="0" cy="0" r="8" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3" fill="#F59E0B" filter="url(#glow)" />
            </g>

            {/* Data labels */}
            <text x={startX} y={tunnelY - 30} fill="#60A5FA" fontSize="9" textAnchor="middle" fontFamily="monospace" letterSpacing="2">ORIGIN</text>
            <text x={startX} y={tunnelY + 35} fill="#60A5FA" fontSize="11" textAnchor="middle" fontFamily="monospace">CUPERTINO</text>

            <text x={endX} y={tunnelY - 30} fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace" letterSpacing="2">DESTINATION</text>
            <text x={endX} y={tunnelY + 35} fill="#64748B" fontSize="11" textAnchor="middle" fontFamily="monospace">NEW DELHI</text>

            {/* Depth reading */}
            <text x="250" y="280" fill="#60A5FA" fontSize="10" textAnchor="middle" fontFamily="monospace" opacity="0.8">
              DEPTH {currentDepth.toLocaleString()} KM • PROGRESS {displayProgress.toLocaleString()} KM
            </text>

            {/* Technical annotations */}
            <text x="250" y="55" fill="#64748B" fontSize="8" textAnchor="middle" fontFamily="monospace" letterSpacing="1">CRUST</text>
            <text x="250" y="90" fill="#B45309" fontSize="8" textAnchor="middle" fontFamily="monospace" letterSpacing="1" opacity="0.7">MANTLE</text>
            <text x="250" y="145" fill="#F59E0B" fontSize="8" textAnchor="middle" fontFamily="monospace" letterSpacing="1" opacity="0.9">CORE</text>
          </svg>
        </div>

        {/* Bottom data strip */}
        <div className="border-t border-blue-500/30 bg-blue-950/30 px-4 sm:px-8 py-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 font-mono text-xs">
            <div>
              <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs">Progress</span>
              <p className="text-blue-300 text-base sm:text-lg mt-1">{progressPercent.toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs">Velocity</span>
              <p className="text-blue-300 text-base sm:text-lg mt-1">2.7 km/d</p>
            </div>
            <div>
              <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs">Temp</span>
              <p className="text-amber-400 text-base sm:text-lg mt-1">4,300°C</p>
            </div>
            <div>
              <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs">ETA</span>
              <p className="text-blue-300 text-base sm:text-lg mt-1">~1.7 yr</p>
            </div>
            <div className="col-span-2 sm:col-span-1 sm:text-right">
              <span className="text-blue-400 uppercase tracking-wider text-[10px] sm:text-xs">Time</span>
              <p className="text-blue-300 text-base sm:text-lg mt-1">{time.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WormStatus() {
  return (
    <div className="min-h-screen bg-slate-950 pb-mobile-nav">
      <Navigation />

      <section className="relative py-12">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em]">Live Telemetry</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extralight text-white tracking-wide">
              TBM-42 <span className="text-blue-400">"The Worm"</span>
            </h1>
            <p className="text-blue-300 font-mono text-sm mt-2 tracking-wide">
              TRANSTERRESTRIAL BORING MACHINE • CUPERTINO–DELHI CORRIDOR
            </p>
          </div>

          <HolographicDisplay />

          {/* Mission data */}
          <div className="mt-8 border border-blue-500/20 bg-slate-900/50">
            <div className="border-b border-blue-500/20 px-6 py-3">
              <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.2em]">Mission Chronicle</span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3">
              <div className="flex gap-3 sm:gap-6 text-blue-500">
                <span className="w-12 sm:w-16 flex-shrink-0">1988</span>
                <span className="text-slate-400">Channel Tunnel TBM decommissioned • 50 km completed</span>
              </div>
              <div className="flex gap-3 sm:gap-6 text-blue-500">
                <span className="w-12 sm:w-16 flex-shrink-0">2024</span>
                <span className="text-slate-400">Acquisition by Project Hole • Thermal retrofit initiated</span>
              </div>
              <div className="flex gap-3 sm:gap-6 text-blue-500">
                <span className="w-12 sm:w-16 flex-shrink-0">2025</span>
                <span className="text-slate-400">Boring commenced from Cupertino Station Alpha</span>
              </div>
              <div className="flex gap-3 sm:gap-6 text-blue-300">
                <span className="w-12 sm:w-16 flex-shrink-0">NOW</span>
                <span className="text-white">Ascending through mantle • 9,656 km drilled</span>
              </div>
            </div>
            <div className="border-t border-blue-500/20 px-6 py-3">
              <p className="text-blue-500/70 font-mono text-xs italic">
                "Move fast and drill things."
              </p>
            </div>
          </div>

          {/* Metric note */}
          <div className="mt-6 border border-blue-500/20 bg-slate-900/50 px-6 py-4">
            <p className="text-blue-300 font-mono text-xs">
              <span className="text-blue-400">SI UNITS:</span> All measurements use the metric system per international scientific standards.
              Transterrestrial engineering requires global coordination—metric ensures precision across all partner nations.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link to="/simulation">
              <Button size="lg" className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono tracking-wide">
                Preview Journey Simulation
                <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
