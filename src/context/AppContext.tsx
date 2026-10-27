import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, Contract, Transaction, Dispute, User } from '../types';
import { mockContracts, mockTransactions, mockDisputes, mockUsers } from '../data/mockData';

interface AppState {
  currentUser: User;
  currentRole: UserRole;
  contracts: Contract[];
  transactions: Transaction[];
  disputes: Dispute[];
  setCurrentRole: (role: UserRole) => void;
  updateContractStatus: (contractId: string, status: Contract['status']) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [disputes] = useState<Dispute[]>(mockDisputes);

  const currentUser = mockUsers.find(u => u.role === currentRole) || mockUsers[0];

  const updateContractStatus = (contractId: string, status: Contract['status']) => {
    setContracts(prev => prev.map(c => c.id === contractId ? { ...c, status } : c));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentRole,
      contracts,
      transactions,
      disputes,
      setCurrentRole,
      updateContractStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
