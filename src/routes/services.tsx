import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Utensils,
  Award,
  Users,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Flame,
  Heart,
  Briefcase,
  PartyPopper,
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
import { CONTACT, COMPANY_INFO } from "@/lib/menu-data";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const SERVICES_LIST = [
  {
    id: "wedding",
    title: "Grand Royal Wedding Catering",
    gujaratiTitle: "રોયલ લગ્ન પ્રસંગ કેટરિંગ",
    subtitle: "Magical multi-course royal feasts designed for weddings with 200 to 5,000+ guests.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    badge: "Most Popular",
    icon: Heart,
    features: [
      "Royal Welcome Drinks & Mocktail Bar",
      "Multi-Cuisine Live Counter Setup",
      "Exclusive Brass & Imported Bone-China Crockery",
      "Uniformed Hospitality Managers & Waiters",
      "Custom Dessert Galore & Nitrogen Counters",
    ],
    topDishes: [
      "Paneer Pasanda",
      "Dal Makhani",
      "Basundi with Puri",
      "Kesariya Jalebi",
      "Live Chaat Stalls",
    ],
  },
  {
    id: "sangeet",
    title: "Sangeet, Mehendi & Ring Ceremony",
    gujaratiTitle: "સંગીત, મહેંદી અને રીંગ સેરેમની",
    subtitle: "Vibrant, high-energy live food stalls, fusion street food & interactive stations.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    icon: PartyPopper,
    features: [
      "Live Street Food & Fusion Chaat Counter",
      "Italian Pasta & Woodfired Pizza Station",
      "Mexican Tacos & Mongolian Wok Counters",
      "Churros, Waffle & Churma Dessert Bars",
      "Fast-Service Cocktail Finger Foods",
    ],
    topDishes: [
      "Pav Bhaji Live",
      "Chinese Wok Noodles",
      "Italian Creamy Pasta",
      "Sizzling Brownie",
      "Fruit Shots",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Banquets & Executive Lunches",
    gujaratiTitle: "કોર્પોરેટ ઇવેન્ટ્સ અને મીટિંગ કેટરિંગ",
    subtitle:
      "Professional, hygienic, and punctual catering for annual meets, galas & conferences.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    badge: "Executive Class",
    icon: Briefcase,
    features: [
      "Strict Punctual On-Time Setup Guarantee",
      "Balanced Executive Thalis & Buffet Setup",
      "Artisanal Coffee & Fresh Juice Counters",
      "Sanitized & Eco-Friendly Tableware Options",
      "Flexible In-Office or Banquet Hall Delivery",
    ],
    topDishes: [
      "Healthy Salad Bar",
      "Executive Paneer Curry",
      "Jeera Rice & Dal Fry",
      "Fresh Fruit Platter",
      "Gulab Jamun",
    ],
  },
  {
    id: "puja",
    title: "Religious Puja, Katha & Housewarming",
    gujaratiTitle: "પૂજા, કથા અને વાસ્તુ પૂજન પ્રસંગ",
    subtitle: "Authentic 100% Satvik food with special Jain & No-Onion-No-Garlic cooking options.",
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=800&q=80",
    badge: "100% Pure Satvik",
    icon: Sparkles,
    features: [
      "Strictly Dedicated Jain & Satvik Kitchen Vessels",
      "Pure Desi Ghee Traditional Sweets",
      "Authentic Gujarati & Rajasthani Feast",
      "Hygienic Traditional Seating or Buffet Options",
      "Fresh Warm Preparations Served With Devotion",
    ],
    topDishes: ["Gujarati Undhiyu", "Basundi Puri", "Khaman Dhokla", "Kadhi Khichdi", "Mohanthal"],
  },
  {
    id: "live-kitchen",
    title: "Live Kitchen & Interactive Food Stalls",
    gujaratiTitle: "લાઈવ કિચન અને સ્પેશિયલ સ્ટોલ્સ",
    subtitle: "Sizzle and aroma right in front of your guests cooked fresh by our master chefs.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    badge: "Interactive Dining",
    icon: Flame,
    features: [
      "Live Tandoor & Naan Masters",
      "South Indian Dosa & Uttapam Counter",
      "Live Rajasthani Dal Baati Churma Stalls",
      "Fresh Jalebi & Rabdi Live Frying",
      "Customizable Spice Levels for Every Guest",
    ],
    topDishes: [
      "Butter Garlic Naan",
      "Paper Dosa",
      "Dal Baati Churma",
      "Hot Jalebi Rabdi",
      "Tandoori Paneer Tikka",
    ],
  },
  {
    id: "private-party",
    title: "Private Parties, Birthdays & Anniversaries",
    gujaratiTitle: "બર્થડે, એનિવર્સરી અને ફેમિલી પાર્ટી",
    subtitle: "Tailored intimate celebrations from 50 to 300 pax with customized fun menus.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    badge: "Customizable",
    icon: Users,
    features: [
      "Kids-Friendly Burger & Fries Counter",
      "Chocolate Fountain & Marshmallow Dip",
      "Custom Birthday Mocktail Bar",
      "Cozy Buffet Setup for Home or Venues",
      "Budget-Friendly Quality Options",
    ],
    topDishes: ["Cheese Pizza", "French Fries", "Spring Rolls", "Ice Cream Sundae", "Manchow Soup"],
  },
];

const VALUE_ADDONS = [
  {
    title: "Royal Tableware & Crockery",
    desc: "Premium bone china, brass thalis, or eco-friendly bamboo dinnerware with cutlery.",
    icon: Utensils,
  },
  {
    title: "Uniformed Trained Staff",
    desc: "Courteous, neatly dressed waiters and floor managers ensuring seamless service.",
    icon: Users,
  },
  {
    title: "Live Theme Decoration",
    desc: "Elegantly lit buffet setups and branded food stalls matching your venue theme.",
    icon: Sparkles,
  },
  {
    title: "Strict Hygiene & FSSAI Standards",
    desc: "100% sanitized preparation, gloves, hairnets, and high safety standards.",
    icon: ShieldCheck,
  },
];

function ServicesPage() {
  const shareWhatsApp = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello Hariom Caterers! I am interested in booking "${serviceTitle}" for my upcoming event. Please share details, custom menu options, and availability.`,
    );
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <SiteLayout>
      {/* Hero Banner Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#FCFAF5] via-[#F7F2E7] to-[#F1E8D5] border-b border-[#E8DFC8]">
        {/* Interactive Luxury Particles Canvas */}
        <LuxuryHeroCanvas />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8DFC8]/50 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EDE5D3]/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(232,223,200,0.35)_0%,_transparent_60%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-900 pt-8 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#EA3808] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EA3808]" /> Hariom Catering Services
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-stone-900 leading-tight">
            Comprehensive <span className="text-[#EA3808]">Pure Veg</span> Catering Solutions
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            With over 20+ years of culinary excellence, Proprietor Khimjibhai Purohit and his master
            culinary team deliver authentic taste, live kitchen counters, and royal Indian
            hospitality.
          </p>
        </div>
      </section>

      <div className="py-16 space-y-16">
        {/* Main Services Zig-Zag Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EA3808]">
              Royal Gastronomy
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-stone-900">
              Our Catering Specializations
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
              From intimate gatherings of 50 guests to mega wedding celebrations of 5,000+ pax — we
              execute every detail with perfection.
            </p>
          </div>

          {/* Zig-Zag Services Cards */}
          <div className="space-y-10">
            {SERVICES_LIST.map((service, i) => {
              const IconComponent = service.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-36 bg-white rounded-3xl overflow-hidden border border-[#E8DFC8] shadow-card hover:shadow-xl transition-all duration-300 grid lg:grid-cols-12 items-stretch"
                >
                  {/* Image Column */}
                  <div
                    className={`relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-stone-100 ${
                      isEven ? "lg:col-span-5 order-1" : "lg:col-span-5 order-1 lg:order-2"
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-[#EA3808] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase shadow-md tracking-wider">
                      {service.badge}
                    </div>

                    {/* Mobile Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                      <div className="text-xs font-semibold text-red-200">
                        {service.gujaratiTitle}
                      </div>
                      <div className="text-xl font-bold font-display">{service.title}</div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${
                      isEven ? "lg:col-span-7 order-2" : "lg:col-span-7 order-2 lg:order-1"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="hidden lg:block space-y-1">
                        <div className="inline-flex items-center gap-2 text-[#EA3808] text-xs font-bold uppercase tracking-wider">
                          <IconComponent className="w-4 h-4 text-[#EA3808]" />
                          <span>{service.gujaratiTitle}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                        {service.subtitle}
                      </p>

                      {/* Feature Checklist */}
                      <div className="space-y-2 pt-2 border-t border-[#E8DFC8]">
                        <div className="text-xs font-bold uppercase tracking-wider text-stone-800">
                          Included Key Highlights:
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                          {service.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Dishes */}
                      <div className="space-y-2 pt-2 border-t border-[#E8DFC8]">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#EA3808]">
                          Popular Dishes:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.topDishes.map((dish, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-medium bg-[#FAF6EC] text-stone-800 border border-[#E8DFC8] px-3 py-1 rounded-full"
                            >
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-[#E8DFC8] flex flex-wrap items-center gap-3">
                      <Link
                        to="/menu-planner"
                        className="inline-flex items-center gap-2 bg-[#EA3808] hover:bg-[#C42200] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Customize Menu</span>
                      </Link>

                      <button
                        onClick={() => shareWhatsApp(service.title)}
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Inquiry</span>
                      </button>

                      <a
                        href={`tel:${CONTACT.phone}`}
                        className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#EA3808] text-xs font-semibold px-3 py-2 transition-colors ml-auto"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-[#EA3808]" />
                        <span>Call For Booking</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Value Add-ons & Service Standards */}
        <section className="bg-muted/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA3808]">
                Complete Event Setup
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-primary">
                What Is Included In Our Catering Service
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                We go beyond just preparing delicious food — we manage end-to-end dining
                presentation and hospitality on your big day.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUE_ADDONS.map((addon, idx) => {
                const AddonIcon = addon.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-3 hover:border-red-500/50 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#EA3808]/10 text-[#EA3808] flex items-center justify-center font-bold">
                      <AddonIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground">{addon.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{addon.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Step by Step Booking Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-primary">
              4 Simple Steps To Book Hariom Catering
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-base text-primary">Select Package / Menu</h3>
              <p className="text-xs text-muted-foreground">
                Choose from fixed packages or build a custom menu online using our Menu Planner
                tool.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-base text-primary">Get Official PDF Proposal</h3>
              <p className="text-xs text-muted-foreground">
                Generate a high-resolution 4-Page PDF quote instantly and share it on WhatsApp.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-base text-primary">Tasting & Finalization</h3>
              <p className="text-xs text-muted-foreground">
                Connect with Proprietor Khimjibhai Purohit for food tasting and venue layout
                planning.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="font-bold text-base text-primary">Flawless Grand Feast</h3>
              <p className="text-xs text-muted-foreground">
                Relax and enjoy your event as our master chefs and team serve delicious royal meals
                to your guests.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#18181B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-[#EA3808]/40">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#EA3808] text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                <PhoneCall className="w-3.5 h-3.5" /> Direct Proprietor Booking
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-black leading-tight text-white">
                Ready to Discuss Catering For Your Upcoming Function?
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Call Proprietor Khimjibhai Purohit directly or reach us on WhatsApp for instant
                quote estimations and date reservations.
              </p>

              <div className="pt-2 text-xs font-bold text-red-300 flex flex-wrap gap-4 justify-center md:justify-start">
                <span>✓ 100% Pure Veg</span>
                <span>✓ Custom Spice Levels</span>
                <span>✓ Ahmedabad & Gujarat Wide</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#EA3808] hover:bg-[#C42200] text-white px-8 py-4 rounded-2xl font-black text-sm transition shadow-lg hover:scale-105 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5" />
                Call Khimjibhai: +91 {CONTACT.phone}
              </a>

              <button
                onClick={shareWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-sm transition shadow-lg hover:scale-105 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
