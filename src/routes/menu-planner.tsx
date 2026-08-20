import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import {
  Plus,
  Trash2,
  Download,
  MessageCircle,
  Mail,
  ChevronRight,
  ChevronLeft,
  User,
  Utensils,
  Check,
  AlertCircle,
  Search,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Printer,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
import { useAdminData } from "@/lib/admin-store";
import {
  getMergedDishCatalog,
  getDishImage,
  CONTACT,
  COMPANY_INFO,
  TERMS_AND_CONDITIONS,
  EXCLUSION_RATES,
} from "@/lib/menu-data";
import {
  PdfExporterSection,
  type MealPlan,
  type CustomerDetails,
} from "@/components/pdf-menu-document";

export const Route = createFileRoute("/menu-planner")({
  head: () => ({
    meta: [
      { title: "Menu Planner — Hariom Caterers" },
      {
        name: "description",
        content:
          "Design your custom event menu online. Select dish items by category, preview 4-page PDF layout, download with custom backgrounds, and share on WhatsApp.",
      },
      { property: "og:title", content: "Menu Planner — Hariom Caterers" },
      { property: "og:description", content: "Design your custom event menu online." },
    ],
  }),
  validateSearch: () => ({}),
  component: MenuPlannerPage,
});

export interface Meal {
  id: string;
  name: string;
  date: string;
  time: string;
  pax: number;
  selections: Record<string, string[]>; // category -> dish list
}

const customerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  email: z.string().trim().email("Enter a valid email").max(120).or(z.literal("")),
  eventType: z.string().trim().min(2, "Enter event type").max(80),
  city: z.string().trim().min(2, "Enter city").max(80),
  notes: z.string().max(500).optional(),
});

type Customer = z.infer<typeof customerSchema>;

const EMPTY_CUSTOMER: Customer = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  city: "Ahmedabad",
  notes: "",
};

function generateId(): string {
  // crypto.randomUUID() may not be available in all environments
  // (e.g., non-secure HTTP contexts, some dev setups, older browsers)
  try {
    return crypto.randomUUID();
  } catch {
    // Fallback UUID v4 generation
    const hex = "0123456789abcdef";
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return hex[v];
    });
  }
}

function newMeal(name = "Meal 1"): Meal {
  return {
    id: generateId(),
    name,
    date: "",
    time: "",
    pax: 500,
    selections: {},
  };
}

function MenuPlannerPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [meals, setMeals] = useState<Meal[]>([newMeal("Meal 1")]);
  const [activeMeal, setActiveMeal] = useState(0);

  const goStep2 = () => {
    const res = customerSchema.safeParse(customer);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  return (
    <SiteLayout>
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[#FCFAF5] via-[#F7F2E7] to-[#F1E8D5] border-b border-[#E8DFC8]">
        {/* Interactive Luxury Canvas */}
        <LuxuryHeroCanvas />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8DFC8]/50 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EDE5D3]/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(232,223,200,0.35)_0%,_transparent_60%)]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-stone-900 z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-[#EA3808] font-bold shadow-2xs">
              Hariom Caterers Custom Menu Planner
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold text-stone-900 drop-shadow-xs">
              Design Your <span className="text-[#EA3808]">Custom Event Menu</span>
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto text-sm md:text-base font-normal">
              Add multiple meal sessions, select pure vegetarian delicacies, and generate an
              official proposal PDF with customized background designs.
            </p>
          </div>
          <Stepper step={step} />
        </div>
      </section>

      {/* Main Form Content */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {step === 1 && (
            <CustomerStep
              customer={customer}
              setCustomer={setCustomer}
              errors={errors}
              onNext={goStep2}
            />
          )}
          {step === 2 && (
            <MealsStep
              meals={meals}
              setMeals={setMeals}
              active={activeMeal}
              setActive={setActiveMeal}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <SummaryStep customer={customer} meals={meals} onBack={() => setStep(2)} />
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: "Customer Details", icon: User },
    { num: 2, label: "Custom Menu Planner", icon: Utensils },
    { num: 3, label: "4-Page PDF & Download", icon: FileText },
  ];
  return (
    <div className="mt-10 flex items-center justify-center gap-2 md:gap-8 max-w-2xl mx-auto">
      {steps.map((s, idx) => {
        const Icon = s.icon;
        const active = step === s.num;
        const done = step > s.num;
        return (
          <div key={s.num} className="flex items-center gap-2 md:gap-4 flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                  done
                    ? "bg-[#EA3808] text-white shadow-sm"
                    : active
                      ? "bg-[#EA3808] text-white ring-4 ring-red-200 shadow-md"
                      : "bg-stone-200 text-stone-600"
                }`}
              >
                {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span
                className={`text-xs mt-2 font-semibold text-center hidden sm:block ${
                  active ? "text-[#EA3808]" : "text-stone-600"
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 transition ${
                  step > s.num ? "bg-[#EA3808]" : "bg-stone-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold mb-2 text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border bg-card px-4 py-3 rounded-xl outline-none transition focus:ring-2 focus:ring-primary text-foreground ${
          error ? "border-destructive focus:ring-destructive" : "border-input"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function CustomerStep({
  customer,
  setCustomer,
  errors,
  onNext,
}: {
  customer: Customer;
  setCustomer: (c: Customer) => void;
  errors: Record<string, string>;
  onNext: () => void;
}) {
  const update = (field: keyof Customer, val: string) => {
    setCustomer({ ...customer, [field]: val });
  };

  return (
    <div className="max-w-2xl mx-auto bg-card rounded-3xl p-6 md:p-10 shadow-card animate-fade-up">
      <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-primary">
            Customer & Event Information
          </h2>
          <p className="text-xs text-muted-foreground">
            Enter your contact and event details for your proposal
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Field
          label="Full Name"
          name="name"
          value={customer.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          placeholder="e.g. Rajesh Patel"
          required
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Phone / Mobile Number"
            name="phone"
            type="tel"
            value={customer.phone}
            onChange={(v) => update("phone", v)}
            error={errors.phone}
            placeholder="e.g. 9824615399"
            required
          />
          <Field
            label="Email Address (Optional)"
            name="email"
            type="email"
            value={customer.email ?? ""}
            onChange={(v) => update("email", v)}
            error={errors.email}
            placeholder="e.g. rajesh@example.com"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Event / Occasion Type"
            name="eventType"
            value={customer.eventType}
            onChange={(v) => update("eventType", v)}
            error={errors.eventType}
            placeholder="e.g. Wedding, Reception, Sangeet"
            required
          />
          <Field
            label="City / Venue Location"
            name="city"
            value={customer.city}
            onChange={(v) => update("city", v)}
            error={errors.city}
            placeholder="e.g. Ahmedabad"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-semibold mb-2 text-foreground">
            Special Requests / Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={customer.notes ?? ""}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="e.g. Jain food options required, preferred timing, theme colors..."
            className="w-full border border-input bg-card px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold hover:bg-primary/90 transition shadow-lg"
        >
          Continue to Menu Planner <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function MealsStep({
  meals,
  setMeals,
  active,
  setActive,
  onBack,
  onNext,
}: {
  meals: Meal[];
  setMeals: (m: Meal[]) => void;
  active: number;
  setActive: (n: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | "all">(0);
  const [itemPage, setItemPage] = useState<number>(1);
  useAdminData();

  const meal = meals[active] || meals[0];

  const updateMeal = (patch: Partial<Meal>) => {
    const copy = [...meals];
    copy[active] = { ...meal, ...patch };
    setMeals(copy);
  };

  const toggleDish = (cat: string, dish: string) => {
    const cur = meal.selections[cat] ?? [];
    const next = cur.includes(dish) ? cur.filter((d) => d !== dish) : [...cur, dish];
    updateMeal({ selections: { ...meal.selections, [cat]: next } });
  };

  const addMeal = () => {
    const m = newMeal(`Meal ${meals.length + 1}`);
    setMeals([...meals, m]);
    setActive(meals.length);
  };

  const removeMeal = (i: number) => {
    if (meals.length === 1) return;
    const copy = meals.filter((_, idx) => idx !== i);
    setMeals(copy);
    setActive(Math.max(0, active - (i <= active ? 1 : 0)));
  };

  const totalSelectedCount = useMemo(() => {
    return Object.values(meal.selections).reduce((sum, list) => sum + list.length, 0);
  }, [meal.selections]);

  const categories = Object.keys(getMergedDishCatalog());

  const handleCategoryChange = (index: number | "all") => {
    setActiveCategoryIndex(index);
    setItemPage(1);
  };

  const prevCategory = () => {
    if (activeCategoryIndex === "all") {
      setActiveCategoryIndex(0);
    } else if (activeCategoryIndex > 0) {
      setActiveCategoryIndex(activeCategoryIndex - 1);
    }
    setItemPage(1);
  };

  const nextCategory = () => {
    if (activeCategoryIndex === "all") {
      setActiveCategoryIndex(0);
    } else if (activeCategoryIndex < categories.length - 1) {
      setActiveCategoryIndex(activeCategoryIndex + 1);
    }
    setItemPage(1);
  };

  const displayCategories =
    activeCategoryIndex === "all"
      ? categories
      : [categories[activeCategoryIndex as number]].filter(Boolean);

  const ITEMS_PER_PAGE = 12;

  return (
    <div className="animate-fade-up space-y-6">
      {/* Meal Session Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-4 rounded-2xl shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          {meals.map((m, i) => (
            <div
              key={m.id}
              className={`flex items-center gap-1 rounded-full transition ${
                active === i
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <button
                onClick={() => setActive(i)}
                className="px-4 py-2 text-sm font-semibold rounded-full cursor-pointer"
              >
                {m.name}
              </button>
              {meals.length > 1 && (
                <button
                  onClick={() => removeMeal(i)}
                  className="pr-3 opacity-70 hover:opacity-100 cursor-pointer"
                  title="Remove session"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addMeal}
            className="flex items-center gap-1 border-2 border-dashed border-primary/40 text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Meal Session
          </button>
        </div>

        <div className="text-xs font-semibold px-4 py-2 bg-amber-500/10 text-amber-900 dark:text-amber-300 rounded-full border border-amber-500/20">
          Selected Items: <strong className="text-primary">{totalSelectedCount} Dishes</strong>
        </div>
      </div>

      {/* Category Wise Tabs Bar (Clickable Pagination) */}
      <div className="bg-card p-4 rounded-2xl shadow-card border border-border">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-500" /> Click Category to View Dishes
          </div>
          {activeCategoryIndex !== "all" && (
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
              Category {(activeCategoryIndex as number) + 1} of {categories.length}
            </div>
          )}
        </div>

        {/* Scrollable Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeCategoryIndex === "all"
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/40"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All Categories ({categories.length})
          </button>

          {categories.map((cat, idx) => {
            const count = (meal.selections[cat] ?? []).length;
            const isCurrent = activeCategoryIndex === idx;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-500/50"
                    : count > 0
                      ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <span>{cat}</span>
                {count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded-full font-black ${
                      isCurrent ? "bg-white text-amber-900" : "bg-amber-600 text-white"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Meal Details Sidebar */}
        <div className="bg-card rounded-3xl p-6 shadow-card lg:sticky lg:top-24 self-start space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Utensils className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg text-primary">Meal Settings</h3>
          </div>

          <Field
            label="Meal Session Name"
            name="mealName"
            value={meal.name}
            onChange={(v) => updateMeal({ name: v })}
            placeholder="e.g. Welcome Dinner / Wedding Lunch"
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Function Date"
              name="date"
              type="date"
              value={meal.date}
              onChange={(v) => updateMeal({ date: v })}
            />
            <Field
              label="Function Time"
              name="time"
              type="time"
              value={meal.time}
              onChange={(v) => updateMeal({ time: v })}
            />
          </div>

          <div>
            <label htmlFor="pax" className="block text-sm font-semibold mb-2 text-foreground">
              Guest Count (Pax)
            </label>
            <input
              id="pax"
              name="pax"
              type="number"
              min={100}
              step={50}
              value={meal.pax}
              onChange={(e) => updateMeal({ pax: Number(e.target.value) })}
              className="w-full border border-input bg-background px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-foreground"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              * Minimum 500 pax standard guarantee policy
            </p>
          </div>

          {/* Search bar */}
          <div className="pt-2">
            <label
              htmlFor="searchDish"
              className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5"
            >
              Quick Dish Filter
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" />
              <input
                id="searchDish"
                type="text"
                placeholder="Search Paneer, Chaat, Gulab Jamun..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setItemPage(1);
                }}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-background border border-input rounded-xl outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Categories & Dish Selection Grid */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Pagination Header Control */}
          {activeCategoryIndex !== "all" && (
            <div className="flex items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-xs">
              <button
                disabled={activeCategoryIndex === 0}
                onClick={prevCategory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-secondary hover:bg-secondary/80 disabled:opacity-40 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Category
              </button>

              <div className="text-center">
                <span className="text-xs font-extrabold text-primary uppercase tracking-wide">
                  {categories[activeCategoryIndex as number]}
                </span>
                <span className="block text-[10px] text-muted-foreground">
                  (Category {(activeCategoryIndex as number) + 1} of {categories.length})
                </span>
              </div>

              <button
                disabled={activeCategoryIndex === categories.length - 1}
                onClick={nextCategory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-40 transition cursor-pointer shadow-xs"
              >
                Next Category <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {displayCategories.map((cat) => {
            const rawDishes = getMergedDishCatalog()[cat] ?? [];
            const filteredDishes = searchQuery
              ? rawDishes.filter((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
              : rawDishes;

            if (searchQuery && filteredDishes.length === 0) return null;

            const totalItems = filteredDishes.length;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
            const currentPage = Math.min(itemPage, totalPages);
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const paginatedDishes = filteredDishes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            const selected = meal.selections[cat] ?? [];

            return (
              <div
                key={cat}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/60 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-gold rounded-full" />
                    <h3 className="text-lg font-display font-bold text-primary">{cat}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {selected.length} Selected
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {paginatedDishes.map((dishName) => {
                    const isSelected = selected.includes(dishName);
                    const imgSrc = getDishImage(dishName);

                    return (
                      <button
                        key={dishName}
                        type="button"
                        onClick={() => toggleDish(cat, dishName)}
                        className={`group relative flex flex-col overflow-hidden rounded-xl border-2 text-left transition cursor-pointer ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/40 bg-primary/5"
                            : "border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                          <img
                            src={imgSrc}
                            alt={dishName}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="p-2.5 text-xs font-semibold leading-tight line-clamp-2 text-foreground">
                          {dishName}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Inside Category Items Pagination Controls (if total items > 12) */}
                {totalPages > 1 && (
                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">
                      Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}{" "}
                      of {totalItems} items
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => setItemPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 rounded-lg border border-input bg-background disabled:opacity-40 font-bold hover:bg-muted transition cursor-pointer"
                      >
                        Prev Page
                      </button>
                      <span className="px-2 font-bold text-primary">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        disabled={currentPage >= totalPages}
                        onClick={() => setItemPage((p) => Math.min(totalPages, p + 1))}
                        className="px-2.5 py-1 rounded-lg border border-input bg-background disabled:opacity-40 font-bold hover:bg-muted transition cursor-pointer"
                      >
                        Next Page
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Next Category Navigation Button */}
                {activeCategoryIndex !== "all" && (
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <button
                      disabled={activeCategoryIndex === 0}
                      onClick={prevCategory}
                      className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous Category
                    </button>

                    {activeCategoryIndex < categories.length - 1 ? (
                      <button
                        onClick={nextCategory}
                        className="inline-flex items-center gap-2 bg-[#EA3808] hover:bg-[#C42200] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        Next Category: {categories[(activeCategoryIndex as number) + 1]}{" "}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        ✓ All Categories Reviewed
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary px-6 py-3 rounded-full font-bold hover:bg-primary/5 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Customer Info
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold hover:bg-primary/90 transition shadow-lg cursor-pointer"
        >
          Preview & Export 4-Page PDF <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SummaryStep({
  customer,
  meals,
  onBack,
}: {
  customer: Customer;
  meals: Meal[];
  onBack: () => void;
}) {
  const formattedMeals: MealPlan[] = meals.map((m) => ({
    id: m.id,
    name: m.name,
    date: m.date,
    time: m.time,
    pax: m.pax,
    selections: m.selections,
  }));

  const formattedCustomer: CustomerDetails = {
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    eventType: customer.eventType,
    city: customer.city,
    notes: customer.notes,
  };

  return (
    <PdfExporterSection
      customer={formattedCustomer}
      meals={formattedMeals}
      onBack={onBack}
      backLabel="Edit Selections"
    />
  );
}
