import React, { useState } from 'react';
import { ChevronLeft, Shield, CheckCircle2, FileText, Eye, X, AlertCircle } from 'lucide-react';
import { VaadaItem } from '../types';
import { OtpModal } from './OtpModal';

interface BMReviewRepaymentProps {
  vaada: VaadaItem;
  onBack: () => void;
  onConfirmReceipt: (vaadaId: string) => void;
  onReportIssue?: (vaadaId: string) => void;
}

export const BM_ReviewRepayment: React.FC<BMReviewRepaymentProps> = ({
  vaada,
  onBack,
  onConfirmReceipt,
  onReportIssue,
}) => {
  const [viewingProof, setViewingProof] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleConfirm = () => {
    setShowOtpModal(true);
  };

  const handleOtpVerified = () => {
    setShowOtpModal(false);
    onConfirmReceipt(vaada.id);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-8 select-none animate-in fade-in duration-200">
      {/* Header */}
      <div className="w-full bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="p-1 -ml-1 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold text-slate-900">Review Repayment</h1>
            <p className="text-[10px] text-slate-400">Please review the repayment details carefully.</p>
          </div>
          <Shield className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-4 flex-1">
        {/* Vaada ID Strip with Status Pill */}
        <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between shadow-2xs">
          <span className="text-[11px] font-mono font-medium text-slate-500">ID: {vaada.vaadaId}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
            Repayment Pending Confirmation
          </span>
        </div>

        {/* Hero Summary Card (Solid Slate-900, Clean & Institutional) */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {vaada.category} Repayment
            </span>
          </div>
          <h3 className="text-base font-bold leading-snug">
            Appa Rao Gudimalla submitted repayment of ₹<span className="font-tabular">{vaada.amount.toLocaleString()}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            Only confirm if ₹{vaada.amount.toLocaleString()} has settled in your bank account. Confirming receipt will permanently settle and close this Vaada.
          </p>
        </div>

        {/* Key Terms Chips Row */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Terms</h4>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[125px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">Repaid Amount</span>
              <span className="text-base font-extrabold text-slate-900 font-tabular">₹{vaada.amount.toLocaleString()}</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[125px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">Repayment Date</span>
              <span className="text-sm font-bold text-slate-800">13 Jun 2026</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[110px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">Payment Mode</span>
              <span className="text-sm font-bold text-blue-600">UPI / IMPS</span>
            </div>
          </div>
        </div>

        {/* Repayment Details Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-2.5 text-xs">
          <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Repayment Details</h4>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Method:</span>
            <span className="font-semibold text-slate-800">Direct UPI Transfer</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Transaction ID / UTR:</span>
            <span className="font-mono text-slate-800 font-semibold text-[11px]">UPI-260613-882910</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Recorded By:</span>
            <span className="font-medium text-slate-800">Appa Rao Gudimalla</span>
          </div>
        </div>

        {/* Supporting Proof Accordion */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Payment_Proof_Receipt.pdf</span>
              <span className="text-[10px] text-slate-400">Verified UPI Screenshot • 240 KB</span>
            </div>
          </div>
          <button
            onClick={() => setViewingProof(true)}
            className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
        </div>

        {/* Information Notice */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
            By confirming receipt, this Vaada will be marked as completed and a Digital Completion Proof will be generated.
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Receipt</span>
          </button>

          <button
            onClick={() => onReportIssue ? onReportIssue(vaada.id) : onBack()}
            className="w-full py-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Report Discrepancy</span>
          </button>
        </div>
      </div>

      {/* OTP Verification Modal for Confirm Receipt */}
      <OtpModal
        isOpen={showOtpModal}
        title="Confirm Receipt via OTP"
        subtitle={`Enter the 6-digit OTP sent to your registered mobile (+91 ******8745) to authorize receipt of ₹${vaada.amount.toLocaleString()} for VAADA ID ${vaada.vaadaId}.`}
        actionLabel="Verify & Confirm Receipt"
        phone="+91 ******8745"
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerified}
      />

      {/* Proof Preview Modal */}
      {viewingProof && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 flex flex-col gap-3 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-xs font-bold text-slate-800">Repayment Proof</h3>
              <button onClick={() => setViewingProof(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-dashed text-center text-xs text-slate-600 flex flex-col items-center">
              <CheckCircle2 className="w-9 h-9 text-emerald-500 mb-2" />
              <p className="font-bold text-slate-800">Payment Successful</p>
              <p className="text-lg font-black text-slate-900 mt-1">₹{vaada.amount.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">UTR: UPI-260613-882910</p>
              <p className="text-[10px] text-slate-500 mt-2">Paid to Navya Gudimalla on 13 Jun 2026, 03:45 PM</p>
            </div>
            <button
              onClick={() => setViewingProof(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

