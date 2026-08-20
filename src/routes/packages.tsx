import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
import { useAdminData } from "@/lib/admin-store";
import { getMergedPackages, PACKAGES, type Package, type PackageOption } from "@/lib/menu-data";

interface ExtendedPackage extends Partial<Package> {
  id: string;
  name: string;
  price: number;
  tagline: string;
  image?: string;
  options?: PackageOption[];
  categories?: { name: string; count: number; note?: string; menuItems?: string[] }[];
  minPax?: number;
}

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Menu Packages — Hariom Caterers" },
      {
        name: "description",
        content:
          "Classic ₹850, Regal ₹1050, Grand ₹1200 & Majestic ₹1600 pure veg catering packages with detailed menu options.",
      },
      { property: "og:title", content: "Menu Packages — Hariom Caterers" },
      {
        property: "og:description",
        content: "Four exquisite packages for weddings & grand events.",
      },
    ],
  }),
  component: PackagesPage,
});

const IMAGES: Record<string, string> = {
  classic:
    "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=1200&q=80",
  regal:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  grand:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
  majestic:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
};

function getPackageOptions(pkg: ExtendedPackage): PackageOption[] {
  if (pkg.options && Array.isArray(pkg.options)) return pkg.options;
  return [{ label: "Custom Menu", minPax: pkg.minPax ?? 100, categories: pkg.categories ?? [] }];
}

function PackagesPage() {
  useAdminData();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const displayPackages = (mounted ? getMergedPackages() : PACKAGES) as ExtendedPackage[];

  return (
    <SiteLayout>
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#FCFAF5] via-[#F7F2E7] to-[#F1E8D5] border-b border-[#E8DFC8]">
        {/* Interactive Luxury Canvas */}
        <LuxuryHeroCanvas />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8DFC8]/50 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EDE5D3]/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(232,223,200,0.35)_0%,_transparent_60%)]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center text-stone-900 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#EA3808] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#EA3808]" /> Menu Packages
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl font-display font-bold text-stone-900 drop-shadow-xs">
              Four signatures.
              <br />
              <span className="text-[#EA3808]">Endless possibilities.</span>
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore each package in detail. When you're ready, pick one in our Menu Planner and
              choose your favorite dishes from every category.
            </p>
          </motion.div>
        </div>
      </section>

      {displayPackages.map((pkg, idx) => (
        <section
          key={pkg.id}
          id={pkg.id}
       className="py-20 px-4 overflow-hidden bg-gradient-to-br from-[#FCFAF5] via-[#F7F2E7] to-[#F1E8D5]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:sticky lg:top-28"
              >
                <img
                  src={
                    pkg.image ||
                    IMAGES[pkg.id as keyof typeof IMAGES] ||
                    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={pkg.name}
                  referrerPolicy="no-referrer"
                  className="rounded-3xl shadow-elegant w-full h-[400px] object-cover"
                />
                <div className="mt-8 bg-card p-8 rounded-3xl shadow-card border border-border/50">
                  <div className="text-xs tracking-widest uppercase text-primary/60">Package</div>
                  <h2 className="text-5xl font-display font-bold text-primary mt-2">{pkg.name}</h2>
                  <p className="text-muted-foreground mt-2">{pkg.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-6xl font-display font-bold text-primary">
                      ₹{pkg.price}
                    </span>
                    <span className="text-muted-foreground">/ plate*</span>
                  </div>
                  <Link
                    to="/package-planner"
                    search={{ pkg: pkg.id }}
                    className="mt-6 inline-flex items-center gap-2 bg-[#EA3808] text-white px-6 py-3 rounded-full font-bold hover:bg-[#C42200] hover:scale-105 transition-all cursor-pointer shadow-md"
                  >
                    Plan This Package <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid gap-6"
              >
                {getPackageOptions(pkg).map((opt) => (
                  <div
                    key={opt.label}
                    className="relative rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-red-500/40 overflow-hidden text-white group"
                  >
                    {/* Rich Gourmet Food Image Background with Royal Overlay */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={
                          pkg.image ||
                          IMAGES[pkg.id as keyof typeof IMAGES] ||
                          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={`${pkg.name} Food Spread`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-[#7D1100]/88 to-[#EA3808]/82 backdrop-blur-[1.5px]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(234,56,8,0.22)_0%,_transparent_60%)]" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-baseline justify-between border-b border-white/20 pb-4">
                        <div>
                          <div className="text-[11px] font-black uppercase tracking-widest text-red-200">
                            Package Inclusions
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-0.5">
                            {opt.label}
                          </h3>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#EA3808] border border-red-300/40 px-3.5 py-1.5 rounded-full shadow-md">
                          Min {opt.minPax} pax
                        </span>
                      </div>
                      <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                        {opt.categories.map((c) => (
                          <li
                            key={c.name}
                            className="flex flex-col gap-1 text-sm border-b border-white/15 pb-2.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="flex items-start gap-2 text-white font-medium">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>
                                  {c.name}
                                  {c.note && (
                                    <em className="block text-xs text-stone-200 mt-0.5 not-italic font-normal">
                                      {c.note}
                                    </em>
                                  )}
                                </span>
                              </span>
                              <span className="font-extrabold text-white bg-black/40 px-2 py-0.5 rounded-md text-xs border border-white/10">
                                {c.count}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-stone-200 font-medium">
                        <span>✓ 200 ml water bottle included</span>
                        <span className="text-emerald-400 font-bold">100% Pure Vegetarian</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CUSTOM MENU SECTION WITH GOURMET FOOD BACKGROUND */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#EA3808]/50 p-8 sm:p-14 text-white"
        >
          {/* Gourmet Food Image Background with Warm Deep Royal Amber Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
              alt="Custom Pure Veg Catering Spread"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1714]/96 via-[#2B1B14]/94 to-[#3D1A10]/90 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,_rgba(234,56,8,0.28)_0%,_transparent_65%)]" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#EA3808]/25 backdrop-blur-md border border-[#EA3808]/50 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#EA3808]" /> 100% Bespoke Culinary Experience
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-display font-bold text-white leading-tight drop-shadow-md">
              Need a completely <span className="text-[#EA3808]">Custom Menu?</span>
            </h2>
            <p className="mt-4 text-stone-200 text-base sm:text-lg leading-relaxed font-normal">
              Want specific live counters, signature regional Gujarati delicacies, international
              grazing bars, or custom dessert tables? Create your own personalized menu dish by dish
              with our interactive Menu Planner.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/menu-planner"
                className="inline-flex items-center gap-2 bg-[#EA3808] hover:bg-[#C42200] text-white px-8 py-4 rounded-full font-extrabold shadow-lg shadow-red-900/40 hover:scale-105 transition-transform cursor-pointer"
              >
                Open Custom Menu Planner <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold transition cursor-pointer"
              >
                Talk to Master Chef Khimjibhai
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
