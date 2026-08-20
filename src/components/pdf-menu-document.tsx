import { forwardRef, useState } from "react";
import {
  Download,
  Sparkles,
  FileText,
  MessageCircle,
  Mail,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  MapPin,
  Utensils,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { COMPANY_INFO, TERMS_AND_CONDITIONS, EXCLUSION_RATES, CONTACT } from "@/lib/menu-data";
import { HARIOM_LOGO_SVG_DATA_URI } from "@/components/hariom-logo";

export type PdfTheme = "simple" | "warm" | "dark";

export interface MealPlan {
  id: string;
  name: string;
  date: string;
  time: string;
  pax: number;
  selections: Record<string, string[]>;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  city: string;
  notes?: string;
  packageName?: string;
  packagePrice?: number;
  packageOption?: string;
}

interface PdfMenuDocumentProps {
  customer: CustomerDetails;
  meals: MealPlan[];
  theme: PdfTheme;
  idPrefix?: string;
}

// Inline SVG Data URI pattern for subtle background ornament in Warm & Dark themes
const WARM_PATTERN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
  <g fill="none" stroke="#D97706" stroke-width="0.5" opacity="0.12">
    <circle cx="30" cy="30" r="20"/>
    <path d="M 30,0 V 60 M 0,30 H 60"/>
    <path d="M 10,10 L 50,50 M 10,50 L 50,10"/>
  </g>
</svg>
`)}`;

const DARK_PATTERN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
  <g fill="none" stroke="#F59E0B" stroke-width="0.4" opacity="0.15">
    <circle cx="30" cy="30" r="22"/>
    <polygon points="30,8 52,30 30,52 8,30"/>
  </g>
</svg>
`)}`;

export const PdfMenuDocument = forwardRef<HTMLDivElement, PdfMenuDocumentProps>(
  ({ customer, meals, theme, idPrefix = "pdf-" }, ref) => {
    // Theme styling configurations guaranteed to render 100% reliably in html2canvas
    const pageBgStyle: React.CSSProperties =
      theme === "warm"
        ? {
            background: `linear-gradient(135deg, #FFFDF7 0%, #FEF3C7 35%, #FDE68A 70%, #FEF3C7 100%), url("${WARM_PATTERN_SVG}")`,
            border: "10px double #B45309",
          }
        : theme === "dark"
          ? {
              background: `radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.2) 0%, transparent 70%), linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F172A 100%), url("${DARK_PATTERN_SVG}")`,
              border: "3px solid rgba(245, 158, 11, 0.6)",
            }
          : {
              backgroundColor: "#FFFFFF",
              border: "10px double #7F1D1D",
            };

    const cardBgClass =
      theme === "dark"
        ? "bg-slate-900/95 text-slate-100 border border-amber-500/40 shadow-xl"
        : theme === "warm"
          ? "bg-[#FFFBEB]/95 text-amber-950 border-2 border-[#B45309]/30 shadow-md"
          : "bg-white text-stone-900 border border-stone-200 shadow-sm";

    const headerBgClass =
      theme === "dark"
        ? "bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-amber-200 border-b-2 border-amber-400"
        : theme === "warm"
          ? "bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-50 border-b-2 border-amber-500"
          : "bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-white border-b-2 border-amber-500";

    const accentTextColor =
      theme === "dark" ? "text-amber-300" : theme === "warm" ? "text-[#78350F]" : "text-red-900";

    const subTextColor =
      theme === "dark" ? "text-slate-200" : theme === "warm" ? "text-stone-800" : "text-stone-700";

    const totalPax = meals.reduce(
      (max, m) => Math.max(max, m.pax),
      customer.packageOption ? 500 : 100,
    );

    return (
      <div ref={ref} className="w-[794px] text-left font-sans text-sm leading-normal bg-white">
        {/* ================= PAGE 1: Company & Catering Profile ================= */}
        <div
          id={`${idPrefix}page-1`}
          style={pageBgStyle}
          className="w-[794px] h-[1123px] p-8 flex flex-col justify-between box-border overflow-hidden relative"
        >
          <div>
            {/* Header Banner */}
            <div
              className={`p-5 rounded-2xl flex items-center justify-between shadow-md ${headerBgClass}`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-md shrink-0">
                  <img
                    src={HARIOM_LOGO_SVG_DATA_URI}
                    alt="Hariom Caterers Logo"
                    className="h-12 w-auto"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight uppercase">
                      {COMPANY_INFO.name}
                    </h1>
                    {/* Official Indian Pure Veg Symbol */}
                    <div className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-emerald-600 shadow-xs">
                      <span className="w-2.5 h-2.5 border border-emerald-600 bg-white p-0.5 rounded-xs flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      </span>
                      <span className="text-[10px] font-black text-emerald-700 uppercase">
                        100% PURE VEG
                      </span>
                    </div>
                  </div>
                  <p className="text-xs tracking-wider opacity-90 mt-1 font-medium text-amber-300">
                    {COMPANY_INFO.tagline}
                  </p>
                </div>
              </div>
              <div className="text-right text-xs space-y-1 border-l border-white/20 pl-4">
                <div className="font-bold text-amber-300 text-sm">Prop. {COMPANY_INFO.owner}</div>
                <div className="font-semibold">+91 {COMPANY_INFO.phone}</div>
                <div className="opacity-90">{COMPANY_INFO.email}</div>
                <div className="opacity-80 text-[11px]">{COMPANY_INFO.city}, Gujarat</div>
              </div>
            </div>

            {/* About Us Card */}
            <div className={`mt-6 p-6 rounded-2xl ${cardBgClass}`}>
              <div className="flex items-center justify-between mb-3 border-b border-amber-500/30 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
                  <h2 className={`text-lg font-bold tracking-wide uppercase ${accentTextColor}`}>
                    About Hariom Caterers
                  </h2>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-700 text-white rounded-full">
                  Authentic Taste & Hygiene
                </span>
              </div>
              <p className={`leading-relaxed text-sm font-normal ${subTextColor}`}>
                {COMPANY_INFO.aboutUs}
              </p>
            </div>

            {/* Highlights Card */}
            <div className={`mt-5 p-6 rounded-2xl ${cardBgClass}`}>
              <div className="flex items-center gap-2 mb-4 border-b border-amber-500/30 pb-2">
                <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
                <h2 className={`text-lg font-bold tracking-wide uppercase ${accentTextColor}`}>
                  Why Choose Hariom Caterers
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {COMPANY_INFO.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-black/5 dark:bg-white/5 p-2 rounded-xl"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                      ✓
                    </span>
                    <span className={`text-xs font-semibold ${subTextColor}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Services */}
            <div className={`mt-5 p-5 rounded-2xl ${cardBgClass}`}>
              <h3 className={`text-sm font-bold uppercase mb-2 ${accentTextColor}`}>
                Our Catering Specializations
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  💍 Grand Royal Weddings
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  🎉 Sangeet & Reception
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  🏢 Corporate Banquets
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  🪔 Religious Functions
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  🏡 House Warming Galas
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  🔥 Live Kitchen Setup
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-500/30 flex justify-between items-center text-xs font-bold uppercase text-stone-500 dark:text-slate-400">
            <span>Hariom Caterers — Official proposal</span>
            <span>Page 1 of 4 (Company Profile)</span>
          </div>
        </div>

        {/* ================= PAGE 2: Customer & Event Specifications ================= */}
        <div
          id={`${idPrefix}page-2`}
          style={pageBgStyle}
          className="w-[794px] h-[1123px] p-8 flex flex-col justify-between box-border overflow-hidden relative mt-4"
        >
          <div>
            {/* Page Header */}
            <div
              className={`p-4 rounded-2xl flex items-center justify-between shadow-md ${headerBgClass}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-xs shrink-0">
                  <img
                    src={HARIOM_LOGO_SVG_DATA_URI}
                    alt="Hariom Caterers Logo"
                    className="h-9 w-auto"
                  />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-amber-200">
                  Client & Event Overview
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 border border-emerald-400 bg-white p-0.5 rounded-xs flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                </span>
                <span className="text-xs font-bold px-3 py-1 bg-amber-500 text-slate-950 rounded-full">
                  Official Proposal
                </span>
              </div>
            </div>

            {/* Customer Information Card */}
            <div className={`mt-6 p-6 rounded-2xl ${cardBgClass}`}>
              <h3
                className={`text-base font-bold uppercase border-b pb-2 mb-4 ${accentTextColor} border-amber-500/30 flex items-center justify-between`}
              >
                <span>Client Contact Details</span>
                <span className="text-xs font-normal text-amber-600 dark:text-amber-400">
                  Confidential
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                  <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                    Client Name
                  </div>
                  <div className="text-base font-black mt-0.5">{customer.name || "N/A"}</div>
                </div>
                <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                  <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                    Phone Number
                  </div>
                  <div className="text-base font-black mt-0.5">+91 {customer.phone || "N/A"}</div>
                </div>
                <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                  <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                    Email Address
                  </div>
                  <div className="text-sm font-bold mt-0.5">{customer.email || "Not Provided"}</div>
                </div>
                <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                  <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                    City / Location
                  </div>
                  <div className="text-sm font-bold mt-0.5">{customer.city || "Ahmedabad"}</div>
                </div>
              </div>
            </div>

            {/* Event Details Card */}
            <div className={`mt-5 p-6 rounded-2xl ${cardBgClass}`}>
              <h3
                className={`text-base font-bold uppercase border-b pb-2 mb-4 ${accentTextColor} border-amber-500/30`}
              >
                Event Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                  <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                    Event / Function Type
                  </div>
                  <div className="text-base font-black mt-0.5">
                    {customer.eventType || "Grand Celebration"}
                  </div>
                </div>
                <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                  <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                    Total Guest Count (Pax)
                  </div>
                  <div className="text-base font-black mt-0.5 text-amber-600 dark:text-amber-400">
                    {totalPax} Guests
                  </div>
                </div>
                {customer.packageName ? (
                  <>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                      <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                        Selected Package
                      </div>
                      <div className="text-sm font-black text-amber-600 dark:text-amber-400 mt-0.5">
                        {customer.packageName}
                      </div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                      <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                        Package Rate / Plate
                      </div>
                      <div className="text-sm font-black mt-0.5">
                        ₹{customer.packagePrice} / Pax
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                      <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                        Total Scheduled Meals
                      </div>
                      <div className="text-sm font-bold mt-0.5">{meals.length} Session(s)</div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                      <div className="text-[11px] uppercase opacity-70 font-bold text-amber-600 dark:text-amber-400">
                        Service Format
                      </div>
                      <div className="text-sm font-bold mt-0.5">Buffet & Live Counter Service</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Meals Schedule Summary Card */}
            <div className={`mt-5 p-6 rounded-2xl ${cardBgClass}`}>
              <h3
                className={`text-base font-bold uppercase border-b pb-2 mb-3 ${accentTextColor} border-amber-500/30`}
              >
                {customer.packageName ? "Package Overview & Schedule" : "Scheduled Meal Sessions"}
              </h3>
              <div className="space-y-2.5">
                {meals.map((m, idx) => (
                  <div
                    key={m.id || idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-amber-500/20"
                  >
                    <div>
                      <span className="font-extrabold text-sm">{m.name}</span>
                      <span className="text-xs font-semibold opacity-80 ml-3">
                        ({m.date || "Date TBD"} {m.time ? `@ ${m.time}` : ""})
                      </span>
                    </div>
                    <span className="text-xs font-black px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 shadow-xs">
                      {m.pax} Pax
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes & Instructions */}
            {customer.notes && (
              <div className={`mt-5 p-5 rounded-2xl ${cardBgClass}`}>
                <h3 className={`text-xs font-bold uppercase mb-1 ${accentTextColor}`}>
                  Special Instructions / Notes
                </h3>
                <p className={`text-xs italic leading-relaxed ${subTextColor}`}>
                  "{customer.notes}"
                </p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-amber-500/30 flex justify-between items-center text-xs font-bold uppercase text-stone-500 dark:text-slate-400">
            <span>Hariom Caterers — Event Specifications</span>
            <span>Page 2 of 4 (Client Overview)</span>
          </div>
        </div>

        {/* ================= PAGE 3: Menu Selections ================= */}
        <div
          id={`${idPrefix}page-3`}
          style={pageBgStyle}
          className="w-[794px] h-[1123px] p-8 flex flex-col justify-between box-border overflow-hidden relative mt-4"
        >
          <div>
            {/* Page Header */}
            <div
              className={`p-4 rounded-2xl flex items-center justify-between shadow-md ${headerBgClass}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-xs shrink-0">
                  <img
                    src={HARIOM_LOGO_SVG_DATA_URI}
                    alt="Hariom Caterers Logo"
                    className="h-9 w-auto"
                  />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-amber-200">
                  {customer.packageName ? "Package Menu Selections" : "Custom Event Menu Plan"}
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-black">
                <span className="w-2.5 h-2.5 border border-white bg-emerald-600 rounded-full" />
                <span>100% PURE VEG MENU</span>
              </div>
            </div>

            {/* Meals & Dish Categories */}
            <div className="mt-5 space-y-4 max-h-[920px] overflow-hidden">
              {meals.map((m) => {
                const categories = Object.keys(m.selections).filter(
                  (c) => m.selections[c] && m.selections[c].length > 0,
                );
                return (
                  <div key={m.id} className={`p-6 rounded-2xl ${cardBgClass}`}>
                    <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-amber-500" />
                        <h3 className={`text-base font-black uppercase ${accentTextColor}`}>
                          {m.name}
                        </h3>
                      </div>
                      <div className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                        {m.pax} Guests {m.date ? `· ${m.date}` : ""}
                      </div>
                    </div>

                    {categories.length > 0 ? (
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {categories.map((cat) => (
                          <div key={cat} className="border-b border-amber-500/15 pb-2">
                            <div className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 mb-1 flex items-center justify-between">
                              <span>{cat}</span>
                              <span className="text-[9px] font-bold text-stone-400">
                                ({m.selections[cat].length} Items)
                              </span>
                            </div>
                            <div className={`text-xs leading-snug font-medium ${subTextColor}`}>
                              {m.selections[cat].join("  •  ")}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs italic text-stone-400">
                        Chef's Special Pure Veg Selection — Custom dishes curated by Hariom
                        Caterers.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-amber-500/30 flex justify-between items-center text-xs font-bold uppercase text-stone-500 dark:text-slate-400">
            <span>Hariom Caterers — Menu Selections</span>
            <span>Page 3 of 4 (Menu Selections)</span>
          </div>
        </div>

        {/* ================= PAGE 4: Terms & Exclusions Policy ================= */}
        <div
          id={`${idPrefix}page-4`}
          style={pageBgStyle}
          className="w-[794px] h-[1123px] p-8 flex flex-col justify-between box-border overflow-hidden relative mt-4"
        >
          <div>
            {/* Page Header */}
            <div
              className={`p-4 rounded-2xl flex items-center justify-between shadow-md ${headerBgClass}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-xs shrink-0">
                  <img
                    src={HARIOM_LOGO_SVG_DATA_URI}
                    alt="Hariom Caterers Logo"
                    className="h-9 w-auto"
                  />
                </div>
                <h2 className="text-lg font-bold uppercase tracking-wider text-amber-200">
                  Terms & Conditions & Policy
                </h2>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-amber-500 text-slate-950 rounded-full">
                Catering Policy
              </span>
            </div>

            {/* Terms List Card */}
            <div className={`mt-5 p-5 rounded-2xl ${cardBgClass}`}>
              <h3
                className={`text-sm font-bold uppercase mb-3 ${accentTextColor} border-b border-amber-500/30 pb-2`}
              >
                Standard Catering Terms & Conditions
              </h3>
              <ul className="text-[11px] leading-relaxed space-y-1.5">
                {TERMS_AND_CONDITIONS.map((term, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">✓</span>
                    <span className={subTextColor}>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions Price Table Card */}
            <div className={`mt-4 p-5 rounded-2xl ${cardBgClass}`}>
              <h3 className={`text-xs font-bold uppercase mb-2 ${accentTextColor}`}>
                Items Not Included in Regular Packages (Charged Extra Per Pax):
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] font-medium border-t border-amber-500/30 pt-2">
                {EXCLUSION_RATES.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-stone-500/15 pb-1"
                  >
                    <span>{ex.item}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0 ml-2">
                      {ex.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Authorization / Signatures */}
            <div
              className={`mt-4 p-5 rounded-2xl flex items-center justify-between ${cardBgClass}`}
            >
              <div>
                <div className="text-xs uppercase opacity-70 font-bold">
                  Accepted & Confirmed By Client:
                </div>
                <div className="mt-8 border-b-2 border-dashed border-stone-400 w-52 text-xs italic text-stone-500">
                  Signature & Date
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase opacity-70 font-bold">For Hariom Caterers:</div>
                <div className="mt-8 border-b-2 border-dashed border-amber-500 w-52 text-xs font-black text-amber-600 dark:text-amber-400">
                  Prop. Khimjibhai Purohit
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-500/30 flex justify-between items-center text-xs font-bold uppercase text-stone-500 dark:text-slate-400">
            <span>Hariom Caterers — Terms & Policy</span>
            <span>Page 4 of 4 (Terms & Exclusions)</span>
          </div>
        </div>
      </div>
    );
  },
);

PdfMenuDocument.displayName = "PdfMenuDocument";

export function PdfExporterSection({
  customer,
  meals,
  onBack,
  backLabel = "Edit Selections",
}: {
  customer: CustomerDetails;
  meals: MealPlan[];
  onBack?: () => void;
  backLabel?: string;
}) {
  const [activeTheme, setActiveTheme] = useState<PdfTheme>("warm");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async (themeToDownload: PdfTheme) => {
    setActiveTheme(themeToDownload);
    setIsGenerating(true);
    const toastId = toast.loading("Generating high-resolution 4-page PDF proposal...");

    try {
      // Pause for state update & DOM render
      await new Promise((resolve) => setTimeout(resolve, 600));

      const { jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: true,
      });

      const pageIds = [
        "pdf-export-page-1",
        "pdf-export-page-2",
        "pdf-export-page-3",
        "pdf-export-page-4",
      ];

      let renderedPages = 0;

      for (let i = 0; i < pageIds.length; i++) {
        let pageEl = document.getElementById(pageIds[i]);
        if (!pageEl) {
          pageEl = document.getElementById(`pdf-preview-page-${i + 1}`);
        }

        if (!pageEl) {
          console.warn(`Page element ${pageIds[i]} not found`);
          continue;
        }

        const canvas = await html2canvas(pageEl, {
          scale: 1.8,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          scrollX: 0,
          scrollY: 0,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        if (renderedPages > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        renderedPages++;
      }

      if (renderedPages === 0) {
        throw new Error("No page elements could be captured for PDF export");
      }

      const cleanName = (customer.name || "Proposal").trim().replace(/[^a-zA-Z0-9]/g, "-");
      const filename = `Hariom-Caterers-Menu-${cleanName}.pdf`;

      // Reliable blob URL link download for iframe/browser compatibility
      try {
        const pdfBlob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      } catch {
        pdf.save(filename);
      }

      toast.success("4-Page PDF Proposal Downloaded Successfully!", { id: toastId });
    } catch (err) {
      console.error("PDF generation failed, using structured PDF fallback:", err);
      try {
        const { jsPDF } = await import("jspdf");
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("HARIOM CATERERS — PURE VEG PROPOSAL", 20, 20);
        doc.setFontSize(12);
        doc.text(`Customer: ${customer.name || "N/A"}`, 20, 35);
        doc.text(`Phone: ${customer.phone || "N/A"}`, 20, 45);
        doc.text(`Event: ${customer.eventType || "N/A"}`, 20, 55);
        doc.text(`City: ${customer.city || "Ahmedabad"}`, 20, 65);

        let y = 80;
        meals.forEach((m, idx) => {
          doc.setFontSize(14);
          doc.text(`Meal ${idx + 1}: ${m.name} (${m.pax} Pax)`, 20, y);
          y += 10;
          doc.setFontSize(10);
          Object.keys(m.selections).forEach((cat) => {
            const list = m.selections[cat] || [];
            if (list.length > 0) {
              doc.text(`• ${cat}: ${list.join(", ")}`, 25, y);
              y += 8;
            }
          });
          y += 10;
        });

        const cleanName = (customer.name || "Proposal").trim().replace(/[^a-zA-Z0-9]/g, "-");
        doc.save(`Hariom-Caterers-Menu-${cleanName}.pdf`);
        toast.success("PDF Proposal Downloaded Successfully!", { id: toastId });
      } catch (fallbackErr) {
        console.error("Fallback PDF also failed:", fallbackErr);
        toast.error("Could not generate PDF. Please try again.", { id: toastId });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const buildTextSummary = () => {
    let text = `*Hariom Caterers — Pure Veg Catering Proposal*\n\n`;
    text += `*Customer:* ${customer.name}\n*Phone:* ${customer.phone}\n`;
    if (customer.email) text += `*Email:* ${customer.email}\n`;
    text += `*Event:* ${customer.eventType}\n*City:* ${customer.city}\n`;
    if (customer.packageName) {
      text += `*Package:* ${customer.packageName} (₹${customer.packagePrice}/plate)\n`;
    }
    if (customer.notes) text += `*Notes:* ${customer.notes}\n`;
    text += `\n`;
    meals.forEach((m) => {
      text += `━━━━━━━━━━━━━━━━━━\n`;
      text += `*Meal:* ${m.name} (${m.pax} Pax)\n`;
      text += `Date: ${m.date || "TBD"} ${m.time ? `@ ${m.time}` : ""}\n\n`;
      Object.keys(m.selections).forEach((cat) => {
        const dishes = m.selections[cat] ?? [];
        if (dishes.length > 0) {
          text += `• *${cat}:* ${dishes.join(", ")}\n`;
        }
      });
      text += `\n`;
    });
    text += `━━━━━━━━━━━━━━━━━━\n*Hariom Caterers — Khimjibhai Purohit*\nContact: +91 9824615399`;
    return text;
  };

  const shareWhatsApp = () => {
    const txt = encodeURIComponent(buildTextSummary());
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${txt}`, "_blank");
  };

  const shareEmail = () => {
    const subj = encodeURIComponent(`Hariom Caterers Proposal — ${customer.name}`);
    const body = encodeURIComponent(buildTextSummary().replace(/\*/g, ""));
    window.open(`mailto:${CONTACT.email}?subject=${subj}&body=${body}`);
  };

  return (
    <div className="animate-fade-up space-y-8">
      {/* 100% Unscaled Export Container for html2canvas */}
      <div
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "794px",
          zIndex: -100,
          background: "#ffffff",
        }}
      >
        <PdfMenuDocument
          customer={customer}
          meals={meals}
          theme={activeTheme}
          idPrefix="pdf-export-"
        />
      </div>

      {/* Download Options Cards */}
      <div className="bg-card rounded-3xl p-6 md:p-8 shadow-card border border-border">
        <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <div>
            <h2 className="text-xl font-display font-bold text-primary">
              Download Official 4-Page PDF Proposal
            </h2>
            <p className="text-xs text-muted-foreground">
              Select your favorite PDF theme style below (Warm Catering, Dark Culinary Slate, or
              Simple Classic)
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Theme Option 1: Warm Catering (Default Preferred) */}
          <div
            className={`rounded-2xl p-5 border-2 transition cursor-pointer flex flex-col justify-between ${
              activeTheme === "warm"
                ? "border-amber-600 bg-amber-500/10 ring-2 ring-amber-500/40"
                : "border-border hover:border-amber-600/50 bg-background"
            }`}
            onClick={() => setActiveTheme("warm")}
          >
            <div>
              <div
                className="h-28 rounded-xl border-2 border-amber-800/30 shadow-inner mb-4 p-3 flex flex-col justify-between text-amber-950 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FFFDF7 0%, #FEF3C7 50%, #FDE68A 100%)",
                }}
              >
                <div className="text-[10px] font-bold uppercase text-amber-950 border-b border-amber-900/30 pb-1 flex justify-between items-center">
                  <span>Warm Catering Backdrop</span>
                  <span className="text-[8px] bg-amber-700 text-white px-1.5 py-0.5 rounded">
                    POPULAR
                  </span>
                </div>
                <div className="text-[9px] text-stone-800 font-semibold">
                  Rich Golden Amber Royal Backdrop across all 4 pages
                </div>
                <div className="text-[9px] text-amber-900 text-right font-black">Warm Theme</div>
              </div>
              <h3 className="font-bold text-base text-foreground">1. Warm Catering Theme</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Warm royal golden-amber background with ornamental filigree and double borders.
              </p>
            </div>
            <button
              disabled={isGenerating}
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF("warm");
              }}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50 shadow-md cursor-pointer"
            >
              {isGenerating && activeTheme === "warm" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              Download Warm PDF
            </button>
          </div>

          {/* Theme Option 2: Dark Culinary Slate */}
          <div
            className={`rounded-2xl p-5 border-2 transition cursor-pointer flex flex-col justify-between ${
              activeTheme === "dark"
                ? "border-amber-400 bg-slate-900/40 ring-2 ring-amber-400/40"
                : "border-border hover:border-amber-400/50 bg-background"
            }`}
            onClick={() => setActiveTheme("dark")}
          >
            <div>
              <div
                className="h-28 rounded-xl border border-amber-500/30 shadow-inner mb-4 p-3 flex flex-col justify-between text-amber-200 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                }}
              >
                <div className="text-[10px] font-bold uppercase text-amber-300 border-b border-amber-500/40 pb-1">
                  Dark Culinary Slate
                </div>
                <div className="text-[9px] text-slate-200 font-semibold">
                  Luxurious Dark Obsidian backdrop with metallic gold highlights
                </div>
                <div className="text-[9px] text-amber-400 text-right font-black">Dark Theme</div>
              </div>
              <h3 className="font-bold text-base text-foreground">2. Dark Culinary Slate</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Dark slate backdrop with golden metallic accents and high-contrast typography.
              </p>
            </div>
            <button
              disabled={isGenerating}
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF("dark");
              }}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50 shadow-md cursor-pointer"
            >
              {isGenerating && activeTheme === "dark" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              Download Dark PDF
            </button>
          </div>

          {/* Theme Option 3: Simple Classic */}
          <div
            className={`rounded-2xl p-5 border-2 transition cursor-pointer flex flex-col justify-between ${
              activeTheme === "simple"
                ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                : "border-border hover:border-primary/50 bg-background"
            }`}
            onClick={() => setActiveTheme("simple")}
          >
            <div>
              <div className="h-28 rounded-xl bg-white border-2 border-red-900/30 shadow-inner mb-4 p-3 flex flex-col justify-between text-stone-900">
                <div className="text-[10px] font-bold uppercase text-red-950 border-b border-red-900/20 pb-1">
                  Simple Classic Frame
                </div>
                <div className="text-[9px] text-stone-600 font-semibold">
                  Clean white background with double deep maroon & gold borders
                </div>
                <div className="text-[9px] text-red-900 text-right font-black">Simple Theme</div>
              </div>
              <h3 className="font-bold text-base text-foreground">3. Simple Classic Theme</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Pristine white background with deep maroon header and royal double border frame.
              </p>
            </div>
            <button
              disabled={isGenerating}
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF("simple");
              }}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50 shadow-md cursor-pointer"
            >
              {isGenerating && activeTheme === "simple" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              Download Simple PDF
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
          <div className="flex gap-2">
            <button
              onClick={shareWhatsApp}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" /> Share WhatsApp Summary
            </button>
            <button
              onClick={shareEmail}
              className="inline-flex items-center gap-2 border border-input text-foreground px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-muted transition cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Share Email Proposal
            </button>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>Currently Active Preview Theme:</span>
            <span className="font-bold text-primary uppercase">{activeTheme}</span>
          </div>
        </div>
      </div>

      {/* PDF Document Live Preview */}
      <div className="bg-card rounded-3xl p-6 shadow-card border border-border">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg text-primary">
              Live 4-Page PDF Proposal Document Preview
            </h3>
          </div>
          <span className="text-xs text-muted-foreground italic">
            (This exact layout is rendered into your downloaded PDF)
          </span>
        </div>

        <div className="overflow-x-auto p-4 bg-muted/40 rounded-2xl flex justify-center">
          <div className="scale-[0.85] origin-top shadow-2xl rounded-xl overflow-hidden">
            <PdfMenuDocument
              customer={customer}
              meals={meals}
              theme={activeTheme}
              idPrefix="pdf-preview-"
            />
          </div>
        </div>
      </div>

      {onBack && (
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-primary px-6 py-3 rounded-full font-bold hover:bg-primary/5 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> {backLabel}
          </button>
        </div>
      )}
    </div>
  );
}
