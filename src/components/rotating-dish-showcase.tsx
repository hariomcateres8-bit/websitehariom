import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ChevronLeft, ChevronRight, Play, Pause, Utensils, Check } from "lucide-react";
import realFoodGrazing1 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.57 AM.jpeg";
import realFoodCanapes2 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (1).jpeg";
import realFoodDips3 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (3).jpeg";
import realFoodPaneer4 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (7).jpeg";
import realFoodSweets5 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (11).jpeg";
import realFoodBuffet6 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (15).jpeg";

interface DishItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  ingredients: string[];
  img: string;
  accent: string;
}

const SPECIAL_DISHES: DishItem[] = [
  {
    id: "royal-grazing-table",
    name: "Royal Live Grazing Table",
    category: "Signature Live Counter",
    tagline: "Proprietor Khimjibhai's Masterpiece",
    description:
      "A lavish royal grazing spread featuring artisanal cheese platters, cold dip bowls, gourmet bruschetta, seasoned nuts, and fresh seasonal fruit garnishes on illuminated wooden bars.",
    ingredients: [
      "Artisanal Cheese",
      "Cold Dips",
      "Herbed Lavash",
      "Fresh Berries",
      "Seasoned Almonds",
    ],
    img: realFoodGrazing1,
    accent: "#EA3808",
  },
  {
    id: "cocktail-canapes-platter",
    name: "Gourmet Canapes & Starters",
    category: "Cocktail Finger Foods",
    tagline: "Handcrafted Fusion Delicacies",
    description:
      "Crisp savory tartlets, micro-canapes topped with spiced relish, avocado cream, and handcrafted fusion finger foods prepared fresh on-site for high-end celebrations.",
    ingredients: [
      "Savory Tartlets",
      "Spiced Herb Relish",
      "Avocado Mousse",
      "Microgreens",
      "Crispy Rounds",
    ],
    img: realFoodCanapes2,
    accent: "#EA3808",
  },
  {
    id: "artisanal-dips-bar",
    name: "Cold Counter Dips & Crisps",
    category: "Artisanal Grazing Station",
    tagline: "Cold-Pressed Fresh Purees & Lavash",
    description:
      "Authentic freshly ground hummus, beetroot dip, creamy herb tahina, and garlic yogurt dip paired with freshly baked lavash ribbons and grishni breadsticks.",
    ingredients: [
      "Beetroot Hummus",
      "Classic Tahini Dip",
      "Garlic Herb Dip",
      "Lavash Ribbons",
      "Grishni",
    ],
    img: realFoodDips3,
    accent: "#EA3808",
  },
  {
    id: "live-tandoor-starters",
    name: "Live Tandoori & Paneer Delicacies",
    category: "Live Sizzling Station",
    tagline: "Fresh Charcoal Grilled Delights",
    description:
      "Tender cottage cheese marinated in secret royal spices, skewered with bell peppers and roasted in live clay ovens, served piping hot with fresh pudina chutney.",
    ingredients: [
      "Farm-Fresh Paneer",
      "Secret Spices",
      "Roasted Bell Peppers",
      "Mint Coriander Glaze",
      "Chaat Masala",
    ],
    img: realFoodPaneer4,
    accent: "#EA3808",
  },
  {
    id: "royal-sweets-platter",
    name: "Desi Ghee Royal Mithai Platter",
    category: "Traditional Grand Sweets",
    tagline: "Authentic Gujarati & Rajasthani Rasoi",
    description:
      "Rich traditional sweets crafted with 100% pure desi ghee, saffron strands, and premium nuts — including Mohanthal, Basundi, Kesar Rasgulla, and live Kesariya Jalebi.",
    ingredients: [
      "Pure Desi Ghee",
      "Kashmiri Kesar",
      "Pistachio & Almonds",
      "Fresh Mawa",
      "Cardamom",
    ],
    img: realFoodSweets5,
    accent: "#EA3808",
  },
  {
    id: "grand-banquet-spread",
    name: "Grand Royal Feast Presentation",
    category: "5-Star Banquet Experience",
    tagline: "Flawless Hospitality for 500 to 5,000+ Guests",
    description:
      "Comprehensive multi-course catering spread with brass chafing dishes, live counters, custom beverage bars, and impeccably trained hospitality managers.",
    ingredients: [
      "Multi-Course Feast",
      "Live Beverage Bar",
      "Brass Buffet Crockery",
      "Uniformed Hospitality",
    ],
    img: realFoodBuffet6,
    accent: "#EA3808",
  },
];

