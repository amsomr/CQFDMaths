import React from 'react';

interface MathGraphicProps {
  topic: string;
  className?: string;
  variant?: 'card' | 'hero' | 'banner';
}

export function MathGraphic({ topic, className = '', variant = 'card' }: MathGraphicProps) {
  const normTopic = topic.toLowerCase();

  // 1. LIMITES ET CONTINUITÉ / ASYMPTOTE
  if (normTopic.includes('limite') || normTopic.includes('tvi') || normTopic.includes('continuite')) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-[#F4F3ED] overflow-hidden flex items-center justify-center select-none ${className}`}>
        {/* Subtle coordinate grid */}
        <svg className="w-full h-full text-slate-800" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          <line x1="0" y1="45" x2="320" y2="45" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="90" x2="320" y2="90" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="0" y1="135" x2="320" y2="135" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="0" x2="160" y2="180" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="80" y1="0" x2="80" y2="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="240" y1="0" x2="240" y2="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

          {/* Asymptote x = 200 */}
          <line x1="200" y1="10" x2="200" y2="170" stroke="#B45309" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="206" y="24" fill="#B45309" fontSize="10" fontFamily="serif" fontStyle="italic">x = a</text>

          {/* Continuous Hyperbolic Curve y = f(x) approaching asymptote */}
          <path
            d="M 20 160 C 90 140, 140 120, 185 20"
            stroke="#1D4ED8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 215 170 C 235 70, 270 40, 310 35"
            stroke="#1D4ED8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* TVI Points and Tangents */}
          <circle cx="100" cy="132" r="3.5" fill="#1D4ED8" />
          <text x="96" y="152" fill="#475569" fontSize="10" fontFamily="sans-serif">a</text>
          
          <circle cx="160" cy="85" r="3.5" fill="#1D4ED8" />
          <text x="145" y="80" fill="#475569" fontSize="10" fontFamily="sans-serif">f(c) = 0</text>

          {/* Mathematical label */}
          <rect x="14" y="14" width="102" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="22" y="29" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="600">lim x→a f(x) = +∞</text>
        </svg>
      </div>
    );
  }

  // 2. NOMBRES COMPLEXES / PLAN D'ARGAND
  if (normTopic.includes('complexe') || normTopic.includes('algebr') || normTopic.includes('trigo')) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-[#F4F3ED] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coordinate axes Re and Im */}
          <line x1="20" y1="100" x2="300" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="300,100 294,97 294,103" fill="#64748B" />
          <text x="290" y="115" fill="#64748B" fontSize="10" fontFamily="serif" fontStyle="italic">Re(z)</text>

          <line x1="160" y1="165" x2="160" y2="15" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="160,15 157,21 163,21" fill="#64748B" />
          <text x="168" y="24" fill="#64748B" fontSize="10" fontFamily="serif" fontStyle="italic">Im(z)</text>

          {/* Unit Circle (Trigonometric Circle) */}
          <circle cx="160" cy="100" r="55" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />

          {/* Vector z = r * e^(i*theta) */}
          <line x1="160" y1="100" x2="225" y2="45" stroke="#1D4ED8" strokeWidth="2.5" />
          <polygon points="225,45 218,48 221,54" fill="#1D4ED8" />

          {/* Projections */}
          <line x1="225" y1="45" x2="225" y2="100" stroke="#B45309" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="225" y1="45" x2="160" y2="45" stroke="#B45309" strokeWidth="1" strokeDasharray="2 2" />

          {/* Angle theta arc */}
          <path d="M 185 100 A 25 25 0 0 0 178 82" stroke="#B45309" strokeWidth="1.5" fill="none" />
          <text x="190" y="88" fill="#B45309" fontSize="11" fontFamily="serif">θ</text>

          {/* Point z */}
          <circle cx="225" cy="45" r="4" fill="#1D4ED8" />
          <text x="233" y="44" fill="#0F172A" fontSize="12" fontFamily="sans-serif" fontWeight="700">M(z)</text>
          <text x="180" y="60" fill="#1D4ED8" fontSize="10" fontFamily="serif" fontStyle="italic">|z| = r</text>

          {/* Mathematical badge */}
          <rect x="14" y="14" width="112" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="22" y="29" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="600">z = r · e^(iθ)</text>
        </svg>
      </div>
    );
  }

  // 3. CALCUL INTÉGRAL / AIRE SOUS LA COURBE
  if (normTopic.includes('integral') || normTopic.includes('primitive') || normTopic.includes('aire')) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-[#F4F3ED] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coordinate axes */}
          <line x1="20" y1="140" x2="300" y2="140" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="300,140 294,137 294,143" fill="#64748B" />
          <text x="290" y="155" fill="#64748B" fontSize="10" fontFamily="sans-serif">x</text>

          <line x1="50" y1="165" x2="50" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="50,20 47,26 53,26" fill="#64748B" />
          <text x="36" y="28" fill="#64748B" fontSize="10" fontFamily="sans-serif">y</text>

          {/* Shaded Area under Curve from a=100 to b=220 */}
          <path
            d="M 100 140 L 100 95 C 130 65, 170 50, 220 75 L 220 140 Z"
            fill="rgba(29, 78, 216, 0.12)"
            stroke="none"
          />
          {/* Vertical bounds a and b */}
          <line x1="100" y1="140" x2="100" y2="95" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="220" y1="140" x2="220" y2="75" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="3 3" />
          
          <text x="96" y="155" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="600">a</text>
          <text x="216" y="155" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="600">b</text>

          {/* The Function Curve */}
          <path
            d="M 40 130 C 70 120, 110 80, 160 55 C 210 30, 250 80, 290 90"
            stroke="#1D4ED8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x="250" y="65" fill="#1D4ED8" fontSize="11" fontFamily="serif" fontStyle="italic">y = f(x)</text>

          {/* Integral area notation */}
          <text x="140" y="105" fill="#1D4ED8" fontSize="12" fontFamily="serif" fontWeight="600">Aire = ∫ f(x) dx</text>

          {/* Mathematical badge */}
          <rect x="14" y="14" width="130" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="22" y="29" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="600">∫ₐᵇ f(x)dx = F(b) - F(a)</text>
        </svg>
      </div>
    );
  }

  // 4. LOGIQUE, ENSEMBLES & ARITHMÉTIQUE
  if (normTopic.includes('logique') || normTopic.includes('arithm') || normTopic.includes('suite')) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-[#F4F3ED] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Two intersecting Venn Circles */}
          <circle cx="130" cy="90" r="50" stroke="#1D4ED8" strokeWidth="2" fill="rgba(29, 78, 216, 0.05)" />
          <circle cx="190" cy="90" r="50" stroke="#B45309" strokeWidth="2" fill="rgba(180, 83, 9, 0.05)" />

          {/* Intersection Shading */}
          <path
            d="M 160 51 A 50 50 0 0 1 160 129 A 50 50 0 0 1 160 51"
            fill="rgba(29, 78, 216, 0.15)"
          />

          <text x="105" y="94" fill="#1D4ED8" fontSize="13" fontFamily="sans-serif" fontWeight="700">P</text>
          <text x="205" y="94" fill="#B45309" fontSize="13" fontFamily="sans-serif" fontWeight="700">Q</text>
          <text x="150" y="94" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="700">P ∧ Q</text>

          {/* Implication arrows */}
          <text x="70" y="160" fill="#475569" fontSize="11" fontFamily="mono">(P ⇒ Q) ⇔ (¬Q ⇒ ¬P)</text>

          {/* Mathematical badge */}
          <rect x="14" y="14" width="112" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="22" y="29" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="600">∀ x ∈ ℝ, P(x) ⇒ Q(x)</text>
        </svg>
      </div>
    );
  }

  // 5. DEFAULT / GÉOMÉTRIE & VECTEURS
  return (
    <div className={`relative w-full aspect-[16/9] bg-[#F4F3ED] overflow-hidden flex items-center justify-center select-none ${className}`}>
      <svg className="w-full h-full text-slate-800" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Isometric axes or coordinate frame */}
        <line x1="40" y1="130" x2="280" y2="130" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="70" y1="150" x2="250" y2="30" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Triangle / Polygon geometry */}
        <polygon points="80,120 220,120 170,45" stroke="#1D4ED8" strokeWidth="2" fill="rgba(29, 78, 216, 0.08)" />
        <circle cx="80" cy="120" r="3" fill="#1D4ED8" />
        <circle cx="220" cy="120" r="3" fill="#1D4ED8" />
        <circle cx="170" cy="45" r="3" fill="#1D4ED8" />

        <text x="68" y="125" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="700">A</text>
        <text x="230" y="125" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="700">B</text>
        <text x="170" y="38" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="700">C</text>

        {/* Median / Vector line */}
        <line x1="170" y1="45" x2="150" y2="120" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="156" y="90" fill="#B45309" fontSize="10" fontFamily="sans-serif">H</text>

        {/* Mathematical badge */}
        <rect x="14" y="14" width="100" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
        <text x="22" y="29" fill="#0F172A" fontSize="11" fontFamily="sans-serif" fontWeight="600">vec(AB) · vec(AC)</text>
      </svg>
    </div>
  );
}
