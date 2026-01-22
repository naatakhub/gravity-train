import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface City {
  name: string;
  lat: number;
  lng: number;
  country: string;
}

const CITIES: City[] = [
  { name: "New York", lat: 40.7128, lng: -74.0060, country: "USA" },
  { name: "London", lat: 51.5074, lng: -0.1278, country: "UK" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, country: "Japan" },
  { name: "Paris", lat: 48.8566, lng: 2.3522, country: "France" },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, country: "Australia" },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777, country: "India" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, country: "UAE" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, country: "Singapore" },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333, country: "Brazil" },
  { name: "Cairo", lat: 30.0444, lng: 31.2357, country: "Egypt" },
  { name: "Moscow", lat: 55.7558, lng: 37.6173, country: "Russia" },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, country: "USA" },
  { name: "Beijing", lat: 39.9042, lng: 116.4074, country: "China" },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332, country: "Mexico" },
  { name: "Lagos", lat: 6.5244, lng: 3.3792, country: "Nigeria" },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, country: "Argentina" },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784, country: "Turkey" },
  { name: "Seoul", lat: 37.5665, lng: 126.9780, country: "South Korea" },
  { name: "Toronto", lat: 43.6532, lng: -79.3832, country: "Canada" },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018, country: "Thailand" },
  { name: "Cupertino", lat: 37.3230, lng: -122.0322, country: "USA" },
  { name: "New Delhi", lat: 28.6139, lng: 77.2090, country: "India" },
];

const TOTAL_TIME = 2532;
const BRACHISTO_TIME = 2268;
const EARTH_RADIUS = 6371;

