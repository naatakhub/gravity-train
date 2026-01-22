import "./global.css";

import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Simulation from "./pages/Simulation";
import Concepts from "./pages/Concepts";
import History from "./pages/History";
import About from "./pages/About";
import WormStatus from "./pages/WormStatus";
import GlobeView from "./pages/GlobeView";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<GlobeView />} />
        <Route path="/home" element={<Index />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/concepts" element={<Concepts />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="/worm-status" element={<WormStatus />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </TooltipProvider>
);

const rootElement = document.getElementById("root")!;
let root = (window as any).__root;

if (!root) {
  root = createRoot(rootElement);
  (window as any).__root = root;
}

root.render(<App />);
