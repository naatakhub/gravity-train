import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Timer, TrendingDown, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

function HeroEarthAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 8000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = (elapsed % (duration * 2)) / duration;
      const normalizedProgress = p <= 1 ? p : 2 - p;
      setProgress(normalizedProgress);
      requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const startX = 45, startY = 155;
  const endX = 155, endY = 45;
  const trainX = startX + (endX - startX) * progress;
  const trainY = startY + (endY - startY) * progress;

  const speed = Math.sin(progress * Math.PI) * 23500;
  const timeElapsed = Math.floor(progress * 42);

  return (
    <div className="mt-4 relative">
      <div className="relative h-[600px] flex items-center justify-center">
        <svg className="w-full max-w-3xl h-full" viewBox="0 0 200 200">
          <defs>
            <clipPath id="earthClip">
              <circle cx="100" cy="100" r="88" />
            </clipPath>
            <radialGradient id="atmosphere" cx="50%" cy="50%">
              <stop offset="80%" stopColor="transparent" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="100" r="96" fill="url(#atmosphere)" />

          <image
            href="/earth.jpg"
            x="12"
            y="12"
            width="176"
            height="176"
            clipPath="url(#earthClip)"
            style={{ filter: "brightness(0.9) saturate(1.1)" }}
          />

          <circle cx="100" cy="100" r="88" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />

          <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          <line x1={startX} y1={startY} x2={trainX} y2={trainY} stroke="#facc15" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />

          <circle cx={startX} cy={startY} r="7" fill="#3B82F6" filter="url(#glow)" />
          <circle cx={endX} cy={endY} r="7" fill="#3B82F6" filter="url(#glow)" />

          <circle cx={trainX} cy={trainY} r="7" fill="#f59e0b" filter="url(#glow)" />
          <circle cx={trainX} cy={trainY} r="12" fill="#f59e0b" opacity="0.25" />

          <text x="30" y="172" fill="#94a3b8" fontSize="10" fontWeight="500">Cupertino</text>
          <text x="145" y="35" fill="#94a3b8" fontSize="10" fontWeight="500">New Delhi</text>
        </svg>
      </div>
      <div className="flex justify-center gap-8 mt-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-400">{timeElapsed}:{String(Math.floor((progress * 42 % 1) * 60)).padStart(2, '0')}</p>
          <p className="text-xs text-slate-400 font-mono">Minutes Elapsed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-400">{Math.round(speed).toLocaleString()} km/h</p>
          <p className="text-xs text-slate-400 font-mono">Current Speed</p>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 whitespace-nowrap">
              <span className="text-white">Anywhere to Anywhere in </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">42 Minutes</span>
            </h1>

            {/* Live Worm Status Link */}
            <Link to="/worm-status" className="inline-flex items-center gap-2 mb-6 group">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-400 text-sm font-mono tracking-wide group-hover:text-blue-300 transition-colors">
                LIVE: TBM-42 • 9,656 km drilled (85%)
              </span>
            </Link>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/">
                <Button size="lg" className="bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 font-mono tracking-wide px-8">
                  <Globe className="mr-2 w-5 h-5" />
                  View 3D Globe
                </Button>
              </Link>
              <Link to="/simulation">
                <Button size="lg" className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono tracking-wide px-8">
                  Try the Simulation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <HeroEarthAnimation />
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Theory</span>
            <h2 className="text-4xl font-light text-white mt-2 tracking-wide">The Concept</h2>
            <p className="text-blue-200 max-w-2xl mx-auto mt-4 font-mono text-sm">
              A gravity train uses Earth's gravity to accelerate through a straight tunnel between any two surface points.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all">
              <div className="w-12 h-12 rounded border border-blue-400/50 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-light text-white mb-3 tracking-wide">Straight Path</h3>
              <p className="text-blue-200 leading-relaxed text-sm font-mono">
                The train travels through a chord tunnel drilled through Earth, not following the curved surface.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all">
              <div className="w-12 h-12 rounded border border-blue-400/50 flex items-center justify-center mb-6">
                <TrendingDown className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-light text-white mb-3 tracking-wide">Gravity Acceleration</h3>
              <p className="text-blue-200 leading-relaxed text-sm font-mono">
                Gravity accelerates the train as it falls toward the deepest point, reaching peak speed at the midpoint.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all">
              <div className="w-12 h-12 rounded border border-blue-400/50 flex items-center justify-center mb-6">
                <Timer className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-light text-white mb-3 tracking-wide">42 Minutes</h3>
              <p className="text-blue-200 leading-relaxed text-sm font-mono">
                The journey takes ~42 minutes regardless of distance—a consequence of Earth's uniform density assumption.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Physics Section */}
      <section id="physics" className="py-20 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Mechanics</span>
              <h2 className="text-4xl font-light text-white mt-2 tracking-wide">The Physics</h2>
              <div className="space-y-6 mt-8">
                <div>
                  <h3 className="text-lg font-light text-blue-300 mb-2">Simple Harmonic Motion</h3>
                  <p className="text-blue-200 leading-relaxed font-mono text-sm">
                    The gravity train follows SHM principles—restoring force proportional to displacement from equilibrium.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-light text-blue-300 mb-2">Constant Travel Time</h3>
                  <p className="text-blue-200 leading-relaxed font-mono text-sm">
                    All routes take the same time: 42 minutes 12 seconds. A mathematical consequence of gravity and harmonic motion.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-light text-blue-300 mb-2">Zero Energy Required</h3>
                  <p className="text-blue-200 leading-relaxed font-mono text-sm">
                    In ideal conditions (vacuum tunnel, no friction), the train requires no energy beyond initial release.
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-slate-900/50 border border-blue-500/30 p-8">
              <div className="border-b border-blue-500/20 pb-4 mb-6">
                <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.2em]">Key Parameters</span>
              </div>
              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">Transit Time</span>
                  <span className="text-2xl text-blue-300">42:12</span>
                </div>
                <div className="h-px bg-blue-500/20"></div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">Max Speed</span>
                  <span className="text-2xl text-blue-300">~28,400 km/h</span>
                </div>
                <div className="h-px bg-blue-500/20"></div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">Energy Cost</span>
                  <span className="text-2xl text-emerald-400">Zero*</span>
                </div>
                <p className="text-xs text-blue-400 mt-4">*Ideal conditions: vacuum, frictionless</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Advantages</span>
            <h2 className="text-4xl font-light text-white mt-2 tracking-wide">Theoretical Benefits</h2>
            <p className="text-blue-200 max-w-2xl mx-auto mt-4 font-mono text-sm">
              Gravity trains present compelling possibilities for future transportation systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Ultra-Fast", description: "Any point on Earth in under an hour" },
              { title: "Energy Efficient", description: "Zero energy in ideal conditions" },
              { title: "Predictable", description: "Constant travel time regardless of route" },
              { title: "Direct Routes", description: "Chord paths between any two points" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-blue-500/30 p-6 hover:border-blue-400/50 transition-all">
                <div className="w-8 h-8 border border-blue-400/50 rounded flex items-center justify-center mb-4">
                  <span className="text-blue-400 font-mono text-sm">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-light text-white mb-2 tracking-wide">{benefit.title}</h3>
                <p className="text-sm text-blue-200 font-mono">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.3em]">Naatak Production</span>
          <h2 className="text-4xl font-light text-white mt-2 tracking-wide">Experience "Hole"</h2>
          <p className="text-blue-200 mt-4 font-mono text-sm max-w-2xl mx-auto">
            This interactive experience accompanies Naatak's theatrical production—exploring gravity trains and the human stories that unfold when science fiction meets reality.
          </p>
          <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
            <Button size="lg" className="bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 font-mono tracking-wide">
              Book Your Gravity Train Tickets
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
