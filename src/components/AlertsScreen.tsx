import React from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight, Clock, AlertCircle, Bell, XCircle } from 'lucide-react';
import { VaadaItem } from '../types';

interface AlertsScreenProps {
  vaadas: VaadaItem[];
  pendingCounterpartyReview: boolean;
  pendingRepaymentReview: boolean;
  onReviewVaada: (vaada: VaadaItem) => void;
  onReviewRepayment: (vaada: VaadaItem) => void;
  onOpenActiveVaada: (vaada: VaadaItem) => void;
  onOpenTimeline: (vaada: VaadaItem) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  vaadas,
  pendingCounterpartyReview,
  pendingRepaymentReview,
  onReviewVaada,
  onReviewRepayment,
  onOpenActiveVaada,
  onOpenTimeline,
}) => {
  // Count of items in Action Required
  const actionCount = 4;

  const handleReviewVaada = (category: string, counterparty: string, vaadaId: string) => {
    const targetVaada = vaadas.find((v) => v.vaadaId === vaadaId) || {
      ...vaadas[0],
      category: category as any,
      counterparty,
      vaadaId,
    };
    onReviewVaada(targetVaada);
  };

  const handleOpenVaada = (category: string, counterparty: string, vaadaId: string) => {
    const targetVaada = vaadas.find((v) => v.vaadaId === vaadaId) || {
      ...vaadas[0],
      category: category as any,
      counterparty,
      vaadaId,
    };
    onOpenActiveVaada(targetVaada);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-8 select-none animate-in fade-in duration-200">
      {/* Top Header strictly matching Figma */}
      <div className="w-full bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 pt-6 pb-3 flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug">
            Alerts
          </h1>
          <div className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center">
            {actionCount}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-6 pt-4 pb-12 flex-1">
        {/* ========================================================= */}
        {/* SECTION 1: ACTION REQUIRED                                 */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-3">
          {/* Section Header */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
            <span>ACTION REQUIRED</span>
          </div>

          {/* Card 1: Confirm Repayment */}
          <div className="bg-white rounded-2xl border border-amber-300 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50/80 border border-amber-200/90 px-2 py-0.5 rounded-md leading-tight">
                Borrowed Money
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                Just now
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Confirm Repayment
            </h3>

            <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
              Appi Gudimalla recorded repayment for VAADA ID 260531-11-0001. Please review and confirm receipt.
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-slate-400 font-mono">
                260531-11-0001
              </span>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200/90 px-2 py-0.5 rounded-full leading-tight">
                Repayment Pending Confirmation
              </span>
            </div>

            <button
              onClick={() => onReviewRepayment(vaadas[2] || vaadas[0])}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer w-fit mt-2 pt-0.5"
            >
              <span>Review Now</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Card 2: Review Borrowed Money Vaada */}
          <div className="bg-white rounded-2xl border border-amber-300 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50/80 border border-amber-200/90 px-2 py-0.5 rounded-md leading-tight">
                Borrowed Money
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                10 min ago
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Review Borrowed Money Vaada
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              From Navya Gudimalla
            </p>

            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              260531-11-0001
            </span>

            <button
              onClick={() => handleReviewVaada('Borrowed Money', 'Navya Gudimalla', '260531-11-0001')}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer w-fit mt-2 pt-0.5"
            >
              <span>Review Now</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Card 3: Review Service Agreement */}
          <div className="bg-white rounded-2xl border border-amber-300 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50/80 border border-amber-200/90 px-2 py-0.5 rounded-md leading-tight">
                Service Agreement
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                2 hr ago
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Review Service Agreement
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              From Rahul Mehta
            </p>

            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              260528-11-0003
            </span>

            <button
              onClick={() => handleReviewVaada('Service Agreement', 'Rahul Mehta', '260528-11-0003')}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer w-fit mt-2 pt-0.5"
            >
              <span>Review Now</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Card 4: Review Payment Promise */}
          <div className="bg-white rounded-2xl border border-amber-300 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50/80 border border-amber-200/90 px-2 py-0.5 rounded-md leading-tight">
                Payment Promise
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                1 day ago
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Review Payment Promise
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              From Aisha Patel
            </p>

            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              260520-11-0007
            </span>

            <button
              onClick={() => handleReviewVaada('Payment Promise', 'Aisha Patel', '260520-11-0007')}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer w-fit mt-2 pt-0.5"
            >
              <span>Review Now</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: UPDATES                                         */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-3">
          {/* Section Header */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" strokeWidth={2.5} />
            <span>UPDATES</span>
          </div>

          {/* Update 1: Vaada Activated */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-2 py-0.5 rounded-md leading-tight flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                <span>Vaada Activated</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                3 hr ago
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Advance Given
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              David Kim • 260515-11-0002
            </p>

            <button
              onClick={() => handleOpenVaada('Advance Given', 'David Kim', '260515-11-0002')}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer w-fit mt-2 pt-0.5"
            >
              <span>View Vaada</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Update 2: Vaada Completed */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-200/90 px-2 py-0.5 rounded-md leading-tight flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-blue-600 stroke-[2.5]" />
                <span>Vaada Completed</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                1 day ago
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Payment Promise
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              Elena Rodriguez • 260510-11-0005
            </p>
          </div>

          {/* Update 3: Vaada Rejected */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-rose-700 bg-rose-50 border border-rose-200/90 px-2 py-0.5 rounded-md leading-tight flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-rose-600 stroke-[2.5]" />
                <span>Vaada Rejected</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                2 days ago
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Borrowed Money
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              Michael Thompson • 260501-11-0004
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: REMINDERS                                       */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-3">
          {/* Section Header */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
            <span>REMINDERS</span>
          </div>

          {/* Reminder 1: Due Tomorrow */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200/90 px-2 py-0.5 rounded-md leading-tight flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600 stroke-[2.5]" />
                <span>Due Tomorrow</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                Today
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Borrowed Money
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              Aisha Patel • 260530-11-0006
            </p>

            <button
              onClick={() => handleOpenVaada('Borrowed Money', 'Aisha Patel', '260530-11-0006')}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer w-fit mt-2 pt-0.5"
            >
              <span>View Vaada</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Reminder 2: Awaiting Counterparty Response */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200/90 px-2 py-0.5 rounded-md leading-tight flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500 stroke-[2.5]" />
                <span>Awaiting Counterparty Response</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                3 days
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Service Agreement
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              Sarah Chen • 260525-11-0008
            </p>
          </div>

          {/* Reminder 3: Overdue */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-rose-700 bg-rose-50 border border-rose-200/90 px-2 py-0.5 rounded-md leading-tight flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-rose-600 stroke-[2.5]" />
                <span>Overdue</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                5 days
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
              Payment Promise
            </h3>

            <p className="text-[11px] text-slate-500 font-normal">
              Rahul Mehta • 260520-11-0009
            </p>

            <button
              onClick={() => handleOpenVaada('Payment Promise', 'Rahul Mehta', '260520-11-0009')}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer w-fit mt-2 pt-0.5"
            >
              <span>View Vaada</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
