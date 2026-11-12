import React, { useState } from 'react';
import { ChevronLeft, Camera, Check, Info, ChevronDown } from 'lucide-react';

interface EditProfileScreenProps {
  initialFirstName?: string;
  initialLastName?: string;
  initialPhone?: string;
  onBack: () => void;
  onSave: (data: { firstName: string; lastName: string }) => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  initialFirstName = 'Appi',
  initialLastName = 'Gudimalla',
  initialPhone = '+91 ******8745',
  onBack,
  onSave,
}) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [dob, setDob] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const states = [
    'Andhra Pradesh',
    'Telangana',
    'Karnataka',
    'Maharashtra',
    'Tamil Nadu',
    'Delhi',
    'Gujarat',
    'Kerala',
    'West Bengal',
    'Uttar Pradesh',
  ];

  const handleSave = () => {
    setIsSaved(true);
    onSave({ firstName, lastName });
    setTimeout(() => {
      onBack();
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-8 select-none animate-in fade-in duration-200 justify-between">
      <div className="flex flex-col">
        {/* Top Header strictly matching Figma: < Profile */}
        <div className="px-6 pt-6 pb-2 bg-white flex flex-col">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer -ml-1 w-fit py-1"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" strokeWidth={2.5} />
            <span className="text-xs font-semibold text-slate-700">Profile</span>
          </button>

          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug mt-2.5">
            Personal Information
          </h1>
        </div>

        <div className="px-6 flex flex-col gap-5 pt-2">
          {/* ========================================================= */}
          {/* SECTION 1: PERSONAL DETAILS                                 */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              PERSONAL DETAILS
            </span>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3.5">
              {/* Profile Photo Row */}
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm">
                    {firstName.charAt(0)}
                    {lastName.charAt(0)}
                  </div>
                  <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center absolute -bottom-0.5 -right-0.5 shadow-xs cursor-pointer">
                    <Camera className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-700 leading-tight">
                    Profile Photo
                  </span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer w-fit mt-1 leading-tight text-left"
                  >
                    Change Photo
                  </button>
                </div>
              </div>

              {/* First Name & Last Name (2 columns) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Mobile Number
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs font-semibold text-slate-800 font-mono">
                    {initialPhone}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/90 rounded-md px-2 py-0.5 leading-tight flex items-center gap-1">
                    <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                    <span>Verified</span>
                  </span>
                </div>
                <span className="block text-[10px] text-slate-400 font-normal mt-1">
                  Cannot be changed once verified.
                </span>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Date of Birth
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 2: ADDRESS DETAILS                                */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              ADDRESS DETAILS
            </span>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3.5">
              {/* Address Line 1 */}
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  placeholder="House / Flat / Building no."
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Address Line 2 (Optional) */}
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Street / Area / Locality"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* City & PIN Code (2 columns) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="6-digit PIN"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  State
                </label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs font-normal px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer pr-9"
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none stroke-[2]" />
                </div>
              </div>
            </div>
          </div>

          {/* Info Note Callout strictly matching Figma */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3.5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[2]" />
            <p className="text-[11px] text-blue-900/90 leading-relaxed font-normal">
              Your personal information is used to identify you on Vaadas. Address information remains private unless required for future services.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Buttons strictly matching Figma */}
      <div className="px-6 pt-6 pb-2 bg-white flex flex-col gap-2.5 w-full">
        {/* Primary Save Changes Button */}
        <button
          type="button"
          onClick={handleSave}
          className={`w-full h-[48px] rounded-[16px] font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 select-none cursor-pointer ${
            isSaved
              ? 'bg-[#00a63e] hover:bg-[#009638] active:scale-[0.99] text-white shadow-sm'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-white stroke-[2.5]" />
              <span>Saved</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>

        {/* Secondary Cancel Button */}
        <button
          type="button"
          onClick={onBack}
          className="w-full h-[48px] rounded-[16px] border border-slate-200/90 bg-white hover:bg-slate-50/80 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center cursor-pointer transition-all shadow-2xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

