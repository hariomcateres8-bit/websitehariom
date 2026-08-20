import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Download,
  MessageCircle,
  Mail,
  ChevronRight,
  ChevronLeft,
  User,
  Utensils,
  Check,
  AlertCircle,
  Lock,
  Plus,
  Trash2,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
import { useAdminData } from "@/lib/admin-store";
import {
  getMergedPackages,
  getMergedDishCatalog,
  getDishImage,
  type PackageId,
  type PackageOption,
} from "@/lib/menu-data";
import {
  PdfExporterSection,
  type MealPlan,
  type CustomerDetails,
} from "@/components/pdf-menu-document";

interface NormalizedPackage {
  id: string;
  name: string;
  price: number;
  tagline: string;
  color: string;
  image?: string;
  options: PackageOption[];
}

/** Merges built-in + admin custom packages, normalizing custom packages into
 *  the same shape (with an `options` array) so the planner UI works for both. */
function normalizePackages(): NormalizedPackage[] {
  return getMergedPackages().map((p) => {
    if ("options" in p) {
      return { ...p } as NormalizedPackage;
    }
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      tagline: p.tagline,
      color: p.color,
      image: p.image,
      options: [{ label: "Custom Menu", minPax: p.minPax, categories: p.categories }],
    };
  });
}

// Default fallback package if empty
const FALLBACK_PACKAGE: NormalizedPackage = {
  id: "custom",
  name: "Custom Package",
  price: 500,
  tagline: "Custom Caterers Package",
  color: "#EA3808",
  options: [{ label: "Option 1", minPax: 500, categories: [] }],
};

export const Route = createFileRoute("/package-planner")({
  head: () => ({
    meta: [
      { title: "Package Planner — Hariom Caterers" },
      {
        name: "description",
        content:
          "Plan your event with fixed catering packages. Select multiple meal sessions (Lunch, Dinner, etc.) with strict per-category dish limits.",
      },
      { property: "og:title", content: "Package Planner — Hariom Caterers" },
      { property: "og:description", content: "Design your menu within a selected package." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    pkg: (s.pkg as PackageId | undefined) ?? undefined,
  }),
  component: PackagePlannerPage,
});

const customerSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone").max(15),
  email: z.string().trim().email("Enter a valid email").max(120).or(z.literal("")),
  eventType: z.string().trim().min(1, "Enter event type").max(80),
  city: z.string().trim().min(1, "Enter city").max(80),
  date: z.string().optional(),
  time: z.string().optional(),
  pax: z.coerce.number().min(1, "Enter pax"),
  notes: z.string().max(500).optional(),
});
type Customer = z.infer<typeof customerSchema>;
const EMPTY_CUSTOMER: Customer = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  city: "",
  date: "",
  time: "",
  pax: 500,
  notes: "",
};

const MEAL_IMAGES: Record<string, string> = {
  classic:
    "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80",
  regal:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  grand:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  majestic:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
};

export interface PackageMealSession {
  id: string;
  name: string;
  date: string;
  time: string;
  pax: number;
  packageId: string;
  optionIndex: number;
  selections: Record<string, string[]>;
}

function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    const hex = "0123456789abcdef";
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return hex[v];
    });
  }
}

function newPackageMealSession(
  name = "Lunch",
  packageId: string = "classic",
  defaultDate = "",
  defaultTime = "",
  defaultPax = 0,
): PackageMealSession {
  return {
    id: generateId(),
    name,
    date: defaultDate,
    time: defaultTime,
    pax: defaultPax,
    packageId,
    optionIndex: 0,
    selections: {},
  };
}

