import React from 'react';
import { ArrowLeft, Check, Clock, AlertTriangle, ShieldCheck, Share2, Download } from 'lucide-react';
import { VaadaItem } from '../types';

interface VaadaTimelineModalProps {
  vaada: VaadaItem | null;
  onClose: () => void;
  onViewDetails?: (vaada: VaadaItem) => void;
}

export const VaadaTimelineModal: React.FC<VaadaTimelineModalProps> = ({
  vaada,
  onClose,
  onViewDetails,
}) => {
  if (!vaada) return null;

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Top Header */}
      <div className="w-full border-b border-slate-100 bg-white shrink-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={onClose}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-bold text-slate-900">Vaada Timeline</h1>
          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-1 hover:text-slate-700 cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Scrollable Timeline Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 bg-white">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        {/* Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-500">{vaada.category}</span>
            <span className="text-[10px] font-mono text-slate-400">ID: {vaada.vaadaId}</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">{vaada.counterparty}</div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Principal Amount</span>
              <span className="text-lg font-bold text-blue-600">₹{vaada.amount.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Due Date</span>
              <span className="text-xs font-semibold text-slate-700">{vaada.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Timeline Event History */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Event History
          </h2>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {(vaada.timeline || []).map((step, idx) => (
              <div key={idx} className="relative">
                {/* Node indicator */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                    step.completed
                      ? 'bg-emerald-500 text-white'
                      : step.active
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {step.completed ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : step.active ? (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  )}
                </div>

                {/* Event info */}
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-bold ${
                        step.completed || step.active ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {step.timestamp}
                    </span>
                  </div>

                  {step.description && (
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Legal Evidentiary Badge */}
        <div className="mt-auto p-4 rounded-xl bg-emerald-50/90 border border-emerald-200/90 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-xs text-emerald-950">
            <span className="font-bold block text-slate-900">Legally Binding Acknowledgment</span>
            <span className="text-emerald-800 text-[11px] block mt-0.5 leading-snug">
              Mobile OTP verified under IT Act, 2000. Tamper-evident evidentiary record.
            </span>
          </div>
        </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full bg-white border-t border-slate-100 shrink-0 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-xs text-slate-700 transition-colors cursor-pointer active:scale-[0.99]"
          >
            Back
          </button>
          <button
            onClick={() => {
              if (onViewDetails) {
                onViewDetails(vaada);
              } else {
                onClose();
              }
            }}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-xs text-white transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-[0.99]"
          >
            {vaada.actionLabel || 'View Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

