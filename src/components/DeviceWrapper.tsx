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
        isBlueScreen ? 'bg-[#1d4ed8]' : 'bg-white'
      } flex flex-col text-slate-900 font-sans antialiased`}
    >
      <div className="w-full flex-1 flex flex-col relative overflow-x-hidden min-h-screen">
        {children}
      </div>
    </div>
  );
};
