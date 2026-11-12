import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, X, ArrowRight, RefreshCw, Lock } from 'lucide-react';

interface OtpModalProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  phone?: string;
  onClose: () => void;
  onVerify: () => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  title = 'Verify Action via OTP',
  subtitle,
  actionLabel = 'Verify & Authorize',
  phone = '+91 ******8745',
  onClose,
  onVerify,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(28);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimer(28);
      setIsVerifying(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const isComplete = otp.every((d) => d.trim() !== '');

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    if (cleaned.length > 1) {
      const chars = cleaned.slice(0, 6).split('');
      const newOtp = [...otp];
      chars.forEach((c, i) => {
        if (index + i < 6) newOtp[index + i] = c;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(index + chars.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter' && isComplete) {
      handleVerifyClick();
    }
  };

  const handleDemoFill = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    inputRefs.current[5]?.focus();
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerifyClick = () => {
    if (!isComplete || isVerifying) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 250);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px] animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-slate-200 flex flex-col items-center text-center relative animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isVerifying}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Security Badge Icon */}
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
          <ShieldCheck className="w-5 h-5 stroke-[2]" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 leading-tight">
          {title}
        </h3>

        {/* Subtitle with masked phone */}
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs">
          {subtitle || `Enter the 6-digit OTP sent to ${phone} to confirm.`}
        </p>

        {/* 6 OTP Digit Inputs */}
        <div className="flex gap-2 justify-center my-4 w-full">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={isVerifying}
              className={`w-10 h-11 text-center text-base font-bold rounded-xl border transition-all outline-none font-mono ${
                digit
                  ? 'border-blue-600 bg-blue-50/20 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-900 focus:border-blue-600'
              }`}
            />
          ))}
        </div>

        {/* Quick Demo Fill Helper */}
        <div className="flex items-center justify-between w-full px-1 text-[11px] mb-4">
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
          >
            Use Demo Code (123456)
          </button>

          <div className="text-slate-400 font-mono">
            {timer > 0 ? (
              <span>Resend in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3 stroke-[2]" />
                <span>Resend</span>
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={handleVerifyClick}
            disabled={!isComplete || isVerifying}
            className={`w-full h-10 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all select-none ${
              isComplete && !isVerifying
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer active:scale-[0.99]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying…</span>
              </>
            ) : (
              <>
                <span>{actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </>
            )}
          </button>

          <button
            onClick={onClose}
            disabled={isVerifying}
            className="w-full h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-medium text-xs transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Security note */}
        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mt-3">
          <Lock className="w-3 h-3 text-slate-400 stroke-[2]" />
          <span>256-bit Secure Authorization</span>
        </div>
      </div>
    </div>
  );
};
