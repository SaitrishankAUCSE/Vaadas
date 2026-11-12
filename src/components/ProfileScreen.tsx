import React, { useState } from 'react';
import { Shield, ChevronRight, Check, Edit2, LogOut } from 'lucide-react';
import { LegalModal, LegalDocType } from './LegalModal';

interface ProfileScreenProps {
  onLogout: () => void;
  onEditProfile: () => void;
  userName?: string;
  userPhone?: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  onEditProfile,
  userName = 'Appi Gudimalla',
  userPhone = '+91 ******8745',
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AG';

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-8 select-none animate-in fade-in duration-200 relative">
      {/* Top Header */}
      <div className="w-full bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3 flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug">
            Account & Profile Settings
          </h1>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 pt-6 pb-16 flex-1">
        {/* User Profile Card Block strictly matching Figma */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar circle */}
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
              {initials}
            </div>

            {/* User info details */}
            <div className="flex flex-col min-w-0">
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {userName}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500 font-mono leading-tight">
                  {userPhone}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/90 rounded-full px-2 py-0.5 leading-tight flex items-center gap-1">
                  <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                  <span>Verified Account</span>
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile button */}
          <button
            type="button"
            aria-label="Edit Profile"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEditProfile();
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-700 flex items-center gap-2 w-fit cursor-pointer transition-all shadow-2xs select-none"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-600 stroke-[2] pointer-events-none" />
            <span className="pointer-events-none">Edit Profile</span>
          </button>
        </div>

        {/* 2-Column Responsive Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ========================================================= */}
        {/* SECTION 1: PERSONAL INFORMATION                             */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            PERSONAL INFORMATION
          </span>

          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEditProfile();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onEditProfile();
              }
            }}
            className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3.5 cursor-pointer hover:border-slate-300 active:scale-[0.99] transition-all"
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 stroke-[2]" />
                <span className="text-xs font-bold text-slate-800">
                  Personal Information
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
            </div>

            {/* 2-Column Data Grid */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-slate-400">
                  Full Name
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {userName}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-slate-400">
                  Mobile
                </span>
                <span className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                  {userPhone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: IDENTITY VERIFICATION                           */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            IDENTITY VERIFICATION
          </span>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 stroke-[2]" />
                <span className="text-xs font-bold text-slate-800">
                  Identity Verification
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/90 rounded-full px-2 py-0.5 leading-tight flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                <span>Mobile Verified</span>
              </span>
            </div>

            {/* Explanation paragraph */}
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">
              Upgrade your identity verification to create higher-value Vaadas and build greater trust.
            </p>

            {/* Verification Levels Stack */}
            <div className="flex flex-col gap-2.5 mt-1">
              {/* Level 1: Mobile Verified */}
              <div className="bg-emerald-50/50 border border-emerald-200/90 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-emerald-700 leading-tight">
                      Level 1
                    </span>
                    <span className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
                      Mobile Verified
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 rounded-full px-2.5 py-0.5">
                  Complete
                </span>
              </div>

              {/* Level 2: Verify Aadhaar */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-center justify-between hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-dashed border-slate-400 text-slate-500 text-[11px] font-bold flex items-center justify-center shrink-0 font-mono">
                    2
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-slate-400 leading-tight">
                      Level 2
                    </span>
                    <span className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
                      Verify Aadhaar
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/90 rounded-full px-2.5 py-0.5">
                  Pending
                </span>
              </div>

              {/* Level 3: Verify PAN */}
              <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-3 flex items-center justify-between opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-dashed border-slate-300 text-slate-400 text-[11px] font-bold flex items-center justify-center shrink-0 font-mono">
                    3
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-slate-400 leading-tight">
                      Level 3
                    </span>
                    <span className="text-xs font-bold text-slate-600 leading-tight mt-0.5">
                      Verify PAN
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 rounded-full px-2.5 py-0.5">
                  Locked
                </span>
              </div>
            </div>

            {/* View Verification Status Button */}
            <button className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center mt-2 transition-all">
              View Verification Status
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Log Out Button & Legal Links                                */}
        {/* ========================================================= */}
        <div className="lg:col-span-2 pt-1 pb-4 flex flex-col gap-3">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full sm:w-auto sm:px-8 sm:mx-auto h-11 rounded-xl border border-rose-200/90 bg-white hover:bg-rose-50/50 active:scale-[0.99] text-rose-600 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Log Out</span>
          </button>

          <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-400">
            <button
              onClick={() => setLegalDoc('terms')}
              className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalDoc('privacy')}
              className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Terms of Service & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalDoc !== null}
        initialDoc={legalDoc || 'terms'}
        onClose={() => setLegalDoc(null)}
      />

      {/* Log Out Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="absolute inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-6 backdrop-blur-[2px] animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-xs w-full border border-slate-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <LogOut className="w-5 h-5 stroke-[2.2]" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Log Out
            </h3>

            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex flex-col gap-2 w-full mt-5">
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="w-full h-11 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs shadow-md shadow-rose-500/20 cursor-pointer transition-all"
              >
                Yes, Log Out
              </button>

              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