export function RotatingDishShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto rotation timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPECIAL_DISHES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeDish = SPECIAL_DISHES[activeIndex];
  const count = SPECIAL_DISHES.length;

  const nextDish = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  const prevDish = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/20 text-[#EA3808] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Auto-Rotating Delicacies
        </div>
        <h2 className="mt-4 text-4xl sm:text-5xl font-display font-bold text-stone-900">
          What makes us <span className="text-[#EA3808]">special</span>
        </h2>
        <p className="mt-4 text-stone-600 text-base sm:text-lg">
          Watch our signature culinary presentations rotate in a live 360° circular showcase —
          crafted with royal artistry and 100% pure vegetarian passion.
        </p>
      </div>

      {/* Main Semi-Circular Turntable Stage */}
      <div className="mt-16 bg-gradient-to-b from-amber-50/60 via-white to-red-50/20 rounded-3xl p-6 sm:p-10 lg:p-12 border border-amber-200/70 shadow-xl relative overflow-hidden">
        {/* Background circular radar rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-amber-300/30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-[#EA3808]/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-amber-400/30 pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Rotating Circular Dishes Carousel / Turntable */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* Circular Orbit Carousel */}
            <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] flex items-center justify-center">
              {/* Outer Golden Turntable Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 bg-gradient-to-tr from-amber-100/40 via-white/80 to-red-100/20 shadow-inner" />

              {/* Center Active Dish (Large Round Platter) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDish.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative z-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-2.5 bg-gradient-to-br from-[#EA3808] via-[#D12B00] to-[#991B00] shadow-[0_0_30px_rgba(234,56,8,0.35)]"
                >
                  {/* Inside Plate Rim */}
                  <div className="w-full h-full rounded-full p-1.5 bg-white shadow-2xl overflow-hidden relative">
                    <img
                      src={activeDish.img}
                      alt={activeDish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-full bg-radial from-transparent to-black/30 pointer-events-none" />

                    {/* Pure Veg Emblem Tag */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-0.5 rounded-full border border-emerald-500 shadow-md flex items-center gap-1.5 text-[10px] font-black text-emerald-700">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping" />
                      100% PURE VEG
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Orbiting Satellite Dishes */}
              {SPECIAL_DISHES.map((dish, i) => {
                // Calculate position on the circle relative to activeIndex
                const angleOffset = ((i - activeIndex) * (360 / count) - 90) * (Math.PI / 180);
                const radius = 175;
                const isCurrent = i === activeIndex;

                return (
                  <motion.button
                    key={dish.id}
                    onClick={() => {
                      setActiveIndex(i);
                      setIsPlaying(false);
                    }}
                    animate={{
                      x: Math.cos(angleOffset) * radius,
                      y: Math.sin(angleOffset) * radius,
                      scale: isCurrent ? 1.15 : 0.9,
                      opacity: isCurrent ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`absolute z-30 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full p-1 transition-all cursor-pointer group shadow-lg ${
                      isCurrent
                        ? "bg-gradient-to-r from-[#EA3808] to-[#C42200] ring-4 ring-red-300 ring-offset-2 scale-110"
                        : "bg-white hover:scale-105 hover:opacity-100 ring-2 ring-stone-200"
                    }`}
                    title={dish.name}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img
                        src={dish.img}
                        alt={dish.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    {/* Floating mini number badge */}
                    <span
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shadow-md ${
                        isCurrent ? "bg-[#EA3808] text-white" : "bg-stone-900 text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Turntable Control Bar */}
            <div className="mt-8 flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-amber-200 shadow-md">
              <button
                onClick={prevDish}
                className="p-2 rounded-full hover:bg-amber-100 text-stone-700 transition cursor-pointer"
                title="Previous Dish"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EA3808] text-white text-xs font-bold shadow-sm hover:bg-[#C42200] transition cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" /> Auto-Rotating
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Spin Auto
                  </>
                )}
              </button>

              <button
                onClick={nextDish}
                className="p-2 rounded-full hover:bg-amber-100 text-stone-700 transition cursor-pointer"
                title="Next Dish"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="h-4 w-px bg-stone-200 mx-1" />

              <span className="text-xs font-bold text-stone-500">
                <span className="text-[#EA3808]">{activeIndex + 1}</span> / {count}
              </span>
            </div>
          </div>

          {/* Right Column: Selected Dish Royal Gourmet Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDish.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xl relative"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#EA3808] bg-[#EA3808]/10 px-3 py-1 rounded-full border border-[#EA3808]/20">
                    <Utensils className="w-3.5 h-3.5" /> {activeDish.category}
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    ★ Royal Signature
                  </span>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl font-display font-bold text-stone-900">
                  {activeDish.name}
                </h3>
                <div className="text-sm font-semibold text-amber-700 mt-1">
                  {activeDish.tagline}
                </div>

                <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                  {activeDish.description}
                </p>

                {/* Key Highlights / Ingredients pills */}
                <div className="mt-6">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                    Featured Elements &amp; Garnishes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeDish.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-stone-800 text-xs font-medium px-3 py-1 rounded-full shadow-2xs"
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Quick Switch Indicator dots */}
                <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {SPECIAL_DISHES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveIndex(i);
                          setIsPlaying(false);
                        }}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          i === activeIndex
                            ? "w-8 bg-[#EA3808]"
                            : "w-2.5 bg-stone-200 hover:bg-stone-300"
                        }`}
                        title={`Go to dish ${i + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Fresh Prepared On-Site
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
