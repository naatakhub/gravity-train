import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center pb-mobile-nav">
      <div className="text-center px-6">
        <div className="flex justify-center mb-6">
          <img src="/logo-icon.png" alt="Gravity Train" className="w-24 h-24" />
        </div>
        <h1 className="text-8xl font-bold text-blue-400 font-mono mb-4">
          404
        </h1>
        <p className="text-2xl text-white font-light tracking-wide mb-2">Page Not Found</p>
        <p className="text-blue-200 mb-8 max-w-md mx-auto font-mono text-sm">
          Looks like this tunnel doesn't lead anywhere. The page you're looking for has either been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 font-mono tracking-wide">
            <Home className="mr-2 w-5 h-5" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
