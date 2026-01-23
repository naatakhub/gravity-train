import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Atom, Zap, Globe, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Concepts() {
  return (
    <div className="min-h-screen bg-slate-950 pb-mobile-nav">
      <Navigation />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 border border-blue-400/50 rounded flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Scientific Foundations</span>
          <h1 className="text-4xl md:text-5xl font-light text-white mt-2 tracking-wide">
            The Physics Behind the Journey
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto mt-4 font-mono text-sm">
            Discover the science that makes gravity trains possible—and why not all paths are created equal.
          </p>
        </div>

        {/* Gravity Tunnel Section */}
        <Card className="bg-slate-900/50 border border-blue-500/30 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 border border-emerald-400/50 rounded flex items-center justify-center">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-light text-emerald-400 tracking-wide">The Gravity Tunnel</h2>
          </div>

          <div className="space-y-6 text-blue-200 font-mono text-sm">
            <p className="leading-relaxed">
              A <strong className="text-white">gravity tunnel</strong> is a theoretical transportation system using Earth's gravitational field to move passengers between any two surface points—with <em className="text-blue-300">no fuel required</em>.
            </p>

            <div className="border border-blue-500/30 p-6">
              <h3 className="text-sm font-mono text-blue-400 uppercase tracking-[0.2em] mb-4">Mechanism</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>A chord tunnel is drilled between two cities through Earth's interior</li>
                <li>A frictionless vehicle is placed at one end and released</li>
                <li>Gravity accelerates the vehicle toward the tunnel's deepest point</li>
                <li>The vehicle overshoots the midpoint and decelerates as it climbs</li>
                <li>It arrives with zero velocity—passengers disembark</li>
              </ol>
            </div>

            <div className="border border-emerald-400/40 bg-emerald-500/10 p-6">
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-[0.2em] mb-3">The 42-Minute Constant</h3>
              <p>
                Regardless of distance—New York to London or Cupertino to New Delhi—the journey <strong className="text-white">always takes approximately 42 minutes 12 seconds</strong>. This emerges from simple harmonic motion mathematics inside a uniform-density sphere.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-blue-500/30 p-4">
                <h4 className="text-blue-400 text-xs uppercase tracking-widest mb-2">Maximum Speed</h4>
                <p>At deepest point: ~28,400 km/h (for antipodal routes)</p>
              </div>
              <div className="border border-blue-500/30 p-4">
                <h4 className="text-blue-400 text-xs uppercase tracking-widest mb-2">Maximum Depth</h4>
                <p>Antipodal: 6,371 km (center). Non-antipodal: varies by route</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Brachistochrone Section */}
        <Card className="bg-slate-900/50 border border-blue-500/30 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 border border-blue-400/50 rounded flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-light text-blue-300 tracking-wide">The Brachistochrone Curve</h2>
          </div>

          <div className="space-y-6 text-blue-200 font-mono text-sm">
            <p className="leading-relaxed">
              The <strong className="text-white">brachistochrone</strong> (Greek: "shortest time") is the curve of fastest descent under gravity. A ball released on this curve reaches the endpoint <em className="text-blue-300">faster than any other path</em>—including a straight line.
            </p>

            <div className="border border-blue-500/30 p-6">
              <h3 className="text-sm font-mono text-blue-400 uppercase tracking-[0.2em] mb-4">Historical Context</h3>
              <p className="mb-3">
                In 1696, Johann Bernoulli challenged mathematicians: "What is the curve of fastest descent?" Newton, Leibniz, L'Hôpital, and Jakob Bernoulli independently solved it.
              </p>
              <p>
                The answer: a <strong className="text-white">cycloid</strong>—the curve traced by a point on a rolling wheel. An elegant connection of physics, calculus, and geometry.
              </p>
            </div>

            <div className="border border-blue-400/40 bg-blue-500/10 p-6">
              <h3 className="text-sm font-mono text-blue-300 uppercase tracking-[0.2em] mb-3">Why Faster?</h3>
              <p>
                The brachistochrone drops steeply at first, allowing the object to <strong className="text-white">gain speed early</strong>. The higher average velocity compensates for the longer path—resulting in shorter travel time.
              </p>
            </div>
          </div>
        </Card>

        {/* Brachistochrone vs Straight Tunnel */}
        <Card className="bg-slate-900/50 border border-blue-500/30 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 border border-amber-400/50 rounded flex items-center justify-center">
              <Atom className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-light text-amber-400 tracking-wide">Two Paths, Two Elegances</h2>
          </div>

          <div className="space-y-6 text-blue-200 font-mono text-sm">
            <p className="leading-relaxed">
              Inside Earth, gravity varies with depth—creating a unique physics problem with <em className="text-blue-300">two fascinating solutions</em>.
            </p>

            <div className="border border-amber-400/40 bg-amber-500/10 p-6">
              <h3 className="text-sm font-mono text-amber-400 uppercase tracking-[0.2em] mb-3">Variable Gravity Inside Earth</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span><strong className="text-white">Surface:</strong> 9.8 m/s² (standard gravity)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span><strong className="text-white">Halfway to center:</strong> ~4.9 m/s²</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span><strong className="text-white">At Earth's center:</strong> Exactly 0</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-emerald-400/40 bg-emerald-500/10 p-6">
                <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-[0.2em] mb-3">The Straight Tunnel</h3>
                <p className="mb-3">
                  A chord through Earth produces <strong className="text-white">simple harmonic motion</strong>—like a cosmic pendulum.
                </p>
                <p className="text-emerald-300">
                  <strong>Time:</strong> Always 42 minutes, regardless of distance. This universal constant is the poetry of physics.
                </p>
              </div>
              <div className="border border-purple-400/40 bg-purple-500/10 p-6">
                <h3 className="text-sm font-mono text-purple-400 uppercase tracking-[0.2em] mb-3">The Hypocycloid</h3>
                <p className="mb-3">
                  The true brachistochrone inside Earth is a <strong className="text-white">hypocycloid</strong>—a curve that dips deeper early to gain speed.
                </p>
                <p className="text-purple-300">
                  <strong>Time:</strong> ~27 minutes for long routes. Faster, but loses the elegant 42-minute universality.
                </p>
              </div>
            </div>

            <div className="border border-blue-500/30 p-6">
              <h3 className="text-sm font-mono text-blue-400 uppercase tracking-[0.2em] mb-3">Why 42 Minutes Captivates Us</h3>
              <p>
                The hypocycloid is technically faster—but the straight tunnel's <em className="text-white">42-minute constant</em> is what captures the imagination. The same journey time from New York to London as from your house to your neighbor's. This elegant universality, emerging from simple harmonic motion, is why the gravity train endures as one of physics' most beautiful thought experiments.
              </p>
            </div>
          </div>
        </Card>

        {/* About the Play */}
        <Card className="border border-amber-400/40 bg-amber-500/10 p-4 sm:p-8 mb-8">
          <div className="text-center">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-[0.3em]">Naatak Production</span>
            <h2 className="text-2xl font-light text-amber-300 mt-2 tracking-wide">Experience "Hole"</h2>
            <p className="text-blue-200 font-mono text-sm mt-4 max-w-2xl mx-auto">
              This simulation accompanies <strong className="text-white">"Hole"</strong>—an upcoming theatrical production exploring gravity trains and the human stories that unfold when science fiction meets reality.
            </p>
            <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer" className="block mt-6">
              <Button size="lg" className="w-full bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 font-mono tracking-wide justify-center">
                Book Your Gravity Train Tickets
                <ExternalLink className="ml-2 w-5 h-5 flex-shrink-0" />
              </Button>
            </a>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Link to="/simulation">
            <Button size="lg" className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono tracking-wide">
              Try the Simulation
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline" className="border-blue-400/40 text-blue-300 hover:bg-blue-500/20 font-mono tracking-wide">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
