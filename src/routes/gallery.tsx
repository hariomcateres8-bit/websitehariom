import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Images, Film } from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";
import { LuxuryHeroCanvas } from "@/components/luxury-hero-canvas";
const video1 = "/video/Lebanese_Counter.mp4";
const video2 = "/video/farsan.mp4";
const video3 = "/video/South_Indian.mp4";

import image1 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.57 AM.jpeg";
import image2 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (1).jpeg";
import image3 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (2).jpeg";
import image4 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (3).jpeg";
import image5 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (4).jpeg";
import image6 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (5).jpeg";
import image7 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (6).jpeg";
import image8 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (7).jpeg";
import image9 from "@/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (8).jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Hariom Caterers" },
      {
        name: "description",
        content:
          "Real events, real food. Photos and videos of our catering craftsmanship in action.",
      },
      { property: "og:title", content: "Gallery — Hariom Caterers" },
      { property: "og:description", content: "Photos and videos of Hariom Caterers' events." },
    ],
  }),
  component: GalleryPage,
});

const IMAGES = [
  {
    src: image1,
  },
  {
    src: image2,
  },
  {
    src: image3,
  },
  {
    src: image4,
  },
  {
    src: image5,
  },
  {
    src: image6,
  },
  {
    src: image7,
  },
  {
    src: image8,
  },
  {
    src: image9,
  },
];

// Real, embeddable food/catering videos (Pexels + Coverr free stock).

const VIDEOS = [
  {
    src: video1,
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2gc8AgRmCRAMPDb_JZZ4sKAmd1bNKfRfkf0j_gWDcg&s=10",
    label: "Lebanese Counter",
  },
  {
    src: video2,
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdh-F8eHAJweQ6ywfcViWNG27BR0geUhq9aYmkpiwvig&s=10",
    label: "Farsan",
  },
  {
    src: video3,
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXfSvEJM0PNtsUe1Sgb2MTUHBMG-RpwxYxC_2m3oHlnw&s=10",
    label: "South Indian",
  },
];
//   {
//     src: "https://videos.pexels.com/video-files/3298676/3298676-hd_1920_1080_30fps.mp4",
//     poster:
//       "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
//     label: "Grand Buffet Spread",
//   },
//   {
//     src: "https://videos.pexels.com/video-files/4057739/4057739-uhd_2560_1440_25fps.mp4",
//     poster:
//       "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
//     label: "Chef's Signature Plating",
//   },

// ];

function GalleryPage() {
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  return (
    <SiteLayout>
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#FCFAF5] via-[#F7F2E7] to-[#F1E8D5] border-b border-[#E8DFC8]">
        {/* Interactive Luxury Canvas */}
        <LuxuryHeroCanvas />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8DFC8]/50 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EDE5D3]/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(232,223,200,0.35)_0%,_transparent_60%)]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center text-stone-900 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#EA3808]/10 border border-[#EA3808]/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#EA3808] shadow-2xs">
              Celebration Gallery
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl font-display font-bold text-stone-900 drop-shadow-xs">
              Moments we've <span className="text-[#EA3808]">served.</span>
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
              A glimpse into the celebrations we've had the honor to be part of across Gujarat.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setTab("photos")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition cursor-pointer ${tab === "photos" ? "bg-primary text-primary-foreground shadow-elegant" : "bg-card text-foreground hover:bg-primary/5"}`}
          >
            <Images className="w-4 h-4" /> Photos
          </button>
          <button
            onClick={() => setTab("videos")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition cursor-pointer ${tab === "videos" ? "bg-primary text-primary-foreground shadow-elegant" : "bg-card text-foreground hover:bg-primary/5"}`}
          >
            <Film className="w-4 h-4" /> Videos
          </button>
        </div>
      </section>

      {tab === "photos" && (
        <section className="pb-16 max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elegant transition-all border border-border/40"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <div className="text-xl font-display font-bold">{img.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {tab === "videos" && (
        <section className="pb-16 max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elegant transition-all bg-black border border-border/40"
              >
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  preload="none"
                  playsInline
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 bg-card">
                  <div className="text-lg font-display font-bold text-primary">{v.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
