import React, { useState } from 'react';
import { LegalModal, LegalDocType } from './LegalModal';

interface LoginScreenProps {
  onContinue: (phone: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onContinue }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);

  const isValid = phoneNumber.replace(/\D/g, '').length === 10;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isValid) {
      onContinue(phoneNumber);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in duration-300 ease-out select-none relative">
      {/* Top Header Block (Clean Solid Institutional Blue) */}
      <div className="bg-[#1d4ed8] h-[255px] w-full flex flex-col items-center justify-center text-white shrink-0 px-6 pt-2 select-none">
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

        {/* Noted Title */}
        <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-none">
          Noted
        </h1>

        {/* Subtitle */}
        <p className="text-[11px] uppercase font-bold tracking-[0.2em] text-white/90 mt-2.5">
          Mutual Agreements • Verified Proof
        </p>
      </div>

      {/* Main Content Area - exact same text, font, placing, placement */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-6 bg-white">
        <div>
          {/* Welcome Text */}
          <h2 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
            Welcome to Noted
          </h2>
          <p className="text-[12px] text-slate-400 mt-1 font-normal">
            Enter your mobile number to continue.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-7">
            <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
              Mobile Number
            </label>

            {/* Input Box matching Figma wireframe: "IN  +91  | 10-digit mobile number" */}
            <div className="flex items-center h-[52px] rounded-xl border border-slate-200 bg-white px-3.5 transition-all duration-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100/80">
              <div className="flex items-center gap-2 pr-3.5 border-r border-slate-200 text-xs font-medium text-slate-600 select-none">
                <span className="text-[11px] font-medium text-slate-700">IN</span>
                <span className="text-[11px] font-semibold text-slate-800">+91</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="flex-1 pl-3.5 text-xs font-normal text-slate-900 placeholder:text-slate-300 outline-none bg-transparent"
                autoFocus
              />
            </div>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3.5 pb-2">
          {/* Terms & Privacy */}
          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            By continuing, you agree to Noted's{' '}
            <button
              type="button"
              onClick={() => setLegalDoc('terms')}
              className="text-blue-600 font-medium cursor-pointer hover:underline inline"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => setLegalDoc('privacy')}
              className="text-blue-600 font-medium cursor-pointer hover:underline inline"
            >
              Privacy Policy
            </button>
            .
          </p>

          {/* Continue Button matching Figma state */}
          <button
            onClick={() => handleSubmit()}
            disabled={!isValid}
            className={`w-full h-[48px] rounded-[16px] font-medium text-xs transition-all duration-200 flex items-center justify-center gap-1 select-none ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 cursor-pointer'
                : 'bg-[#f1f5f9] text-[#94a3b8] cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <span className="text-sm font-normal">›</span>
          </button>
        </div>
      </div>

      {/* Terms of Service & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalDoc !== null}
        initialDoc={legalDoc || 'terms'}
        onClose={() => setLegalDoc(null)}
      />
    </div>
  );
};
