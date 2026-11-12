import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const triggerExitToLogin = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (onSkip) {
        onSkip();
      } else {
        onComplete();
      }
    }, 180);
  };

  const slides = [
    {
      step: '1 / 3',
      title: 'Create Trusted\nCommitments',
      description: 'Create digital Vaadas with proof, mutual confirmation, and secure records.',
      buttonText: 'Next →',
      renderGraphic: () => (
        <div className="w-full h-full bg-[#1d4ed8] flex flex-col items-center justify-center relative p-6 select-none overflow-hidden">
          <svg
            className="w-full max-w-[260px] h-[190px]"
            viewBox="0 0 260 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="36" cy="48" r="1.5" fill="white" fillOpacity="0.4" />
            <circle cx="220" cy="54" r="1.5" fill="white" fillOpacity="0.4" />
            <circle cx="112" cy="162" r="1.5" fill="white" fillOpacity="0.3" />

            <line
              x1="60"
              y1="90"
              x2="200"
              y2="90"
              stroke="white"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Left Person Avatar */}
            <g transform="translate(42, 64)">
              <circle cx="16" cy="10" r="10" fill="white" />
              <path d="M2 36 C2 24 9 22 16 22 C23 22 30 24 30 36 Z" fill="white" />
            </g>

            {/* Right Person Avatar */}
            <g transform="translate(186, 64)">
              <circle cx="16" cy="10" r="10" fill="white" />
              <path d="M2 36 C2 24 9 22 16 22 C23 22 30 24 30 36 Z" fill="white" />
            </g>

            {/* Center Document */}
            <g transform="translate(108, 60)">
              <rect x="0" y="0" width="44" height="56" rx="6" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.15))" />
              <line x1="10" y1="12" x2="34" y2="12" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="20" x2="26" y2="20" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              <rect x="14" y="28" width="16" height="16" rx="3.5" fill="#10B981" />
              <path d="M18 36 L21 39 L26 33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Wave signature motif */}
            <path
              d="M118 132 L124 138 L130 132 L136 138 L142 132"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.8"
            />

            {/* Green Badge */}
            <g transform="translate(138, 118)">
              <circle cx="12" cy="12" r="11" fill="#10B981" />
              <path d="M8 12 L10.5 14.5 L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      step: '2 / 3',
      title: 'Track Every\nCommitment',
      description: 'Monitor active Vaadas, repayments, extensions, and completion in one place.',
      buttonText: 'Next →',
      renderGraphic: () => (
        <div className="w-full h-full bg-[#1d4ed8] flex flex-col items-center justify-center relative p-6 select-none">
          <div className="w-full max-w-[240px] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div className="h-6 flex-1 bg-white/20 rounded-md backdrop-blur-sm"></div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div className="h-6 flex-1 bg-white/20 rounded-md backdrop-blur-sm"></div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white text-blue-700 flex items-center justify-center shadow-md shrink-0 ring-4 ring-blue-300/40">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              </div>
              <div className="h-8 flex-1 bg-white/30 rounded-md backdrop-blur-md flex items-center justify-between px-3">
                <span className="text-[11px] font-medium text-white">Active Vaada</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-[10px] text-white font-bold">4</span>
              </div>
            </div>

            <div className="flex items-center gap-3 opacity-50">
              <div className="w-7 h-7 rounded-full border-2 border-white/40 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
              </div>
              <div className="h-6 flex-1 bg-white/10 rounded-md"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '3 / 3',
      title: 'Built on\nTrust',
      description: 'Identity verification, tamper-proof records, and secure digital proof help build confidence between both parties.',
      buttonText: 'Get Started →',
      renderGraphic: () => (
        <div className="w-full h-full bg-[#1d4ed8] flex flex-col items-center justify-center relative p-6 select-none overflow-hidden">
          <svg
            className="w-full max-w-[260px] h-[200px]"
            viewBox="0 0 260 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="62" r="1.5" fill="white" fillOpacity="0.5" />
            <circle cx="212" cy="72" r="1.5" fill="white" fillOpacity="0.5" />
            <circle cx="198" cy="138" r="1.5" fill="white" fillOpacity="0.3" />

            <ellipse cx="130" cy="98" rx="64" ry="58" fill="white" fillOpacity="0.08" />
            <ellipse cx="130" cy="98" rx="52" ry="46" fill="white" fillOpacity="0.10" />

            {/* Left Floating Badge: Lock */}
            <g transform="translate(68, 86)">
              <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
              <rect x="10" y="14" width="12" height="10" rx="2" fill="white" />
              <path d="M12 14 V10 C12 7.8 13.8 6 16 6 C18.2 6 20 7.8 20 10 V14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            {/* Top-Right Floating Badge: Device/Mobile */}
            <g transform="translate(176, 52)">
              <circle cx="15" cy="15" r="15" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
              <rect x="9.5" y="7" width="11" height="16" rx="2" fill="white" />
              <line x1="13" y1="20" x2="17" y2="20" stroke="#1c45be" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Bottom-Right Floating Badge: Document */}
            <g transform="translate(180, 108)">
              <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
              <rect x="10" y="8" width="12" height="16" rx="2" fill="white" />
              <line x1="13" y1="12" x2="19" y2="12" stroke="#1c45be" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="13" y1="15" x2="19" y2="15" stroke="#1c45be" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="13" y1="18" x2="17" y2="18" stroke="#1c45be" strokeWidth="1.4" strokeLinecap="round" />
            </g>

            {/* Outer Translucent Shield Contour */}
            <path
              d="M130 38 L96 48 C96 90 130 118 130 118 C130 118 164 90 164 48 Z"
              stroke="white"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Inner Solid White Shield */}
            <path
              d="M130 46 L102 54 C102 90 130 112 130 112 C130 112 158 90 158 54 Z"
              fill="white"
              filter="drop-shadow(0 4px 16px rgba(0,0,0,0.2))"
            />

            {/* Central Solid Blue Circle with White Checkmark inside Shield */}
            <circle cx="130" cy="78" r="17" fill="#1c45be" />
            <path
              d="M123 78 L128 83 L137 73"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Bottom Center Green Verified Status Pill Badge */}
            <g transform="translate(102, 122)">
              <rect x="0" y="0" width="56" height="18" rx="9" fill="#10B981" />
              <circle cx="11" cy="9" r="5" fill="white" />
              <path d="M8.5 9 L10.2 10.7 L13.5 7.5" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="20" y1="9" x2="48" y2="9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      triggerExitToLogin();
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col bg-white overflow-hidden transition-all duration-200 ease-out ${
        isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top Bar inside the Blue Area */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2 bg-[#1d4ed8] text-white/80 z-10 shrink-0 select-none">
        <span className="text-xs font-normal tracking-wide">{current.step}</span>
        <button
          onClick={triggerExitToLogin}
          className="text-xs font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Top Blue Graphic Section */}
      <div className="h-[300px] md:h-[380px] w-full shrink-0 bg-[#1d4ed8]">
        {current.renderGraphic()}
      </div>

      {/* Bottom White Section - Left-Aligned matching Figma Wireframe 100% */}
      <div className="flex-1 w-full max-w-md mx-auto flex flex-col justify-between px-7 pt-7 pb-8 bg-white">
        <div className="text-left">
          {/* Title - Left aligned */}
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight whitespace-pre-line">
            {current.title}
          </h1>

          {/* Subtext - Left aligned */}
          <p className="mt-3 text-[12.5px] text-slate-500 leading-relaxed max-w-[280px]">
            {current.description}
          </p>
        </div>

        {/* Bottom Actions & Pagination Dots */}
        <div className="flex flex-col items-center gap-5 mt-4">
          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-6 h-1.5 bg-[#1c45be] rounded-full'
                    : 'w-1.5 h-1.5 bg-slate-200 rounded-full'
                }`}
              />
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="w-full flex flex-col gap-2.5">
            <button
              onClick={handleNext}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{current.buttonText}</span>
            </button>

            {/* Skip Sublink */}
            <button
              onClick={triggerExitToLogin}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors py-1 cursor-pointer"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
