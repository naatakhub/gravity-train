import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { History as HistoryIcon, BookOpen, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function History() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 border border-blue-400/50 rounded flex items-center justify-center">
              <HistoryIcon className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Scientific History</span>
          <h1 className="text-4xl md:text-5xl font-light text-white mt-2 tracking-wide">
            The History of Gravity Tunnels
          </h1>
          <p className="text-blue-200 max-w-3xl mx-auto mt-4 font-mono text-sm">
            The concept of falling through Earth dates back over 340 years, born from a remarkable correspondence
            between two of history's greatest scientific minds.
          </p>
        </div>
      </section>

      {/* Robert Hooke Section */}
      <section className="py-12 border-t border-blue-500/20">
        <div className="max-w-5xl mx-auto px-6">
          <Card className="bg-slate-900/50 border border-blue-500/30 p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="relative">
                  <img
                    src="/robert-hooke.jpeg"
                    alt="Robert Hooke"
                    className="rounded-xl w-full aspect-square object-cover object-top border-2 border-blue-500/30"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4 rounded-b-xl">
                    <p className="text-white font-semibold">Robert Hooke</p>
                    <p className="text-slate-400 text-sm">1635 – 1703</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-amber-400/50 rounded flex items-center justify-center">
                    <Quote className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-light text-amber-400 tracking-wide">Robert Hooke</h2>
                </div>

                <div className="text-blue-200 space-y-4 font-mono text-sm">
                  <p className="leading-relaxed">
                    <strong className="text-white">Robert Hooke</strong> was an English polymath — a scientist, architect,
                    and natural philosopher who made groundbreaking contributions to physics, biology, and astronomy.
                    He is famous for <strong className="text-blue-300">Hooke's Law</strong> (describing elasticity) and for
                    coining the term "cell" in biology.
                  </p>

                  <p className="leading-relaxed">
                    In <strong className="text-white">November 1679</strong>, Hooke initiated a correspondence with
                    Isaac Newton that would change the course of physics. In his letters, Hooke proposed a thought
                    experiment: <em className="text-blue-300">What would happen if an object fell through a tunnel
                    drilled through the center of the Earth?</em>
                  </p>

                  <div className="border border-blue-500/30 p-6">
                    <p className="italic text-blue-300">
                      "Suppose a ball dropped from a height could pass through the Earth... it would not stop at the
                      center but continue oscillating back and forth."
                    </p>
                    <p className="text-xs text-blue-400 mt-2">— Hooke's letter to Newton, 1679</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Isaac Newton Section */}
      <section className="py-12 border-t border-blue-500/20">
        <div className="max-w-5xl mx-auto px-6">
          <Card className="bg-slate-900/50 border border-blue-500/30 p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1 md:order-2">
                <div className="relative">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg"
                    alt="Isaac Newton"
                    className="rounded-xl w-full aspect-square object-cover object-top border-2 border-blue-500/30"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4 rounded-b-xl">
                    <p className="text-white font-semibold">Isaac Newton</p>
                    <p className="text-slate-400 text-sm">1643 – 1727</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 md:order-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-emerald-400/50 rounded flex items-center justify-center">
                    <Quote className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-light text-emerald-400 tracking-wide">Isaac Newton</h2>
                </div>

                <div className="text-blue-200 space-y-4 font-mono text-sm">
                  <p className="leading-relaxed">
                    <strong className="text-white">Sir Isaac Newton</strong> responded to Hooke's challenge with
                    mathematical rigor. Newton analyzed the problem using his developing theory of gravitation,
                    calculating how an object would accelerate and decelerate as it passed through Earth.
                  </p>

                  <p className="leading-relaxed">
                    Newton's analysis revealed something remarkable: assuming a uniformly dense Earth, the object
                    would undergo <strong className="text-blue-300">simple harmonic motion</strong> — oscillating
                    back and forth like a pendulum, with a period independent of the tunnel's path!
                  </p>

                  <p className="leading-relaxed">
                    This correspondence, though sometimes contentious (Hooke and Newton had a famous rivalry),
                    helped Newton refine his ideas that would later appear in the <strong className="text-white">
                    Principia Mathematica</strong> (1687), one of the most important scientific works ever written.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 border-t border-blue-500/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-light text-white text-center mb-10 tracking-wide">Historical Timeline</h2>

          <div className="space-y-6">
            {[
              { year: "1679", title: "The Correspondence Begins", description: "Robert Hooke writes to Newton proposing the gravity tunnel thought experiment, asking about the path of a falling object through Earth." },
              { year: "1679-80", title: "Newton's Analysis", description: "Newton analyzes the problem mathematically, discovering that the motion would be simple harmonic — oscillating with a constant period." },
              { year: "1687", title: "Principia Published", description: "Newton publishes Philosophiæ Naturalis Principia Mathematica, establishing the laws of motion and universal gravitation." },
              { year: "1883", title: "The 42-Minute Calculation", description: "French physicist Paul Painlevé formally calculates that any gravity train journey would take approximately 42 minutes." },
              { year: "1966", title: "Modern Revival", description: "American physicist Paul Cooper publishes 'Through the Earth in Forty Minutes' in the American Journal of Physics, bringing renewed interest to the concept." },
              { year: "2015", title: "Refined Calculations", description: "Physicists account for Earth's varying density, showing the actual time would be closer to 38 minutes using realistic Earth models." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-blue-400 font-mono text-sm">{item.year}</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-950"></div>
                  {idx < 5 && <div className="w-0.5 h-full bg-blue-500/30 mt-2"></div>}
                </div>
                <div className="pb-8">
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-blue-200 text-sm font-mono">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Rivalry */}
      <section className="py-12 border-t border-blue-500/20">
        <div className="max-w-5xl mx-auto px-6">
          <Card className="bg-slate-900/50 border border-amber-500/30 p-8">
            <h2 className="text-2xl font-light text-amber-400 mb-6 tracking-wide">The Famous Rivalry</h2>

            <div className="text-blue-200 space-y-4 font-mono text-sm">
              <p className="leading-relaxed">
                The relationship between Hooke and Newton was one of science's most famous rivalries. While their
                correspondence on gravity tunnels was productive, they clashed bitterly over credit for discoveries,
                particularly regarding the inverse-square law of gravitation.
              </p>

              <p className="leading-relaxed">
                Hooke claimed he had suggested the inverse-square relationship to Newton, while Newton insisted he
                had derived it independently. This dispute led Newton to famously (and possibly sarcastically) write:
              </p>

              <div className="border border-blue-500/30 p-6">
                <p className="italic text-blue-300 text-base">
                  "If I have seen further, it is by standing on the shoulders of giants."
                </p>
                <p className="text-xs text-blue-400 mt-2">— Isaac Newton, letter to Robert Hooke, 1675</p>
              </div>

              <p className="leading-relaxed text-blue-300/70">
                Some historians believe this was a veiled insult, as Hooke was known to be short in stature.
                Regardless of their personal conflicts, their scientific exchange on gravity tunnels remains a
                fascinating chapter in the history of physics.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4 tracking-wide">Explore the Science</h2>
          <p className="text-blue-200 mb-8 font-mono text-sm">
            Now that you know the history, dive deeper into the physics or try the simulation yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/concepts">
              <Button size="lg" className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono tracking-wide">
                <BookOpen className="mr-2 w-5 h-5" />
                Learn the Physics
              </Button>
            </Link>
            <Link to="/simulation">
              <Button size="lg" className="bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 font-mono tracking-wide">
                Try the Simulation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
