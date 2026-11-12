import React, { useState } from 'react';
import { ChevronLeft, Shield, Check, X, FileText, ChevronDown, ChevronUp, AlertCircle, Eye } from 'lucide-react';
import { VaadaItem } from '../types';

interface CPReviewProps {
  vaada: VaadaItem;
  onBack: () => void;
  onAccept: (vaadaId: string) => void;
  onReject: (vaadaId: string) => void;
}

export const CP_Review: React.FC<CPReviewProps> = ({ vaada, onBack, onAccept, onReject }) => {
  const [agreed, setAgreed] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [loanDetailsOpen, setLoanDetailsOpen] = useState(true);
  const [repaymentOpen, setRepaymentOpen] = useState(true);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-8 select-none animate-in fade-in duration-200">
      {/* Header */}
      <div className="w-full bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="p-1 -ml-1 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold text-slate-900">Review Vaada</h1>
            <p className="text-[10px] text-slate-400">Counterparty Acceptance</p>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-4 flex-1">
        {/* Vaada ID Strip */}
        <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between shadow-2xs">
          <span className="text-[11px] font-mono font-medium text-slate-500">ID: {vaada.vaadaId}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold">
            Pending Your Response
          </span>
        </div>

        {/* Hero Summary Card (Solid Slate-900, Clean Institutional) */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{vaada.category}</span>
          </div>
          <h3 className="text-base font-bold leading-snug">
            {vaada.counterparty} proposed a Vaada of ₹<span className="font-tabular">{vaada.amount.toLocaleString()}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            By accepting, you legally acknowledge borrowing ₹{vaada.amount.toLocaleString()} due on {vaada.dueDate}. This commitment is logged with verified OTP signatures under the IT Act, 2000.
          </p>
        </div>

        {/* Key Terms Chips Row */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Terms</h4>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[125px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">Principal</span>
              <span className="text-base font-extrabold text-slate-900 font-tabular">₹{vaada.amount.toLocaleString()}</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[125px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">Repayment Due</span>
              <span className="text-sm font-bold text-slate-800">{vaada.dueDate}</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[110px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">Interest Rate</span>
              <span className="text-sm font-bold text-emerald-600">0% (Nil)</span>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-2.5">
          {/* Participants Accordion */}
          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
            <button
              onClick={() => setParticipantsOpen(!participantsOpen)}
              className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-slate-800"
            >
              <span>Participants</span>
              {participantsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {participantsOpen && (
              <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Party A (Lender):</span>
                  <span className="font-semibold text-slate-800">{vaada.counterparty}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Party B (Borrower):</span>
                  <span className="font-semibold text-slate-800">Appa Rao Gudimalla</span>
                </div>
              </div>
            )}
          </div>

          {/* Loan Details Accordion */}
          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
            <button
              onClick={() => setLoanDetailsOpen(!loanDetailsOpen)}
              className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-slate-800"
            >
              <span>Commitment & Loan Details</span>
              {loanDetailsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {loanDetailsOpen && (
              <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Commitment Purpose:</span>
                  <span className="font-medium text-slate-800">Personal Assistance</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Disbursement Method:</span>
                  <span className="font-medium text-slate-800">Direct UPI / Bank Transfer</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Digital Seal:</span>
                  <span className="font-mono text-[10px] text-emerald-600">SEAL-260531-VERIFIED</span>
                </div>
              </div>
            )}
          </div>

          {/* Supporting Documents Accordion */}
          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
            <button
              onClick={() => setDocumentsOpen(!documentsOpen)}
              className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-slate-800"
            >
              <span>Supporting Documents (1)</span>
              {documentsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {documentsOpen && (
              <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">Transfer_Receipt_0901.pdf</span>
                      <span className="text-[10px] text-slate-400">142 KB • Verified UPI Receipt</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewingDoc('Transfer_Receipt_0901.pdf')}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-blue-600 hover:bg-blue-50 flex items-center gap-1 shadow-2xs"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* "What happens if you accept?" */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5">
          <h4 className="text-xs font-bold text-blue-900 mb-2">What happens if you accept?</h4>
          <ol className="text-[11px] text-blue-800 space-y-1.5 list-decimal pl-4 leading-relaxed">
            <li>Both parties legally confirm the commitment of ₹{vaada.amount.toLocaleString()}.</li>
            <li>A tamper-proof digital completion record is initialized on the audit ledger.</li>
            <li>You will receive automated reminders as the due date ({vaada.dueDate}) approaches.</li>
          </ol>
        </div>

        {/* Confirmation Checkbox */}
        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer shadow-2xs">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 mt-0.5"
          />
          <span className="text-xs text-slate-700 leading-snug font-medium">
            I have reviewed the information above and agree to proceed.
          </span>
        </label>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={() => onAccept(vaada.id)}
            disabled={!agreed}
            className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
              agreed
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-[0.99] cursor-pointer'
                : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Accept Vaada</span>
          </button>

          <button
            onClick={() => onReject(vaada.id)}
            className="w-full py-3 rounded-xl font-bold text-xs border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Reject</span>
          </button>
        </div>
      </div>

      {/* Document Preview Modal */}
      {viewingDoc && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 flex flex-col gap-3 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-xs font-bold text-slate-800">{viewingDoc}</h3>
              <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-dashed text-center text-xs text-slate-500">
              <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-800">Verified Proof of Transfer</p>
              <p className="text-[10px] mt-1 font-mono">Txn ID: UPI/260531/4492019</p>
              <p className="text-[10px] text-slate-400 mt-1">Amount: ₹{vaada.amount.toLocaleString()} to {vaada.counterparty}</p>
            </div>
            <button
              onClick={() => setViewingDoc(null)}
              className="w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

