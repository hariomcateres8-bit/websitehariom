import { useState, useEffect, useRef } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  MapPin,
} from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  event: string;
  guests: string;
  rating: number;
  date: string;
  avatar: string;
  review: string;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rajeshbhai & Nitaben Patel",
    location: "Karnavati Club, Ahmedabad",
    event: "Daughter's Royal Wedding Feast",
    guests: "3,500+ Guests",
    rating: 5,
    date: "December 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    review:
      "Hariom Caterers made our daughter's wedding unforgettable! The Gujarati Thali, live Jalebi Rabdi counter, and Mongolian wok were praised by every single guest. Khimjibhai personally supervised the entire catering team.",
    highlight: "Exceptional Live Counters & Flawless Service",
  },
  {
    id: "2",
    name: "Anand & Priya Shah",
    location: "YMCA International Club, SG Highway",
    event: "Grand Reception & Sangeet Night",
    guests: "2,000+ Guests",
    rating: 5,
    date: "January 2026",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    review:
      "The food was 100% pure veg, hygienic, and extremely delicious. The Woodfired Pizza live counter and Artisanal Mocktail Bar were major attractions among the youth. Truly the best catering team in Gujarat!",
    highlight: "Modern Fusion Stalls with Authentic Pure Veg Taste",
  },
  {
    id: "3",
    name: "Dr. Kiritbhai & Family",
    location: "Vastrapur, Ahmedabad",
    event: "New Bungalow Vastu Puja & Mahaprasad",
    guests: "450 Guests",
    rating: 5,
    date: "February 2026",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    review:
      "We needed strict Jain (Zero Onion-Garlic) preparation with complete spiritual cleanliness for our housewarming puja. Hariom Caterers delivered 100% pure satvik food with pure Desi Ghee sweets.",
    highlight: "100% Pure Jain & Satvik Preparation",
  },
  {
    id: "4",
    name: "Sanjay Mehta (VP Operations)",
    location: "Corporate Banquet, GIFT City",
    event: "Annual Corporate Leadership Summit",
    guests: "800+ Delegates",
    rating: 5,
    date: "March 2026",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    review:
      "Punctuality, professional uniformed servers, and clean presentation are critical for corporate events. Hariom Caterers managed 800 delegates with flawless timing and delicious executive lunch buffets.",
    highlight: "Punctual, Professional & Executive Quality",
  },
  {
    id: "5",
    name: "Maheshbhai Kathiriya",
    location: "Rajkot & Ahmedabad",
    event: "Son's Destination Sangeet & Reception",
    guests: "1,800+ Guests",
    rating: 5,
    date: "November 2025",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    review:
      "Kathiyawadi specialities like Sev Tameta, Ringan Bharta with Bajra Rotla, and piping hot Jalebis were out of this world. People are still calling us to compliment the catering menu!",
    highlight: "Authentic Regional Kathiyawadi & Royal Sweets",
  },
];

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 via-background to-primary/5 relative overflow-hidden border-y border-border">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EA3808]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 text-[#EA3808] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#EA3808]" />
            <span>Verified Customer Stories</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-primary tracking-tight">
            Loved By Thousands of Host Families
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Hear what our esteemed hosts have to say about Hariom Caterers’ authentic taste,
            hygiene, and royal hospitality.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="mt-14 max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative bg-card rounded-3xl p-8 sm:p-12 border border-border shadow-2xl overflow-hidden transition-all duration-500">
            {/* Background Watermark Quote Icon */}
            <Quote className="absolute -top-4 -right-4 w-44 h-44 text-[#EA3808]/5 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Rating & Highlight */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                  <span className="ml-2 text-xs font-extrabold text-foreground">
                    5.0 / 5.0 Rating
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeTestimonial.highlight}</span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-xl font-medium text-foreground leading-relaxed italic">
                “{activeTestimonial.review}”
              </p>

              {/* Reviewer Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-4">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#EA3808]/40 shadow-md"
                  />
                  <div>
                    <h4 className="font-display font-bold text-lg text-primary">
                      {activeTestimonial.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#EA3808]" />
                      <span>{activeTestimonial.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary px-4 py-2 rounded-xl text-xs font-bold text-secondary-foreground shrink-0 self-start sm:self-auto">
                  <div className="text-[#EA3808]">{activeTestimonial.event}</div>
                  <div className="text-muted-foreground text-[11px]">
                    {activeTestimonial.guests} • {activeTestimonial.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between pt-4">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? "w-8 bg-[#EA3808]"
                        : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Testimonial"
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white text-foreground flex items-center justify-center transition shadow-xs cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Testimonial"
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white text-foreground flex items-center justify-center transition shadow-xs cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
