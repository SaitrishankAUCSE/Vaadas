import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Wifi, Signal, ChevronDown, Check } from 'lucide-react';
import { ScreenType } from '../types';

interface DeviceWrapperProps {
  children: React.ReactNode;
  currentScreen?: ScreenType;
  onNavigateScreen?: (screen: ScreenType) => void;
}

export const DeviceWrapper: React.FC<DeviceWrapperProps> = ({
  children,
  currentScreen = 'home',
  onNavigateScreen,
}) => {
  const [useDeviceFrame, setUseDeviceFrame] = useState<boolean>(true);
  const [showQuickJump, setShowQuickJump] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const isBlueScreen = currentScreen === 'splash';

  const screens: Array<{ id: ScreenType; label: string; group: string }> = [
    { id: 'splash', label: 'Splash Screen (3 Dots)', group: 'Auth' },
    { id: 'onboarding', label: 'Onboarding Walkthrough', group: 'Auth' },
    { id: 'login', label: 'Login Screen', group: 'Auth' },
    { id: 'otp', label: 'OTP Verification Screen', group: 'Auth' },
    { id: 'home', label: 'Home Dashboard', group: 'Core' },
    { id: 'vaadas', label: 'Vaadas Directory', group: 'Core' },
    { id: 'alerts', label: 'Alerts & Actions', group: 'Core' },
    { id: 'profile', label: 'User Profile', group: 'Core' },
    { id: 'edit-profile', label: 'Personal Information (Edit)', group: 'Profile' },
    { id: 'create-vaada', label: 'Create Vaada (4 Categories)', group: 'Creation' },
    { id: 'bm-parties', label: 'Borrowed Money Parties', group: 'Creation' },
    { id: 'pp-parties', label: 'Payment Promise Parties', group: 'Creation' },
    { id: 'ag-parties', label: 'Advance Given Parties', group: 'Creation' },
    { id: 'sa-parties', label: 'Service Agreement Parties', group: 'Creation' },
    { id: 'bm-active-overview', label: 'Active Vaada (Borrower/Lender)', group: 'Repayment' },
    { id: 'bm-record-repayment', label: 'Record Repayment (with OTP)', group: 'Repayment' },
    { id: 'bm-review-repayment', label: 'Review Repayment (with OTP)', group: 'Repayment' },
    { id: 'cp-review', label: 'Counterparty Acceptance', group: 'Review' },
  ];

  const handleJump = (screenId: ScreenType) => {
    setShowQuickJump(false);
    if (onNavigateScreen) {
      onNavigateScreen(screenId);
    } else {
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: screenId }));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f1f3f5] text-slate-800 flex flex-col justify-center items-center relative overflow-x-hidden p-0 sm:py-8 font-sans">
      {/* Desktop Stage Presentation Header */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-4xl px-4 mb-4 z-40 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
          <span className="text-xs font-bold tracking-tight text-slate-900 uppercase">
            Noted
          </span>
          <span className="text-xs text-slate-500 font-medium">
            • Peer-to-Peer Commitment System
          </span>
        </div>

        {/* Presentation Controls: Quick Jump & Frame Toggle */}
        <div className="flex items-center gap-2 relative">
          {/* Quick Screen Jump Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowQuickJump(!showQuickJump)}
              className="h-8 px-3 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span className="text-slate-400 font-normal">View:</span>
              <span>{screens.find((s) => s.id === currentScreen)?.label || currentScreen}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showQuickJump && (
              <div className="absolute right-0 top-10 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 flex flex-col gap-1 max-h-96 overflow-y-auto animate-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Screen to Preview
                </div>
                {screens.map((screen) => {
                  const isActive = currentScreen === screen.id;
                  return (
                    <button
                      key={screen.id}
                      onClick={() => handleJump(screen.id)}
                      className={`w-full px-2.5 py-1.5 text-left rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{screen.label}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Toggle Device Frame vs Fullscreen */}
          <button
            onClick={() => setUseDeviceFrame(!useDeviceFrame)}
            className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            title="Toggle Device Frame"
          >
            {useDeviceFrame ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[11px] font-medium hidden md:inline">iPhone View</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[11px] font-medium hidden md:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      {useDeviceFrame ? (
        <div className="relative select-none flex justify-center items-center">
          {/* Physical Phone Hardware Outer Buttons */}
          <div className="hidden sm:block absolute -left-[13px] top-[115px] w-[3px] h-[26px] bg-slate-700 rounded-l-sm" />
          <div className="hidden sm:block absolute -left-[13px] top-[155px] w-[3px] h-[48px] bg-slate-700 rounded-l-sm" />
          <div className="hidden sm:block absolute -left-[13px] top-[215px] w-[3px] h-[48px] bg-slate-700 rounded-l-sm" />
          <div className="hidden sm:block absolute -right-[13px] top-[170px] w-[3px] h-[75px] bg-slate-700 rounded-r-sm" />

          {/* Titanium Device Chassis */}
          <div className="w-full sm:w-[412px] h-screen sm:h-[846px] bg-white sm:rounded-[52px] sm:border-[10px] sm:border-[#1e293b] sm:ring-1 sm:ring-slate-900/30 sm:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22)] relative flex flex-col overflow-hidden">
            {/* Live iOS Status Bar & Dynamic Island */}
            <div
              className={`h-11 flex items-center justify-between px-7 pt-1 shrink-0 z-30 select-none transition-colors duration-300 ${
                isBlueScreen ? 'bg-[#1d4ed8]' : 'bg-white'
              }`}
            >
              {/* Clock */}
              <span
                className={`text-xs font-semibold tracking-tight font-mono w-14 transition-colors duration-300 ${
                  isBlueScreen ? 'text-white' : 'text-slate-900'
                }`}
              >
                {currentTime}
              </span>

              {/* Dynamic Island pill */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2.5 gap-1.5 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>

              {/* Status Icons: Signal, Wifi, Battery */}
              <div
                className={`flex items-center gap-1.5 w-14 justify-end transition-colors duration-300 ${
                  isBlueScreen ? 'text-white' : 'text-slate-900'
                }`}
              >
                <Signal className="w-3 h-3 stroke-[2.2]" />
                <Wifi className="w-3 h-3 stroke-[2.2]" />
                <div
                  className={`w-5 h-2.5 rounded-[4px] border p-[1px] flex items-center transition-colors duration-300 ${
                    isBlueScreen ? 'border-white' : 'border-slate-900'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-[2px] transition-colors duration-300 ${
                      isBlueScreen ? 'bg-white' : 'bg-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* App Screen Content Canvas */}
            <div
              className={`flex-1 flex flex-col relative overflow-hidden transition-colors duration-300 ${
                isBlueScreen ? 'bg-[#1d4ed8]' : 'bg-white'
              }`}
            >
              {children}
            </div>

            {/* iOS Bottom Home Swipe Indicator */}
            <div
              className={`h-4 flex items-center justify-center shrink-0 z-30 select-none transition-colors duration-300 ${
                isBlueScreen ? 'bg-[#1d4ed8]' : 'bg-white'
              }`}
            >
              <div
                className={`w-32 h-1 rounded-full transition-colors duration-300 ${
                  isBlueScreen ? 'bg-white/40' : 'bg-slate-300'
                }`}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Fullscreen View Mode */
        <div className="w-full max-w-[420px] h-screen bg-white relative flex flex-col overflow-hidden sm:border sm:border-slate-200 sm:rounded-2xl sm:shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};
