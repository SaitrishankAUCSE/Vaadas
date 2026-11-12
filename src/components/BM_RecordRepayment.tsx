import React, { useState } from 'react';
import { ChevronLeft, Shield, Upload, CheckCircle2, FileText, Info } from 'lucide-react';
import { VaadaItem } from '../types';
import { OtpModal } from './OtpModal';

interface BMRecordRepaymentProps {
  vaada: VaadaItem;
  onBack: () => void;
  onSubmit: (data: { method: string; date: string; proofType: string; proofValue: string }) => void;
}

export const BM_RecordRepayment: React.FC<BMRecordRepaymentProps> = ({ vaada, onBack, onSubmit }) => {
  const [repaymentDate, setRepaymentDate] = useState('2026-06-13');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Bank Transfer' | 'Cash' | 'Cheque'>('UPI');
  const [proofMode, setProofMode] = useState<'upload' | 'txnId'>('upload');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [txnId, setTxnId] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Validation rules
  // For UPI, Bank Transfer, Cheque: proof upload OR transaction ID required
  // For Cash: proof is optional
  const isProofValid =
    paymentMethod === 'Cash' ||
    (proofMode === 'upload' && uploadedFileName !== null) ||
    (proofMode === 'txnId' && txnId.trim().length >= 4);

  const canSubmit = isProofValid;

  const handleSimulatedUpload = () => {
    setUploadedFileName('Payment_Receipt_Transfer.pdf');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!canSubmit) return;
    setShowOtpModal(true);
  };

  const handleOtpVerified = () => {
    setShowOtpModal(false);
    onSubmit({
      method: paymentMethod,
      date: repaymentDate,
      proofType: proofMode,
      proofValue: proofMode === 'upload' ? (uploadedFileName || '') : txnId,
    });
  };

  const methods: Array<'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque'> = ['UPI', 'Bank Transfer', 'Cash', 'Cheque'];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-8 select-none animate-in fade-in duration-200">
      {/* Header matching Established Noted Pattern */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-700 hover:text-slate-900 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-slate-900">Record Repayment</h1>
          <p className="text-[10px] text-slate-400">Tell us how the repayment was made.</p>
        </div>
        <Shield className="w-5 h-5 text-blue-600" />
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Compact Repayment Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">ID: {vaada.vaadaId}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Fixed Summary
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Repayment Amount</span>
              <span className="text-xl font-extrabold text-slate-900">₹{vaada.amount.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Lender</span>
              <span className="text-xs font-bold text-slate-800">{vaada.counterparty}</span>
            </div>
          </div>
        </div>

        {/* Repayment Amount Field (Read-Only) */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Repayment Amount (Fixed)
          </label>
          <div className="h-12 rounded-xl border border-slate-200 bg-slate-100/70 px-4 flex items-center justify-between text-slate-700">
            <span className="text-sm font-bold text-slate-900">₹{vaada.amount.toLocaleString()}</span>
            <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
              Read-Only
            </span>
          </div>
        </div>

        {/* Repayment Date Field */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Repayment Date
          </label>
          <input
            type="date"
            value={repaymentDate}
            onChange={(e) => setRepaymentDate(e.target.value)}
            className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Payment Method 2x2 Grid */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {methods.map((method) => {
              const isSelected = paymentMethod === method;
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`h-12 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-2 ring-blue-600'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>
        </div>

        {/* Repayment Proof Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Repayment Proof</h4>
              <p className="text-[10px] text-slate-400">
                {paymentMethod === 'Cash' ? 'Optional for cash repayment' : 'Required for verification'}
              </p>
            </div>

            {/* Toggle Mode */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setProofMode('upload')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  proofMode === 'upload' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setProofMode('txnId')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  proofMode === 'txnId' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Txn ID
              </button>
            </div>
          </div>

          {proofMode === 'upload' ? (
            <div>
              {uploadedFileName ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">{uploadedFileName}</span>
                      <span className="text-[10px] text-emerald-700">Uploaded & Verified</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFileName(null)}
                    className="text-[10px] font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleSimulatedUpload}
                  className="p-5 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/40 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-700">Tap to Upload Payment Proof</span>
                  <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 5MB</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter Transaction / UTR / Reference ID"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>
          )}
        </div>

        {/* Information Card */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
            Once submitted, the other party will be asked to confirm receipt of repayment.
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
              canSubmit
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-[0.99] cursor-pointer'
                : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
            }`}
          >
            <span>Submit Repayment</span>
          </button>

          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center justify-center cursor-pointer"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {/* OTP Verification Modal for Submit Repayment */}
      <OtpModal
        isOpen={showOtpModal}
        title="Authorize Repayment Submission"
        subtitle={`Enter the 6-digit OTP sent to your registered mobile (+91 ******8745) to authorize submission of ₹${vaada.amount.toLocaleString()} for VAADA ID ${vaada.vaadaId}.`}
        actionLabel="Verify & Submit Repayment"
        phone="+91 ******8745"
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerified}
      />
    </div>
  );
};

