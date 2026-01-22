import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

const CUPERTINO = { name: "Cupertino", lat: 37.3318, lon: -122.0312 };
const NEW_DELHI = { name: "New Delhi", lat: 28.6139, lon: 77.209 };

function computeChordPositions(
  start: { lat: number; lon: number },
  end: { lat: number; lon: number },
  segments = 100
) {
  const positions: Cesium.Cartesian3[] = [];
  const startCart = Cesium.Cartesian3.fromDegrees(start.lon, start.lat, 0);
  const endCart = Cesium.Cartesian3.fromDegrees(end.lon, end.lat, 0);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = Cesium.Math.lerp(startCart.x, endCart.x, t);
    const y = Cesium.Math.lerp(startCart.y, endCart.y, t);
    const z = Cesium.Math.lerp(startCart.z, endCart.z, t);
    positions.push(new Cesium.Cartesian3(x, y, z));
  }
  return positions;
}

export default function GlobeView() {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const chordPositionsRef = useRef<Cesium.Cartesian3[]>([]);
  const trainEntityRef = useRef<Cesium.Entity | null>(null);

  // Oscillating animation - super smooth with cosine wave
  useEffect(() => {
    const cycleDuration = 42000; // 42 seconds for full cycle (like the real journey!)
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      // Use cosine for perfectly smooth oscillation (0 to 1 to 0)
      const phase = (elapsed % cycleDuration) / cycleDuration;
      const smoothProgress = (1 - Math.cos(phase * 2 * Math.PI)) / 2;
      setProgress(smoothProgress);
      requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Update train position with smooth interpolation
  useEffect(() => {
    if (trainEntityRef.current && chordPositionsRef.current.length > 0) {
      const positions = chordPositionsRef.current;
      const exactIdx = progress * (positions.length - 1);
      const idx1 = Math.floor(exactIdx);
      const idx2 = Math.min(idx1 + 1, positions.length - 1);
      const t = exactIdx - idx1;

      // Lerp between the two closest positions
      const pos1 = positions[idx1];
      const pos2 = positions[idx2];
      const interpolated = new Cesium.Cartesian3(
        Cesium.Math.lerp(pos1.x, pos2.x, t),
        Cesium.Math.lerp(pos1.y, pos2.y, t),
        Cesium.Math.lerp(pos1.z, pos2.z, t)
      );

      trainEntityRef.current.position = new Cesium.ConstantPositionProperty(interpolated);
    }
  }, [progress]);

  // Initialize Cesium
  useEffect(() => {
    if (!cesiumContainer.current || viewerRef.current) return;

    const viewer = new Cesium.Viewer(cesiumContainer.current, {
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
      selectionIndicator: false,
      creditContainer: document.createElement("div"),
      skyBox: false,
      skyAtmosphere: false,
    });

    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maximumLevel: 18,
      })
    );

    viewer.scene.globe.enableLighting = false;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000000;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 50000000;
    viewer.scene.globe.depthTestAgainstTerrain = false;

    viewerRef.current = viewer;

    const positions = computeChordPositions(CUPERTINO, NEW_DELHI, 100);
    chordPositionsRef.current = positions;

    // Tunnel line (yellow/amber glow)
    viewer.entities.add({
      polyline: {
        positions: positions,
        width: 8,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.5,
          color: Cesium.Color.fromCssColorString("#FBBF24"),
        }),
        clampToGround: false,
        arcType: Cesium.ArcType.NONE,
        depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.5,
          color: Cesium.Color.fromCssColorString("#FBBF24").withAlpha(0.6),
        }),
      },
    });

    // Cupertino marker
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(CUPERTINO.lon, CUPERTINO.lat, 0),
      point: { pixelSize: 14, color: Cesium.Color.fromCssColorString("#3B82F6"), outlineColor: Cesium.Color.WHITE, outlineWidth: 2 },
      label: {
        text: "Cupertino",
        font: "bold 14px monospace",
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 3,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -20),
      },
    });

    // New Delhi marker
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(NEW_DELHI.lon, NEW_DELHI.lat, 0),
      point: { pixelSize: 14, color: Cesium.Color.fromCssColorString("#3B82F6"), outlineColor: Cesium.Color.WHITE, outlineWidth: 2 },
      label: {
        text: "New Delhi",
        font: "bold 14px monospace",
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 3,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -20),
      },
    });

    // Train/capsule (animated point)
    const trainEntity = viewer.entities.add({
      position: positions[0],
      point: {
        pixelSize: 18,
        color: Cesium.Color.fromCssColorString("#F59E0B"),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    });
    trainEntityRef.current = trainEntity;

    // Camera position
    const midLon = (CUPERTINO.lon + NEW_DELHI.lon) / 2;
    const midLat = (CUPERTINO.lat + NEW_DELHI.lat) / 2;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(midLon, midLat, 20000000),
      duration: 2,
    });

    setIsLoading(false);

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  const speed = Math.sin(progress * Math.PI) * 28400;
  const timeElapsed = Math.floor(progress * 42);
  const timeSeconds = Math.floor((progress * 42 % 1) * 60);

  // Depth calculation - max depth at midpoint (~3430 km for Cupertino-Delhi)
  const maxDepth = 3430;
  const depth = Math.sin(progress * Math.PI) * maxDepth;
  const depthPercent = (depth / maxDepth) * 100;

  // Show modal when train reaches destination (progress > 0.98)
  useEffect(() => {
    if (progress > 0.98 && !hasShownModal) {
      setShowModal(true);
      setHasShownModal(true);
      // Reset after a cycle
      setTimeout(() => setHasShownModal(false), 30000);
    }
  }, [progress, hasShownModal]);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950">
          <div className="w-16 h-16 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
          <p className="mt-4 text-blue-400 font-mono text-sm tracking-wide">Loading Globe...</p>
        </div>
      )}

      <div ref={cesiumContainer} className="absolute inset-0" style={{ filter: "saturate(1.2) brightness(0.75) hue-rotate(10deg)" }} />
      <div className="absolute inset-0 bg-blue-950/30 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <header className="pointer-events-auto flex items-center justify-between px-6 py-4 border-b border-blue-500/20 bg-gradient-to-b from-slate-950/95 to-transparent">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-icon.png" alt="Gravity Train" className="h-9 w-auto" />
            <span className="text-xl font-light tracking-wide text-white">
              Gravity<span className="text-blue-400">Train</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-6 font-mono text-sm">
              <Link to="/worm-status" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Status
              </Link>
              <Link to="/simulation" className="text-slate-300 hover:text-blue-400 transition-colors">
                Simulation
              </Link>
              <Link to="/concepts" className="text-slate-300 hover:text-blue-400 transition-colors">
                Concepts
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-blue-400 transition-colors">
                About
              </Link>
            </div>
            <a href="https://www.naatak.org/portfolio/2026-hole/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono text-xs sm:text-sm px-2 sm:px-4">
                <span className="hidden sm:inline">Book Tickets</span>
                <span className="sm:hidden">Book</span>
                <ExternalLink className="ml-1 sm:ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </header>

        {/* Title overlay */}
        <div className="absolute left-1/2 -translate-x-1/2 top-20 sm:top-24 z-10 text-center pointer-events-none w-full px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Anywhere to Anywhere in <span className="text-amber-400">42 Minutes</span>
          </h1>
          <p className="text-blue-300/80 font-mono text-xs sm:text-sm hidden sm:block">
            Watch the gravity train travel through Earth's interior
          </p>
        </div>

        {/* Left Panel - Altimeter (hidden on mobile) */}
        <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="bg-slate-950/80 backdrop-blur-md border border-blue-500/30 rounded-xl p-4 w-48">
            <h3 className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-3 text-center">Depth</h3>
            <div className="relative h-48 border border-blue-500/30 rounded-lg overflow-hidden bg-slate-900/50">
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400/50 transition-all duration-200"
                style={{ height: `${depthPercent}%` }}
              />
              <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
                {[3000, 2000, 1000, 0].map((d) => (
                  <div key={d} className="flex items-center gap-1">
                    <div className="w-2 h-px bg-blue-400/50" />
                    <span className="text-blue-300/70 text-[10px] font-mono">{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-300 font-mono text-center mt-3">
              {Math.round(depth).toLocaleString()} km
            </p>
            <p className="text-xs text-blue-400/70 font-mono text-center">Below Surface</p>
          </div>
        </div>

        {/* Right Panel - Speedometer (hidden on mobile) */}
        <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="bg-slate-950/80 backdrop-blur-md border border-blue-500/30 rounded-xl p-4 w-48">
            <h3 className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-3 text-center">Speed</h3>
            <div className="relative h-48 border border-amber-500/30 rounded-lg overflow-hidden bg-slate-900/50">
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500 to-amber-400/50 transition-all duration-200"
                style={{ height: `${(speed / 28400) * 100}%` }}
              />
              <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
                {[28000, 20000, 10000, 0].map((s) => (
                  <div key={s} className="flex items-center justify-end gap-1">
                    <span className="text-amber-300/70 text-[10px] font-mono">{s / 1000}k</span>
                    <div className="w-2 h-px bg-amber-400/50" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-300 font-mono text-center mt-3">
              {Math.round(speed).toLocaleString()}
            </p>
            <p className="text-xs text-amber-400/70 font-mono text-center">km/h</p>
          </div>
        </div>

        {/* Center Stats overlay on globe */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="flex gap-6 sm:gap-16 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-emerald-400 font-mono drop-shadow-lg">
                {timeElapsed}:{String(timeSeconds).padStart(2, '0')}
              </p>
              <p className="text-xs text-blue-200/80 font-mono mt-1 drop-shadow">Minutes Elapsed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white font-mono drop-shadow-lg">
                42:12
              </p>
              <p className="text-xs text-blue-200/80 font-mono mt-1 drop-shadow">Total Journey</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-6 py-3 border-t border-blue-500/20 bg-gradient-to-t from-slate-950/95 to-transparent pointer-events-auto">
          <p className="text-blue-400/50 text-xs font-mono">
            An interactive lobby experience for "Hole" — A Naatak Production © 2026
          </p>
          <a href="https://www.naatak.org" target="_blank" rel="noopener noreferrer" className="text-blue-400/50 hover:text-blue-300 text-xs font-mono">
            naatak.org
          </a>
        </footer>

      </div>

      {/* Arrival Modal - outside pointer-events-none wrapper */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[min(800px,95vw)] max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-md border border-blue-400/30 rounded-2xl p-8 md:p-10 shadow-2xl shadow-blue-500/20 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 w-8 h-8 rounded-lg border border-blue-400/30 bg-slate-800/50 text-blue-300 hover:bg-slate-700/50 flex items-center justify-center font-bold"
              >
                ×
              </button>
              <div className="text-center">
                <p className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
                  Destination Reached
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome to <span className="text-amber-400">Rancho Station</span>
                </h2>
                <p className="text-blue-300 font-mono text-sm mb-6">
                  Starbright Theater, Campbell
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-blue-400 font-mono text-xs uppercase tracking-[0.2em] mb-4 text-center">Show Dates</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { date: "Jan 23", day: "Thu", time: "8:00 PM" },
                    { date: "Jan 24", day: "Fri", time: "8:00 PM" },
                    { date: "Jan 25", day: "Sat", time: "2:00 PM" },
                    { date: "Jan 25", day: "Sat", time: "8:00 PM" },
                    { date: "Jan 31", day: "Fri", time: "8:00 PM" },
                    { date: "Feb 1", day: "Sat", time: "2:00 PM" },
                    { date: "Feb 1", day: "Sat", time: "8:00 PM" },
                    { date: "Feb 7", day: "Fri", time: "8:00 PM" },
                    { date: "Feb 8", day: "Sat", time: "2:00 PM" },
                    { date: "Feb 8", day: "Sat", time: "8:00 PM" },
                    { date: "Feb 14", day: "Fri", time: "8:00 PM" },
                    { date: "Feb 15", day: "Sat", time: "2:00 PM" },
                  ].map((show, i) => (
                    <a
                      key={i}
                      href="https://www.naatak.org/portfolio/2026-hole/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-blue-500/30 bg-slate-800/50 rounded-lg p-3 text-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all cursor-pointer"
                    >
                      <p className="text-white font-semibold">{show.date}</p>
                      <p className="text-blue-400 text-xs font-mono">{show.day} • {show.time}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <a
                  href="https://www.naatak.org/portfolio/2026-hole/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-amber-500/30"
                >
                  Book Tickets →
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-blue-400/40 text-blue-300 font-semibold rounded-xl hover:bg-blue-500/10 transition-all"
                >
                  Continue Watching
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
