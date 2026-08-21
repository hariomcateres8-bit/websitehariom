import { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "motion/react"; 
import { Sparkles, ChevronLeft, ChevronRight, Play, Pause, Utensils, Check, Flame } from "lucide-react"; 
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
    }, 4500); 
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
    <section className="relative py-24 sm:py-28 bg-[#FDFBF7] text-stone-900 overflow-hidden">
      {/* Background Soft Cream Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#EA3808]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/30 text-[#EA3808] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EA3808]" /> Interactive Culinary Masterpieces
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-stone-900"
          >
            What makes us <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA3808] via-orange-600 to-amber-700">special</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed"
          >
            Watch our signature culinary presentations rotate in a live 360° showcase — 
            crafted with royal artistry and 100% pure vegetarian passion.
          </motion.p>
        </div>

        {/* Bento Grid Showcase Layout */}
        <div className="mt-16 grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Big Cinematic Image Showcase (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xl min-h-[420px] sm:min-h-[520px] flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeDish.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-0"
              >
                <img 
                  src={activeDish.img} 
                  alt={activeDish.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Top Overlay badges */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <div className="bg-white/80 backdrop-blur-md border border-stone-300 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-800">100% Pure Veg</span>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md border border-stone-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-stone-900 shadow-sm">
                <span className="text-[#EA3808]">{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-stone-400 mx-1.5">/</span>
                <span className="text-stone-900">{String(count).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Bottom Floating Title on Image */}
            <div className="relative z-10 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDish.id + "-title"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="inline-flex items-center gap-2 text-orange-200 text-xs font-bold uppercase tracking-widest mb-2 drop-shadow-md">
                    <Flame className="w-4 h-4 text-[#EA3808]" /> {activeDish.category}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-white drop-shadow-md">
                    {activeDish.name}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Content & Details Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#EA3808]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeDish.id + "-content"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#EA3808] bg-[#EA3808]/10 border border-[#EA3808]/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" /> {activeDish.category}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                      ★ Royal Signature
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl sm:text-3xl font-display font-bold text-stone-900">
                    {activeDish.name}
                  </h3>
                  
                  <p className="text-xs font-semibold text-amber-700 mt-1 uppercase tracking-wide">
                    {activeDish.tagline}
                  </p>

                  <div className="my-5 h-px bg-stone-200" />

                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    {activeDish.description}
                  </p>

                  {/* Ingredients Tags */}
                  <div className="mt-6">
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                      Featured Elements &amp; Garnishes
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeDish.ingredients.map((ing) => (
                        <div 
                          key={ing}
                          className="flex items-center gap-2.5 bg-stone-50 border border-stone-200/70 px-3 py-2.5 rounded-xl hover:border-[#EA3808]/40 transition shadow-2xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </span>
                          <span className="text-xs font-medium text-stone-800">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls & Navigation Carousel */}
            <div className="relative z-10 mt-8 pt-6 border-t border-stone-200">
              
              {/* Thumbnail Selector Row */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {SPECIAL_DISHES.map((dish, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={dish.id}
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsPlaying(false);
                      }}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        isSelected 
                          ? "border-[#EA3808] scale-105 shadow-md shadow-[#EA3808]/20 ring-2 ring-[#EA3808]/20" 
                          : "border-stone-300 opacity-50 hover:opacity-100 hover:border-stone-400"
                      }`}
                      title={dish.name}
                    >
                      <img src={dish.img} alt={dish.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons Bar */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevDish} 
                    className="w-10 h-10 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-[#EA3808] hover:text-white hover:border-[#EA3808] transition cursor-pointer shadow-2xs"
                    title="Previous Dish"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="h-10 px-4 rounded-full bg-[#EA3808]/10 border border-[#EA3808]/30 text-[#EA3808] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#EA3808] hover:text-white transition cursor-pointer shadow-2xs"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    {isPlaying ? "Auto" : "Play"}
                  </button>

                  <button 
                    onClick={nextDish} 
                    className="w-10 h-10 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-[#EA3808] hover:text-white hover:border-[#EA3808] transition cursor-pointer shadow-2xs"
                    title="Next Dish"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> On-Site Live Prep
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}