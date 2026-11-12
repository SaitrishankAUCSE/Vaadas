import React, { useState } from 'react';
import { Bell, X, Check, Calendar } from 'lucide-react';

interface SetReminderModalProps {
  isOpen: boolean;
  counterparty: string;
  amount: number;
  dueDate: string;
  onClose: () => void;
  onSetReminder: (data: {
    schedule: string;
    channels: string[];
    dateDisplay: string;
    message: string;
  }) => void;
}

export const SetReminderModal: React.FC<SetReminderModalProps> = ({
  isOpen,
  counterparty,
  amount,
  dueDate,
  onClose,
  onSetReminder,
}) => {
  const [schedule, setSchedule] = useState<'3_days' | 'due_date' | 'immediate'>('3_days');
  const [channels, setChannels] = useState<{ sms: boolean; whatsapp: boolean }>({
    sms: true,
    whatsapp: true,
  });

  if (!isOpen) return null;

  const defaultMessage = `Payment reminder: ₹${amount.toLocaleString()} due on ${dueDate} for Vaada commitment with ${counterparty}.`;

  const getScheduleLabel = () => {
    switch (schedule) {
      case 'immediate':
        return 'Send immediately';
      case '3_days':
        return '3 days before due date';
      case 'due_date':
        return `On due date (${dueDate})`;
    }
  };

  const handleSave = () => {
    const selectedChannels: string[] = [];
    if (channels.sms) selectedChannels.push('SMS');
    if (channels.whatsapp) selectedChannels.push('WhatsApp');

    onSetReminder({
      schedule,
      channels: selectedChannels.length > 0 ? selectedChannels : ['SMS'],
      dateDisplay: getScheduleLabel(),
      message: defaultMessage,
    });
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px] animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-5 shadow-xl max-w-sm w-full border border-slate-200 flex flex-col relative animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Payment Reminder
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Automated notification for {counterparty}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Commitment Summary Pill */}
        <div className="mt-3.5 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-normal">Amount Due</span>
            <span className="font-bold text-slate-900">₹{amount.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-normal">Due Date</span>
            <span className="font-semibold text-slate-700">{dueDate}</span>
          </div>
        </div>

        {/* Schedule Selector */}
        <div className="mt-4 flex flex-col gap-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Schedule
          </label>

          <div className="flex flex-col gap-1.5 text-xs">
            {/* Option 1: 3 Days Before */}
            <label
              onClick={() => setSchedule('3_days')}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                schedule === '3_days'
                  ? 'border-blue-600 bg-blue-50/20 text-slate-900 font-semibold'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  checked={schedule === '3_days'}
                  onChange={() => setSchedule('3_days')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>3 days before due date</span>
              </div>
              <span className="text-[10px] font-normal text-slate-400">Standard</span>
            </label>

            {/* Option 2: On Due Date */}
            <label
              onClick={() => setSchedule('due_date')}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                schedule === 'due_date'
                  ? 'border-blue-600 bg-blue-50/20 text-slate-900 font-semibold'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  checked={schedule === 'due_date'}
                  onChange={() => setSchedule('due_date')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>On due date ({dueDate})</span>
              </div>
            </label>

            {/* Option 3: Immediate */}
            <label
              onClick={() => setSchedule('immediate')}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                schedule === 'immediate'
                  ? 'border-blue-600 bg-blue-50/20 text-slate-900 font-semibold'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  checked={schedule === 'immediate'}
                  onChange={() => setSchedule('immediate')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>Send now</span>
              </div>
            </label>
          </div>
        </div>

        {/* Channels */}
        <div className="mt-4 flex flex-col gap-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Notification Channels
          </label>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <label
              onClick={() => setChannels((prev) => ({ ...prev, sms: !prev.sms }))}
              className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                channels.sms
                  ? 'border-slate-300 bg-slate-50 text-slate-900 font-medium'
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <input
                type="checkbox"
                checked={channels.sms}
                onChange={() => {}}
                className="accent-blue-600 cursor-pointer"
              />
              <span>SMS</span>
            </label>

            <label
              onClick={() => setChannels((prev) => ({ ...prev, whatsapp: !prev.whatsapp }))}
              className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                channels.whatsapp
                  ? 'border-slate-300 bg-slate-50 text-slate-900 font-medium'
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <input
                type="checkbox"
                checked={channels.whatsapp}
                onChange={() => {}}
                className="accent-blue-600 cursor-pointer"
              />
              <span>WhatsApp</span>
            </label>
          </div>
        </div>

        {/* Message Preview */}
        <div className="mt-4 flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Notice Preview
          </label>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-mono">
            "{defaultMessage}"
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={handleSave}
            className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-sm shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Save Reminder</span>
          </button>
          <button
            onClick={onClose}
            className="w-full h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-600 font-medium text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
