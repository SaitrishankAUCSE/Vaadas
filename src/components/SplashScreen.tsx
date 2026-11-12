import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onTransitionComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onTransitionComplete }) => {
  const [activeDot, setActiveDot] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    // Dot 1 blinks
    const t1 = setTimeout(() => setActiveDot(1), 350);
    // Dot 2 blinks
    const t2 = setTimeout(() => setActiveDot(2), 850);
    // Dot 3 blinks
    const t3 = setTimeout(() => setActiveDot(3), 1350);
    // All three completed blinking
    const t4 = setTimeout(() => setActiveDot(4), 1850);
    // Fade out and transition to next page
    const t5 = setTimeout(() => setIsFading(true), 2100);
    const t6 = setTimeout(() => onTransitionComplete(), 2450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onTransitionComplete]);

  const handleImmediateTrigger = () => {
    setIsFading(true);
    setTimeout(() => {
      onTransitionComplete();
    }, 300);
  };

  return (
    <div
      onClick={handleImmediateTrigger}
      className="w-full h-full flex-1 bg-[#1d4ed8] flex flex-col justify-between items-center py-10 px-6 cursor-pointer select-none relative overflow-hidden transition-all duration-700 ease-in-out"
    >
      <div className="h-6"></div>

      {/* Center Branding Content */}
      <div
        className={`flex flex-col items-center text-center transition-all duration-500 ease-out transform ${
          !isFading
            ? 'opacity-100 scale-100 blur-0'
            : 'opacity-0 scale-95 blur-[2px]'
        }`}
      >
        {/* Distinctive Institutional Brand Monogram / Seal */}
        <div className="w-[66px] h-[66px] rounded-[20px] bg-white text-blue-800 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.18)] mb-4 border border-white/40">
          <svg
            className="w-8 h-8 text-blue-700"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 3 L6 7.5 V15.5 C6 22.8 16 29 16 29 C16 29 26 22.8 26 15.5 V7.5 L16 3 Z"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(29, 78, 216, 0.08)"
            />
            <path
              d="M11 16 L14.5 19.5 L21 13"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-none">
          Noted
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-[11px] uppercase font-bold tracking-[0.2em] text-white/90 mt-2.5">
          Mutual Agreements • Verified Proof
        </p>
      </div>

      {/* Bottom 3 Dots - Blink One by One, then Transition to Next Page */}
      <div
        className={`flex items-center justify-center gap-2 pb-2 transition-opacity duration-300 ${
          !isFading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeDot === 1 || activeDot === 4
              ? 'bg-white scale-125 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.9)]'
              : 'bg-white/30 scale-100 opacity-40'
          }`}
        />
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeDot === 2 || activeDot === 4
              ? 'bg-white scale-125 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.9)]'
              : 'bg-white/30 scale-100 opacity-40'
          }`}
        />
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeDot === 3 || activeDot === 4
              ? 'bg-white scale-125 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.9)]'
              : 'bg-white/30 scale-100 opacity-40'
          }`}
        />
      </div>
    </div>
  );
};
