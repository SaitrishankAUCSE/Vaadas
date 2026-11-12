export type ScreenType = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'otp'
  | 'home'
  | 'vaadas'
  | 'alerts'
  | 'profile'
  | 'edit-profile'
  | 'create-vaada'
  | 'bm-parties'
  | 'bm-loan-details'
  | 'bm-repayment-promise'
  | 'bm-review-create'
  | 'pp-parties'
  | 'ag-parties'
  | 'sa-parties'
  | 'cp-review'
  | 'bm-active-overview'
  | 'bm-record-repayment'
  | 'bm-review-repayment';

export type VaadaCategory = 
  | 'Borrowed Money' 
  | 'Payment Promise' 
  | 'Service Agreement' 
  | 'Advance Given' 
  | 'Custom';

export type VaadaStatus = 
  | 'pending'
  | 'active'
  | 'overdue'
  | 'repayment_pending'
  | 'extension_requested'
  | 'completed'
  | 'closed';

export interface TimelineEvent {
  title: string;
  timestamp: string;
  completed: boolean;
  active?: boolean;
  description?: string;
}

export interface VaadaItem {
  id: string;
  category: VaadaCategory;
  title?: string;
  counterparty: string;
  amount: number;
  dueDate: string;
  role: string;
  status: VaadaStatus;
  statusLabel: string;
  statusColor: 'red' | 'amber' | 'blue' | 'orange' | 'purple' | 'green' | 'gray';
  actionLabel?: string;
  actionVariant?: 'danger' | 'warning' | 'primary' | 'orange' | 'purple' | 'success' | 'slate';
  vaadaId: string;
  reviewBefore?: string;
  timeline?: TimelineEvent[];
  paymentMethod?: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
  transactionId?: string;
  proofAdded?: boolean;
  repaymentAmount?: number;
  durationDays?: number;
  interestApplies?: boolean;
  interestType?: string;
  interestRate?: number;
  counterpartyPhone?: string;
}
