import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  CreditCard,
  Wallet,
  Briefcase,
  TrendingUp,
  FileText,
  CheckCircle2,
  X,
  Check,
  RotateCcw,
  ArrowUpDown,
} from 'lucide-react';
import { VaadaItem } from '../types';

interface VaadasScreenProps {
  vaadas: VaadaItem[];
  initialFilter?: string;
  onOpenTimeline: (vaada: VaadaItem) => void;
  onOpenActiveVaada?: (vaada: VaadaItem) => void;
  onReviewVaada?: (vaada: VaadaItem) => void;
  onReviewRepayment?: (vaada: VaadaItem) => void;
}

export const VaadasScreen: React.FC<VaadasScreenProps> = ({
  vaadas,
  initialFilter = 'All',
  onOpenTimeline,
  onOpenActiveVaada,
  onReviewVaada,
  onReviewRepayment,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Advanced Filter Modal States
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<'All' | 'owed' | 'owe'>('All');
  const [selectedSort, setSelectedSort] = useState<
    'default' | 'amount_desc' | 'amount_asc'
  >('default');

  // Dynamic tab counts calculation
  const counts = useMemo(() => {
    return {
      all: vaadas.length,
      pending: vaadas.filter(
        (v) => v.status === 'pending' || v.status === 'repayment_pending'
      ).length,
      active: vaadas.filter(
        (v) =>
          v.status === 'active' ||
          v.status === 'overdue' ||
          v.status === 'extension_requested'
      ).length,
      completed: vaadas.filter(
        (v) => v.status === 'completed' || v.status === 'closed'
      ).length,
    };
  }, [vaadas]);

  const tabs = [
    { label: 'All', count: counts.all },
    { label: 'Pending', count: counts.pending },
    { label: 'Active', count: counts.active },
    { label: 'Completed', count: counts.completed },
  ];

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedRole !== 'All' ? 1 : 0) +
    (selectedSort !== 'default' ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedRole('All');
    setSelectedSort('default');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Borrowed Money':
        return <CreditCard className="w-4 h-4 text-blue-600" strokeWidth={2} />;
      case 'Payment Promise':
        return <Wallet className="w-4 h-4 text-purple-600" strokeWidth={2} />;
      case 'Service Agreement':
        return <Briefcase className="w-4 h-4 text-emerald-600" strokeWidth={2} />;
      case 'Advance Given':
        return <TrendingUp className="w-4 h-4 text-amber-600" strokeWidth={2} />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" strokeWidth={2} />;
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Borrowed Money':
        return 'bg-blue-50/80';
      case 'Payment Promise':
        return 'bg-purple-50/80';
      case 'Service Agreement':
        return 'bg-emerald-50/80';
      case 'Advance Given':
        return 'bg-amber-50/80';
      default:
        return 'bg-slate-50';
    }
  };

  const getBadgeStyle = (statusColor: string) => {
    switch (statusColor) {
      case 'red':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'orange':
        return 'bg-amber-50/70 text-amber-800 border border-amber-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'green':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'gray':
        return 'bg-slate-50 text-slate-600 border border-slate-200';
      case 'blue':
      default:
        return 'bg-blue-50 text-blue-700 border border-blue-200';
    }
  };

  const getStatusIcon = (statusColor: string) => {
    if (
      statusColor === 'red' ||
      statusColor === 'amber' ||
      statusColor === 'orange' ||
      statusColor === 'purple'
    ) {
      return <span className="text-[10px] font-bold">(!)</span>;
    }
    return <CheckCircle2 className="w-3 h-3 stroke-[2.2]" />;
  };

  const getButtonStyle = (variant?: string) => {
    switch (variant) {
      case 'danger':
        return 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-500/20';
      case 'orange':
        return 'bg-[#f97316] hover:bg-[#ea580c] text-white shadow-sm shadow-orange-500/20';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-500/20';
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-500/20';
      case 'slate':
        return 'bg-[#1e293b] hover:bg-[#0f172a] text-white shadow-sm';
      case 'primary':
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20';
    }
  };

  // Filter and sort items
  const filteredVaadas = useMemo(() => {
    return vaadas
      .filter((item) => {
        // 1. Search filter
        const matchesSearch =
          item.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vaadaId.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        // 2. Tab filter
        if (
          activeTab === 'Pending' &&
          !(item.status === 'pending' || item.status === 'repayment_pending')
        ) {
          return false;
        }
        if (
          activeTab === 'Active' &&
          !(
            item.status === 'active' ||
            item.status === 'overdue' ||
            item.status === 'extension_requested'
          )
        ) {
          return false;
        }
        if (
          activeTab === 'Completed' &&
          !(item.status === 'completed' || item.status === 'closed')
        ) {
          return false;
        }

        // 3. Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }

        // 4. Role filter
        if (selectedRole === 'owed') {
          const isOwed =
            item.role.toLowerCase().includes('lent') ||
            item.role.toLowerCase().includes('owed') ||
            item.role.toLowerCase().includes('advanced') ||
            item.role.toLowerCase().includes('client');
          if (!isOwed) return false;
        } else if (selectedRole === 'owe') {
          const isOwe =
            item.role.toLowerCase().includes('borrow') ||
            item.role.toLowerCase().includes('owe') ||
            item.role.toLowerCase().includes('service provider');
          if (!isOwe) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'amount_desc') return b.amount - a.amount;
        if (selectedSort === 'amount_asc') return a.amount - b.amount;
        return 0;
      });
  }, [vaadas, searchQuery, activeTab, selectedCategory, selectedRole, selectedSort]);

  const handleActionClick = (e: React.MouseEvent, item: VaadaItem) => {
    e.stopPropagation();
    if (item.actionLabel === 'Review' && onReviewVaada) {
      onReviewVaada(item);
    } else if (item.actionLabel === 'Confirm Repayment' && onReviewRepayment) {
      onReviewRepayment(item);
    } else if (
      (item.actionLabel === 'View Overdue' || item.actionLabel === 'View') &&
      onOpenActiveVaada
    ) {
      onOpenActiveVaada(item);
    } else {
      onOpenTimeline(item);
    }
  };

  const handleCardClick = (item: VaadaItem) => {
    if (item.status === 'pending' && onReviewVaada) {
      onReviewVaada(item);
    } else if (item.status === 'repayment_pending' && onReviewRepayment) {
      onReviewRepayment(item);
    } else if (
      onOpenActiveVaada &&
      (item.status === 'active' || item.status === 'overdue')
    ) {
      onOpenActiveVaada(item);
    } else {
      onOpenTimeline(item);
    }
  };

  const categoryOptions = [
    'All',
    'Borrowed Money',
    'Payment Promise',
    'Advance Given',
    'Service Agreement',
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none animate-in fade-in duration-200 relative">
      {/* Top Header matching Figma strictly */}
      <div className="w-full border-b border-slate-100 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3 flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug">
            Vaadas Directory
          </h1>
          <div className="flex items-center gap-3 text-slate-500">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                showSearch ? 'bg-blue-50 text-blue-600' : 'hover:text-blue-600'
              }`}
              aria-label="Search Vaadas"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>

            {/* Filter Options Button */}
            <button
              onClick={() => setShowFilterModal(true)}
              className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${
                activeFiltersCount > 0
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
              aria-label="Filter Options"
              title="Filter & Sort Vaadas"
            >
              <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={2} />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Optional Search Bar */}
      {showSearch && (
        <div className="w-full bg-white border-b border-slate-100 animate-in slide-in-from-top-1 duration-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search by counterparty, category, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-100 px-3.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-800 placeholder:text-slate-400 pr-8"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tabs Row matching Figma strictly */}
      <div className="w-full border-b border-slate-100 bg-white select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-7 text-xs font-semibold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`py-3 relative flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="font-semibold text-[13px]">{tab.label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full transition-all duration-200"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Chips Bar (if filters are active) */}
      {activeFiltersCount > 0 && (
        <div className="w-full bg-slate-50/70 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar animate-in fade-in duration-150">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Active:
            </span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-white border border-blue-200 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                <span>{selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}

            {selectedRole !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-white border border-blue-200 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                <span>{selectedRole === 'owed' ? 'You are Owed' : 'You Owe'}</span>
                <button
                  onClick={() => setSelectedRole('All')}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}

            {selectedSort !== 'default' && (
              <span className="inline-flex items-center gap-1 bg-white border border-blue-200 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                <span>
                  {selectedSort === 'amount_desc'
                    ? 'Highest Amount'
                    : 'Lowest Amount'}
                </span>
                <button
                  onClick={() => setSelectedSort('default')}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 underline ml-auto shrink-0 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Vaada Cards Scrollable List */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-6 lg:p-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVaadas.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col gap-3 active:scale-[0.99]"
          >
            {/* Top Row: Icon + Category + Counterparty + Chevron */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${getCategoryBg(
                    item.category
                  )} flex items-center justify-center shrink-0 shadow-3xs`}
                >
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-normal leading-tight">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                    {item.counterparty}
                  </h3>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-2" />
            </div>

            {/* Financial Details Row: Amount + Due Date */}
            <div className="flex items-baseline justify-between pt-1 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-normal">
                  Amount
                </span>
                <span className="text-[15px] font-bold text-slate-900 leading-snug">
                  ₹{item.amount.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-normal">
                  Due Date
                </span>
                <span className="text-xs font-normal text-slate-700 leading-snug">
                  {item.dueDate}
                </span>
              </div>
            </div>

            {/* Role, Status Pill & Action Button Row */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-normal">
                  {item.role}
                </span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${getBadgeStyle(
                    item.statusColor
                  )}`}
                >
                  {getStatusIcon(item.statusColor)}
                  <span>{item.statusLabel}</span>
                </span>
              </div>

              {/* Action Button */}
              {item.actionLabel && (
                <button
                  onClick={(e) => handleActionClick(e, item)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer ${getButtonStyle(
                    item.actionVariant
                  )}`}
                >
                  {item.actionLabel}
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredVaadas.length === 0 && (
          <div className="col-span-full text-center py-16 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <p className="text-slate-600 text-xs font-semibold">
              No Vaadas match your filters
            </p>
            <p className="text-slate-400 text-[11px]">
              Try adjusting your search query, status tab, or category filters.
            </p>
            {(activeFiltersCount > 0 || searchQuery) && (
              <button
                onClick={() => {
                  handleResetFilters();
                  setSearchQuery('');
                  setActiveTab('All');
                }}
                className="mt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* FILTER BOTTOM SHEET / MODAL                               */}
      {/* ========================================================= */}
      {showFilterModal && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] z-50 flex items-end justify-center animate-in fade-in duration-200">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-8 duration-200"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600 stroke-[2.2]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Filter & Sort
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* Filter Body */}
            <div className="p-5 flex flex-col gap-5 overflow-y-auto no-scrollbar">
              {/* Filter 1: Category */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 2: Role / Relationship */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Your Position
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedRole('All')}
                    className={`py-2 px-2 text-center rounded-xl text-xs border transition-all cursor-pointer ${
                      selectedRole === 'All'
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    All Roles
                  </button>
                  <button
                    onClick={() => setSelectedRole('owed')}
                    className={`py-2 px-2 text-center rounded-xl text-xs border transition-all cursor-pointer ${
                      selectedRole === 'owed'
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    You are Owed
                  </button>
                  <button
                    onClick={() => setSelectedRole('owe')}
                    className={`py-2 px-2 text-center rounded-xl text-xs border transition-all cursor-pointer ${
                      selectedRole === 'owe'
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    You Owe
                  </button>
                </div>
              </div>

              {/* Filter 3: Sort Order */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Sort By Amount
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedSort('default')}
                    className={`py-2 px-2 text-center rounded-xl text-xs border transition-all cursor-pointer ${
                      selectedSort === 'default'
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => setSelectedSort('amount_desc')}
                    className={`py-2 px-2 text-center rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      selectedSort === 'amount_desc'
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>High → Low</span>
                  </button>
                  <button
                    onClick={() => setSelectedSort('amount_asc')}
                    className={`py-2 px-2 text-center rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      selectedSort === 'amount_asc'
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>Low → High</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-3 shrink-0">
              <button
                onClick={handleResetFilters}
                className="flex-1 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] text-xs font-semibold text-slate-700 cursor-pointer transition-all shadow-2xs"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-xs font-semibold text-white shadow-md shadow-blue-500/20 cursor-pointer transition-all"
              >
                Apply Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
