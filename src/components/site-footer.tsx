import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { CONTACT } from "@/lib/menu-data";
import { HariomLogo } from "@/components/hariom-logo";
import footerImage from "@/assets/images/QR.png";

export function SiteFooter() {
  return (
    <footer className="bg-[#1C1917] text-white mt-24 border-t-2 border-[#EA3808]/40">
      
      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-5 items-center">

        {/* Logo / About */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-4 w-fit shadow-md">
            <HariomLogo className="h-12 w-auto" />
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 border-2 border-emerald-400 bg-white p-0.5 rounded-xs">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            </span>

            <span>100% Pure Vegetarian Catering Service</span>
          </div>

          <p className="text-stone-300 max-w-md text-sm leading-relaxed">
            Pure vegetarian catering crafted with authentic Indian traditions
            and royal hospitality. From grand weddings to corporate galas and
            intimate family events — we deliver unforgettable taste.
          </p>
        </div>

        {/* Explore Menu */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#EA3808]">
            Explore Menu
          </h4>

          <ul className="space-y-2.5 text-sm text-stone-300 font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-[#EA3808] transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-[#EA3808] transition"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="hover:text-[#EA3808] transition"
              >
                Catering Services
              </Link>
            </li>

            <li>
              <Link
                to="/packages"
                className="hover:text-[#EA3808] transition"
              >
                Fixed Menu Packages
              </Link>
            </li>

            <li>
              <Link
                to="/menu-planner"
                className="hover:text-[#EA3808] transition"
              >
                Custom Menu Builder
              </Link>
            </li>

            <li>
              <Link
                to="/gallery"
                className="hover:text-[#EA3808] transition"
              >
                Photo Gallery
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-[#EA3808] transition"
              >
                Contact & Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#EA3808]">
            Contact Us
          </h4>

          <ul className="space-y-3 text-sm text-stone-300 font-medium">

            {/* Phone */}
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#EA3808] shrink-0 mt-0.5" />

              <div>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="hover:text-[#EA3808] transition block font-bold text-white"
                >
                  +91 {CONTACT.phone}
                </a>

                <a
                  href={`tel:${CONTACT.altPhone}`}
                  className="hover:text-[#EA3808] transition block text-xs opacity-80 text-stone-300"
                >
                  +91 {CONTACT.altPhone}
                </a>
              </div>
            </li>

            {/* Email */}
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#EA3808] shrink-0" />

              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-[#EA3808] transition text-xs text-stone-300"
              >
                {CONTACT.email}
              </a>
            </li>

            {/* Address */}
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#EA3808] shrink-0 mt-0.5" />

              <span className="text-xs text-stone-300">
                Proprietor: Khimjibhai Purohit
                <br />
                Ahmedabad, Gujarat, India
              </span>
            </li>

          </ul>

          {/* FSSAI */}
          <div className="mt-5 pt-3 border-t border-stone-800 text-xs text-stone-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />

            <span>FSSAI Quality & Hygiene Guaranteed</span>
          </div>
        </div>

        {/* QR CODE - RIGHT SIDE */}
        <div className="flex items-center justify-center md:justify-end">
          <div className="relative group">

            <img
              src={footerImage}
              alt="Scan to visit Hariom Caterers"
              className="w-56 h-56 md:w-64 md:h-64 object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
            />

          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-stone-800 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 py-5 text-xs text-stone-400 text-center flex flex-col sm:flex-row items-center justify-between gap-2">

          <span>
            © {new Date().getFullYear()} Hariom Caterers — {CONTACT.name}.
            All rights reserved.
          </span>

         <span className="text-[#15803D] font-semibold">
  100% Pure Veg Catering Specialists
</span>

        </div>
      </div>

    </footer>
  );
}