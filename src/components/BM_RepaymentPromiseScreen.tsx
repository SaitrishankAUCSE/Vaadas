import React, { useState, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';

interface BMRepaymentPromiseProps {
  onBack: () => void;
  principalAmount: number;
  onContinue: (data: {
    repaymentAmount: number;
    durationDays: number;
    dueDate: string;
    interestApplies: boolean;
    interestType?: string;
    interestRate?: number;
  }) => void;
}

export const BM_RepaymentPromiseScreen: React.FC<BMRepaymentPromiseProps> = ({
  onBack,
  principalAmount = 100,
  onContinue,
}) => {
  const [useDifferentAmount, setUseDifferentAmount] = useState<boolean>(false);
  const [customRepaymentAmount, setCustomRepaymentAmount] = useState<number>(principalAmount);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(7);
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);
  const [customDate, setCustomDate] = useState<string>('2026-11-27');
  
  // Matching Figma Image 2: starts null (neither selected)
  const [willInterestApply, setWillInterestApply] = useState<'no' | 'yes' | null>(null);
  
  // Matching Figma Image 4: 'Fixed Amount' | 'Percentage' | null
  const [interestType, setInterestType] = useState<'Fixed Amount' | 'Percentage' | null>(null);
  const [interestAmount, setInterestAmount] = useState<number>(2000);
  const [interestPercentage, setInterestPercentage] = useState<number>(10);

  const durationPresets = [7, 15, 30, 60, 90];

  const activeRepaymentAmount = useDifferentAmount
    ? (customRepaymentAmount || 0)
    : principalAmount;

  // Calculate formatted due dates (full: "November 19th, 2026", short: "Nov 19, 2026")
  const { calculatedDueDateFull, calculatedDueDateShort } = useMemo(() => {
    let target = new Date();
    if (isCustomDuration && customDate) {
      const d = new Date(customDate);
      if (!isNaN(d.getTime())) {
        target = d;
      }
    } else if (selectedDuration !== null) {
      target.setDate(target.getDate() + selectedDuration);
    }
    const day = target.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';
    const monthFull = target.toLocaleDateString('en-US', { month: 'long' });
    const monthShort = target.toLocaleDateString('en-US', { month: 'short' });
    const year = target.getFullYear();

    return {
      calculatedDueDateFull: `${monthFull} ${day}${daySuffix}, ${year}`,
      calculatedDueDateShort: `${monthShort} ${day}, ${year}`,
    };
  }, [selectedDuration, isCustomDuration, customDate]);

  // Compute interest and total repayable
  const computedInterestValue = useMemo(() => {
    if (willInterestApply !== 'yes' || !interestType) return 0;
    if (interestType === 'Fixed Amount') {
      return Number(interestAmount) || 0;
    }
    return Math.round((activeRepaymentAmount * (Number(interestPercentage) || 0)) / 100);
  }, [willInterestApply, interestType, interestAmount, interestPercentage, activeRepaymentAmount]);

  const totalRepayable = activeRepaymentAmount + computedInterestValue;

  // Validation strictly matching Figma
  const canContinue =
    activeRepaymentAmount > 0 &&
    (selectedDuration !== null || isCustomDuration) &&
    willInterestApply !== null &&
    (willInterestApply === 'no' ||
      (willInterestApply === 'yes' &&
        interestType !== null &&
        ((interestType === 'Fixed Amount' && interestAmount >= 0) ||
          (interestType === 'Percentage' && interestPercentage >= 0))));

  const handleContinue = () => {
    if (!canContinue) return;
    onContinue({
      repaymentAmount: activeRepaymentAmount,
      durationDays: isCustomDuration ? 30 : (selectedDuration || 7),
      dueDate: calculatedDueDateFull,
      interestApplies: willInterestApply === 'yes',
      interestType: willInterestApply === 'yes' && interestType ? interestType : undefined,
      interestRate:
        willInterestApply === 'yes'
          ? interestType === 'Fixed Amount'
            ? interestAmount
            : interestPercentage
          : undefined,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar select-none animate-in fade-in duration-200 justify-between pb-8">
      <div className="flex flex-col">
        {/* Top Header matching Figma strictly: < Borrowed Money */}
        <div className="w-full border-b border-slate-100 bg-white">
          <div className="max-w-2xl mx-auto px-6 pt-6 pb-3 flex flex-col">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer -ml-1 w-fit py-1"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-slate-700">Borrowed Money</span>
            </button>

            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug mt-3">
              Repayment Promise
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-1">
              Define how and when the money will be repaid.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full max-w-2xl mx-auto px-6 pt-5 pb-16 flex flex-col gap-6">
          {/* 1. Repayment Amount Section matching Figma Images 2, 7 */}
          <div className="flex flex-col gap-2">
            <label className="block text-[11px] font-semibold text-slate-600">
              Repayment Amount
            </label>

            <div className="flex items-center h-12 rounded-xl border border-slate-200 bg-white px-3.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-2xs">
              <span className="text-sm font-bold text-slate-700 mr-2">₹</span>
              <input
                type="number"
                min="1"
                disabled={!useDifferentAmount}
                value={activeRepaymentAmount || ''}
                onChange={(e) => setCustomRepaymentAmount(Number(e.target.value))}
                placeholder="0"
                className={`flex-1 text-sm font-bold outline-none bg-transparent ${
                  useDifferentAmount ? 'text-slate-900' : 'text-slate-500 cursor-not-allowed'
                }`}
              />
            </div>

            {/* Checkbox: "Use a different repayment amount" */}
            <label className="flex items-center gap-2.5 mt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useDifferentAmount}
                onChange={(e) => setUseDifferentAmount(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
              />
              <span className="text-xs text-slate-700 font-medium">
                Use a different repayment amount
              </span>
            </label>
          </div>

          {/* 2. Duration Selector matching Figma Images 2, 3 */}
          <div className="flex flex-col gap-2.5">
            <label className="block text-[11px] font-semibold text-slate-600">
              When should the repayment be completed?
            </label>

            <div className="flex flex-wrap items-center gap-2 py-1">
              {durationPresets.map((days) => {
                const isSelected = !isCustomDuration && selectedDuration === days;
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => {
                      setIsCustomDuration(false);
                      setSelectedDuration(days);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {days} Days
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setIsCustomDuration(true);
                  setSelectedDuration(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isCustomDuration
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Custom Date Input when "Custom" is picked */}
            {isCustomDuration && (
              <div className="mt-1">
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white outline-none focus:border-blue-600"
                />
              </div>
            )}

            {/* Dynamic Due Date Display matching Figma */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
              <span className="text-slate-400 font-normal text-[11px]">Due by</span>
              <span className="text-slate-900 font-semibold text-[11px]">{calculatedDueDateFull}</span>
            </div>
          </div>

          {/* 3. "Will interest apply?" matching Figma Images 2, 3, 4 */}
          <div className="flex flex-col gap-2.5">
            <label className="block text-[11px] font-semibold text-slate-600">
              Will interest apply?
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setWillInterestApply('no');
                  setInterestType(null);
                }}
                className={`h-12 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  willInterestApply === 'no'
                    ? 'border-2 border-blue-600 bg-white text-blue-700 shadow-2xs ring-2 ring-blue-50 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                No
              </button>

              <button
                type="button"
                onClick={() => {
                  setWillInterestApply('yes');
                  if (!interestType) setInterestType('Fixed Amount');
                }}
                className={`h-12 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  willInterestApply === 'yes'
                    ? 'border-2 border-blue-600 bg-white text-blue-700 shadow-2xs ring-2 ring-blue-50 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                Yes
              </button>
            </div>

            {/* 4. Interest Type (Fixed Amount vs Percentage) matching Figma Images 4, 5, 6 */}
            {willInterestApply === 'yes' && (
              <div className="flex flex-col gap-3 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <label className="block text-[11px] font-semibold text-slate-600">
                  Interest Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInterestType('Fixed Amount')}
                    className={`h-11 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                      interestType === 'Fixed Amount'
                        ? 'border-2 border-blue-600 bg-white text-blue-700 shadow-2xs ring-2 ring-blue-50 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Fixed Amount
                  </button>

                  <button
                    type="button"
                    onClick={() => setInterestType('Percentage')}
                    className={`h-11 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                      interestType === 'Percentage'
                        ? 'border-2 border-blue-600 bg-white text-blue-700 shadow-2xs ring-2 ring-blue-50 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Percentage
                  </button>
                </div>

                {/* Input for Fixed Amount matching Figma Image 5, 7 */}
                {interestType === 'Fixed Amount' && (
                  <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      Interest Amount
                    </label>
                    <div className="flex items-center h-12 rounded-xl border border-slate-200 bg-white px-3.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-2xs">
                      <span className="text-sm font-bold text-slate-700 mr-2">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={interestAmount || ''}
                        onChange={(e) => setInterestAmount(Number(e.target.value))}
                        placeholder="0"
                        className="flex-1 text-sm font-bold text-slate-900 outline-none bg-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Input for Percentage matching Figma Image 6 */}
                {interestType === 'Percentage' && (
                  <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      Interest Percentage
                    </label>
                    <div className="flex items-center h-12 rounded-xl border border-slate-200 bg-white px-3.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-2xs">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={interestPercentage || ''}
                        onChange={(e) => setInterestPercentage(Number(e.target.value))}
                        placeholder="0"
                        className="flex-1 text-sm font-bold text-slate-900 outline-none bg-transparent"
                      />
                      <span className="text-sm font-bold text-slate-700 ml-2">%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 5. Repayment Summary Card matching Figma Image 7 */}
          {willInterestApply !== null && activeRepaymentAmount > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                Repayment Summary
              </h3>

              <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal text-[11px]">Principal</span>
                  <span className="font-semibold text-slate-800 text-[11px] font-tabular">
                    ₹{activeRepaymentAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal text-[11px]">
                    {willInterestApply === 'yes'
                      ? interestType === 'Fixed Amount'
                        ? 'Interest (Fixed)'
                        : `Interest (${interestPercentage || 0}%)`
                      : 'Interest'}
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px] font-tabular">
                    ₹{computedInterestValue.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-slate-900 font-bold text-xs">Total Repayable</span>
                  <span className="font-extrabold text-slate-900 text-xs font-tabular">
                    ₹{totalRepayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal text-[11px]">Due by</span>
                  <span className="font-semibold text-slate-800 text-[11px]">{calculatedDueDateShort}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Continue Action Button */}
      <div className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-2xl mx-auto px-6 pb-6 pt-4 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full sm:w-auto sm:px-10 h-[48px] rounded-[16px] font-medium text-xs transition-all duration-200 flex items-center justify-center select-none ${
              canContinue
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 cursor-pointer font-semibold'
                : 'bg-[#f1f3f6] text-[#94a3b8] cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
