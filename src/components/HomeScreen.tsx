import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { VaadaItem } from '../types';

interface HomeScreenProps {
  vaadas: VaadaItem[];
  pendingCounterpartyReview: boolean;
  pendingRepaymentReview: boolean;
  onReviewVaada: (vaada: VaadaItem) => void;
  onReviewRepayment: (vaada: VaadaItem) => void;
  onOpenActiveVaada: (vaada: VaadaItem) => void;
  onOpenTimeline: (vaada: VaadaItem) => void;
  onNavigateToVaadas: (filter?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  vaadas,
  pendingCounterpartyReview,
  pendingRepaymentReview,
  onReviewVaada,
  onReviewRepayment,
  onOpenActiveVaada,
  onOpenTimeline,
  onNavigateToVaadas,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Pending', 'Active', 'Overdue', 'Completed'];

  const hasActionRequired = pendingCounterpartyReview || pendingRepaymentReview;

  // Filtered vaadas
  const filteredVaadas = vaadas.filter((v) => {
    if (selectedFilter === 'All') return true;
    return v.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-6 select-none animate-in fade-in duration-200">
      {/* Header Profile Greeting matching Figma strictly */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex flex-col items-start bg-white">
        <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug">
          Good Morning, Appi
        </h1>
        <div className="flex items-center gap-1.5 mt-1 text-emerald-600">
          <svg
            className="w-3.5 h-3.5 text-emerald-500"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M5 8 L7 10 L11 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] font-medium text-emerald-600">Verified</span>
        </div>
      </div>

      <div className="px-5 pt-4 flex flex-col gap-4">
        {/* Asymmetrical Financial Exposure & Ledger Summary */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Commitment Position
            </span>
            <button
              onClick={() => onNavigateToVaadas('Active')}
              className="text-xs font-mono bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-0.5 rounded-full text-slate-300 transition-colors cursor-pointer"
            >
              6 Active Records →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1 border-t border-slate-800/80">
            <div
              onClick={() => onNavigateToVaadas('Active')}
              className="cursor-pointer group"
            >
              <span className="text-xs text-slate-400 block font-medium group-hover:text-slate-300 transition-colors">To Receive</span>
              <div className="text-2xl font-bold tracking-tight text-white font-tabular mt-0.5">₹65,500</div>
              <span className="text-xs text-emerald-400 font-semibold mt-0.5 inline-block">3 commitments</span>
            </div>

            <div
              onClick={() => onNavigateToVaadas('Overdue')}
              className="border-l border-slate-800/80 pl-4 cursor-pointer group"
            >
              <span className="text-xs text-slate-400 block font-medium group-hover:text-slate-300 transition-colors">You Owe</span>
              <div className="text-2xl font-bold tracking-tight text-slate-100 font-tabular mt-0.5">₹12,000</div>
              <span className="text-xs text-rose-400 font-semibold mt-0.5 inline-block">1 overdue</span>
            </div>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* ACTION REQUIRED SECTION strictly matching Figma wireframe */}
        {hasActionRequired && (
          <div className="flex flex-col gap-2.5 pt-1 animate-in fade-in duration-200">
            {/* Section Header: (!) ACTION REQUIRED */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500 stroke-[2.2]" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">
                ACTION REQUIRED
              </span>
            </div>

            {/* Card 1: Review Borrowed Money Vaada (Navya Gudimalla) */}
            {pendingCounterpartyReview && (
              <div className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-2xs flex flex-col">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-600 text-[11px]">Borrowed Money</span>
                  <span className="text-[11px] text-amber-600 font-normal">Review before 14 Jun 2026</span>
                </div>

                <div className="mt-2.5">
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    Navya Gudimalla sent you a Vaada requiring your review.
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono tracking-wide">
                    VAADA ID: 260531-11-0001
                  </p>
                </div>

                <button
                  onClick={() => onReviewVaada(vaadas[0])}
                  className="w-full h-10 mt-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center cursor-pointer"
                >
                  Review
                </button>
              </div>
            )}

            {/* Card 2: Confirm Repayment (Appi Gudimalla) */}
            {pendingRepaymentReview && (
              <div className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-2xs flex flex-col">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-600 text-[11px]">Borrowed Money</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-medium">
                    Repayment Pending Confirmation
                  </span>
                </div>

                <div className="mt-2.5">
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    Confirm Repayment
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Appi Gudimalla recorded repayment.
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono tracking-wide">
                    VAADA ID: 260531-11-0901
                  </p>
                </div>

                <button
                  onClick={() => onReviewRepayment(vaadas[2] || vaadas[0])}
                  className="w-full h-10 mt-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center cursor-pointer"
                >
                  Review
                </button>
              </div>
            )}
          </div>
        )}

        {/* Vaadas List (when scrolled or when action required is dismissed) */}
        <div className="flex flex-col gap-3 pt-2">
          {filteredVaadas.map((vaada) => (
            <div
              key={vaada.id}
              onClick={() => onOpenActiveVaada(vaada)}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex flex-col gap-2.5 cursor-pointer hover:border-slate-200 transition-all active:scale-[0.99]"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{vaada.category}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    vaada.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : vaada.status === 'overdue'
                      ? 'bg-rose-50 text-rose-700'
                      : vaada.status === 'pending'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {vaada.status.toUpperCase()}
                </span>
              </div>

              <div className="text-sm font-bold text-slate-900">{vaada.counterparty}</div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Amount</span>
                  <span className="font-extrabold text-slate-900">₹{vaada.amount.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Due Date</span>
                  <span className="font-semibold text-slate-700">{vaada.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
