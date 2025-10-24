// User & Authentication
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  carbonScore: number;
  totalCarbonOffset: number;
  createdAt: string;
}

// Wallet & Transactions
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  carbonTokens: number;
  currency: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'send' | 'receive' | 'bill' | 'recharge' | 'shopping' | 'investment';
  amount: number;
  carbonFootprint: number; // kg CO2
  timestamp: string;
  description: string;
  recipient?: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'qr' | 'upi' | 'card' | 'wallet';
}

// Carbon Tracking
export interface CarbonFootprint {
  id: string;
  userId: string;
  transactionId: string;
  amount: number; // kg CO2
  category: string;
  date: string;
  suggestions: string[];
}

export interface CarbonScore {
  userId: string;
  score: number; // 0-1000
  level: string;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

// Rewards & Tokens
export interface Reward {
  id: string;
  userId: string;
  type: 'transaction' | 'milestone' | 'referral';
  tokens: number;
  timestamp: string;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  earned: boolean;
  earnedDate?: string;
}

// Investment & Projects
export interface EcoProject {
  id: string;
  name: string;
  description: string;
  category: 'trees' | 'solar' | 'carbon-credits' | 'renewable';
  targetAmount: number;
  currentAmount: number;
  baseReturn: number; // percentage
  carbonScoreBonus: number; // percentage
  partnerBonus: number; // percentage
  duration: number; // months
  image: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface Investment {
  id: string;
  userId: string;
  projectId: string;
  amount: number;
  tokensUsed: number;
  investmentDate: string;
  expectedReturn: number;
  actualReturn?: number;
  status: 'active' | 'matured' | 'withdrawn';
}

// QR Code & Payments
export interface QRPayment {
  id: string;
  qrCode: string;
  userId: string;
  amount?: number;
  description?: string;
  expiresAt?: string;
  used: boolean;
}

// Analytics
export interface CarbonTrend {
  date: string;
  footprint: number;
  transactions: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  carbonScore: number;
  totalOffset: number;
  avatar?: string;
}
