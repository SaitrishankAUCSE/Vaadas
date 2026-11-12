import React, { useState } from 'react';
import { DeviceWrapper } from './components/DeviceWrapper';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { LoginScreen } from './components/LoginScreen';
import { OtpScreen } from './components/OtpScreen';
import { HomeScreen } from './components/HomeScreen';
import { VaadasScreen } from './components/VaadasScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { BottomNav } from './components/BottomNav';
import { DesktopNavbar } from './components/DesktopNavbar';
import { VaadaTimelineModal } from './components/VaadaTimelineModal';
import { CreateVaadaScreen } from './components/CreateVaadaScreen';
import { BM_PartiesScreen } from './components/BM_PartiesScreen';
import { BM_LoanDetailsScreen } from './components/BM_LoanDetailsScreen';
import { BM_RepaymentPromiseScreen } from './components/BM_RepaymentPromiseScreen';
import { BM_ReviewCreateScreen } from './components/BM_ReviewCreateScreen';
import { PP_PartiesScreen } from './components/PP_PartiesScreen';
import { AG_PartiesScreen } from './components/AG_PartiesScreen';
import { SA_PartiesScreen } from './components/SA_PartiesScreen';
import { CP_Review } from './components/CP_Review';
import { BM_ActiveOverview } from './components/BM_ActiveOverview';
import { BM_RecordRepayment } from './components/BM_RecordRepayment';
import { BM_ReviewRepayment } from './components/BM_ReviewRepayment';
import { initialVaadas } from './data/mockData';
import { ScreenType, VaadaCategory, VaadaItem } from './types';

