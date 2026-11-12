import React from 'react';
import { ChevronLeft, Shield, CheckCircle2, FileText, ArrowRight, Clock, User, AlertCircle } from 'lucide-react';

interface BMReviewCreateProps {
  onBack: () => void;
  data: {
    role: 'lender' | 'borrower';
    counterparty: string;
    phone?: string;
    amount: number;
    dateGiven: string;
    paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
    transactionId?: string;
    proofAdded: boolean;
    repaymentAmount: number;
    durationDays: number;
    dueDate: string;
    interestApplies: boolean;
    interestType?: string;
    interestRate?: number;
  };
  onCreate: () => void;
}

export const BM_ReviewCreateScreen: React.FC<BMReviewCreateProps> = ({
  onBack,
  data,
  onCreate,
}) => {
  const isBorrower = data.role === 'borrower';

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 overflow-y-auto no-scrollbar select-none animate-in fade-in duration-200 justify-between pb-8">
      <div className="flex flex-col">
        {/* Top Header */}
        <div className="w-full border-b border-slate-100 bg-white">
          <div className="max-w-2xl mx-auto px-6 pt-6 pb-3 flex flex-col">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer -ml-1 w-fit py-1"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-slate-700">Repayment Promise</span>
            </button>

            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug mt-3">
              Review & Sign Commitment
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-1">
              Verify all mutual terms before sending for acceptance.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-2xl mx-auto px-6 pt-5 pb-12 flex flex-col gap-4">
          {/* Statutory Seal Banner */}
          <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-900 block leading-tight">
                Section 10A IT Act, 2000 Electronic Contract
              </span>
              <p className="text-[11px] text-blue-700 font-normal mt-0.5 leading-snug">
                Once sent, {data.counterparty} will receive a notification to verify and mutually sign via OTP.
              </p>
            </div>
          </div>

          {/* Detailed Contract Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Borrowed Money Commitment
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                Pending Acceptance
              </span>
            </div>

            {/* Parties */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Parties Involved
              </span>
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Your Role</span>
                  <span className="text-xs font-bold text-slate-900">
                    {isBorrower ? 'Borrower (Receiver)' : 'Lender (Provider)'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Counterparty</span>
                  <span className="text-xs font-bold text-slate-900">
                    {data.counterparty}
                  </span>
                  {data.phone && (
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      {data.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Principal & Transfer Proof */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Principal & Transfer Details
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Principal Amount</span>
                  <span className="text-base font-extrabold text-slate-900 font-tabular">
                    ₹{data.amount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Date Given</span>
                  <span className="text-xs font-semibold text-slate-800">{data.dateGiven}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Payment Mode</span>
                  <span className="text-xs font-semibold text-slate-800">
                    {data.paymentMethod}
                    {data.transactionId ? ` (${data.transactionId})` : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Repayment Terms */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Repayment Terms
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Due Date</span>
                  <span className="text-xs font-bold text-slate-900">{data.dueDate}</span>
                  <span className="text-[10px] text-slate-500 block">({data.durationDays} Days duration)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Repayment Amount</span>
                  <span className="text-base font-extrabold text-slate-900 font-tabular">
                    ₹{data.repaymentAmount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Interest</span>
                  <span className="text-xs font-semibold text-slate-800">
                    {data.interestApplies
                      ? `${data.interestRate}% (${data.interestType})`
                      : 'None (0%)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-2xl mx-auto px-6 pb-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
            By clicking create, you legally bind this commitment.
          </span>
          <button
            onClick={onCreate}
            className="w-full sm:w-auto sm:px-8 h-[48px] rounded-[16px] font-semibold text-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create & Send Vaada</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
};

