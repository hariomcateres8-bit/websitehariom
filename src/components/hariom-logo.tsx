import React from "react";

export function HariomLogo({
  className = "h-12 w-auto",
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Brand Name Row: HARI + [Fork/Spoon O Emblem] + M + ® */}
      <div className="flex items-center tracking-tight leading-none">
        <span className="text-[#EA3808] font-black text-2xl md:text-3xl font-sans tracking-tight">
          HARI
        </span>

        {/* Circular Fork (Top Red) & Spoon (Bottom Black) "O" Emblem */}
        <div className="relative w-7 h-7 md:w-8 md:h-8 mx-0.5 my-auto flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
            {/* Top semicircle in orange-red */}
            <path d="M 6,47 A 44,44 0 0,1 94,47 Z" fill="#EA3808" />
            {/* Bottom semicircle in black */}
            <path d="M 6,53 A 44,44 0 0,0 94,53 Z" fill="#18181B" />

            {/* Top half: Horizontal white fork (facing left, handle to the right) */}
            <path
              d="M 24,34 L 42,34 C 45,34 47,36 48,37.5 L 75,37.5 C 76.5,37.5 76.5,40.5 75,40.5 L 48,40.5 C 47,42 45,44 42,44 L 24,44 L 24,41.5 L 39,41.5 L 39,39.8 L 24,39.8 L 24,38.2 L 39,38.2 L 39,36.5 L 24,36.5 Z"
              fill="#FFFFFF"
            />

            {/* Bottom half: Horizontal white spoon (handle on left, bowl on right) */}
            <path
              d="M 25,61.5 L 50,61.5 C 52,58 58,56 66,56 C 74,56 77,59 77,63 C 77,67 74,70 66,70 C 58,70 52,68 50,64.5 L 25,64.5 C 23.5,64.5 23.5,61.5 25,61.5 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <span className="text-[#EA3808] font-black text-2xl md:text-3xl font-sans tracking-tight">
          M
        </span>

        {/* Registered Trademark Symbol ® */}
        <span className="text-[#18181B] text-[10px] md:text-xs font-bold -mt-3.5 md:-mt-4 ml-0.5">
          ®
        </span>
      </div>

      {/* CATERERS in clean, spaced black capital letters */}
      {showTagline && (
        <div className="w-full flex items-center justify-center mt-0.5">
          <span className="text-[9px] md:text-[10.5px] font-black text-[#111111] tracking-[0.34em] uppercase font-sans pl-[0.34em]">
            CATERERS
          </span>
        </div>
      )}
    </div>
  );
}

// Data URI string version for SVG image source (used in PDF export, meta tags, and canvases)
export const HARIOM_LOGO_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 110" width="300" height="110">
  <rect width="300" height="110" fill="none"/>
  <!-- HARI -->
  <text x="12" y="62" font-family="'Arial Black', Arial, Helvetica, sans-serif" font-weight="900" font-size="52" fill="#EA3808" letter-spacing="-1">HARI</text>
  
  <!-- "O" Icon -->
  <g transform="translate(150, 15)">
    <!-- Top semicircle -->
    <path d="M 5,42 A 40,40 0 0,1 85,42 Z" fill="#EA3808"/>
    <!-- Bottom semicircle -->
    <path d="M 5,48 A 40,40 0 0,0 85,48 Z" fill="#18181B"/>
    
    <!-- White fork in top half (facing left) -->
    <path d="M 21,29 L 38,29 C 41,29 43,31 44,32.5 L 68,32.5 C 69.5,32.5 69.5,35.5 68,35.5 L 44,35.5 C 43,37 41,39 38,39 L 21,39 L 21,36.8 L 35,36.8 L 35,35.2 L 21,35.2 L 21,33.8 L 35,33.8 L 35,32.2 L 21,32.2 Z" fill="#FFFFFF"/>
    
    <!-- White spoon in bottom half (bowl on right) -->
    <path d="M 22,55.5 L 45,55.5 C 47,52 52,50.5 60,50.5 C 67,50.5 70,53.5 70,57 C 70,60.5 67,63.5 60,63.5 C 52,63.5 47,62 45,58.5 L 22,58.5 C 20.5,58.5 20.5,55.5 22,55.5 Z" fill="#FFFFFF"/>
  </g>
  
  <!-- M -->
  <text x="244" y="62" font-family="'Arial Black', Arial, Helvetica, sans-serif" font-weight="900" font-size="52" fill="#EA3808" letter-spacing="-1">M</text>
  
  <!-- Registered Symbol ® -->
  <g transform="translate(290, 18)">
    <circle cx="6" cy="6" r="6" fill="none" stroke="#18181B" stroke-width="1.2"/>
    <text x="6" y="8.8" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="8" fill="#18181B" text-anchor="middle">R</text>
  </g>
  
  <!-- CATERERS -->
  <text x="150" y="98" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="18" fill="#111111" letter-spacing="10" text-anchor="middle">CATERERS</text>
</svg>
`)}`;