export const App: React.FC = () => {
  // Navigation State (supports optional ?screen= deep-linking for testing)
  const getInitialScreen = (): ScreenType => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const s = urlParams.get('screen') as ScreenType;
      if (s) return s;
    } catch {}
    return 'splash';
  };

  const [currentScreen, setCurrentScreen] = useState<ScreenType>(getInitialScreen);
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('home');
  const [userPhone, setUserPhone] = useState<string>('9182345678');
  const [userName, setUserName] = useState<string>('Appi Gudimalla');
  const [userMaskedPhone, setUserMaskedPhone] = useState<string>('+91 ******8745');
  const [vaadas, setVaadas] = useState<VaadaItem[]>(initialVaadas);
  const [selectedVaadaForTimeline, setSelectedVaadaForTimeline] = useState<VaadaItem | null>(null);
  const [activeVaada, setActiveVaada] = useState<VaadaItem>(initialVaadas[0]);
  const [vaadaViewRole, setVaadaViewRole] = useState<'borrower' | 'lender'>('borrower');
  const [vaadasInitialFilter, setVaadasInitialFilter] = useState<string>('All');

  // Pending Actions state (auto-dismisses the Action Required sections once completed)
  const [pendingCounterpartyReview, setPendingCounterpartyReview] = useState<boolean>(true);
  const [pendingRepaymentReview, setPendingRepaymentReview] = useState<boolean>(true);

  // Multi-step Create Vaada Draft State
  const [createDraft, setCreateDraft] = useState<{
    category: VaadaCategory;
    role: 'lender' | 'borrower';
    counterparty: string;
    phone?: string;
    amount: number;
    dateGiven: string;
    paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
    transactionId?: string;
    proofAdded: boolean;
    repaymentAmount: number;
    durationDays: number;
    dueDate: string;
    interestApplies: boolean;
    interestType?: string;
    interestRate?: number;
  }>({
    category: 'Borrowed Money',
    role: 'borrower',
    counterparty: 'ram',
    phone: '999999999',
    amount: 100,
    dateGiven: 'Nov 12, 2026',
    paymentMethod: 'UPI',
    transactionId: '4567y',
    proofAdded: true,
    repaymentAmount: 100,
    durationDays: 15,
    dueDate: 'November 27th, 2026',
    interestApplies: true,
    interestType: 'Monthly %',
    interestRate: 2,
  });

  // Transitions
  const handleSplashTransition = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handlePhoneSubmit = (phone: string) => {
    setUserPhone(phone);
    setCurrentScreen('otp');
  };

  const handleOtpVerify = () => {
    setCurrentScreen('home');
  };

  const handleNavigateToVaadas = (filter = 'All') => {
    setVaadasInitialFilter(filter);
    setCurrentScreen('vaadas');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  // Subscreen navigation handlers
  const handleOpenReview = (vaada: VaadaItem) => {
    setActiveVaada(vaada);
    setPreviousScreen(currentScreen);
    setCurrentScreen('cp-review');
  };

  const handleOpenRepaymentReview = (vaada: VaadaItem) => {
    setActiveVaada(vaada);
    setPreviousScreen(currentScreen);
    setCurrentScreen('bm-review-repayment');
  };

  const handleOpenActiveVaada = (vaada: VaadaItem, overrideRole?: 'borrower' | 'lender') => {
    setActiveVaada(vaada);
    setPreviousScreen(currentScreen);
    setVaadaViewRole(overrideRole || (vaada.role === 'You borrowed' ? 'borrower' : 'lender'));
    setCurrentScreen('bm-active-overview');
  };

  const handleTimelineViewDetails = (vaada: VaadaItem) => {
    setSelectedVaadaForTimeline(null);
    setActiveVaada(vaada);
    setPreviousScreen(currentScreen);
    setVaadaViewRole(vaada.role === 'You borrowed' ? 'borrower' : 'lender');
    if (vaada.status === 'pending') {
      setCurrentScreen('cp-review');
    } else if (vaada.status === 'repayment_pending') {
      setCurrentScreen('bm-review-repayment');
    } else {
      setCurrentScreen('bm-active-overview');
    }
  };

  const handleAcceptVaada = (vaadaId: string) => {
    setPendingCounterpartyReview(false);
    setVaadas((prev) =>
      prev.map((v) =>
        v.id === vaadaId || v.vaadaId === vaadaId
          ? { ...v, status: 'active', statusLabel: 'Active', statusColor: 'green' }
          : v
      )
    );
    // Navigate directly to active vaada overview
    setCurrentScreen('bm-active-overview');
  };

  const handleRejectVaada = (vaadaId: string) => {
    setPendingCounterpartyReview(false);
    setVaadas((prev) =>
      prev.map((v) =>
        v.id === vaadaId || v.vaadaId === vaadaId
          ? { ...v, status: 'completed', statusLabel: 'Declined', statusColor: 'gray' }
          : v
      )
    );
    setCurrentScreen(previousScreen);
  };

  const handleConfirmReceipt = (vaadaId: string) => {
    setPendingRepaymentReview(false);
    setVaadas((prev) =>
      prev.map((v) =>
        v.id === vaadaId || v.vaadaId === vaadaId
          ? { ...v, status: 'completed', statusLabel: 'Completed', statusColor: 'gray' }
          : v
      )
    );
    setCurrentScreen(previousScreen);
  };

  const handleStartRecordRepayment = () => {
    setCurrentScreen('bm-record-repayment');
  };

  const handleSubmitRepayment = () => {
    // Return back to active vaada overview
    setCurrentScreen('bm-active-overview');
  };

  const handleBackToPrevious = () => {
    setCurrentScreen(previousScreen);
  };

  const handleOpenCreateVaada = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('create-vaada');
  };

  const handleSelectCreateCategory = (category: VaadaCategory) => {
    if (category === 'Borrowed Money') {
      setCurrentScreen('bm-parties');
      return;
    }
    if (category === 'Payment Promise') {
      setCurrentScreen('pp-parties');
      return;
    }
    if (category === 'Advance Given') {
      setCurrentScreen('ag-parties');
      return;
    }
    if (category === 'Service Agreement') {
      setCurrentScreen('sa-parties');
      return;
    }

    const newVaada: VaadaItem = {
      id: Date.now().toString(),
      category,
      counterparty: 'New Commitment',
      amount: 25000,
      dueDate: 'Oct 15, 2026',
      role: 'You owe',
      status: 'pending',
      statusLabel: 'Pending Acceptance',
      statusColor: 'amber',
      actionLabel: 'Review',
      actionVariant: 'primary',
      vaadaId: `2608${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
      timeline: [
        { title: 'Vaada Created', timestamp: 'Just now', completed: true },
        { title: 'Review Pending', timestamp: 'Awaiting Acceptance', completed: false, active: true },
      ],
    };
    setVaadas([newVaada, ...vaadas]);
    setActiveVaada(newVaada);
    setCurrentScreen('vaadas');
  };

  const handlePPPartiesContinue = ({
    role,
    counterparty,
    phone,
  }: {
    role: 'receiver' | 'payer';
    counterparty: string;
    phone?: string;
  }) => {
    const newVaada: VaadaItem = {
      id: Date.now().toString(),
      category: 'Payment Promise',
      counterparty,
      amount: 12000,
      dueDate: 'Aug 5, 2026',
      role: role === 'receiver' ? 'You are owed' : 'You owe',
      status: 'pending',
      statusLabel: 'Pending Acceptance',
      statusColor: 'amber',
      actionLabel: 'Review',
      actionVariant: 'primary',
      vaadaId: `260531-${Math.floor(10 + Math.random() * 90)}-0002`,
      timeline: [
        { title: 'Vaada Created', timestamp: 'Just now', completed: true },
        { title: 'Mutual Acceptance', timestamp: 'Pending Acceptance', completed: false, active: true },
      ],
    };
    setVaadas([newVaada, ...vaadas]);
    setActiveVaada(newVaada);
    setCurrentScreen('vaadas');
  };

  const handleAGPartiesContinue = ({
    role,
    counterparty,
    phone,
  }: {
    role: 'advance_provider' | 'advance_receiver';
    counterparty: string;
    phone?: string;
  }) => {
    const newVaada: VaadaItem = {
      id: Date.now().toString(),
      category: 'Advance Given',
      counterparty,
      amount: 30000,
      dueDate: 'Sep 10, 2026',
      role: role === 'advance_provider' ? 'You advanced' : 'You received advance',
      status: 'active',
      statusLabel: 'Active',
      statusColor: 'green',
      actionLabel: 'View',
      actionVariant: 'primary',
      vaadaId: `260531-${Math.floor(10 + Math.random() * 90)}-0003`,
      timeline: [
        { title: 'Vaada Created', timestamp: 'Just now', completed: true },
        { title: 'Mutual Acceptance', timestamp: 'Just now', completed: true },
        { title: 'Vaada Activated', timestamp: 'Just now', completed: true },
      ],
    };
    setVaadas([newVaada, ...vaadas]);
    setActiveVaada(newVaada);
    setCurrentScreen('vaadas');
  };

  const handleSAPartiesContinue = ({
    role,
    counterparty,
    phone,
  }: {
    role: 'client' | 'provider';
    counterparty: string;
    phone?: string;
  }) => {
    const newVaada: VaadaItem = {
      id: Date.now().toString(),
      category: 'Service Agreement',
      counterparty,
      amount: 45000,
      dueDate: 'Nov 1, 2026',
      role: role === 'client' ? 'Client' : 'Service Provider',
      status: 'active',
      statusLabel: 'Active',
      statusColor: 'green',
      actionLabel: 'View',
      actionVariant: 'primary',
      vaadaId: `260531-${Math.floor(10 + Math.random() * 90)}-0004`,
      timeline: [
        { title: 'Vaada Created', timestamp: 'Just now', completed: true },
        { title: 'Mutual Acceptance', timestamp: 'Just now', completed: true },
        { title: 'Vaada Activated', timestamp: 'Just now', completed: true },
      ],
    };
    setVaadas([newVaada, ...vaadas]);
    setActiveVaada(newVaada);
    setCurrentScreen('vaadas');
  };

  const handlePartiesContinue = ({
    role,
    counterparty,
    phone,
  }: {
    role: 'lender' | 'borrower';
    counterparty: string;
    phone?: string;
  }) => {
    setCreateDraft((prev) => ({
      ...prev,
      role,
      counterparty,
      phone,
    }));
    setPreviousScreen(currentScreen);
    setCurrentScreen('bm-loan-details');
  };

  const handleLoanDetailsContinue = (data: {
    amount: number;
    dateGiven: string;
    paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
    transactionId?: string;
    proofAdded: boolean;
  }) => {
    setCreateDraft((prev) => ({
      ...prev,
      ...data,
      repaymentAmount: data.amount,
    }));
    setPreviousScreen(currentScreen);
    setCurrentScreen('bm-repayment-promise');
  };

  const handleRepaymentPromiseContinue = (data: {
    repaymentAmount: number;
    durationDays: number;
    dueDate: string;
    interestApplies: boolean;
    interestType?: string;
    interestRate?: number;
  }) => {
    setCreateDraft((prev) => ({
      ...prev,
      ...data,
    }));
    setPreviousScreen(currentScreen);
    setCurrentScreen('bm-review-create');
  };

  const handleCreateVaadaFinal = () => {
    const newVaada: VaadaItem = {
      id: Date.now().toString(),
      category: createDraft.category,
      counterparty: createDraft.counterparty,
      amount: createDraft.repaymentAmount,
      dueDate: createDraft.dueDate,
      role: createDraft.role === 'lender' ? 'You lent' : 'You borrowed',
      status: 'pending',
      statusLabel: 'Pending Acceptance',
      statusColor: 'amber',
      actionLabel: 'Review',
      actionVariant: 'primary',
      vaadaId: `261112-${Math.floor(10 + Math.random() * 90)}-000${Math.floor(1 + Math.random() * 9)}`,
      paymentMethod: createDraft.paymentMethod,
      transactionId: createDraft.transactionId,
      proofAdded: createDraft.proofAdded,
      repaymentAmount: createDraft.repaymentAmount,
      durationDays: createDraft.durationDays,
      interestApplies: createDraft.interestApplies,
      interestType: createDraft.interestType,
      interestRate: createDraft.interestRate,
      counterpartyPhone: createDraft.phone,
      timeline: [
        { title: 'Vaada Created', timestamp: 'Just now', completed: true },
        { title: 'Awaiting Counterparty Review', timestamp: `${createDraft.counterparty} notified`, completed: false, active: true },
      ],
    };
    setVaadas([newVaada, ...vaadas]);
    setActiveVaada(newVaada);
    setCurrentScreen('vaadas');
  };

  const isAuthScreen = ['splash', 'onboarding', 'login', 'otp'].includes(currentScreen);
  const showBottomNav = ['home', 'vaadas', 'alerts', 'profile'].includes(currentScreen);
  const actionCount = 4;

  return (
    <DeviceWrapper
      currentScreen={currentScreen}
      onNavigateScreen={(screen) => setCurrentScreen(screen)}
    >
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/40">
        {/* Desktop Top Navigation Bar (Sticky on all authenticated views for screens >= 768px) */}
        {!isAuthScreen && (
          <DesktopNavbar
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenCreate={handleOpenCreateVaada}
            badgeCount={actionCount}
            userName={userName}
            onLogout={handleLogout}
          />
        )}
        {/* Splash Screen */}
        {currentScreen === 'splash' && (
          <SplashScreen onTransitionComplete={handleSplashTransition} />
        )}

        {/* Onboarding Screen */}
        {currentScreen === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}

        {/* Login Screen */}
        {currentScreen === 'login' && (
          <LoginScreen onContinue={handlePhoneSubmit} />
        )}

        {/* OTP Screen */}
        {currentScreen === 'otp' && (
          <OtpScreen
            phone={userPhone}
            onVerify={handleOtpVerify}
            onBack={() => setCurrentScreen('login')}
          />
        )}

        {/* Home Dashboard */}
        {currentScreen === 'home' && (
          <HomeScreen
            vaadas={vaadas}
            pendingCounterpartyReview={pendingCounterpartyReview}
            pendingRepaymentReview={pendingRepaymentReview}
            onReviewVaada={handleOpenReview}
            onReviewRepayment={handleOpenRepaymentReview}
            onOpenActiveVaada={handleOpenActiveVaada}
            onOpenTimeline={(v) => setSelectedVaadaForTimeline(v)}
            onNavigateToVaadas={handleNavigateToVaadas}
          />
        )}

        {/* Vaadas List */}
        {currentScreen === 'vaadas' && (
          <VaadasScreen
            vaadas={vaadas}
            initialFilter={vaadasInitialFilter}
            onOpenTimeline={(v) => setSelectedVaadaForTimeline(v)}
            onOpenActiveVaada={handleOpenActiveVaada}
            onReviewVaada={handleOpenReview}
            onReviewRepayment={handleOpenRepaymentReview}
          />
        )}

        {/* Alerts Screen */}
        {currentScreen === 'alerts' && (
          <AlertsScreen
            vaadas={vaadas}
            pendingCounterpartyReview={pendingCounterpartyReview}
            pendingRepaymentReview={pendingRepaymentReview}
            onReviewVaada={handleOpenReview}
            onReviewRepayment={handleOpenRepaymentReview}
            onOpenActiveVaada={handleOpenActiveVaada}
            onOpenTimeline={(v) => setSelectedVaadaForTimeline(v)}
          />
        )}

        {/* Profile Screen */}
        {currentScreen === 'profile' && (
          <ProfileScreen
            userName={userName}
            userPhone={userMaskedPhone}
            onLogout={handleLogout}
            onEditProfile={() => setCurrentScreen('edit-profile')}
          />
        )}

        {/* Edit Profile / Personal Information Screen */}
        {currentScreen === 'edit-profile' && (
          <EditProfileScreen
            initialFirstName={userName.split(' ')[0] || 'Appi'}
            initialLastName={userName.split(' ').slice(1).join(' ') || 'Gudimalla'}
            initialPhone={userMaskedPhone}
            onBack={() => setCurrentScreen('profile')}
            onSave={({ firstName, lastName }) => {
              setUserName(`${firstName} ${lastName}`.trim());
            }}
          />
        )}

        {/* Create Vaada Screen (Category Picker) */}
        {currentScreen === 'create-vaada' && (
          <CreateVaadaScreen
            onBack={handleBackToPrevious}
            onSelectCategory={handleSelectCreateCategory}
          />
        )}

        {/* Borrowed Money - Parties Screen (Step 2) */}
        {currentScreen === 'bm-parties' && (
          <BM_PartiesScreen
            onBack={() => setCurrentScreen('create-vaada')}
            onContinue={handlePartiesContinue}
          />
        )}

        {/* Borrowed Money - Loan Details Screen (Step 3) */}
        {currentScreen === 'bm-loan-details' && (
          <BM_LoanDetailsScreen
            initialAmount={createDraft.amount}
            initialDate={createDraft.dateGiven}
            onBack={() => setCurrentScreen('bm-parties')}
            onContinue={handleLoanDetailsContinue}
          />
        )}

        {/* Borrowed Money - Repayment Promise Screen (Step 4) */}
        {currentScreen === 'bm-repayment-promise' && (
          <BM_RepaymentPromiseScreen
            principalAmount={createDraft.amount}
            onBack={() => setCurrentScreen('bm-loan-details')}
            onContinue={handleRepaymentPromiseContinue}
          />
        )}

        {/* Borrowed Money - Review & Create Screen (Step 5) */}
        {currentScreen === 'bm-review-create' && (
          <BM_ReviewCreateScreen
            data={createDraft}
            onBack={() => setCurrentScreen('bm-repayment-promise')}
            onCreate={handleCreateVaadaFinal}
          />
        )}

        {/* Payment Promise - Parties Screen */}
        {currentScreen === 'pp-parties' && (
          <PP_PartiesScreen
            onBack={() => setCurrentScreen('create-vaada')}
            onContinue={handlePPPartiesContinue}
          />
        )}

        {/* Advance Given - Parties Screen */}
        {currentScreen === 'ag-parties' && (
          <AG_PartiesScreen
            onBack={() => setCurrentScreen('create-vaada')}
            onContinue={handleAGPartiesContinue}
          />
        )}

        {/* Service Agreement - Parties Screen */}
        {currentScreen === 'sa-parties' && (
          <SA_PartiesScreen
            onBack={() => setCurrentScreen('create-vaada')}
            onContinue={handleSAPartiesContinue}
          />
        )}

        {/* Counterparty Review Screen */}
        {currentScreen === 'cp-review' && (
          <CP_Review
            vaada={activeVaada}
            onBack={handleBackToPrevious}
            onAccept={handleAcceptVaada}
            onReject={handleRejectVaada}
          />
        )}

        {/* Active Vaada Overview Screen */}
        {currentScreen === 'bm-active-overview' && (
          <BM_ActiveOverview
            vaada={activeVaada}
            role={vaadaViewRole}
            onBack={handleBackToPrevious}
            onRecordRepayment={handleStartRecordRepayment}
            onViewTimeline={() => setSelectedVaadaForTimeline(activeVaada)}
          />
        )}

        {/* Record Repayment Screen */}
        {currentScreen === 'bm-record-repayment' && (
          <BM_RecordRepayment
            vaada={activeVaada}
            onBack={() => setCurrentScreen('bm-active-overview')}
            onSubmit={handleSubmitRepayment}
          />
        )}

        {/* Review Repayment Screen */}
        {currentScreen === 'bm-review-repayment' && (
          <BM_ReviewRepayment
            vaada={activeVaada}
            onBack={handleBackToPrevious}
            onConfirmReceipt={handleConfirmReceipt}
          />
        )}

        {/* Global Bottom Navigation */}
        {showBottomNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenCreate={handleOpenCreateVaada}
            badgeCount={actionCount}
          />
        )}

        {/* Vaada Timeline Event History Modal */}
        <VaadaTimelineModal
          vaada={selectedVaadaForTimeline}
          onClose={() => setSelectedVaadaForTimeline(null)}
          onViewDetails={handleTimelineViewDetails}
        />
      </div>
    </DeviceWrapper>
  );
};

export default App;
