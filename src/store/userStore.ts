import { create } from 'zustand';
import { User, Wallet, Transaction, CarbonScore } from '../types';

interface UserState {
  user: User | null;
  wallet: Wallet | null;
  carbonScore: CarbonScore | null;
  transactions: Transaction[];
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setWallet: (wallet: Wallet | null) => void;
  setCarbonScore: (score: CarbonScore | null) => void;
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  wallet: null,
  carbonScore: null,
  transactions: [],
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setWallet: (wallet) => set({ wallet }),
  setCarbonScore: (carbonScore) => set({ carbonScore }),
  addTransaction: (transaction) => 
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  setTransactions: (transactions) => set({ transactions }),
  logout: () => set({ 
    user: null, 
    wallet: null, 
    carbonScore: null, 
    transactions: [],
    isAuthenticated: false 
  }),
}));
