import { Link, useLocation } from "wouter";
import { Leaf, Trophy } from "lucide-react";
import { useEco } from "@/context/EcoContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/lessons", label: "Lessons" },
  { href: "/quiz", label: "Quiz" },
  { href: "/challenges", label: "Challenges" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { points } = useEco();

  return (
    <header className="sticky top-0 z-50 bg-[hsl(140,40%,14%)] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
          <Leaf className="w-6 h-6 text-[hsl(142,60%,55%)]" />
          <span>EcoLearn</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = href === "/" ? location === "/" : location.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                data-testid={`nav-link-${label.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-[hsl(142,60%,35%)] text-white"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold" data-testid="points-display">{points} pts</span>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2">
        {links.map(({ href, label }) => {
          const active = href === "/" ? location === "/" : location.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                active ? "bg-[hsl(142,60%,35%)] text-white" : "text-white/70 hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
