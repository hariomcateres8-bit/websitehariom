import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, Leaf, Users, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
import { CONTACT } from "@/lib/menu-data";
import kitchenImage from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.57 AM.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Hariom Caterers" },
      {
        name: "description",
        content:
          "Two decades of pure veg catering excellence. Meet the team behind Hariom Caterers.",
      },
      { property: "og:title", content: "About Hariom Caterers" },
      {
        property: "og:description",
        content: "Two decades of pure veg catering excellence in Gujarat.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: Leaf,
    title: "100% Pure Veg",
    desc: "Never a compromise. Every ingredient carefully sourced.",
  },
  { icon: Heart, title: "Made with Love", desc: "Family recipes passed down through generations." },
  { icon: Award, title: "Award Winning", desc: "Trusted by thousands of families across Gujarat." },
  {
    icon: Users,
    title: "Expert Team",
    desc: "40+ master chefs and 200+ trained hospitality staff.",
  },
];

function AboutPage() {
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
              About Hariom Caterers
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl font-display font-bold text-stone-900 drop-shadow-xs">
              Two decades of
              <br />
              <span className="text-[#EA3808]">pure vegetarian</span> excellence.
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
              What began as a family passion for authentic Gujarati cooking has grown into one of
              the region's most trusted names in premium veg catering.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center overflow-hidden">
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          src={kitchenImage}
          alt="Kitchen"
          className="rounded-3xl shadow-elegant w-full h-[500px] object-cover"
        />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-display font-bold text-primary">Our Story</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Founded by <strong className="text-primary">{CONTACT.name}</strong>, Hariom Caterers
            began with a simple belief: pure vegetarian food, made with tradition and served with
            warmth, can move hearts.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Over 20 years, we've had the honor of serving more than 5 lakh guests across weddings,
            receptions, corporate galas, temple functions and social celebrations. Every event, big
            or small, receives the same devotion.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our kitchens are our temples. Our chefs are family. Our food is our devotion — to you,
            and to the traditions we carry forward.
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-gradient-warm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-primary">What we stand for</h2>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card text-center hover:shadow-elegant transition-shadow border border-border/50"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold mb-5 shadow-sm">
                  <v.icon className="w-6 h-6 text-gold-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-display font-bold text-primary">
            Let's create something memorable
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start planning your event menu with us today.
          </p>
          <Link
            to="/menu-planner"
            className="mt-8 inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-md cursor-pointer"
          >
            Plan Your Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