const MEAL_NAME_PRESETS = [
  "Lunch",
  "Dinner",
  "Breakfast",
  "High Tea & Snacks",
  "Sangeet Dinner",
  "Reception Dinner",
  "Haldi / Mehendi Lunch",
  "Welcome Drinks & Dinner",
];

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
/** Parses a stored menu item entry ("name" or "name [img]<url>[img]") into name + image. */
function parseMenuItem(entry: string): { name: string; image?: string } {
  const imgMatch = entry.match(/\[img\](.*?)\[img\]/);
  if (imgMatch) {
    return { name: entry.replace(/\[img\].*?\[img\]/, "").trim(), image: imgMatch[1] };
  }
  return { name: entry };
}
function dishImage(name: string) {
  const kw = encodeURIComponent(
    name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .join(",") + ",indian,food",
  );
  return `https://loremflickr.com/320/220/${kw}/all?lock=${hashStr(name)}`;
}

function PackagePlannerPage() {
  const snapshot = useAdminData();
  const PACKAGES = useMemo(() => {
    void snapshot.version;
    const list = normalizePackages();
    return list.length > 0 ? list : [FALLBACK_PACKAGE];
  }, [snapshot]);

  const { pkg } = Route.useSearch();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [meals, setMeals] = useState<PackageMealSession[]>([
    newPackageMealSession("Lunch", pkg ?? PACKAGES[0]?.id ?? "classic"),
  ]);
  const [activeMealIndex, setActiveMealIndex] = useState(0);

  const activeMeal = meals[activeMealIndex] || meals[0];
  const pkgObj = PACKAGES.find((p) => p.id === activeMeal.packageId) || PACKAGES[0];
  const option = pkgObj.options[activeMeal.optionIndex] || pkgObj.options[0];

  const updateActiveMeal = (updater: (m: PackageMealSession) => PackageMealSession) => {
    setMeals((prev) => prev.map((m, idx) => (idx === activeMealIndex ? updater(m) : m)));
  };

  const changePackage = (id: string) => {
    updateActiveMeal((m) => ({
      ...m,
      packageId: id,
      optionIndex: 0,
      selections: {},
    }));
  };

  const changeOption = (i: number) => {
    updateActiveMeal((m) => ({
      ...m,
      optionIndex: i,
      selections: {},
    }));
  };

  const toggleDish = (cat: string, dish: string, limit: number) => {
    const cur = activeMeal.selections[cat] ?? [];
    let next: string[];
    if (cur.includes(dish)) {
      next = cur.filter((d) => d !== dish);
    } else {
      if (limit <= 0) return;
      next = [...cur, dish];
      while (next.length > limit) next.shift();
    }
    updateActiveMeal((m) => ({
      ...m,
      selections: { ...m.selections, [cat]: next },
    }));
  };

  const addMealSession = (presetName = "Dinner") => {
    const inheritDate = activeMeal?.date || customer.date || "";
    const inheritTime = activeMeal?.time || customer.time || "";
    const inheritPax = activeMeal?.pax || customer.pax || 500;
    const newSession = newPackageMealSession(
      presetName,
      activeMeal?.packageId || "classic",
      inheritDate,
      inheritTime,
      inheritPax,
    );
    setMeals((prev) => [...prev, newSession]);
    setActiveMealIndex(meals.length);
  };

  const removeMealSession = (index: number) => {
    if (meals.length <= 1) return;
    const nextMeals = meals.filter((_, i) => i !== index);
    setMeals(nextMeals);
    if (activeMealIndex >= nextMeals.length) {
      setActiveMealIndex(nextMeals.length - 1);
    }
  };

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
    // Sync customer date/time/pax into meal sessions
    setMeals((prev) =>
      prev.map((m) => ({
        ...m,
        date: m.date || customer.date || "",
        time: m.time || customer.time || "",
        pax: m.pax || customer.pax || 500,
      })),
    );
    setStep(2);
  };

  return (
    <SiteLayout>
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#FCFAF5] via-[#F7F2E7] to-[#F1E8D5] border-b border-[#E8DFC8]">
        {/* Interactive Luxury Canvas */}
        <LuxuryHeroCanvas />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8DFC8]/50 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EDE5D3]/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(232,223,200,0.35)_0%,_transparent_60%)]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-stone-900 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#EA3808] shadow-2xs">
            Package Function Planner
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold text-stone-900 drop-shadow-xs">
            Plan your <span className="text-[#EA3808]">Package Functions</span>
          </h1>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
            Select meals (Lunch, Dinner, etc.) and pick dishes within your package dish limits for
            each function.
          </p>
          <Stepper step={step} />
        </div>
      </section>

      <section className="py-12 px-4">
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
            <MenuStep
              packages={PACKAGES}
              meals={meals}
              activeMealIndex={activeMealIndex}
              setActiveMealIndex={setActiveMealIndex}
              activeMeal={activeMeal}
              pkgObj={pkgObj}
              option={option}
              updateActiveMeal={updateActiveMeal}
              onPackageChange={changePackage}
              onOptionChange={changeOption}
              onToggle={toggleDish}
              onAddMeal={addMealSession}
              onRemoveMeal={removeMealSession}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <SummaryStep
              packages={PACKAGES}
              customer={customer}
              meals={meals}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const items = [
    { n: 1, label: "Your Details", icon: User },
    { n: 2, label: "Select Menu & Meals", icon: Utensils },
    { n: 3, label: "Review & Share", icon: Check },
  ];
  return (
    <div className="mt-10 flex justify-center gap-2 sm:gap-6">
      {items.map((it, i) => {
        const active = step === it.n;
        const done = step > it.n;
        return (
          <div key={it.n} className="flex items-center gap-2 sm:gap-4">
            <div
              className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : done
                    ? "bg-gold text-gold-foreground"
                    : "bg-card text-muted-foreground"
              }`}
            >
              <it.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{it.label}</span>
              <span className="sm:hidden">{it.n}</span>
            </div>
            {i < items.length - 1 && (
              <div className={`h-px w-4 sm:w-10 ${done ? "bg-gold" : "bg-border"}`} />
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
  type = "text",
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls = `w-full border ${error ? "border-destructive" : "border-input"} bg-background px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-primary transition`;
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
      {error && (
        <div className="text-xs text-destructive mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </div>
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
  const set = (k: keyof Customer) => (v: string) =>
    setCustomer({ ...customer, [k]: k === "pax" ? Number(v) : v });
  return (
    <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card max-w-3xl mx-auto animate-fade-up">
      <h2 className="text-3xl text-primary font-display font-bold">Your details</h2>
      <p className="text-muted-foreground mt-2">
        We'll use these details to prepare and share your package menu proposal.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        <Field
          label="Full Name *"
          name="name"
          value={customer.name}
          onChange={set("name")}
          error={errors.name}
          placeholder="Your name"
        />
        <Field
          label="Phone Number *"
          name="phone"
          value={customer.phone}
          onChange={set("phone")}
          error={errors.phone}
          placeholder="10-digit mobile"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={customer.email}
          onChange={set("email")}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Field
          label="Event Type *"
          name="eventType"
          value={customer.eventType}
          onChange={set("eventType")}
          error={errors.eventType}
          placeholder="Wedding, Reception, Sangeet..."
        />
        <Field
          label="City *"
          name="city"
          value={customer.city}
          onChange={set("city")}
          error={errors.city}
          placeholder="Ahmedabad"
        />
        <Field
          label="Expected Guests (Pax) *"
          name="pax"
          type="number"
          value={String(customer.pax ?? "")}
          onChange={set("pax")}
          error={errors.pax}
          placeholder="500"
        />
        <Field
          label="Default Event Date"
          name="date"
          type="date"
          value={customer.date ?? ""}
          onChange={set("date")}
        />
        <Field
          label="Default Event Time"
          name="time"
          type="time"
          value={customer.time ?? ""}
          onChange={set("time")}
        />
        <div className="sm:col-span-2">
          <Field
            label="Additional Notes"
            name="notes"
            value={customer.notes ?? ""}
            onChange={set("notes")}
            textarea
            placeholder="Any special requirements..."
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition shadow-md cursor-pointer"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function MenuStep({
  packages,
  meals,
  activeMealIndex,
  setActiveMealIndex,
  activeMeal,
  pkgObj,
  option,
  updateActiveMeal,
  onPackageChange,
  onOptionChange,
  onToggle,
  onAddMeal,
  onRemoveMeal,
  onBack,
  onNext,
}: {
  packages: NormalizedPackage[];
  meals: PackageMealSession[];
  activeMealIndex: number;
  setActiveMealIndex: (i: number) => void;
  activeMeal: PackageMealSession;
  pkgObj: NormalizedPackage;
  option: PackageOption;
  updateActiveMeal: (updater: (m: PackageMealSession) => PackageMealSession) => void;
  onPackageChange: (id: string) => void;
  onOptionChange: (i: number) => void;
  onToggle: (cat: string, dish: string, limit: number) => void;
  onAddMeal: (preset?: string) => void;
  onRemoveMeal: (i: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | "all">(0);
  const [itemPage, setItemPage] = useState<number>(1);

  const categories = option.categories;
  const selections = activeMeal.selections;
  // Only dishes added from the Admin Panel appear under each category.
  const mergedDishCatalog = getMergedDishCatalog();

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
      {/* MEAL SESSIONS / FUNCTIONS BAR */}
      <div className="bg-card p-4 md:p-6 rounded-3xl shadow-card border-2 border-primary/20 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <h2 className="text-xl font-display font-bold text-primary flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-500" /> Package Meal Sessions
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add multiple functions like Lunch, Dinner, High Tea, Sangeet with custom package
              choices.
            </p>
          </div>
          <button
            onClick={() => onAddMeal("Dinner")}
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Function / Meal
          </button>
        </div>

        {/* Meal Session Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {meals.map((m, idx) => {
            const isActive = idx === activeMealIndex;
            const pkg = packages.find((p) => p.id === m.packageId) || packages[0];
            const opt = pkg.options[m.optionIndex] || pkg.options[0];
            const totalSelected = Object.values(m.selections).reduce(
              (acc, arr) => acc + arr.length,
              0,
            );

            return (
              <div
                key={m.id}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
                onClick={() => {
                  setActiveMealIndex(idx);
                  setActiveCategoryIndex(0);
                  setItemPage(1);
                }}
              >
                <div className="text-left">
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>{m.name || `Meal ${idx + 1}`}</span>
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-amber-400 text-slate-950" : "bg-primary/20 text-primary"
                      }`}
                    >
                      {pkg.name} ({opt.label})
                    </span>
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {totalSelected} items picked
                    {m.pax ? ` · ${m.pax} pax` : ""}
                  </div>
                </div>

                {meals.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveMeal(idx);
                    }}
                    className={`p-1 rounded-lg transition cursor-pointer ${
                      isActive
                        ? "hover:bg-primary-foreground/20 text-primary-foreground"
                        : "hover:bg-destructive/10 text-destructive"
                    }`}
                    title="Remove this meal session"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Meal Details & Quick Presets Form */}
        <div className="bg-secondary/50 p-4 rounded-2xl border border-border grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Meal / Function Name
            </label>
            <input
              type="text"
              value={activeMeal.name}
              onChange={(e) => updateActiveMeal((m) => ({ ...m, name: e.target.value }))}
              placeholder="e.g. Lunch / Dinner"
              className="w-full bg-background border border-input rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Date
            </label>
            <input
              type="date"
              value={activeMeal.date}
              onChange={(e) => updateActiveMeal((m) => ({ ...m, date: e.target.value }))}
              className="w-full bg-background border border-input rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Time / Session
            </label>
            <input
              type="text"
              value={activeMeal.time}
              onChange={(e) => updateActiveMeal((m) => ({ ...m, time: e.target.value }))}
              placeholder="e.g. 12:30 PM"
              className="w-full bg-background border border-input rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
              Guests (Pax)
            </label>
            <input
              type="number"
              value={activeMeal.pax || ""}
              onChange={(e) => updateActiveMeal((m) => ({ ...m, pax: Number(e.target.value) }))}
              placeholder="500"
              className="w-full bg-background border border-input rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Preset Buttons */}
          <div className="sm:col-span-2 lg:col-span-4 flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
            <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">
              Presets:
            </span>
            {MEAL_NAME_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => updateActiveMeal((m) => ({ ...m, name: p }))}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border cursor-pointer whitespace-nowrap transition ${
                  activeMeal.name === p
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                    : "bg-background text-foreground border-border hover:border-amber-400"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Wise Tabs Bar (Clickable Pagination) */}
      <div className="bg-card p-4 rounded-2xl shadow-card border border-border">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-500" /> Click Category to Filter Menu Items (
            {activeMeal.name || "Active Meal"})
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

          {categories.map((c, idx) => {
            const selected = selections[c.name] ?? [];
            const atLimit = selected.length >= c.count;
            const isCurrent = activeCategoryIndex === idx;

            return (
              <button
                key={c.name}
                onClick={() => handleCategoryChange(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-500/50"
                    : atLimit
                      ? "bg-emerald-600/15 text-emerald-900 dark:text-emerald-300 border border-emerald-500/40"
                      : selected.length > 0
                        ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <span>{c.name}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full font-black ${
                    isCurrent
                      ? "bg-white text-amber-900"
                      : atLimit
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-600 text-white"
                  }`}
                >
                  {selected.length}/{c.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Package Settings Sidebar */}
        <div className="bg-card rounded-3xl p-6 shadow-card lg:sticky lg:top-24 self-start">
          <img
            src={
              pkgObj.image ||
              MEAL_IMAGES[activeMeal.packageId] ||
              "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80"
            }
            alt={pkgObj.name}
            className="w-full h-40 object-cover rounded-2xl mb-4"
          />
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Package for {activeMeal.name || "This Meal"}
          </div>
          <div className="text-3xl font-display font-bold text-primary mt-1">{pkgObj.name}</div>
          <div className="text-sm text-muted-foreground">
            ₹{pkgObj.price}/plate · {pkgObj.tagline}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold mb-3">
              Change Package for {activeMeal.name}
            </label>
            <div className="space-y-2">
              {packages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onPackageChange(p.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition cursor-pointer ${
                    activeMeal.packageId === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-semibold text-primary">{p.name}</span>
                  <span className="text-sm text-muted-foreground">₹{p.price}/pax</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">Option</label>
            <div className="flex gap-2">
              {pkgObj.options.map((o, i) => (
                <button
                  key={o.label}
                  onClick={() => onOptionChange(i)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold border-2 transition cursor-pointer ${
                    activeMeal.optionIndex === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}
                >
                  {o.label}
                  <div className="text-xs opacity-70">{o.minPax}+ pax</div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs text-foreground">
            <strong className="text-primary">Strict selection:</strong> Each category has a fixed
            number of dishes as per the package. Selecting a new dish after limit auto-removes the
            first-picked one.
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
                  {categories[activeCategoryIndex as number]?.name}
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

          {displayCategories.map((c) => {
            // Show dishes assigned to this category (menuItems) first; fall back to the
            // admin-added dish catalog for this category.
            const rawDishes =
              c.menuItems && c.menuItems.length > 0
                ? c.menuItems
                : (mergedDishCatalog[c.name] ?? []);
            const selected = selections[c.name] ?? [];
            const atLimit = selected.length >= c.count;

            const totalItems = rawDishes.length;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
            const currentPage = Math.min(itemPage, totalPages);
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const paginatedDishes = rawDishes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            return (
              <div
                key={c.name}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/60 space-y-4"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap border-b border-border/50 pb-3">
                  <div>
                    <h3 className="text-lg font-display font-bold text-primary">{c.name}</h3>
                    {c.note && (
                      <p className="text-xs text-muted-foreground italic mt-1">{c.note}</p>
                    )}
                  </div>
                  <div
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${atLimit ? "bg-amber-500 text-slate-950 font-black" : "bg-secondary text-secondary-foreground"}`}
                  >
                    {selected.length} / {c.count} selected
                  </div>
                </div>

                {rawDishes.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {paginatedDishes.map((d) => {
                        const { name: dishName, image: dishImg } = parseMenuItem(d);
                        const isSel = selected.includes(d);
                        const disabled = !isSel && atLimit && c.count === 0;
                        return (
                          <button
                            key={d}
                            onClick={() => onToggle(c.name, d, c.count)}
                            disabled={disabled}
                            className={`group relative overflow-hidden rounded-xl border-2 transition text-left cursor-pointer ${
                              isSel
                                ? "border-primary ring-2 ring-primary/30"
                                : atLimit
                                  ? "border-border opacity-70 hover:border-amber-500/60"
                                  : "border-border hover:border-primary/60 bg-card"
                            }`}
                            title={
                              atLimit && !isSel
                                ? `Limit ${c.count} reached — picking a new dish will replace the first selected.`
                                : dishName
                            }
                          >
                            <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
                              <img
                                src={dishImg || getDishImage(dishName)}
                                alt={dishName}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=400&q=70";
                                }}
                              />
                              {atLimit && !isSel && (
                                <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                                  <Lock className="w-5 h-5 text-primary/70" />
                                </div>
                              )}
                            </div>
                            {isSel && (
                              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center shadow">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                            <div
                              className={`px-3 py-2 text-xs font-semibold ${isSel ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}
                            >
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
                          Showing {startIndex + 1}–
                          {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} items
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
                  </>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground italic">
                    Chef's selection — our team will curate {c.count} best option
                    {c.count > 1 ? "s" : ""} for you.
                  </p>
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
                        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        Next Category: {categories[(activeCategoryIndex as number) + 1]?.name}{" "}
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

          <div className="mt-6 flex justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-primary px-6 py-3 rounded-full font-bold hover:bg-primary/5 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition cursor-pointer shadow-md"
            >
              Review & Share ({meals.length} Meal{meals.length > 1 ? "s" : ""}){" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryStep({
  customer,
  meals,
  onBack,
  packages,
}: {
  customer: Customer;
  meals: PackageMealSession[];
  onBack: () => void;
  packages: NormalizedPackage[];
}) {
  const formattedCustomer: CustomerDetails = {
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    eventType: customer.eventType,
    city: customer.city,
    notes: customer.notes,
    packageName: meals
      .map((m) => {
        const pkgObj = packages.find((p) => p.id === m.packageId) || packages[0];
        const opt = pkgObj.options[m.optionIndex] || pkgObj.options[0];
        return `${m.name}: ${pkgObj.name} (${opt.label})`;
      })
      .join(" | "),
  };

  const formattedMeals: MealPlan[] = meals.map((m, idx) => {
    const pkgObj = packages.find((p) => p.id === m.packageId) || packages[0];
    const opt = pkgObj.options[m.optionIndex] || pkgObj.options[0];
    return {
      id: m.id || `pkg-meal-${idx + 1}`,
      name: `${m.name || `Meal ${idx + 1}`} — ${pkgObj.name} Package (${opt.label})`,
      date: m.date || customer.date || "",
      time: m.time || customer.time || "",
      pax: m.pax || customer.pax || 500,
      selections: m.selections,
    };
  });

  return (
    <PdfExporterSection
      customer={formattedCustomer}
      meals={formattedMeals}
      onBack={onBack}
      backLabel="Edit Package Meals"
    />
  );
}
