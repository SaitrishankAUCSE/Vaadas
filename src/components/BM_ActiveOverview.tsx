import React, { useState } from 'react';
import { ChevronLeft, Shield, Copy, Check, Clock, AlertTriangle, FileText, ChevronDown, ChevronUp, CheckCircle2, Bell, Smartphone, Send } from 'lucide-react';
import { VaadaItem } from '../types';
import { SetReminderModal } from './SetReminderModal';

interface BMActiveOverviewProps {
  vaada: VaadaItem;
  role?: 'borrower' | 'lender';
  onBack: () => void;
  onRecordRepayment: () => void;
  onRequestExtension?: () => void;
  onSendReminder?: () => void;
  onViewTimeline: () => void;
}

export const BM_ActiveOverview: React.FC<BMActiveOverviewProps> = ({
  vaada,
  role = 'borrower',
  onBack,
  onRecordRepayment,
  onRequestExtension,
  onSendReminder,
  onViewTimeline,
}) => {
  const [copied, setCopied] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [activeReminder, setActiveReminder] = useState<{
    schedule: string;
    channels: string[];
    dateDisplay: string;
    message: string;
  } | null>(null);
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  const isOverdue = vaada.status === 'overdue';
  const isCompleted = vaada.status === 'completed' || vaada.status === 'closed';

  const copyId = () => {
    navigator.clipboard?.writeText(vaada.vaadaId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenSetReminder = () => {
    setShowReminderModal(true);
  };

  const handleSaveReminder = (data: {
    schedule: string;
    channels: string[];
    dateDisplay: string;
    message: string;
  }) => {
    setActiveReminder(data);
    setShowReminderModal(false);
    onSendReminder?.();
    setReminderToast(
      data.schedule === 'immediate'
        ? `Reminder Delivered — Notification sent to ${vaada.counterparty} via ${data.channels.join(' & ')}.`
        : `Reminder Scheduled — Automated reminder set for ${data.dateDisplay} via ${data.channels.join(' & ')}.`
    );
    setTimeout(() => setReminderToast(null), 5000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-8 select-none animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-700 hover:text-slate-900 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-slate-900">
            {isCompleted ? 'Vaada Details' : 'Active Vaada'}
          </h1>
          <p className="text-[10px] text-slate-400">{vaada.category}</p>
        </div>
        <Shield className="w-5 h-5 text-blue-600" />
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Vaada ID Strip with Copy Button */}
        <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-slate-500">ID: {vaada.vaadaId}</span>
            <button
              onClick={copyId}
              className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
              title="Copy ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
              isCompleted
                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                : isOverdue
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            <span>
              {isCompleted ? 'Settled & Closed' : isOverdue ? 'Overdue · 3 Days' : 'Active'}
            </span>
          </span>
        </div>

        {/* Repayment Countdown / Overdue / Settled Card */}
        {isCompleted ? (
          <div className="rounded-2xl p-4 border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold">Settled & Closed</h4>
                <p className="text-[10px] opacity-80 mt-0.5">Completed on {vaada.dueDate}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Full Settlement
            </span>
          </div>
        ) : (
          <div
            className={`rounded-2xl p-4 border flex items-center justify-between ${
              isOverdue
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {isOverdue ? (
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
              ) : (
                <Clock className="w-6 h-6 text-amber-600 shrink-0" />
              )}
              <div>
                <h4 className="text-xs font-bold">
                  {isOverdue ? 'Repayment Overdue by 3 Days' : '14 Days Remaining'}
                </h4>
                <p className="text-[10px] opacity-80 mt-0.5">Due date: {vaada.dueDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reminder confirmation toast / banner */}
        {reminderToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{reminderToast}</span>
          </div>
        )}

        {/* Active Scheduled Reminder Card */}
        {activeReminder && !reminderToast && (
          <div className="p-3.5 bg-blue-50/70 border border-blue-200/90 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bell className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Reminder Active
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {activeReminder.dateDisplay}
                </span>
                <span className="text-[10px] text-slate-500 capitalize">
                  via {activeReminder.channels.join(' & ')}
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenSetReminder}
              className="text-xs font-semibold text-blue-600 hover:underline px-2 py-1 rounded-lg hover:bg-blue-100/50 transition-colors cursor-pointer"
            >
              Modify
            </button>
          </div>
        )}

        {/* Hero Summary Card (Solid Slate-900, Clean Institutional) */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {isCompleted ? 'Settled Commitment' : 'Active Commitment'}
            </span>
            <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full text-slate-300">
              Verified Log
            </span>
          </div>
          <div className="text-2xl font-black text-white font-tabular">₹{vaada.amount.toLocaleString()}</div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {isCompleted
              ? `Commitment with ${vaada.counterparty} settled and closed on ${vaada.dueDate}.`
              : role === 'borrower'
              ? `Borrowed from ${vaada.counterparty}. Settlement due ${vaada.dueDate}.`
              : `Lent to ${vaada.counterparty}. Awaiting repayment confirmation.`}
          </p>
        </div>

        {/* Key Terms Chips Row */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Terms</h4>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[125px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">
                {vaada.category === 'Advance Given'
                  ? 'Advance Amount'
                  : vaada.category === 'Service Agreement'
                  ? 'Contract Value'
                  : 'Principal Amount'}
              </span>
              <span className="text-base font-extrabold text-slate-900 font-tabular">₹{vaada.amount.toLocaleString()}</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[125px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">
                {isCompleted ? 'Completion Date' : 'Repayment Due'}
              </span>
              <span className="text-sm font-bold text-slate-800">{vaada.dueDate}</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 min-w-[110px] shrink-0 shadow-2xs">
              <span className="text-xs text-slate-400 block font-medium">Interest</span>
              <span className="text-sm font-bold text-emerald-600">0% (Nil)</span>
            </div>
          </div>
        </div>

        {/* Progress Timeline Preview */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900">Commitment Progress</h4>
            <button onClick={onViewTimeline} className="text-[11px] font-semibold text-blue-600 hover:underline">
              View Timeline →
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] relative">
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</div>
              <span className="text-slate-700 font-medium text-[9px]">Sent</span>
            </div>
            <div className="flex-1 h-0.5 bg-emerald-300 -mt-3"></div>
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</div>
              <span className="text-slate-700 font-medium text-[9px]">Accepted</span>
            </div>
            <div className="flex-1 h-0.5 bg-emerald-300 -mt-3"></div>
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</div>
              <span className="text-slate-700 font-medium text-[9px]">Active</span>
            </div>
            <div className={`flex-1 h-0.5 ${isCompleted ? 'bg-emerald-300' : 'bg-slate-200'} -mt-3`}></div>
            <div className="flex flex-col items-center gap-1 z-10">
              <div className={`w-5 h-5 rounded-full ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'} flex items-center justify-center text-[10px]`}>
                {isCompleted ? '✓' : '○'}
              </div>
              <span className={`${isCompleted ? 'text-slate-700' : 'text-slate-400'} font-medium text-[9px]`}>Repaid</span>
            </div>
            <div className={`flex-1 h-0.5 ${isCompleted ? 'bg-emerald-300' : 'bg-slate-200'} -mt-3`}></div>
            <div className="flex flex-col items-center gap-1 z-10">
              <div className={`w-5 h-5 rounded-full ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'} flex items-center justify-center text-[10px]`}>
                {isCompleted ? '✓' : '○'}
              </div>
              <span className={`${isCompleted ? 'text-slate-700' : 'text-slate-400'} font-medium text-[9px]`}>Settled</span>
            </div>
          </div>
        </div>

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
                <span className="text-slate-500">
                  {vaada.category === 'Advance Given'
                    ? 'Party A (Advance Provider):'
                    : vaada.category === 'Service Agreement'
                    ? 'Party A (Client):'
                    : 'Party A (Lender):'}
                </span>
                <span className="font-semibold text-slate-800">
                  {role === 'borrower' ? vaada.counterparty : 'Appa Rao Gudimalla'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">
                  {vaada.category === 'Advance Given'
                    ? 'Party B (Advance Recipient):'
                    : vaada.category === 'Service Agreement'
                    ? 'Party B (Service Provider):'
                    : 'Party B (Borrower):'}
                </span>
                <span className="font-semibold text-slate-800">
                  {role === 'borrower' ? 'Appa Rao Gudimalla' : vaada.counterparty}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Supporting Documents Accordion */}
        <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <button
            onClick={() => setDocsOpen(!docsOpen)}
            className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-slate-800"
          >
            <span>Supporting Documents (2)</span>
            {docsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {docsOpen && (
            <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    {vaada.category === 'Advance Given'
                      ? 'Advance_Disbursement_Receipt.pdf'
                      : vaada.category === 'Service Agreement'
                      ? 'Service_Contract.pdf'
                      : 'Transfer_Receipt.pdf'}
                  </span>
                </div>
                <button className="text-xs text-blue-600 font-semibold hover:underline">View</button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    {vaada.category === 'Advance Given'
                      ? 'Terms_and_Conditions.pdf'
                      : vaada.category === 'Service Agreement'
                      ? 'Completion_Certificate.pdf'
                      : 'Loan_Agreement.pdf'}
                  </span>
                </div>
                <button className="text-xs text-blue-600 font-semibold hover:underline">View</button>
              </div>
            </div>
          )}
        </div>

        {/* Role-Dependent Bottom Actions */}
        <div className="flex flex-col gap-2.5 pt-2">
          {isCompleted ? (
            <>
              <button
                onClick={onViewTimeline}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Digital Timeline Proof</span>
              </button>
              <button
                onClick={onBack}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
              >
                <span>Back to Vaadas</span>
              </button>
            </>
          ) : role === 'borrower' ? (
            <>
              <button
                onClick={onRecordRepayment}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Record Repayment</span>
              </button>
              <button
                onClick={handleOpenSetReminder}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Bell className="w-3.5 h-3.5 text-blue-600 stroke-[2]" />
                <span>{activeReminder ? 'Manage Payment Reminder' : 'Set Payment Reminder'}</span>
              </button>
              {onRequestExtension && (
                <button
                  onClick={onRequestExtension}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center justify-center cursor-pointer"
                >
                  <span>Request Extension</span>
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleOpenSetReminder}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4 stroke-[2.2]" />
                <span>{activeReminder ? 'Manage / Set Reminder' : 'Set Payment Reminder'}</span>
              </button>
              <button
                onClick={onViewTimeline}
                className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center justify-center cursor-pointer"
              >
                <span>View Timeline</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Set Payment Reminder Modal */}
      <SetReminderModal
        isOpen={showReminderModal}
        counterparty={vaada.counterparty}
        amount={vaada.amount}
        dueDate={vaada.dueDate}
        onClose={() => setShowReminderModal(false)}
        onSetReminder={handleSaveReminder}
      />
    </div>
  );
};

