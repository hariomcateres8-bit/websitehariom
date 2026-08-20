import { useEffect, useState } from "react";
import { HariomLogo } from "@/components/hariom-logo";
import { Sparkles } from "lucide-react";

export function LogoIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 2000);
    const t2 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 transition-opacity duration-700 ${
        phase === "out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Royal ambient background lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-slate-950 to-slate-950" />

      {/* Decorative glowing orb */}
      <div className="absolute w-80 h-80 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center p-6 text-center animate-fade-up">
        {/* Crisp vector logo card with royal gold outline */}
        <div className="relative flex flex-col items-center justify-center px-8 py-6 rounded-3xl bg-white shadow-[0_0_60px_rgba(245,158,11,0.6)] border-2 border-amber-400/80 scale-105 sm:scale-125 transition-transform duration-500">
          <HariomLogo className="py-2" showTagline={true} />
        </div>

        {/* Tagline bar */}
        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-400" />
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-[0.3em] uppercase text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>100% Pure Veg Catering</span>
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          </div>
          <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-400" />
        </div>
      </div>
    </div>
  );
}
