import React, { useState } from 'react';
import { Shield, CheckCircle2, Lock, ArrowRight, FileCheck } from 'lucide-react';
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
    <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-white overflow-hidden animate-in fade-in duration-300 ease-out select-none relative">
      {/* ========================================================= */}
      {/* DESKTOP LEFT PANEL: Brand Showcase & Statutory Legal Proof */}
      {/* ========================================================= */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 bg-slate-900 text-white p-12 lg:p-20 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & Name */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white leading-none block">
              Vaadas
            </span>
            <span className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-1 block">
              Mutual Commitments & Legal Proof
            </span>
          </div>
        </div>

        {/* Middle: Value Proposition */}
        <div className="my-auto py-12 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-semibold mb-6">
            <FileCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Admissible under Indian IT Act, 2000 (Sec 10A & 65B)</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Mutual agreements with statutory legal clarity.
          </h2>

          <p className="text-slate-300 text-sm mt-4 leading-relaxed font-normal">
            Turn informal loans, advances, salary dues, and freelance commitments into legally valid digital contracts. Both parties sign with OTP verification.
          </p>

          {/* 3 Core Trust Pillars */}
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white leading-snug">
                  Two-Party Mutual Acknowledgment
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Both creator and receiver verify terms via Aadhaar or Mobile OTP before activation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center shrink-0 border border-slate-700">
                <Lock className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white leading-snug">
                  Tamper-Evident Digital Audit Trail
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Every repayment, extension request, and milestone is logged with non-repudiation timestamps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statutory Notice */}
        <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-400 relative z-10 flex items-center justify-between">
          <span>© 2026 Vaadas Technologies Pvt. Ltd.</span>
          <span className="font-mono text-[10px] text-slate-500">256-bit Encrypted Ledger</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE HEADER: Shown only on small screens (< 768px)       */}
      {/* ========================================================= */}
      <div className="md:hidden bg-[#1d4ed8] py-12 w-full flex flex-col items-center justify-center text-white shrink-0 px-6 select-none">
        <div className="w-[66px] h-[66px] rounded-[20px] bg-white text-blue-800 flex items-center justify-center shadow-lg mb-4 border border-white/40">
          <Shield className="w-8 h-8 text-blue-700 stroke-[2.2]" />
        </div>
        <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-none">
          Vaadas
        </h1>
        <p className="text-[11px] uppercase font-bold tracking-[0.2em] text-white/90 mt-2.5">
          Mutual Agreements • Verified Proof
        </p>
      </div>

      {/* ========================================================= */}
      {/* RIGHT AUTH PANEL: Mobile Number Input & Action Form        */}
      {/* ========================================================= */}
      <div className="flex-1 w-full md:w-1/2 lg:w-5/12 flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-10 md:py-16 bg-white max-w-lg md:max-w-none mx-auto">
        <div className="my-auto">
          {/* Desktop Heading */}
          <div className="hidden md:block mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Sign in to Vaadas
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 font-normal">
              Enter your mobile number to access your commitment ledger.
            </p>
          </div>

          {/* Mobile Heading */}
          <div className="md:hidden mb-6">
            <h2 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
              Welcome to Vaadas
            </h2>
            <p className="text-[12px] text-slate-400 mt-1 font-normal">
              Enter your mobile number to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Mobile Number
            </label>

            {/* Input Box: "IN  +91  | 10-digit mobile number" */}
            <div className="flex items-center h-[52px] rounded-xl border border-slate-200 bg-white px-3.5 transition-all duration-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 shadow-2xs">
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
                className="flex-1 pl-3.5 text-sm font-semibold text-slate-900 placeholder:text-slate-300 placeholder:font-normal outline-none bg-transparent"
                autoFocus
              />
            </div>

            <p className="text-[11px] text-slate-400 mt-2 font-normal">
              A 6-digit OTP will be sent via SMS for verification.
            </p>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full h-[48px] rounded-[16px] font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 select-none mt-6 ${
                isValid
                  ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </form>
        </div>

        {/* Bottom Legal & Terms */}
        <div className="pt-8 text-center">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            By continuing, you agree to Vaadas'{' '}
            <button
              type="button"
              onClick={() => setLegalDoc('terms')}
              className="text-blue-600 font-semibold cursor-pointer hover:underline inline"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => setLegalDoc('privacy')}
              className="text-blue-600 font-semibold cursor-pointer hover:underline inline"
            >
              Privacy Policy
            </button>
            .
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Compliant with Section 10A of the Indian Information Technology Act, 2000.
          </p>
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
