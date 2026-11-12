import React, { useState } from 'react';
import { ChevronLeft, Upload, FileText, CheckCircle2, Check } from 'lucide-react';

interface BMLoanDetailsProps {
  onBack: () => void;
  initialAmount?: number;
  initialDate?: string;
  onContinue: (data: {
    amount: number;
    dateGiven: string;
    paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
    transactionId?: string;
    proofAdded: boolean;
  }) => void;
}

export const BM_LoanDetailsScreen: React.FC<BMLoanDetailsProps> = ({
  onBack,
  initialAmount = 100,
  initialDate = 'Nov 12, 2026',
  onContinue,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [dateGiven, setDateGiven] = useState<string>(initialDate);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque'>('UPI');
  const [transactionId, setTransactionId] = useState<string>('4567y');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const paymentMethods: ('Cash' | 'UPI' | 'Bank Transfer' | 'Cheque')[] = [
    'Cash',
    'UPI',
    'Bank Transfer',
    'Cheque',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  const proofAdded = !!(uploadedFile || transactionId.trim().length > 0 || paymentMethod === 'Cash');

  const canContinue = amount > 0 && proofAdded;

  const handleContinue = () => {
    if (!canContinue) return;
    onContinue({
      amount,
      dateGiven,
      paymentMethod,
      transactionId: transactionId.trim() || undefined,
      proofAdded,
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
              Loan Details
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-1">
              Tell us about the money involved.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-2xl mx-auto px-6 pt-5 flex flex-col gap-5">
          {/* Amount and Date Given Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                Principal Amount
              </label>
              <div className="flex items-center h-12 rounded-xl border border-slate-200 bg-white px-3.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-2xs">
                <span className="text-sm font-bold text-slate-700 mr-2">₹</span>
                <input
                  type="number"
                  min="1"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="e.g. 100"
                  className="flex-1 text-sm font-bold text-slate-900 outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                Date Given
              </label>
              <div className="flex items-center h-12 rounded-xl border border-slate-200 bg-white px-3.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-2xs">
                <input
                  type="text"
                  value={dateGiven}
                  onChange={(e) => setDateGiven(e.target.value)}
                  className="flex-1 text-xs font-medium text-slate-900 outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section matching Screenshot 2 */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const isSelected = paymentMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`h-12 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'border-2 border-blue-600 bg-white text-blue-700 shadow-2xs ring-2 ring-blue-50'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Proof Section matching Screenshot 2 */}
          <div className="flex flex-col gap-3 pt-1">
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                Payment Proof
              </h3>
              <p className="text-[11px] text-slate-500 font-normal leading-relaxed mt-1">
                For UPI, Bank Transfer, and Cheque payments, either a transaction ID or supporting proof is required.
              </p>
            </div>

            {/* Upload Proof Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Upload className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Upload Proof of Transfer
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                    Screenshot, receipt, or bank slip
                  </p>
                </div>
              </div>

              <label className="w-full border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 rounded-xl py-3 px-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-[11px] font-medium text-slate-600">
                  {uploadedFile ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{uploadedFile}</span>
                    </span>
                  ) : (
                    'Tap to upload • PNG, JPG or PDF'
                  )}
                </span>
              </label>
            </div>

            {/* Divider "or" */}
            <div className="flex items-center gap-3 my-0.5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-medium text-slate-400">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Transaction ID Input Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Transaction ID
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                    UPI ref, IMPS/NEFT/RTGS number, etc.
                  </p>
                </div>
              </div>

              <input
                type="text"
                placeholder="e.g. 4567y or UPI Ref #"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Dynamic Loan Summary Card matching Screenshot 3 */}
          {proofAdded && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                Loan Summary
              </h3>

              <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal text-[11px]">Amount</span>
                  <span className="font-bold text-slate-900 font-tabular">₹{amount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal text-[11px]">Given on</span>
                  <span className="font-semibold text-slate-800 text-[11px]">{dateGiven}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal text-[11px]">Payment via</span>
                  <span className="font-semibold text-slate-800 text-[11px]">{paymentMethod}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal text-[11px]">Proof</span>
                  <span className="font-bold text-emerald-600 text-[11px]">Added</span>
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
