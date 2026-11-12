import React, { useState } from 'react';
import { ChevronLeft, Search, User, CheckCircle2 } from 'lucide-react';

interface AGPartiesScreenProps {
  onBack: () => void;
  onContinue: (data: { role: 'advance_provider' | 'advance_receiver'; counterparty: string; phone?: string }) => void;
}

export const AG_PartiesScreen: React.FC<AGPartiesScreenProps> = ({ onBack, onContinue }) => {
  const [selectedRole, setSelectedRole] = useState<'advance_provider' | 'advance_receiver' | null>(null);
  const [method, setMethod] = useState<'picker' | 'search' | 'manual'>('picker');
  const [searchQuery, setSearchQuery] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const recentUsers = [
    { name: 'Kiran Reddy', phone: '+91 97002 88412' },
    { name: 'Navya Gudimalla', phone: '+91 91823 45677' },
    { name: 'Rahul Mehta', phone: '+91 98450 11203' },
  ];

  const filteredUsers = recentUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.phone.includes(searchQuery)
  );

  const isPersonValid =
    method === 'picker' ||
    (method === 'search' && (selectedUser !== null || searchQuery.trim().length >= 1)) ||
    (method === 'manual' && manualName.trim().length >= 1);

  const canContinue = selectedRole !== null && isPersonValid;

  const handleContinue = () => {
    if (!canContinue || !selectedRole) return;
    const name =
      method === 'search'
        ? selectedUser || searchQuery || 'Kiran Reddy'
        : method === 'manual'
        ? manualName || 'Kiran Reddy'
        : 'Kiran Reddy';
    onContinue({
      role: selectedRole,
      counterparty: name,
      phone: manualPhone || '+91 97002 88412',
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar select-none animate-in fade-in duration-200 justify-between pb-6">
      <div className="flex flex-col">
        {/* Top Header matching Figma strictly: < Advance Given */}
        <div className="px-6 pt-6 pb-2 bg-white flex flex-col">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer -ml-1 w-fit py-1"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" strokeWidth={2.5} />
            <span className="text-xs font-semibold text-slate-700">Advance Given</span>
          </button>

          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug mt-3">
            Parties
          </h1>

          <p className="text-[13px] text-slate-600 font-normal leading-tight mt-3">
            Who are you in this Commitment?
          </p>
        </div>

        {/* Role Selection Cards Container */}
        <div className="px-6 pt-3 flex flex-col gap-3">
          {/* Card 1: Advance Provider - Party A */}
          <div
            onClick={() => setSelectedRole('advance_provider')}
            className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col ${
              selectedRole === 'advance_provider'
                ? 'border-2 border-blue-600 bg-white ring-2 ring-blue-100 shadow-2xs'
                : 'border-slate-200/90 bg-white hover:border-slate-300'
            }`}
          >
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              I gave the advance
            </h3>
            <span
              className={`text-[11px] font-medium mt-1 leading-tight ${
                selectedRole === 'advance_provider' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              Advance Provider · Party A
            </span>
          </div>

          {/* Card 2: Advance Receiver - Party B */}
          <div
            onClick={() => setSelectedRole('advance_receiver')}
            className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col ${
              selectedRole === 'advance_receiver'
                ? 'border-2 border-blue-600 bg-white ring-2 ring-blue-100 shadow-2xs'
                : 'border-slate-200/90 bg-white hover:border-slate-300'
            }`}
          >
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              I received the advance
            </h3>
            <span
              className={`text-[11px] font-medium mt-1 leading-tight ${
                selectedRole === 'advance_receiver' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              Advance Receiver · Party B
            </span>
          </div>
        </div>

        {/* "Who is the other person?" Section */}
        {selectedRole !== null && (
          <div className="px-6 pt-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              Who is the other person?
            </h2>

            {/* Sub-view 1: Picker with 2 options matching Figma wireframe */}
            {method === 'picker' && (
              <div className="flex flex-col gap-2.5">
                {/* Option 1: Search Noted User */}
                <div
                  onClick={() => setMethod('search')}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50 transition-all flex items-center gap-3.5 cursor-pointer shadow-2xs"
                >
                  <Search className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={2} />
                  <span className="text-xs font-semibold text-slate-800">
                    Search Noted User
                  </span>
                </div>

                {/* Option 2: Add Manually */}
                <div
                  onClick={() => setMethod('manual')}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50 transition-all flex items-center gap-3.5 cursor-pointer shadow-2xs"
                >
                  <User className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={2} />
                  <span className="text-xs font-semibold text-slate-800">
                    Add Manually
                  </span>
                </div>
              </div>
            )}

            {/* Sub-view 2: Search Noted User */}
            {method === 'search' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col gap-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setMethod('picker');
                      setSelectedUser(null);
                    }}
                    className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Change method
                  </button>
                  {selectedUser && (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Selected
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or mobile number"
                    value={selectedUser || searchQuery}
                    onChange={(e) => {
                      setSelectedUser(null);
                      setSearchQuery(e.target.value);
                    }}
                    className="w-full text-xs font-normal px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    autoFocus
                  />
                </div>

                {/* Quick suggestions if user is searching */}
                {!selectedUser && searchQuery && filteredUsers.length > 0 && (
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                    {filteredUsers.map((u) => (
                      <div
                        key={u.name}
                        onClick={() => setSelectedUser(u.name)}
                        className="p-2 rounded-lg hover:bg-blue-50 flex items-center justify-between text-xs cursor-pointer transition-colors"
                      >
                        <span className="font-semibold text-slate-800">{u.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{u.phone}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sub-view 3: Add Manually */}
            {method === 'manual' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col gap-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setMethod('picker')}
                    className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Change method
                  </button>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    autoFocus
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter mobile number"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Continue Button */}
      <div className="px-6 pt-4 bg-white w-full">
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full h-[48px] rounded-[16px] font-medium text-xs transition-all duration-200 flex items-center justify-center select-none ${
            canContinue
              ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 cursor-pointer font-semibold'
              : 'bg-[#f1f3f6] text-[#94a3b8] cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