export default function Simulation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [brachistoProgress, setBrachistoProgress] = useState(0);
  const [showBrachistochrone, setShowBrachistochrone] = useState(false);
  const [speed, setSpeed] = useState(20);
  const [cityA, setCityA] = useState<string>("Cupertino");
  const [cityB, setCityB] = useState<string>("New Delhi");
  const animationRef = useRef<number>();

  const calculateDistance = (city1: City, city2: City): number => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const lat1 = toRad(city1.lat);
    const lat2 = toRad(city2.lat);
    const deltaLat = toRad(city2.lat - city1.lat);
    const deltaLng = toRad(city2.lng - city1.lng);
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
  };

  const selectedCityA = CITIES.find(c => c.name === cityA)!;
  const selectedCityB = CITIES.find(c => c.name === cityB)!;
  const distance = calculateDistance(selectedCityA, selectedCityB);

  useEffect(() => {
    if (isPlaying) {
      let lastTime = performance.now();
      const animate = () => {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        setProgress((prev) => {
          const increment = (deltaTime * speed / TOTAL_TIME) * 100;
          return Math.min(prev + increment, 100);
        });

        if (showBrachistochrone) {
          setBrachistoProgress((prev) => {
            const increment = (deltaTime * speed / BRACHISTO_TIME) * 100;
            return Math.min(prev + increment, 100);
          });
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, showBrachistochrone, speed]);

  useEffect(() => {
    if (progress >= 100 && (!showBrachistochrone || brachistoProgress >= 100)) {
      setIsPlaying(false);
    }
  }, [progress, brachistoProgress, showBrachistochrone]);

  useEffect(() => {
    if (!showBrachistochrone) setBrachistoProgress(0);
  }, [showBrachistochrone]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setBrachistoProgress(0);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const getTrainPosition = () => {
    const t = progress / 100;
    const theta = distance / EARTH_RADIUS;
    const chordLength = 2 * EARTH_RADIUS * Math.sin(theta / 2);
    const depth = Math.sin(t * Math.PI) * (chordLength / 2);
    return { x: t, depth, chordLength };
  };

  const getBrachistoPosition = () => {
    const t = brachistoProgress / 100;
    const theta = t * Math.PI;
    const x = (theta - Math.sin(theta)) / Math.PI;
    const y = (1 - Math.cos(theta)) / 2;
    return { x, y, t };
  };

  const position = getTrainPosition();
  const brachistoPosition = getBrachistoPosition();
  const currentSpeed = Math.sin(progress / 100 * Math.PI) * 28.4;
  const currentTime = (progress / 100) * TOTAL_TIME;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">Interactive Experience</span>
          <h1 className="text-4xl md:text-5xl font-light text-white mt-2 tracking-wide">
            Gravity Train Simulation
          </h1>
          <p className="text-blue-200 mt-4 font-mono text-sm">
            Visualization of a gravity train journey through Earth
          </p>
        </div>

        {/* City Selection */}
        <Card className="bg-slate-900/50 border border-blue-500/30 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 border border-blue-400/50 rounded flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-lg font-light text-white tracking-wide">Select Route</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-blue-200 mb-2 block font-mono text-xs uppercase tracking-widest">Departure</Label>
              <Select value={cityA} onValueChange={setCityA} disabled={isPlaying}>
                <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}, {city.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-blue-200 mb-2 block font-mono text-xs uppercase tracking-widest">Arrival</Label>
              <Select value={cityB} onValueChange={setCityB} disabled={isPlaying}>
                <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}, {city.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 p-4 border border-blue-500/30 bg-blue-500/10">
            <div className="flex justify-between items-center">
              <span className="text-blue-200 font-mono text-sm">Route Distance</span>
              <span className="text-2xl font-light text-blue-300">{distance.toFixed(0)} km</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Checkbox
              id="show-brachistochrone"
              checked={showBrachistochrone}
              disabled={isPlaying}
              onCheckedChange={(checked) => setShowBrachistochrone(Boolean(checked))}
            />
            <Label htmlFor="show-brachistochrone" className="text-blue-200 font-mono text-sm">
              Show Brachistochrone curve comparison
            </Label>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Visualization */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border border-blue-500/30 p-6">
              <div className={`grid gap-4 ${showBrachistochrone ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-md mx-auto"}`}>
                {/* Gravity Tunnel */}
                <div className="text-center">
                  <h3 className="text-lg font-light text-emerald-400 mb-2 tracking-wide">Gravity Tunnel</h3>
                  <p className="text-xs text-blue-200 mb-2 font-mono">Straight chord through Earth</p>
                  <div className="relative aspect-square">
                    <svg className="w-full h-full" viewBox="-20 0 240 200">
                      <defs>
                        <radialGradient id="earthGrad1">
                          <stop offset="0%" stopColor="#1E3A5F" />
                          <stop offset="100%" stopColor="#0A1628" />
                        </radialGradient>
                        <filter id="glow1">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                        </filter>
                      </defs>

                      <circle cx="100" cy="100" r="80" fill="url(#earthGrad1)" opacity="0.6" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.6" />
                      <circle cx="100" cy="100" r="53" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
                      <circle cx="100" cy="100" r="27" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />

                      {(() => {
                        const theta = distance / EARTH_RADIUS;
                        const angle = Math.min(theta, Math.PI / 2);
                        const x1 = 100 - 80 * Math.sin(angle);
                        const y1 = 100 - 80 * Math.cos(angle);
                        const x2 = 100 + 80 * Math.sin(angle);
                        const y2 = 100 - 80 * Math.cos(angle);
                        const trainX = x1 + (x2 - x1) * position.x;
                        const trainY = y1 + (y2 - y1) * position.x;

                        return (
                          <>
                            {(isPlaying || progress > 0) && (
                              <>
                                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1E3A5F" strokeWidth="4" strokeLinecap="round" />
                                <line x1={x1} y1={y1} x2={trainX} y2={trainY} stroke="#10B981" strokeWidth="4" strokeLinecap="round" filter="url(#glow1)" />
                              </>
                            )}
                            <circle cx={x1} cy={y1} r="6" fill="#3B82F6" filter="url(#glow1)" />
                            <circle cx={x2} cy={y2} r="6" fill="#3B82F6" filter="url(#glow1)" />
                            <text x={x1} y={y1 - 10} fill="#94a3b8" fontSize="7" textAnchor="middle" fontWeight="500">{cityA}</text>
                            <text x={x2} y={y2 - 10} fill="#94a3b8" fontSize="7" textAnchor="middle" fontWeight="500">{cityB}</text>
                            {(isPlaying || progress > 0) && (
                              <>
                                <circle cx={trainX} cy={trainY} r="8" fill="#F59E0B" filter="url(#glow1)" />
                                <circle cx={trainX} cy={trainY} r="12" fill="#F59E0B" opacity="0.3" />
                              </>
                            )}
                            <circle cx="100" cy="100" r="3" fill="#F59E0B" opacity="0.6" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="mt-2 text-2xl font-light text-emerald-400">{progress.toFixed(1)}%</div>
                  <div className="text-xs text-blue-300 font-mono">~42 min journey</div>
                </div>

                {/* Brachistochrone */}
                {showBrachistochrone && (
                <div className="text-center">
                  <h3 className="text-lg font-light text-blue-400 mb-2 tracking-wide">Brachistochrone</h3>
                  <p className="text-xs text-blue-200 mb-2 font-mono">Fastest descent curve</p>
                  <div className="relative aspect-square">
                    <svg className="w-full h-full" viewBox="-20 0 240 200">
                      <defs>
                        <radialGradient id="earthGrad2">
                          <stop offset="0%" stopColor="#1E3A5F" />
                          <stop offset="100%" stopColor="#0A1628" />
                        </radialGradient>
                      </defs>

                      <circle cx="100" cy="100" r="80" fill="url(#earthGrad2)" opacity="0.6" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
                      <circle cx="100" cy="100" r="53" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
                      <circle cx="100" cy="100" r="27" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />

                      {(() => {
                        const theta = distance / EARTH_RADIUS;
                        const angle = Math.min(theta, Math.PI / 2);
                        const x1 = 100 - 80 * Math.sin(angle);
                        const y1 = 100 - 80 * Math.cos(angle);
                        const x2 = 100 + 80 * Math.sin(angle);
                        const y2 = 100 - 80 * Math.cos(angle);
                        const midX = 100;
                        const midY = 100 + 30;
                        const t = brachistoPosition.t;
                        const bX = (1-t)*(1-t)*x1 + 2*(1-t)*t*midX + t*t*x2;
                        const bY = (1-t)*(1-t)*y1 + 2*(1-t)*t*midY + t*t*y2;

                        return (
                          <>
                            {(isPlaying || brachistoProgress > 0) && (
                              <>
                                <path d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`} fill="none" stroke="#1E3A5F" strokeWidth="4" strokeLinecap="round" />
                                <path d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`} fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray={`${brachistoProgress} ${Math.max(0, 100 - brachistoProgress)}`} filter="url(#glow1)" />
                              </>
                            )}
                            <circle cx={x1} cy={y1} r="6" fill="#3B82F6" filter="url(#glow1)" />
                            <circle cx={x2} cy={y2} r="6" fill="#3B82F6" filter="url(#glow1)" />
                            <text x={x1} y={y1 - 10} fill="#94a3b8" fontSize="7" textAnchor="middle" fontWeight="500">{cityA}</text>
                            <text x={x2} y={y2 - 10} fill="#94a3b8" fontSize="7" textAnchor="middle" fontWeight="500">{cityB}</text>
                            {(isPlaying || brachistoProgress > 0) && (
                              <>
                                <circle cx={bX} cy={bY} r="8" fill="#3B82F6" filter="url(#glow1)" />
                                <circle cx={bX} cy={bY} r="12" fill="#3B82F6" opacity="0.3" />
                              </>
                            )}
                            <circle cx="100" cy="100" r="3" fill="#F59E0B" opacity="0.6" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="mt-2 text-2xl font-light text-blue-400">{brachistoProgress.toFixed(1)}%</div>
                  <div className="text-xs text-blue-300 font-mono">~38 min (faster!)</div>
                  {brachistoProgress >= 100 && progress < 100 && (
                    <div className="text-sm font-mono text-blue-400 animate-pulse">WINNER!</div>
                  )}
                </div>
                )}
              </div>
            </Card>

            {/* Controls */}
            <Card className="bg-slate-900/50 border border-blue-500/30 p-6 mt-4">
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" onClick={togglePlay} className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono w-32">
                  {isPlaying ? <><Pause className="mr-2 w-5 h-5" />Pause</> : <><Play className="mr-2 w-5 h-5" />Play</>}
                </Button>
                <Button size="lg" variant="outline" onClick={handleReset} className="border-blue-400/40 text-blue-300 hover:bg-blue-500/20 font-mono">
                  <RotateCcw className="mr-2 w-5 h-5" />Reset
                </Button>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card className="bg-slate-900/50 border border-blue-500/30 p-6">
              <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">Live Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-blue-200 mb-1 font-mono">Elapsed Time</div>
                  <div className="text-3xl font-light text-blue-300">{minutes}:{seconds.toString().padStart(2, '0')}</div>
                </div>
                <div className="h-px bg-blue-500/20"></div>
                {showBrachistochrone ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-emerald-400 mb-1 font-mono">Tunnel</div>
                        <div className="text-xl font-light text-emerald-400">{(currentSpeed * 1000).toFixed(0)} km/h</div>
                      </div>
                      <div>
                        <div className="text-xs text-blue-400 mb-1 font-mono">Cycloid</div>
                        <div className="text-xl font-light text-blue-400">{(Math.sin(brachistoProgress / 100 * Math.PI) * 28.4 * 1000).toFixed(0)} km/h</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-xs text-blue-200 mb-1 font-mono">Current Speed</div>
                      <div className="text-3xl font-light text-blue-300">{(currentSpeed * 1000).toFixed(0)} <span className="text-lg">km/h</span></div>
                    </div>
                    <div className="h-px bg-blue-500/20"></div>
                    <div>
                      <div className="text-xs text-blue-200 mb-1 font-mono">Current Depth</div>
                      <div className="text-2xl font-light text-emerald-400">{position.depth.toFixed(0)} <span className="text-sm">km</span></div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card className="bg-slate-900/50 border border-blue-500/30 p-6">
              <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">Settings</h3>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs text-blue-200 font-mono">Animation Speed</span>
                  <span className="text-xs font-mono text-blue-300">{speed}x</span>
                </div>
                <Slider value={[speed]} onValueChange={([v]) => setSpeed(v)} min={1} max={20} step={1} disabled={isPlaying} />
              </div>
            </Card>

            <Card className="border border-amber-400/40 bg-amber-500/10 p-6">
              <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">Did You Know?</h3>
              <p className="text-sm text-blue-200 leading-relaxed font-mono">
                No matter the distance between {cityA} and {cityB}, the journey always takes ~42 minutes 12 seconds!
              </p>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 border border-blue-500/30 p-6">
            <h3 className="text-lg font-light text-white mb-3 tracking-wide">Phase 1: Acceleration</h3>
            <p className="text-sm text-blue-200 leading-relaxed font-mono">
              The train accelerates as it falls toward Earth's center, gaining speed due to gravity. No propulsion needed!
            </p>
          </Card>
          <Card className="bg-slate-900/50 border border-blue-500/30 p-6">
            <h3 className="text-lg font-light text-white mb-3 tracking-wide">Phase 2: Maximum Speed</h3>
            <p className="text-sm text-blue-200 leading-relaxed font-mono">
              At the midpoint (deepest point), the train reaches its maximum velocity of approximately 28,400 km/h.
            </p>
          </Card>
          <Card className="bg-slate-900/50 border border-blue-500/30 p-6">
            <h3 className="text-lg font-light text-white mb-3 tracking-wide">Phase 3: Deceleration</h3>
            <p className="text-sm text-blue-200 leading-relaxed font-mono">
              Gravity naturally slows the train as it climbs toward the destination, arriving with zero velocity.
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
