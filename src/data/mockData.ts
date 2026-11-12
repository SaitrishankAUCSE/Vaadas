import { VaadaItem } from '../types';

export const initialVaadas: VaadaItem[] = [
  {
    id: '1',
    category: 'Borrowed Money',
    counterparty: 'Navya Gudimalla',
    amount: 57500,
    dueDate: 'Jul 27, 2026',
    role: 'You borrowed',
    status: 'overdue',
    statusLabel: 'Overdue · 3 days',
    statusColor: 'red',
    actionLabel: 'View Overdue',
    actionVariant: 'danger',
    vaadaId: '260531-11-0001',
    reviewBefore: '14 Jun 2026',
    timeline: [
      { title: 'Vaada Created', timestamp: 'May 31, 2026 • 10:30 AM', completed: true, description: 'Created by Navya Gudimalla' },
      { title: 'Sent for Review', timestamp: 'May 31, 2026 • 10:32 AM', completed: true, description: 'Sent to Appi Gudimalla' },
      { title: 'Mutual Acceptance', timestamp: 'Jun 02, 2026 • 02:15 PM', completed: true, description: 'Digitally signed and confirmed' },
      { title: 'Vaada Activated', timestamp: 'Jun 02, 2026 • 02:15 PM', completed: true, description: 'Funds transferred: ₹57,500' },
      { title: 'Due Date Passed', timestamp: 'Jul 27, 2026', completed: true, active: true, description: 'Payment marked overdue by 3 days' },
      { title: 'Repayment & Settlement', timestamp: 'Pending', completed: false, description: 'Awaiting borrower repayment confirmation' }
    ]
  },
  {
    id: '2',
    category: 'Payment Promise',
    counterparty: 'Rahul Mehta',
    amount: 12000,
    dueDate: 'Aug 5, 2026',
    role: 'You owe',
    status: 'pending',
    statusLabel: 'Pending',
    statusColor: 'amber',
    actionLabel: 'Review',
    actionVariant: 'primary',
    vaadaId: '260601-08-1102',
    reviewBefore: '20 Jul 2026',
    timeline: [
      { title: 'Vaada Created', timestamp: 'Jun 01, 2026', completed: true },
      { title: 'Review Pending', timestamp: 'Awaiting Acceptance', completed: false, active: true },
      { title: 'Activation', timestamp: 'Pending', completed: false },
      { title: 'Settlement', timestamp: 'Pending', completed: false }
    ]
  },
  {
    id: '3',
    category: 'Borrowed Money',
    counterparty: 'Appi Gudimalla',
    amount: 57500,
    dueDate: 'Jul 27, 2026',
    role: 'You lent',
    status: 'repayment_pending',
    statusLabel: 'Repayment Pending',
    statusColor: 'orange',
    actionLabel: 'Confirm Repayment',
    actionVariant: 'orange',
    vaadaId: '260531-11-0901',
    reviewBefore: '14 Jun 2026',
    timeline: [
      { title: 'Vaada Created', timestamp: 'May 31, 2026', completed: true },
      { title: 'Mutual Acceptance', timestamp: 'Jun 02, 2026', completed: true },
      { title: 'Vaada Activated', timestamp: 'Jun 02, 2026', completed: true },
      { title: 'Repayment Recorded', timestamp: 'Jul 26, 2026 • 04:45 PM', completed: true, active: true, description: 'Appi Gudimalla recorded repayment. Requires confirmation.' },
      { title: 'Completion & Closure', timestamp: 'Pending Confirmation', completed: false }
    ]
  },
  {
    id: '4',
    category: 'Borrowed Money',
    counterparty: 'Kiran Reddy',
    amount: 25000,
    dueDate: 'Jul 15, 2026',
    role: 'You lent',
    status: 'extension_requested',
    statusLabel: 'Extension Requested',
    statusColor: 'purple',
    actionLabel: 'Review Extension',
    actionVariant: 'purple',
    vaadaId: '260515-09-0412',
    timeline: [
      { title: 'Vaada Created', timestamp: 'May 15, 2026', completed: true },
      { title: 'Activated', timestamp: 'May 16, 2026', completed: true },
      { title: 'Extension Requested', timestamp: 'Jul 14, 2026', completed: true, active: true, description: 'Requested 15 days extension till Jul 30' },
      { title: 'Final Settlement', timestamp: 'Pending', completed: false }
    ]
  },
  {
    id: '5',
    category: 'Service Agreement',
    counterparty: 'Priya Sharma',
    amount: 45000,
    dueDate: 'Jun 1, 2026',
    role: 'Service provider',
    status: 'completed',
    statusLabel: 'Completed',
    statusColor: 'green',
    actionLabel: 'View Proof',
    actionVariant: 'success',
    vaadaId: '260501-04-0331',
    timeline: [
      { title: 'Agreement Signed', timestamp: 'May 01, 2026', completed: true },
      { title: 'Service Delivered', timestamp: 'May 28, 2026', completed: true },
      { title: 'Full Settlement & Closure', timestamp: 'Jun 01, 2026', completed: true }
    ]
  },
  {
    id: '6',
    category: 'Advance Given',
    counterparty: 'Suresh Babu',
    amount: 8000,
    dueDate: 'May 20, 2026',
    role: 'You advanced',
    status: 'completed',
    statusLabel: 'Closed',
    statusColor: 'gray',
    actionLabel: 'View Details',
    actionVariant: 'slate',
    vaadaId: '260420-11-0988',
    timeline: [
      { title: 'Advance Paid', timestamp: 'Apr 20, 2026', completed: true },
      { title: 'Settled & Closed', timestamp: 'May 20, 2026', completed: true }
    ]
  },
  {
    id: '7',
    category: 'Payment Promise',
    counterparty: 'Priya Iyer',
    amount: 25000,
    dueDate: 'Aug 10, 2026',
    role: 'You owe',
    status: 'active',
    statusLabel: 'Active',
    statusColor: 'blue',
    actionLabel: 'View',
    actionVariant: 'primary',
    vaadaId: '260610-14-1190',
    timeline: [
      { title: 'Promise Created', timestamp: 'Jun 10, 2026', completed: true },
      { title: 'Active Commitment', timestamp: 'Due Aug 10, 2026', completed: false, active: true }
    ]
  },
  {
    id: '8',
    category: 'Advance Given',
    counterparty: 'Nisha Kapoor',
    amount: 15000,
    dueDate: 'Oct 1, 2026',
    role: 'You advanced',
    status: 'active',
    statusLabel: 'Active',
    statusColor: 'blue',
    actionLabel: 'View',
    actionVariant: 'primary',
    vaadaId: '260601-16-0842',
    timeline: [
      { title: 'Advance Initiated', timestamp: 'Jun 01, 2026', completed: true },
      { title: 'Active Commitment', timestamp: 'Due Oct 01, 2026', completed: false, active: true }
    ]
  },
  {
    id: '9',
    category: 'Service Agreement',
    counterparty: 'Meera Singh',
    amount: 28000,
    dueDate: 'Sep 15, 2026',
    role: 'You are the client',
    status: 'active',
    statusLabel: 'Active',
    statusColor: 'blue',
    actionLabel: 'View',
    actionVariant: 'primary',
    vaadaId: '260615-18-0523',
    timeline: [
      { title: 'Contract Signed', timestamp: 'Jun 15, 2026', completed: true },
      { title: 'Milestone Delivery', timestamp: 'Due Sep 15, 2026', completed: false, active: true }
    ]
  }
];
