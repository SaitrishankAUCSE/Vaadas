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
  const [selectedDuration, setSelectedDuration] = useState<number>(15);
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);
  const [customDate, setCustomDate] = useState<string>('2026-11-27');
  const [interestApplies, setInterestApplies] = useState<boolean>(false);
  const [interestType, setInterestType] = useState<string>('Monthly %');
  const [interestRate, setInterestRate] = useState<number>(2);

  const durationPresets = [7, 15, 30, 60, 90];

  // Calculate formatted due date based on selected duration
  const calculatedDueDate = useMemo(() => {
    if (isCustomDuration && customDate) {
      const d = new Date(customDate);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
    }
    const target = new Date();
    target.setDate(target.getDate() + selectedDuration);
    const day = target.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';
    const month = target.toLocaleDateString('en-US', { month: 'long' });
    const year = target.getFullYear();
    return `${month} ${day}${daySuffix}, ${year}`;
  }, [selectedDuration, isCustomDuration, customDate]);

  const activeRepaymentAmount = useDifferentAmount ? customRepaymentAmount : principalAmount;

  const handleContinue = () => {
    onContinue({
      repaymentAmount: activeRepaymentAmount,
      durationDays: isCustomDuration ? 30 : selectedDuration,
      dueDate: calculatedDueDate,
      interestApplies,
      interestType: interestApplies ? interestType : undefined,
      interestRate: interestApplies ? interestRate : undefined,
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
        <div className="w-full max-w-2xl mx-auto px-6 pt-5 pb-12 flex flex-col gap-6">
          {/* Repayment Amount Section matching Screenshot 4 */}
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
                className={`flex-1 text-sm font-bold outline-none bg-transparent ${
                  useDifferentAmount ? 'text-slate-900' : 'text-slate-500 cursor-not-allowed'
                }`}
              />
            </div>

            {/* Checkbox: "Use a different repayment amount" */}
            <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useDifferentAmount}
                onChange={(e) => setUseDifferentAmount(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="text-xs text-slate-700 font-medium">
                Use a different repayment amount
              </span>
            </label>
          </div>

          {/* Duration Pills Section matching Screenshot 4 */}
          <div className="flex flex-col gap-2.5">
            <label className="block text-[11px] font-semibold text-slate-600">
              When should the repayment be completed?
            </label>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
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
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
                onClick={() => setIsCustomDuration(true)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCustomDuration
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Dynamic Due Date Display */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-1">
              <span className="text-slate-400 font-normal">Due by</span>
              <span className="text-slate-900 font-bold">{calculatedDueDate}</span>
            </div>
          </div>

          {/* Interest Toggle Section matching Screenshot 4 */}
          <div className="flex flex-col gap-2.5">
            <label className="block text-[11px] font-semibold text-slate-600">
              Will interest apply?
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInterestApplies(false)}
                className={`h-12 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  !interestApplies
                    ? 'border-2 border-blue-600 bg-white text-blue-700 shadow-2xs ring-2 ring-blue-50'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                No
              </button>

              <button
                type="button"
                onClick={() => setInterestApplies(true)}
                className={`h-12 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  interestApplies
                    ? 'border-2 border-blue-600 bg-white text-blue-700 shadow-2xs ring-2 ring-blue-50'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                Yes
              </button>
            </div>

            {/* Interest Options when "Yes" is selected */}
            {interestApplies && (
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 flex flex-col gap-3 mt-1 animate-in fade-in duration-150">
                <label className="block text-[11px] font-semibold text-slate-700">
                  Interest Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Monthly %', 'Annual %', 'Fixed Sum'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setInterestType(t)}
                      className={`py-2 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer text-center ${
                        interestType === t
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1">
                    <label className="block text-[10px] font-medium text-slate-500 mb-1">
                      {interestType === 'Fixed Sum' ? 'Additional Amount (₹)' : 'Rate (%)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="flex-1 text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Total Payable</span>
                    <span className="text-base font-extrabold text-slate-900 font-tabular">
                      ₹
                      {interestType === 'Fixed Sum'
                        ? (activeRepaymentAmount + interestRate).toLocaleString()
                        : Math.round(activeRepaymentAmount * (1 + interestRate / 100)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Continue Action Button */}
      <div className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-2xl mx-auto px-6 pb-6 pt-4 flex justify-end">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto sm:px-10 h-[48px] rounded-[16px] font-semibold text-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

