import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Globe, ExternalLink, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 pb-mobile-nav">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Naatak Original Production</span>
          <h1 className="text-4xl md:text-5xl font-light text-white mt-2 tracking-wide">
            "Hole"
          </h1>
          <p className="text-xl text-blue-300 mt-4 font-mono">
            Social satire meets science fiction
          </p>
        </div>
      </section>

      {/* About the Play */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <Card className="border border-amber-400/40 bg-amber-500/10 p-8 md:p-10">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-200">
                A Silicon Valley startup attempts the audacious: drilling a tunnel through Earth's core to transport
                passengers between <strong className="text-white">Cupertino and Delhi in 42 minutes</strong>.
              </p>

              <p className="text-lg leading-relaxed text-slate-200">
                Operating under the classic startup mantra—<em className="text-amber-300">"ask for forgiveness, not permission"</em>—
                the team pushes forward without adequate safeguards. What could go wrong?
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-4 text-center">
                <div className="border border-blue-400/30 bg-blue-500/10 p-4">
                  <p className="text-blue-300 font-mono text-xs uppercase tracking-widest">Written by</p>
                  <p className="text-white text-lg mt-1">Sujit Saraf</p>
                </div>
                <div className="border border-blue-400/30 bg-blue-500/10 p-4">
                  <p className="text-blue-300 font-mono text-xs uppercase tracking-widest">Directed by</p>
                  <p className="text-white text-lg mt-1">Poulomi Sarkar</p>
                </div>
                <div className="border border-blue-400/30 bg-blue-500/10 p-4">
                  <p className="text-blue-300 font-mono text-xs uppercase tracking-widest">Runtime</p>
                  <p className="text-white text-lg mt-1">90 minutes</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 font-mono tracking-wide">
                    Get Tickets
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* About Naatak */}
      <section className="py-12 border-t border-blue-500/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Theater Company</span>
            <h2 className="text-2xl font-light text-white mt-2 tracking-wide">About Naatak</h2>
            <p className="text-blue-200 max-w-2xl mx-auto mt-4 font-mono text-sm">
              One of the largest Indian theater groups in the US, creating original productions in the Bay Area since 1994.
            </p>
            <a href="https://www.naatak.org" target="_blank" rel="noopener noreferrer" className="inline-block mt-6">
              <Button variant="outline" className="border-blue-400/50 text-blue-300 hover:bg-blue-500/20 font-mono tracking-wide">
                Visit Naatak.org
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="py-12 border-t border-blue-500/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Interactive Experience</span>
            <h2 className="text-2xl font-light text-white mt-2 tracking-wide">Explore the Science</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/simulation" className="block">
              <Card className="bg-slate-900/50 border border-blue-400/30 p-6 hover:border-blue-400/60 hover:bg-blue-500/10 transition-all h-full">
                <div className="w-10 h-10 border border-blue-400/50 rounded flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-light text-white tracking-wide mb-2">Interactive Simulation</h3>
                <p className="text-blue-200 text-sm font-mono">
                  Watch gravity propel you through Earth's interior between any two cities.
                </p>
              </Card>
            </Link>
            <Link to="/concepts" className="block">
              <Card className="bg-slate-900/50 border border-blue-400/30 p-6 hover:border-blue-400/60 hover:bg-blue-500/10 transition-all h-full">
                <div className="w-10 h-10 border border-blue-400/50 rounded flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-light text-white tracking-wide mb-2">Physics Concepts</h3>
                <p className="text-blue-200 text-sm font-mono">
                  Understand why every gravity train journey takes exactly 42 minutes.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
