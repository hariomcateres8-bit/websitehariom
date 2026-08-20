import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Calendar,
  Users,
  Award,
} from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
import { CONTACT } from "@/lib/menu-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Hariom Caterers" },
      {
        name: "description",
        content:
          "Connect with Hariom Caterers to plan your weddings, corporate events, and grand catering. Call 9824615399 or message on WhatsApp.",
      },
      { property: "og:title", content: "Contact Hariom Caterers" },
      {
        property: "og:description",
        content: "Get in touch to plan your royal vegetarian feast across Gujarat.",
      },
    ],
  }),
  component: ContactPage,
});

const CITIES = [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Gandhinagar",
  "Anand",
  "Jamnagar",
  "Junagadh",
  "Vapi & Valsad",
];

const EVENT_TYPES = [
  "Wedding Reception",
  "Sangeet & Mehendi",
  "Corporate Gala",
  "Birthday / Anniversary",
  "Ring Ceremony",
  "Religious / Social Event",
];

function ContactPage() {
  return (
    <SiteLayout>
      {/* HERO SECTION */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-[#FCFAF5] via-[#F7F2E7] to-[#F1E8D5] border-b border-[#E8DFC8]">
        {/* Interactive Luxury Canvas */}
        <LuxuryHeroCanvas />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8DFC8]/50 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EDE5D3]/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(232,223,200,0.35)_0%,_transparent_60%)]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center text-stone-900 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#EA3808] shadow-2xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#EA3808]" /> Get In Touch
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-stone-900 drop-shadow-xs">
              Let's craft your <span className="text-[#EA3808]">royal feast</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Have questions or ready to reserve your date? Our team is available 7 days a week to
              help you plan the perfect menu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUICK CARDS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 -mt-12 relative z-10">
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          href={`tel:${CONTACT.phone}`}
          className="bg-card p-8 rounded-3xl shadow-card hover:shadow-elegant transition-all text-center group border border-border/50 hover:-translate-y-1"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-gold mb-5 group-hover:scale-110 transition-transform shadow-md">
            <Phone className="w-7 h-7 text-gold-foreground" />
          </div>
          <h3 className="text-xl font-display font-bold text-primary">Direct Call</h3>
          <p className="mt-2 text-lg font-semibold text-foreground">{CONTACT.phone}</p>
          <p className="text-xs text-muted-foreground mt-1">Speak directly with {CONTACT.name}</p>
        </motion.a>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="bg-card p-8 rounded-3xl shadow-card hover:shadow-elegant transition-all text-center group border border-border/50 hover:-translate-y-1"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-gold mb-5 group-hover:scale-110 transition-transform shadow-md">
            <MessageCircle className="w-7 h-7 text-gold-foreground" />
          </div>
          <h3 className="text-xl font-display font-bold text-primary">WhatsApp Support</h3>
          <p className="mt-2 text-lg font-semibold text-foreground">Instant Consultation</p>
          <p className="text-xs text-muted-foreground mt-1">Available 9:00 AM – 9:00 PM</p>
        </motion.a>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          href={`mailto:${CONTACT.email}`}
          className="bg-card p-8 rounded-3xl shadow-card hover:shadow-elegant transition-all text-center group border border-border/50 hover:-translate-y-1"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-gold mb-5 group-hover:scale-110 transition-transform shadow-md">
            <Mail className="w-7 h-7 text-gold-foreground" />
          </div>
          <h3 className="text-xl font-display font-bold text-primary">Official Email</h3>
          <p className="mt-2 text-base font-semibold text-foreground break-all">{CONTACT.email}</p>
          <p className="text-xs text-muted-foreground mt-1">Fast email response within 24 hours</p>
        </motion.a>
      </section>

      {/* FORM & INFO SECTION */}
      <section className="py-12 max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-10">
        {/* Left column: Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-card rounded-3xl p-8 sm:p-12 shadow-card border border-border/50"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary/70 mb-2">
            <span className="h-px w-8 bg-gold" /> Quick Inquiry
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary">
            Send Us Event Details
          </h2>
          <p className="text-muted-foreground mt-2">
            Fill in your event details below to get a customized quote via WhatsApp instantly.
          </p>

          <ContactForm />
        </motion.div>

        {/* Right column: Highlights & Cities */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6 flex flex-col justify-between"
        >
          {/* Working Hours & Guarantee */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gold/15 blur-2xl pointer-events-none" />
            <h3 className="text-2xl font-display font-bold flex items-center gap-3">
              <Clock className="w-6 h-6 text-gold" /> Office & Consultation
            </h3>
            <div className="mt-4 space-y-3 text-sm text-primary-foreground/85">
              <div className="flex justify-between border-b border-primary-foreground/15 pb-2">
                <span>Monday – Saturday</span>
                <span className="font-semibold text-gold">9:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-primary-foreground/15 pb-2">
                <span>Sunday</span>
                <span className="font-semibold text-gold">10:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Emergency Inquiry</span>
                <span className="font-semibold text-gold">24/7 on WhatsApp</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-primary-foreground/15 flex items-center gap-3 text-xs text-primary-foreground/80">
              <Award className="w-5 h-5 text-gold shrink-0" />
              <span>100% Pure Vegetarian | ISO & FSSAI Certified Standards</span>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary">
                  Coverage Across Gujarat
                </h3>
                <p className="text-xs text-muted-foreground">
                  We cater at your venue anywhere in Gujarat
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {CITIES.map((city) => (
                <div key={city} className="flex items-center gap-2 text-sm text-foreground/80 py-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{city}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}

function ContactForm() {
  const [selectedEventType, setSelectedEventType] = useState("Wedding Reception");
  const [isCustomEvent, setIsCustomEvent] = useState(false);
  const [customEventType, setCustomEventType] = useState("");

  const finalEventType = isCustomEvent
    ? customEventType.trim() || "Custom Event"
    : selectedEventType;

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = fd.get("name") || "";
        const phone = fd.get("phone") || "";
        const date = fd.get("date") || "";
        const pax = fd.get("pax") || "";
        const city = fd.get("city") || "";
        const msg = fd.get("msg") || "";

        const text = `Namaste Hariom Caterers! 🙏%0A%0A*Event Inquiry Details:*%0A• *Name:* ${name}%0A• *Phone:* ${phone}%0A• *Event Type:* ${finalEventType}%0A• *Event Date:* ${date}%0A• *Guests (Pax):* ${pax}%0A• *City/Venue:* ${city}%0A• *Note:* ${msg}`;

        window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, "_blank");
      }}
    >
      <div>
        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
          Select or Add Event Type
        </label>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => {
                setSelectedEventType(type);
                setIsCustomEvent(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                !isCustomEvent && selectedEventType === type
                  ? "bg-primary text-primary-foreground shadow-sm scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {type}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsCustomEvent(true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isCustomEvent
                ? "bg-[#EA3808] text-white shadow-sm scale-105 ring-2 ring-[#EA3808]"
                : "bg-[#EA3808]/10 text-[#EA3808] hover:bg-[#EA3808]/20"
            }`}
          >
            + Manual / Custom Event
          </button>
        </div>

        {isCustomEvent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            <input
              type="text"
              value={customEventType}
              onChange={(e) => setCustomEventType(e.target.value)}
              placeholder="Enter your custom event name (e.g. Baby Shower, Vastu Puja, Corporate Gala, House Party...)"
              className="w-full border-2 border-[#EA3808]/60 bg-red-50/40 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#EA3808] text-sm font-medium text-stone-900"
              autoFocus
            />
          </motion.div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
            Your Full Name *
          </label>
          <input
            name="name"
            required
            placeholder="e.g. Rajesh Shah"
            className="w-full border border-input bg-background px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
            Mobile Number *
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="e.g. 98240 00000"
            className="w-full border border-input bg-background px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
            Event Date *
          </label>
          <input
            name="date"
            type="date"
            required
            className="w-full border border-input bg-background px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
            No. of Guests (Pax)
          </label>
          <input
            name="pax"
            type="number"
            placeholder="e.g. 500"
            className="w-full border border-input bg-background px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
            City / Venue
          </label>
          <input
            name="city"
            placeholder="e.g. Ahmedabad"
            className="w-full border border-input bg-background px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
          Special Notes or Specific Dishes Needed
        </label>
        <textarea
          name="msg"
          placeholder="Tell us any special preferences, budget expectation, or dietary requirements..."
          rows={3}
          className="w-full border border-input bg-background px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full group inline-flex items-center justify-center gap-2 bg-gradient-gold text-gold-foreground px-8 py-4 rounded-xl font-bold shadow-md hover:scale-[1.01] transition-all cursor-pointer"
      >
        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Send Inquiry via
        WhatsApp
      </button>
    </form>
  );
}
