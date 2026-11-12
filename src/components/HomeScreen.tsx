import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Search, ArrowRight, Shield, Clock, TrendingUp, TrendingDown, Filter } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters = ['All', 'Pending', 'Active', 'Overdue', 'Completed'];

  const hasActionRequired = pendingCounterpartyReview || pendingRepaymentReview;

  // Filtered vaadas
  const filteredVaadas = vaadas.filter((v) => {
    const matchesFilter =
      selectedFilter === 'All' || v.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      v.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vaadaId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50/60 overflow-y-auto no-scrollbar pb-16 select-none animate-in fade-in duration-200">
      {/* Top Banner / Greeting */}
      <div className="w-full bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col items-start">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Good Morning, Appi
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span className="text-[11px] font-semibold text-emerald-700">Verified Account</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-xs text-slate-500 font-medium">
                Mutual commitments legally registered under IT Act, 2000
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => onNavigateToVaadas('All')}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <span>View Directory</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container across full desktop viewport */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 flex flex-col gap-6 flex-1">
        {/* Asymmetrical Financial Exposure & Ledger Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Total Portfolio / Active Ledger */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                Commitment Position
              </span>
              <button
                onClick={() => onNavigateToVaadas('Active')}
                className="text-[11px] font-mono bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-0.5 rounded-full text-slate-300 transition-colors cursor-pointer"
              >
                6 Active Records →
              </button>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Total Ledger Exposure</span>
              <div className="text-3xl font-extrabold tracking-tight text-white font-tabular mt-0.5">
                ₹77,500
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Across 4 counterparties with mutual proof</p>
            </div>
          </div>

          {/* Card 2: To Receive */}
          <div
            onClick={() => onNavigateToVaadas('Active')}
            className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                To Receive (Receivables)
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-tabular">
                ₹65,500
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  3 commitments
                </span>
                <span className="text-xs text-slate-400">On schedule</span>
              </div>
            </div>
          </div>

          {/* Card 3: You Owe */}
          <div
            onClick={() => onNavigateToVaadas('Overdue')}
            className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 hover:border-rose-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                You Owe (Payables)
              </span>
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-tabular">
                ₹12,000
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold">
                  1 overdue
                </span>
                <span className="text-xs text-slate-400">Navya Gudimalla</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs Bar + Search Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Search Box on Desktop */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by name, ID or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
            />
          </div>
        </div>

        {/* ACTION REQUIRED SECTION in a 2-column Desktop Grid */}
        {hasActionRequired && (
          <div className="flex flex-col gap-3 pt-1 animate-in fade-in duration-200">
            {/* Section Header: (!) ACTION REQUIRED */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-600">
                <AlertCircle className="w-4 h-4 text-rose-500 stroke-[2.2]" />
                <span className="text-xs font-bold tracking-wider uppercase text-slate-700">
                  ACTION REQUIRED
                </span>
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                High Priority Legal Confirmations
              </span>
            </div>

            {/* Responsive 2-Column Grid on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Review Borrowed Money Vaada (Navya Gudimalla) */}
              {pendingCounterpartyReview && (
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-2xs flex flex-col justify-between gap-4 hover:border-amber-400 transition-all">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-700 text-xs bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        Borrowed Money
                      </span>
                      <span className="text-xs text-amber-700 font-medium">Review before 14 Jun 2026</span>
                    </div>

                    <div className="mt-3">
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        Navya Gudimalla sent you a Vaada requiring your review.
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono tracking-wide">
                        VAADA ID: 260531-11-0001 • Amount: ₹57,500
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500">Requires OTP acceptance</span>
                    <button
                      onClick={() => onReviewVaada(vaadas[0])}
                      className="w-full sm:w-auto px-6 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center cursor-pointer ml-auto"
                    >
                      Review & Accept
                    </button>
                  </div>
                </div>
              )}

              {/* Card 2: Confirm Repayment (Appi Gudimalla) */}
              {pendingRepaymentReview && (
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-2xs flex flex-col justify-between gap-4 hover:border-amber-400 transition-all">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-700 text-xs bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        Borrowed Money
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
                        Repayment Pending Confirmation
                      </span>
                    </div>

                    <div className="mt-3">
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        Confirm Repayment Receipt
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Appi Gudimalla recorded repayment of ₹57,500.
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono tracking-wide">
                        VAADA ID: 260531-11-0901
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500">Closes commitment permanently</span>
                    <button
                      onClick={() => onReviewRepayment(vaadas[2] || vaadas[0])}
                      className="w-full sm:w-auto px-6 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center cursor-pointer ml-auto"
                    >
                      Confirm Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vaadas List in a 3-Column Desktop Grid */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Commitments & Agreements ({filteredVaadas.length})
            </h2>
            <span className="text-xs text-slate-400">Click any card to inspect legal audit history</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVaadas.map((vaada) => (
              <div
                key={vaada.id}
                onClick={() => onOpenActiveVaada(vaada)}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-150 cursor-pointer flex flex-col justify-between gap-3 active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-700">{vaada.category}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                        vaada.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : vaada.status === 'overdue'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200/80'
                          : vaada.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {vaada.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mt-2 leading-tight">
                    {vaada.counterparty}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium block mt-0.5">
                    {vaada.role}
                  </span>
                </div>

                <div className="flex items-end justify-between pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
                      Amount
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 font-tabular">
                      ₹{vaada.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
                      Due Date
                    </span>
                    <span className="font-semibold text-slate-700 text-xs">{vaada.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
