import React from 'react';

interface MathGraphicProps {
  topic: string;
  className?: string;
  variant?: 'card' | 'hero' | 'featured';
}

export function MathGraphic({ topic, className = '', variant = 'card' }: MathGraphicProps) {
  const normTopic = topic.toLowerCase();
  const heightClass = variant === 'featured' ? 'aspect-[21/9] sm:aspect-[2.4/1]' : 'aspect-[16/9]';

  // 1. LIMITES ET CONTINUITÉ / ASYMPTOTE
  if (normTopic.includes('limite') || normTopic.includes('tvi') || normTopic.includes('continuite')) {
    return (
      <div className={`relative w-full ${heightClass} bg-[#F8F9FA] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coordinate grid */}
          <line x1="0" y1="45" x2="360" y2="45" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="90" x2="360" y2="90" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="0" y1="135" x2="360" y2="135" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="180" y1="0" x2="180" y2="180" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="90" y1="0" x2="90" y2="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="270" y1="0" x2="270" y2="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />

          {/* Asymptote x = 220 */}
          <line x1="220" y1="10" x2="220" y2="170" stroke="#B45309" strokeWidth="2" strokeDasharray="5 5" />
          <text x="228" y="26" fill="#B45309" fontSize="12" fontWeight="700" fontFamily="serif" fontStyle="italic">x = a (Asymptote)</text>

          {/* Continuous Hyperbolic Curve y = f(x) */}
          <path
            d="M 20 160 C 100 145, 160 120, 205 20"
            stroke="#1D4ED8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 235 170 C 255 70, 290 40, 345 35"
            stroke="#1D4ED8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* TVI Points and Tangents */}
          <circle cx="110" cy="132" r="4.5" fill="#1D4ED8" />
          <text x="105" y="154" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="sans-serif">a</text>
          
          <circle cx="180" cy="85" r="4.5" fill="#1D4ED8" />
          <text x="156" y="80" fill="#1D4ED8" fontSize="12" fontWeight="700" fontFamily="sans-serif">f(c) = 0</text>

          {/* Mathematical formula notation */}
          <text x="16" y="50" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="700">lim (x→a) f(x) = +∞</text>
        </svg>
      </div>
    );
  }

  // 2. NOMBRES COMPLEXES / PLAN D'ARGAND
  if (normTopic.includes('complexe') || normTopic.includes('algebr') || normTopic.includes('trigo')) {
    return (
      <div className={`relative w-full ${heightClass} bg-[#F8F9FA] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coordinate axes Re and Im */}
          <line x1="20" y1="100" x2="340" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="340,100 332,96 332,104" fill="#64748B" />
          <text x="320" y="120" fill="#64748B" fontSize="12" fontWeight="600" fontFamily="serif" fontStyle="italic">Re(z)</text>

          <line x1="180" y1="165" x2="180" y2="15" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="180,15 176,23 184,23" fill="#64748B" />
          <text x="190" y="26" fill="#64748B" fontSize="12" fontWeight="600" fontFamily="serif" fontStyle="italic">Im(z)</text>

          {/* Unit Circle (Trigonometric Circle) */}
          <circle cx="180" cy="100" r="60" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Vector z = r * e^(i*theta) */}
          <line x1="180" y1="100" x2="250" y2="40" stroke="#1D4ED8" strokeWidth="3" />
          <polygon points="250,40 242,44 245,51" fill="#1D4ED8" />

          {/* Projections */}
          <line x1="250" y1="40" x2="250" y2="100" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="250" y1="40" x2="180" y2="40" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Angle theta arc */}
          <path d="M 210 100 A 30 30 0 0 0 200 78" stroke="#B45309" strokeWidth="2" fill="none" />
          <text x="214" y="85" fill="#B45309" fontSize="13" fontWeight="bold" fontFamily="serif">θ</text>

          {/* Point z */}
          <circle cx="250" cy="40" r="5" fill="#1D4ED8" />
          <text x="260" y="42" fill="#0F172A" fontSize="13" fontFamily="sans-serif" fontWeight="800">M(z)</text>
          <text x="200" y="58" fill="#1D4ED8" fontSize="12" fontWeight="bold" fontFamily="serif" fontStyle="italic">|z| = r</text>

          {/* Mathematical formula notation */}
          <text x="16" y="50" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="700">z = r · e^(iθ) ∈ ℂ</text>
        </svg>
      </div>
    );
  }

  // 3. CALCUL INTÉGRAL / AIRE SOUS LA COURBE
  if (normTopic.includes('integral') || normTopic.includes('primitive') || normTopic.includes('aire')) {
    return (
      <div className={`relative w-full ${heightClass} bg-[#F8F9FA] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coordinate axes */}
          <line x1="20" y1="140" x2="340" y2="140" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="340,140 332,136 332,144" fill="#64748B" />
          <text x="328" y="158" fill="#64748B" fontSize="12" fontFamily="sans-serif" fontWeight="600">x</text>

          <line x1="50" y1="165" x2="50" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="50,20 46,28 54,28" fill="#64748B" />
          <text x="34" y="28" fill="#64748B" fontSize="12" fontFamily="sans-serif" fontWeight="600">y</text>

          {/* Shaded Area under Curve from a=110 to b=250 */}
          <path
            d="M 110 140 L 110 95 C 150 60, 200 45, 250 75 L 250 140 Z"
            fill="rgba(29, 78, 216, 0.14)"
            stroke="none"
          />
          {/* Vertical bounds a and b */}
          <line x1="110" y1="140" x2="110" y2="95" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="250" y1="140" x2="250" y2="75" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="4 4" />
          
          <text x="105" y="158" fill="#0F172A" fontSize="13" fontFamily="sans-serif" fontWeight="800">a</text>
          <text x="245" y="158" fill="#0F172A" fontSize="13" fontFamily="sans-serif" fontWeight="800">b</text>

          {/* The Function Curve */}
          <path
            d="M 40 130 C 80 120, 130 75, 180 50 C 230 25, 270 80, 330 90"
            stroke="#1D4ED8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="290" y="65" fill="#1D4ED8" fontSize="13" fontWeight="bold" fontFamily="serif" fontStyle="italic">y = f(x)</text>

          {/* Integral area notation */}
          <text x="150" y="110" fill="#1D4ED8" fontSize="14" fontFamily="serif" fontWeight="700">Aire = ∫ f(x) dx</text>

          {/* Mathematical formula notation */}
          <text x="16" y="50" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="700">∫ₐᵇ f(x)dx = F(b) - F(a)</text>
        </svg>
      </div>
    );
  }

  // 4. EXPONENTIELLE & LOGARITHME
  if (normTopic.includes('logarithm') || normTopic.includes('exponentiel') || normTopic.includes('fonction')) {
    return (
      <div className={`relative w-full ${heightClass} bg-[#F8F9FA] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Axes */}
          <line x1="20" y1="140" x2="340" y2="140" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="340,140 332,136 332,144" fill="#64748B" />
          <text x="328" y="158" fill="#64748B" fontSize="12" fontFamily="sans-serif" fontWeight="600">x</text>

          <line x1="120" y1="165" x2="120" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
          <polygon points="120,20 116,28 124,28" fill="#64748B" />
          <text x="104" y="28" fill="#64748B" fontSize="12" fontFamily="sans-serif" fontWeight="600">y</text>

          {/* First bisector y = x */}
          <line x1="40" y1="160" x2="280" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="260" y="20" fill="#94A3B8" fontSize="11" fontFamily="serif" fontStyle="italic">y = x</text>

          {/* Exponential curve y = e^x */}
          <path
            d="M 30 138 C 100 137, 135 110, 185 25"
            stroke="#1D4ED8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="195" y="32" fill="#1D4ED8" fontSize="13" fontWeight="bold" fontFamily="serif" fontStyle="italic">y = eˣ</text>

          {/* Logarithm curve y = ln(x) */}
          <path
            d="M 125 175 C 130 110, 170 80, 310 55"
            stroke="#B45309"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="270" y="80" fill="#B45309" fontSize="13" fontWeight="bold" fontFamily="serif" fontStyle="italic">y = ln(x)</text>

          {/* Points (0,1) and (1,0) */}
          <circle cx="120" cy="115" r="4" fill="#1D4ED8" />
          <text x="100" y="112" fill="#1D4ED8" fontSize="11" fontWeight="bold">(0,1)</text>

          <circle cx="145" cy="140" r="4" fill="#B45309" />
          <text x="140" y="158" fill="#B45309" fontSize="11" fontWeight="bold">(1,0)</text>

          {/* Mathematical formula notation */}
          <text x="16" y="50" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="700">ln(eˣ) = x, ∀x ∈ ℝ</text>
        </svg>
      </div>
    );
  }

  // 5. LOGIQUE & PROBABILITÉS
  if (normTopic.includes('logique') || normTopic.includes('arithm') || normTopic.includes('proba')) {
    return (
      <div className={`relative w-full ${heightClass} bg-[#F8F9FA] overflow-hidden flex items-center justify-center select-none ${className}`}>
        <svg className="w-full h-full text-slate-800" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Two intersecting Venn Circles */}
          <circle cx="145" cy="95" r="55" stroke="#1D4ED8" strokeWidth="2.5" fill="rgba(29, 78, 216, 0.06)" />
          <circle cx="215" cy="95" r="55" stroke="#B45309" strokeWidth="2.5" fill="rgba(180, 83, 9, 0.06)" />

          {/* Intersection Shading */}
          <path
            d="M 180 53 A 55 55 0 0 1 180 137 A 55 55 0 0 1 180 53"
            fill="rgba(29, 78, 216, 0.18)"
          />

          <text x="115" y="100" fill="#1D4ED8" fontSize="15" fontFamily="sans-serif" fontWeight="800">A</text>
          <text x="235" y="100" fill="#B45309" fontSize="15" fontFamily="sans-serif" fontWeight="800">B</text>
          <text x="168" y="100" fill="#0F172A" fontSize="13" fontFamily="sans-serif" fontWeight="800">A ∩ B</text>

          {/* Implication logic formula */}
          <text x="80" y="165" fill="#334155" fontSize="12" fontWeight="600" fontFamily="mono">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</text>

          {/* Mathematical formula notation */}
          <text x="16" y="50" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="700">Dénombrement & Probabilités</text>
        </svg>
      </div>
    );
  }

  // 6. DEFAULT / GÉOMÉTRIE & VECTEURS DANS L'ESPACE
  return (
    <div className={`relative w-full ${heightClass} bg-[#F8F9FA] overflow-hidden flex items-center justify-center select-none ${className}`}>
      <svg className="w-full h-full text-slate-800" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Isometric axes or coordinate frame */}
        <line x1="40" y1="135" x2="320" y2="135" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="80" y1="155" x2="280" y2="35" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Triangle / Vector geometry */}
        <polygon points="90,125 250,125 190,45" stroke="#1D4ED8" strokeWidth="2.5" fill="rgba(29, 78, 216, 0.08)" />
        <circle cx="90" cy="125" r="4" fill="#1D4ED8" />
        <circle cx="250" cy="125" r="4" fill="#1D4ED8" />
        <circle cx="190" cy="45" r="4" fill="#1D4ED8" />

        <text x="76" y="130" fill="#0F172A" fontSize="13" fontFamily="sans-serif" fontWeight="800">A</text>
        <text x="260" y="130" fill="#0F172A" fontSize="13" fontFamily="sans-serif" fontWeight="800">B</text>
        <text x="190" y="36" fill="#0F172A" fontSize="13" fontFamily="sans-serif" fontWeight="800">C</text>

        {/* Median / Vector height line */}
        <line x1="190" y1="45" x2="170" y2="125" stroke="#B45309" strokeWidth="2" strokeDasharray="4 4" />
        <text x="176" y="90" fill="#B45309" fontSize="11" fontWeight="bold" fontFamily="sans-serif">H</text>

        {/* Mathematical badge */}
        <rect x="16" y="14" width="138" height="26" rx="6" fill="#FFFFFF" stroke="#E2E8F0" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))" />
        <text x="24" y="32" fill="#0F172A" fontSize="12" fontFamily="sans-serif" fontWeight="700">u⃗ · v⃗ = ‖u⃗‖ · ‖v⃗‖ · cos(θ)</text>
      </svg>
    </div>
  );
}
