import React, { useState } from 'react';
import { X, CreditCard, Wallet, Briefcase, PlusCircle } from 'lucide-react';
import { VaadaCategory, VaadaItem } from '../types';

interface CreateVaadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (vaada: VaadaItem) => void;
}

export const CreateVaadaModal: React.FC<CreateVaadaModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [category, setCategory] = useState<VaadaCategory>('Borrowed Money');
  const [counterparty, setCounterparty] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('Aug 30, 2026');
  const [role, setRole] = useState<'borrowed' | 'lent' | 'owe'>('lent');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterparty || !amount) return;

    const newVaada: VaadaItem = {
      id: Date.now().toString(),
      category,
      counterparty,
      amount: parseFloat(amount),
      dueDate,
      role,
      status: 'pending',
      statusLabel: 'Pending Acceptance',
      statusColor: 'amber',
      actionLabel: 'Review',
      actionVariant: 'primary',
      vaadaId: `2608${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
      timeline: [
        { title: 'Vaada Created', timestamp: 'Just now', completed: true },
        { title: 'Sent for Review', timestamp: 'Pending Acceptance', completed: false, active: true },
        { title: 'Activation', timestamp: 'Pending', completed: false },
        { title: 'Settlement', timestamp: 'Pending', completed: false }
      ]
    };

    onCreate(newVaada);
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[32px] p-6 flex flex-col max-h-[90%] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Create New Vaada</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Category Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-2 block">
              Commitment Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Borrowed Money', 'Payment Promise', 'Service Agreement', 'Custom'] as VaadaCategory[]).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                    category === cat
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'Borrowed Money' && <CreditCard className="w-3.5 h-3.5" />}
                  {cat === 'Payment Promise' && <Wallet className="w-3.5 h-3.5" />}
                  {cat === 'Service Agreement' && <Briefcase className="w-3.5 h-3.5" />}
                  {cat === 'Custom' && <PlusCircle className="w-3.5 h-3.5" />}
                  <span className="truncate">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Counterparty Name */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">
              With Whom (Name)
            </label>
            <input
              type="text"
              placeholder="e.g. Navya Gudimalla"
              value={counterparty}
              onChange={(e) => setCounterparty(e.target.value)}
              className="w-full text-xs font-medium px-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-xs font-medium px-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">
              Settlement Due Date
            </label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="e.g. Aug 30, 2026"
              className="w-full text-xs font-medium px-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 active:scale-[0.99]"
          >
            Create & Send Vaada
          </button>
        </form>
      </div>
    </div>
  );
};

