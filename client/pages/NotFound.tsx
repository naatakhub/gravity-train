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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Gravity Train" className="w-24 h-24" />
        </div>
        <h1 className="text-8xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-2xl text-slate-300 mb-2">Page Not Found</p>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Looks like this tunnel doesn't lead anywhere. The page you're looking for has either been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500">
            <Home className="mr-2 w-5 h-5" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
