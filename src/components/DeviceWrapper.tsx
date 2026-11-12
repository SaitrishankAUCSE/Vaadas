import React from 'react';
import { ScreenType } from '../types';

interface DeviceWrapperProps {
  children: React.ReactNode;
  currentScreen?: ScreenType;
  onNavigateScreen?: (screen: ScreenType) => void;
}

export const DeviceWrapper: React.FC<DeviceWrapperProps> = ({
  children,
  currentScreen = 'home',
}) => {
  const isBlueScreen = currentScreen === 'splash';

  return (
    <div
      className={`min-h-screen w-full ${
        isBlueScreen ? 'bg-[#1d4ed8]' : 'bg-[#f4f4f5]'
      } flex justify-center items-center text-slate-900 font-sans antialiased`}
    >
      {/* Responsive Web Application Container */}
      <div
        className={`w-full sm:max-w-[480px] h-[100dvh] ${
          isBlueScreen ? 'bg-[#1d4ed8]' : 'bg-white'
        } sm:border-x sm:border-slate-200/80 sm:shadow-sm relative flex flex-col overflow-hidden transition-colors duration-200`}
      >
        {children}
      </div>
    </div>
  );
};
