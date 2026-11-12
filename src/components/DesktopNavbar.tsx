import React from 'react';
import { Shield, Home, FileText, Bell, User, Plus, Search, CheckCircle2, LogOut } from 'lucide-react';
import { ScreenType } from '../types';

interface DesktopNavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenCreate: () => void;
  badgeCount?: number;
  userName?: string;
  onLogout?: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenCreate,
  badgeCount = 0,
  userName = 'Appi Gudimalla',
  onLogout,
}) => {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AG';

  const navItems: { screen: ScreenType; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      screen: 'home',
      label: 'Dashboard',
      icon: <Home className="w-4 h-4" strokeWidth={2} />,
    },
    {
      screen: 'vaadas',
      label: 'All Vaadas',
      icon: <FileText className="w-4 h-4" strokeWidth={2} />,
    },
    {
      screen: 'alerts',
      label: 'Alerts',
      icon: <Bell className="w-4 h-4" strokeWidth={2} />,
      badge: badgeCount,
    },
    {
      screen: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" strokeWidth={2} />,
    },
  ];

  return (
    <header className="hidden md:block w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40 select-none shadow-2xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-600/30 group-hover:bg-blue-700 transition-colors">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                  Vaadas
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-1.5 py-0.2 rounded leading-none uppercase">
                  Verified
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-1">
                Mutual Commitments Ledger
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => onNavigate(item.screen)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-slate-100 text-blue-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-blue-600' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white leading-tight">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions & User Account */}
        <div className="flex items-center gap-3">
          {/* New Vaada Primary Action Button */}
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-semibold shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Vaada</span>
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* User Account Pill */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                {userName}
              </span>
              <div className="flex items-center gap-1 leading-none mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                <span className="text-[10px] font-medium text-emerald-700">Verified</span>
              </div>
            </div>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

