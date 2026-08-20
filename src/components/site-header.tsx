import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  PhoneCall,
  Mail,
  Download,
  Shield,
  ChevronDown,
  Sparkles,
  PartyPopper,
  Briefcase,
  Utensils,
  Flame,
  Users,
  ArrowRight,
} from "lucide-react";
import { CONTACT } from "@/lib/menu-data";
import { HariomLogo } from "@/components/hariom-logo";

const SERVICE_DROPDOWN_ITEMS = [
  {
    id: "wedding",
    title: "Wedding Grand Catering",
    gujarati: "લગ્ન પ્રસંગ કેટરિંગ",
    desc: "Royal Gujarati & North Indian feasts for 500–5000+ pax",
    icon: Sparkles,
  },
  {
    id: "sangeet",
    title: "Sangeet & Mehendi Night",
    gujarati: "સંગીત & મહેંદી લાઈવ",
    desc: "Fusion street food, pasta & live chaat counters",
    icon: PartyPopper,
  },
  {
    id: "corporate",
    title: "Corporate Banquets & Meets",
    gujarati: "કોર્પોરેટ ઇવેન્ટ્સ",
    desc: "Executive lunches, annual galas & corporate catering",
    icon: Briefcase,
  },
  {
    id: "gujarati",
    title: "Traditional Gujarati Rasoi",
    gujarati: "શુદ્ધ ગુજરાતી રસોઈ",
    desc: "Authentic Kathiyawadi, Undhiyu, Basundi & Farsan",
    icon: Utensils,
  },
  {
    id: "live-counter",
    title: "Live Counters & Tandoor",
    gujarati: "લાઈવ કાઉન્ટર્સ",
    desc: "Interactive live Dosa, Tandoor & Chaat stations",
    icon: Flame,
  },
  {
    id: "private-party",
    title: "Private Parties & Birthdays",
    gujarati: "પ્રાઇવેટ પાર્ટી & એનિવર્સરી",
    desc: "Tailored intimate celebrations from 50 to 300 pax",
    icon: Users,
  },
];

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", hasDropdown: true },
  { to: "/packages", label: "Packages" },
  { to: "/menu-planner", label: "Menu Planner" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  const handleCatalogDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/Hariom-Master-Menu-Catalog.pdf";
    link.download = "Hariom-Master-Menu-Catalog.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePackagesDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/Hariom-Fixed-Packages.pdf";
    link.download = "Hariom-Fixed-Packages.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-card border-b border-border/50"
          : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-xs border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          {/* Authentic Indian Pure Veg Badge Symbol */}
          <div className="inline-flex items-center gap-2 font-bold tracking-wide">
            <span className="inline-flex items-center justify-center w-4 h-4 border-2 border-emerald-400 bg-white p-0.5 rounded-xs shrink-0 shadow-xs">
              <span className="w-2 h-2 bg-emerald-600 rounded-full" />
            </span>
            <span className="text-emerald-300 font-extrabold uppercase tracking-wider text-[11px]">
              100% Pure Vegetarian
            </span>
            <span className="hidden md:inline-block text-white/80 text-[10px]">
              • Taste of Royal Catering
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition font-medium text-white/95"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>+91 {CONTACT.phone}</span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition font-medium text-white/95"
            >
              <Mail className="w-3.5 h-3.5 text-white" />
              <span>{CONTACT.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <HariomLogo className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Navigation Links with Services Dropdown */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3.5 xl:gap-5">
          {links.map((l) => {
            if (l.hasDropdown) {
              return (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-1 text-xs lg:text-sm font-semibold text-foreground/85 hover:text-primary transition-colors py-2 whitespace-nowrap cursor-pointer"
                    activeProps={{ className: "text-primary font-bold" }}
                  >
                    <span>{l.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        servicesDropdownOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </Link>

                  {/* Luxury Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px] z-50 animate-fade-in">
                      <div className="bg-[#FCFAF5] border border-[#E8DFC8] rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2.5 backdrop-blur-xl">
                        <div className="col-span-2 px-2 pt-1 pb-2 border-b border-[#E8DFC8] flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#EA3808]">
                            Our Catering Services
                          </span>
                          <Link
                            to="/services"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="text-[11px] font-bold text-stone-600 hover:text-[#EA3808] inline-flex items-center gap-1 transition-colors"
                          >
                            <span>View All</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        {SERVICE_DROPDOWN_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.id}
                              to={`/services`}
                              hash={item.id}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-[#E8DFC8] transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#EA3808]/10 text-[#EA3808] flex items-center justify-center shrink-0 group-hover:bg-[#EA3808] group-hover:text-white transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-stone-900 group-hover:text-[#EA3808] transition-colors leading-tight">
                                  {item.title}
                                </div>
                                <div className="text-[10px] text-[#EA3808] font-medium mt-0.5">
                                  {item.gujarati}
                                </div>
                                <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}

                        <div className="col-span-2 p-2 bg-[#F6F1E5] rounded-xl flex items-center justify-between text-xs">
                          <span className="text-[11px] font-medium text-stone-700">
                            Looking for fixed budget menus?
                          </span>
                          <Link
                            to="/packages"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="font-bold text-[#EA3808] hover:underline inline-flex items-center gap-1 text-[11px]"
                          >
                            <span>Explore Packages</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs lg:text-sm font-semibold text-foreground/85 hover:text-primary transition-colors relative py-1 whitespace-nowrap"
                activeProps={{ className: "text-primary font-bold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: 1. Catalog PDF, 2. Package PDF (Green Button), 3. Call */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={handleCatalogDownload}
            className="inline-flex items-center gap-1.5 bg-[#EA3808] hover:bg-[#C42200] text-white px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-bold shadow-xs hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            title="Download full Hariom Master Menu Catalog PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Catalog PDF</span>
          </button>

          <button
            onClick={handlePackagesDownload}
            className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-bold shadow-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            title="Download Fixed Menu Packages PDF"
          >
            <Download className="w-3.5 h-3.5 text-emerald-200 animate-bounce" />
            <span>Package PDF</span>
          </button>

          <a
            href={`tel:${CONTACT.phone}`}
            className="inline-flex items-center gap-1.5 bg-gradient-gold text-white px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-bold shadow-glow animate-pulse-glow hover:scale-105 transition-transform whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-foreground hover:bg-muted/50 transition cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {open && (
        <div className="md:hidden bg-[#FCFAF5] border-t border-border shadow-xl animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col p-5 gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="inline-flex items-center justify-center w-4 h-4 border-2 border-emerald-600 bg-white p-0.5 rounded-xs">
                <span className="w-2 h-2 bg-emerald-600 rounded-full" />
              </span>
              <span className="text-emerald-700 font-bold text-xs">
                100% Pure Vegetarian Catering
              </span>
            </div>

            {links.map((l) => {
              if (l.hasDropdown) {
                return (
                  <div key={l.to} className="border-b border-border/30 pb-2">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="text-base font-semibold text-foreground/90 hover:text-primary transition"
                        activeProps={{ className: "text-primary font-bold" }}
                      >
                        {l.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-1 text-stone-600 hover:text-primary"
                        aria-label="Toggle Services Dropdown"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            mobileServicesOpen ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-3 pr-1 py-2 space-y-2 bg-[#F6F1E5] rounded-xl my-1 border border-[#E8DFC8]">
                        {SERVICE_DROPDOWN_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.id}
                              to="/services"
                              hash={item.id}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2.5 py-1.5 text-xs text-stone-800 font-semibold hover:text-[#EA3808]"
                            >
                              <div className="w-6 h-6 rounded-md bg-[#EA3808]/15 text-[#EA3808] flex items-center justify-center shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div>{item.title}</div>
                                <div className="text-[10px] text-[#EA3808] font-normal">
                                  {item.gujarati}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-base font-semibold text-foreground/90 hover:text-primary transition border-b border-border/30"
                  activeProps={{ className: "text-primary font-bold" }}
                >
                  {l.label}
                </Link>
              );
            })}

            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="py-2.5 text-base font-semibold text-primary hover:text-primary/80 transition border-b border-border/30 flex items-center gap-2"
              activeProps={{ className: "text-primary font-bold" }}
            >
              <Shield className="w-4 h-4 text-primary" />
              Admin Panel
            </Link>

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setOpen(false);
                  handleCatalogDownload();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#EA3808] text-white py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Catalog PDF
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  handlePackagesDownload();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-200" />
                Download Package PDF
              </button>

              <a
                href={`tel:${CONTACT.phone}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-gold-foreground py-2.5 rounded-xl text-xs font-bold shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                Call +91 {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
