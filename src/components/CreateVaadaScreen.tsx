import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Coins, Briefcase } from 'lucide-react';
import { VaadaCategory } from '../types';

interface CreateVaadaScreenProps {
  onBack: () => void;
  onSelectCategory: (category: VaadaCategory) => void;
}

export const CreateVaadaScreen: React.FC<CreateVaadaScreenProps> = ({ onBack, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<VaadaCategory | null>(null);

  const categories = [
    {
      id: 'Borrowed Money' as VaadaCategory,
      title: 'Borrowed Money',
      subtitle: 'Friend loan • Family loan • Emergency borrowing',
      renderIcon: (isSelected: boolean) => (
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <span className="text-lg font-bold leading-none">₹</span>
        </div>
      ),
    },
    {
      id: 'Payment Promise' as VaadaCategory,
      title: 'Payment Promise',
      subtitle: 'Pending payment • Salary dues • Shop balance',
      renderIcon: (isSelected: boolean) => (
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <CreditCard className="w-5 h-5 stroke-[1.8]" />
        </div>
      ),
    },
    {
      id: 'Advance Given' as VaadaCategory,
      title: 'Advance Given',
      subtitle: 'Booking amount • Work advance • Product order',
      renderIcon: (isSelected: boolean) => (
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <Coins className="w-5 h-5 stroke-[1.8]" />
        </div>
      ),
    },
    {
      id: 'Service Agreement' as VaadaCategory,
      title: 'Service Agreement',
      subtitle: 'Freelance work • Repairs • Installation',
      renderIcon: (isSelected: boolean) => (
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <Briefcase className="w-5 h-5 stroke-[1.8]" />
        </div>
      ),
    },
  ];

  const handleContinue = () => {
    if (selectedCategory) {
      onSelectCategory(selectedCategory);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none animate-in fade-in duration-200 justify-between">
      {/* Top Header matching Figma wireframe strictly */}
      <div className="w-full border-b border-slate-100 bg-white">
        <div className="max-w-2xl mx-auto px-6 pt-6 pb-4 flex flex-col">
          {/* < Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer -ml-1 w-fit py-1"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" strokeWidth={2.5} />
            <span className="text-xs font-semibold text-slate-700">Back</span>
          </button>

          {/* Heading */}
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug mt-3">
            What kind of Vaada are you creating?
          </h1>
        </div>
      </div>

      {/* 4 Category Selection Cards */}
      <div className="w-full max-w-2xl mx-auto px-6 pt-6 pb-2 flex flex-col gap-3.5 flex-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center gap-4 ${
                isSelected
                  ? 'border-2 border-blue-600 bg-white shadow-2xs ring-2 ring-blue-100'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              {cat.renderIcon(isSelected)}

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-1">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Continue Action Button strictly matching Figma disabled/enabled state */}
      <div className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-2xl mx-auto px-6 pb-7 pt-4">
          <button
            onClick={handleContinue}
            disabled={!selectedCategory}
            className={`w-full h-[48px] rounded-[16px] font-medium text-xs transition-all duration-200 flex items-center justify-center select-none ${
              selectedCategory
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-md shadow-blue-500/20 cursor-pointer font-semibold'
                : 'bg-[#f1f3f6] text-[#94a3b8] cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

