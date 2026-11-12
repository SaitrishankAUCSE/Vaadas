import React from 'react';
import { Home, FileText, Plus, Bell, User } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenCreate: () => void;
  badgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenCreate,
  badgeCount = 0,
}) => {
  return (
    <div className="h-16 bg-white border-t border-slate-100 w-full shrink-0 select-none z-30">
      <div className="max-w-xl mx-auto h-full flex items-center justify-around px-2 relative">
        {/* Home */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors cursor-pointer ${
          currentScreen === 'home' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className={`w-5 h-5 ${currentScreen === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px]">Home</span>
      </button>

      {/* Vaadas */}
      <button
        onClick={() => onNavigate('vaadas')}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors cursor-pointer ${
          currentScreen === 'vaadas' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <FileText className={`w-5 h-5 ${currentScreen === 'vaadas' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px]">Vaadas</span>
      </button>

      {/* Central Blue Action Button (+) */}
      <div className="flex-1 flex justify-center -mt-6">
        <button
          onClick={onOpenCreate}
          aria-label="Create New Vaada"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 border-4 border-white transition-all cursor-pointer"
        >
          <Plus className="w-6 h-6 stroke-[2.8]" />
        </button>
      </div>

      {/* Alerts */}
      <button
        onClick={() => onNavigate('alerts')}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 relative transition-colors cursor-pointer ${
          currentScreen === 'alerts' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <div className="relative">
          <Bell className={`w-5 h-5 ${currentScreen === 'alerts' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          {badgeCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
              {badgeCount}
            </span>
          )}
        </div>
        <span className="text-[10px]">Alerts</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors cursor-pointer ${
          currentScreen === 'profile' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <User className={`w-5 h-5 ${currentScreen === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px]">Profile</span>
      </button>
      </div>
    </div>
  );
};
