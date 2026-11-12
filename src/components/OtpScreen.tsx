import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Shield } from 'lucide-react';

interface OtpScreenProps {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({ phone, onVerify, onBack }) => {
  // Starts empty matching the Figma screenshot strictly
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(27);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input box initially
    inputRefs.current[0]?.focus();

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isComplete = otp.every((digit) => digit.trim() !== '');

  const handleChange = (index: number, value: string) => {
    // Take only numeric character
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // If user pastes multiple digits
    if (cleaned.length > 1) {
      const chars = cleaned.slice(0, 6).split('');
      const newOtp = [...otp];
      chars.forEach((c, idx) => {
        if (index + idx < 6) {
          newOtp[index + idx] = c;
        }
      });
      setOtp(newOtp);
      const nextFocus = Math.min(index + chars.length, 5);
      inputRefs.current[nextFocus]?.focus();
      setFocusedIndex(nextFocus);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    // Auto advance to next box
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    } else if (e.key === 'Enter' && isComplete) {
      onVerify();
    }
  };

  // Quick fill helper for testing demo
  const handleDemoFill = () => {
    const demoDigits = ['1', '2', '3', '4', '5', '6'];
    setOtp(demoDigits);
    inputRefs.current[5]?.focus();
    setFocusedIndex(5);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
    }
  };

  // Masked phone format matching screenshot: "+91 91**** **77"
  const formattedPhone =
    phone && phone.length >= 10
      ? `+91 ${phone.slice(0, 2)}**** **${phone.slice(-2)}`
      : '+91 91**** **77';

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none animate-in fade-in duration-200">
      {/* Top Header Bar matching Figma strictly: < OTP Verification ... (shield right) */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-white">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-colors -ml-1 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-slate-800" strokeWidth={2.2} />
          <span className="text-sm font-bold text-slate-900 tracking-tight">OTP Verification</span>
        </button>

        {/* Small Shield Icon in circular light-blue badge on the far right */}
        <div className="w-8 h-8 rounded-full bg-blue-50/70 border border-blue-100/60 flex items-center justify-center text-blue-600">
          <Shield className="w-4 h-4" strokeWidth={2.2} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-7">
        <div className="flex flex-col items-center text-center">
          {/* Blue Shield Icon inside Soft Circular Badge */}
          <div className="w-[62px] h-[62px] rounded-full bg-[#eff6ff] border border-blue-100 flex items-center justify-center mb-5 shadow-2xs">
            <svg
              className="w-7 h-8 text-[#1f51e5]"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2 C8 4.2 3 5.5 3 5.5 V16 C3 23.5 14 30 14 30 C14 30 25 23.5 25 16 V5.5 C25 5.5 20 4.2 14 2 Z"
                stroke="#1f51e5"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-[22px] font-bold text-slate-900 tracking-tight leading-snug">
            Verify Mobile Number
          </h1>

          {/* Subtitle */}
          <p className="text-[12px] text-slate-500 mt-1.5 font-normal">
            Enter the 6-digit OTP sent to your mobile number.
          </p>

          {/* Masked Phone Number & Change Mobile Number link */}
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[12px]">
            <span className="text-slate-600 font-medium">{formattedPhone}</span>
            <button
              onClick={onBack}
              className="text-[#1f51e5] font-semibold hover:underline cursor-pointer"
            >
              Change Mobile Number
            </button>
          </div>

          {/* 6 OTP Input Boxes */}
          <div className="flex items-center justify-center gap-2.5 mt-7">
            {otp.map((digit, idx) => {
              const isFocused = focusedIndex === idx;
              return (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onFocus={() => setFocusedIndex(idx)}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-[42px] h-[50px] text-center text-lg font-bold text-slate-900 rounded-xl transition-all duration-150 outline-none ${
                    isFocused
                      ? 'border-2 border-[#1f51e5] bg-white ring-2 ring-blue-100 shadow-2xs'
                      : digit
                      ? 'border border-slate-300 bg-white'
                      : 'border border-slate-200/90 bg-white hover:border-slate-300'
                  }`}
                />
              );
            })}
          </div>

          {/* Resend OTP countdown line */}
          <div className="mt-5 text-[11.5px] text-slate-500 font-normal">
            {timer > 0 ? (
              <span>Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#1f51e5] font-semibold hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Demo Helper Text */}
          <p
            onClick={handleDemoFill}
            className="text-[10px] text-slate-400 mt-6 cursor-pointer hover:text-slate-600 transition-colors"
            title="Click to auto-fill 123456"
          >
            Enter OTP 123456 to continue in this demo.
          </p>
        </div>

        {/* Bottom Verify & Continue Button strictly matching Figma disabled/enabled state */}
        <div className="w-full pt-4">
          <button
            onClick={onVerify}
            disabled={!isComplete}
            className={`w-full h-[48px] rounded-[16px] font-medium text-xs transition-all duration-200 flex items-center justify-center select-none ${
              isComplete
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 cursor-pointer font-semibold'
                : 'bg-[#f1f3f6] text-[#94a3b8] cursor-not-allowed'
            }`}
          >
            Verify & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
