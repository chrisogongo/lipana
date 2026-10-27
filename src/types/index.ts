export type UserRole = 'customer' | 'provider' | 'admin';

export type ContractStatus = 
  | 'draft'
  | 'accepted'
  | 'awaiting_funding'
  | 'funded'
  | 'in_progress'
  | 'submitted_review'
  | 'approved'
  | 'payment_processing'
  | 'paid'
  | 'partially_funded'
  | 'partially_completed'
  | 'revision_requested'
  | 'disputed'
  | 'refund_pending'
  | 'refunded'
  | 'cancelled'
  | 'expired';

export type MilestoneStatus =
  | 'pending'
  | 'in_progress'
  | 'submitted'
  | 'approved'
  | 'revision_requested'
  | 'disputed'
  | 'paid'
  | 'partially_completed';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: MilestoneStatus;
  dueDate: string;
  evidence?: string[];
  partialCompletion?: number;
  approvedAmount?: number;
}

export interface Contract {
  id: string;
  contractId: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  providerId: string;
  providerName: string;
  totalValue: number;
  deposit: number;
  startDate: string;
  completionDate: string;
  status: ContractStatus;
  milestones: Milestone[];
  platformFee: number;
  disputePeriod: number;
  createdAt: string;
  autoApprovalDays: number;
}

export interface Transaction {
  id: string;
  contractId: string;
  type: 'deposit' | 'milestone_payment' | 'refund' | 'platform_fee';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'processing';
  mpesaRef?: string;
  date: string;
  description: string;
}

export interface Dispute {
  id: string;
  contractId: string;
  milestoneId: string;
  raisedBy: string;
  reason: string;
  status: 'open' | 'under_review' | 'resolved' | 'escalated';
  evidence: string[];
  createdAt: string;
  resolution?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
  businessName?: string;
  serviceCategories?: string[];
}
