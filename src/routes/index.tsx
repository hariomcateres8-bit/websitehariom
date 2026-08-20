import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Utensils,
  Users,
  Award,
  ChefHat,
  Star,
  Instagram,
  Facebook,
} from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";
import { LogoIntro } from "@/components/logo-intro";
import { TestimonialsSlider } from "@/components/testimonials-slider";
import { TypewriterText } from "@/components/typewriter";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
import { PACKAGES, CONTACT } from "@/lib/menu-data";
import ourStoryImg from "@/assets/images/our_story_setup_1787114170470.jpg";
import realFoodGrazing1 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.57 AM.jpeg";
import realFoodCanapes2 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (1).jpeg";
import realFoodDips3 from "@/assets/images/images.jpeg";
import realFoodPaneer4 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (7).jpeg";
import { RotatingDishShowcase } from "@/components/rotating-dish-showcase";
import heroVideo from "@/assets/video/1.mp4";
import { FaWhatsapp } from "react-icons/fa";

/* Hero background image */
const heroBg = realFoodDips3;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Hariom Caterers — Premium Pure Veg Catering in Gujarat",
      },
      {
        name: "description",
        content:
          "Award winning pure veg catering for weddings & grand events. Classic, Grand & Majestic packages. Plan your custom menu online.",
      },
      {
        property: "og:title",
        content: "Hariom Caterers — Premium Pure Veg Catering",
      },
      {
        property: "og:description",
        content: "Design your dream menu online with Hariom Caterers.",
      },
    ],
  }),
  component: HomePage,
});

const HERO_POSTER =
  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=80";

const ABOUT_IMG = ourStoryImg;

const STATS = [
  {
    icon: Users,
    label: "Happy Guests",
    value: "5,00,000+",
  },
  {
    icon: Award,
    label: "Events Catered",
    value: "1,200+",
  },
  {
    icon: ChefHat,
    label: "Master Chefs",
    value: "400+",
  },
  {
    icon: Star,
    label: "Years of Legacy",
    value: "50+",
  },
];

function HomePage() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <LogoIntro onDone={() => setIntroDone(true)} />}

      <SiteLayout>
        {/* HERO */}
        <section
          className="relative min-h-[92vh] flex items-center overflow-hidden border-b border-[#E8DFC8] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 248, 235, 0.82), rgba(255, 248, 235, 0.82)), url(${heroBg})`,
          }}
        >
          <LuxuryHeroCanvas />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8DFC8]/50 blur-3xl" />

            <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EDE5D3]/60 blur-3xl" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,_rgba(232,223,200,0.35)_0%,_transparent_60%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center z-10">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-stone-900"
            >
              <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#EA3808] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#EA3808]" />

                Premium Pure Veg Caterers
              </div>

              <h1 className="mt-6 text-4xl sm:text-3xl lg:text-6xl leading-[1.08] font-bold text-stone-900 tracking-tight">
                A feast worthy of your
                <br />

                <span className="text-[#EA3808] block">
                  <TypewriterText
                    words={[
                      "grandest moments.",
                      "royal celebrations.",
                      "dream receptions.",
                      "unforgettable events.",
                    ]}
                  />
                </span>
              </h1>

              <p className="mt-6 text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
                For over two decades, Hariom Caterers has crafted royal
                vegetarian experiences — from intimate weddings to grand
                receptions of thousands.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/menu-planner"
                  className="group inline-flex items-center gap-2 bg-[#EA3808] hover:bg-[#C42200] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-red-500/25 hover:scale-105 transition-transform cursor-pointer"
                >
                  Plan Your Menu

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 bg-white/95 border border-stone-200 text-stone-800 hover:border-red-400 hover:bg-red-50/30 px-8 py-4 rounded-full font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  View Packages
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-8 text-sm text-stone-700 font-semibold">
                <div className="flex items-center gap-2 bg-white/90 border border-stone-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />

                  100% Pure Vegetarian
                </div>

                <div className="flex items-center gap-1.5 py-1 text-stone-700">
                  ✓ Hygienic Kitchens
                </div>

                <div className="flex items-center gap-1.5 py-1 text-stone-700">
                  ✓ 400+ Master Chefs
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE FOOD SHOWCASE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative block mt-10 lg:mt-0 w-full"
            >
              {/* Main Featured Food Card */}
              <div className="relative mx-auto w-full max-w-xl group">
  {/* Premium Glow */}
  <div className="absolute -inset-3 rounded-[34px] bg-[#EA3808]/15 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

  {/* Luxury Frame */}
  <div className="relative rounded-[30px] p-[5px] bg-gradient-to-br from-[#EA3808] via-white to-[#E8DFC8] shadow-[0_25px_60px_rgba(70,35,15,0.22)]">
    
    {/* Video */}
    <div className="relative overflow-hidden rounded-[26px] aspect-[16/10] bg-stone-900">
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

      {/* Soft Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.22),transparent_35%)] pointer-events-none" />

      {/* Top Badge */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 px-3.5 py-2">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </span>

          <span className="text-[9px] font-black uppercase tracking-[0.16em] text-white">
            Live Catering
          </span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          
          <div className="min-w-0">
            <div className="text-[10px] font-black text-[#FFB19D] uppercase tracking-[0.18em]">
              Royal Live Grazing Table
            </div>

            <div className="mt-1 text-lg sm:text-xl font-bold text-white leading-tight">
              Authentic Delicacies &amp; Artisanal Platters
            </div>

            <div className="mt-1 text-xs text-white/70">
              Premium Pure Vegetarian Catering
            </div>
          </div>

          {/* Pure Veg */}
          <div className="shrink-0">
            <div className="flex items-center gap-2 rounded-full bg-emerald-600/95 backdrop-blur-md border border-emerald-300/60 px-3 py-2 shadow-lg">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </span>

              <span className="text-[9px] font-black text-white uppercase tracking-wide">
                100% Pure Veg
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

              {/* Mini Delicacies Showcase Strip */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {/* Canapes */}
                <div className="bg-white/95 border border-stone-200/80 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xs hover:border-red-400 transition">
                  <img
                    src={realFoodCanapes2}
                    alt="Canapes Platter"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-sm"
                  />

                  <div>
                    <div className="text-[11px] font-bold text-stone-900 leading-tight">
                      Canapes &amp; Starters
                    </div>

                    <div className="text-[9px] text-[#EA3808] font-semibold">
                      Gourmet Finger Foods
                    </div>
                  </div>
                </div>

                {/* Dips */}
                <div className="bg-white/95 border border-stone-200/80 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xs hover:border-red-400 transition">
                  <img
                    src={realFoodDips3}
                    alt="Artisan Dips Bar"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-sm"
                  />

                  <div>
                    <div className="text-[11px] font-bold text-stone-900 leading-tight">
                      Artisan Dips Bar
                    </div>

                    <div className="text-[9px] text-[#EA3808] font-semibold">
                      Lavash &amp; Purees
                    </div>
                  </div>
                </div>

                {/* Paneer */}
                <div className="bg-white/95 border border-stone-200/80 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xs hover:border-red-400 transition">
                  <img
                    src={realFoodPaneer4}
                    alt="Live Tandoor Paneer"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-sm"
                  />

                  <div>
                    <div className="text-[11px] font-bold text-stone-900 leading-tight">
                      Live Tandoor
                    </div>

                    <div className="text-[9px] text-[#EA3808] font-semibold">
                      Sizzling Paneer Tikka
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-gradient-warm py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold mb-4 shadow-card">
                  <s.icon className="w-6 h-6 text-gold-foreground" />
                </div>

                <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                  {s.value}
                </div>

                <div className="text-sm text-muted-foreground mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABOUT PREVIEW */}
        <section className="py-24 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src={ABOUT_IMG}
              alt="Hariom Caterers Royal Catering Setup"
              referrerPolicy="no-referrer"
              className="rounded-3xl shadow-elegant w-full h-[500px] object-cover"
            />

            <div className="absolute -bottom-8 -right-8 bg-stone-900 text-white rounded-2xl p-6 shadow-xl border border-red-500/30 max-w-xs hidden md:block">
              <div className="text-4xl font-display text-white font-bold">
                50+
              </div>

              <div className="text-sm mt-1 text-stone-300">
                Years of authentic Indian catering excellence
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#EA3808]">
              <span className="h-px w-8 bg-[#EA3808]" />
              Our Story
            </div>

            <h2 className="mt-4 text-4xl md:text-5xl text-stone-900 font-display font-bold">
              Where tradition meets taste.
            </h2>

            <p className="mt-6 text-stone-600 text-lg leading-relaxed">
              Founded by{" "}
              <span className="text-[#EA3808] font-semibold">
                {CONTACT.name}
              </span>
              , Hariom Caterers has become synonymous with authentic
              vegetarian catering across Gujarat. Every dish is a promise of
              purity, taste, and tradition passed down through generations.
            </p>

            <p className="mt-4 text-stone-600 leading-relaxed">
              From humble family gatherings to grand weddings of 5,000+
              guests, our team of master chefs and hospitality professionals
              bring warmth, precision, and passion to every plate.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-[#EA3808] font-bold hover:gap-3 transition-all cursor-pointer"
            >
              Read our full story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* PACKAGES */}
        <section className="py-24 bg-gradient-warm overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#EA3808]">
                <span className="h-px w-8 bg-[#EA3808]" />
                Signature Packages
                <span className="h-px w-8 bg-[#EA3808]" />
              </div>

              <h2 className="mt-4 text-4xl md:text-5xl text-stone-900 font-display font-bold">
                Curated for every celebration
              </h2>

              <p className="mt-4 text-stone-600">
                Four exquisitely designed packages. Endless customization
                within each.
              </p>
            </div>

            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PACKAGES.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                  }}
                  className={`relative bg-card rounded-3xl p-6 shadow-card hover:shadow-glow transition-all hover:-translate-y-2 flex flex-col justify-between border border-border ${
                    p.id === "regal"
                      ? "ring-2 ring-[#EA3808] shadow-glow animate-glow-border border-[#EA3808]"
                      : ""
                  }`}
                >
                  {p.id === "regal" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <Utensils
                      className="w-8 h-8 text-[#EA3808]"
                      style={{
                        color: p.color || "#EA3808",
                      }}
                    />

                    <h3 className="mt-4 text-2xl font-display font-bold text-stone-900">
                      {p.name}
                    </h3>

                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {p.tagline}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold text-stone-900">
                        ₹{p.price}
                      </span>

                      <span className="text-stone-500 text-xs">
                        / plate*
                      </span>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-xs text-stone-600 border-t border-border pt-3">
                      {p.options[0].categories.slice(0, 7).map((c) => (
                        <li
                          key={c.name}
                          className="flex justify-between border-b border-border/50 pb-1"
                        >
                          <span className="truncate">
                            {c.name}
                          </span>

                          <span className="text-[#EA3808] font-bold ml-1">
                            {c.count}
                          </span>
                        </li>
                      ))}

                      <li className="text-[11px] text-[#EA3808] font-semibold italic pt-1">
                        + more items
                      </li>
                    </ul>
                  </div>

                  <Link
                    to="/packages"
                    hash={p.id}
                    className="mt-6 block text-center bg-[#EA3808] hover:bg-[#C42200] text-white py-2.5 rounded-full text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROTATING DISH SHOWCASE */}
        <RotatingDishShowcase />

        {/* TESTIMONIALS */}
        <TestimonialsSlider />

        {/* CTA */}
        <section className="py-24 px-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-[#EA3808] via-[#D12B00] to-[#A01C00] rounded-3xl p-12 md:p-16 text-center text-white shadow-elegant relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-red-400/20 blur-3xl" />

            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-red-300/20 blur-3xl" />

            <div className="relative">
              <Sparkles className="w-8 h-8 text-white mx-auto" />

              <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold text-white">
                Ready to plan your dream event?
              </h2>

              <p className="mt-4 text-white/90 max-w-xl mx-auto">
                Use our menu planner to design a personalized menu, download
                a PDF, share via WhatsApp or email.
              </p>

              <Link
                to="/menu-planner"
                className="mt-8 inline-flex items-center gap-2 bg-white text-[#EA3808] hover:bg-stone-100 px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                Start Planning
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* SOCIAL FLOATING BUTTONS */}
        <div className="fixed right-4 bottom-6 z-[9999] flex flex-col gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.55)] hover:shadow-[0_0_40px_rgba(37,211,102,1)] hover:scale-110 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />

            <FaWhatsapp
              className="relative z-10 w-8 h-8"
              aria-hidden="true"
            />

            <span className="absolute right-16 whitespace-nowrap bg-stone-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
              WhatsApp
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-[0_0_20px_rgba(221,42,123,0.55)] hover:shadow-[0_0_40px_rgba(221,42,123,1)] hover:scale-110 transition-all duration-300"
          >
            <Instagram className="relative z-10 w-7 h-7" />

            <span className="absolute right-16 whitespace-nowrap bg-stone-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
              Instagram
            </span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#1877F2] text-white shadow-[0_0_20px_rgba(24,119,242,0.55)] hover:shadow-[0_0_40px_rgba(24,119,242,1)] hover:scale-110 transition-all duration-300"
          >
            <Facebook
              className="relative z-10 w-7 h-7"
              fill="white"
            />

            <span className="absolute right-16 whitespace-nowrap bg-stone-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
              Facebook
            </span>
          </a>
        </div>
      </SiteLayout>
    </>
  );
}