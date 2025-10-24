import { User, Wallet, Transaction, CarbonScore, EcoProject, Badge, LeaderboardEntry, CarbonTrend } from '../types';

// Mock User Data
export const mockUser: User = {
  id: 'user_001',
  name: 'Alex Green',
  email: 'alex.green@example.com',
  phone: '+1234567890',
  carbonScore: 750,
  totalCarbonOffset: 125.5,
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
};

// Mock Wallet Data
export const mockWallet: Wallet = {
  id: 'wallet_001',
  userId: 'user_001',
  balance: 5420.00,
  carbonTokens: 850,
  currency: 'USD',
};

// Mock Carbon Score
export const mockCarbonScore: CarbonScore = {
  userId: 'user_001',
  score: 750,
  level: 'Eco Warrior',
  rank: 142,
  trend: 'up',
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    userId: 'user_001',
    type: 'shopping',
    amount: 45.50,
    carbonFootprint: 2.3,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: 'Grocery Shopping at EcoMart',
    status: 'completed',
    paymentMethod: 'qr',
  },
  {
    id: 'txn_002',
    userId: 'user_001',
    type: 'bill',
    amount: 120.00,
    carbonFootprint: 8.5,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: 'Electricity Bill',
    status: 'completed',
    paymentMethod: 'wallet',
  },
  {
    id: 'txn_003',
    userId: 'user_001',
    type: 'investment',
    amount: 200.00,
    carbonFootprint: -15.0,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    description: 'Invested in Solar Energy Project',
    status: 'completed',
    paymentMethod: 'wallet',
  },
  {
    id: 'txn_004',
    userId: 'user_001',
    type: 'recharge',
    amount: 30.00,
    carbonFootprint: 1.2,
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    description: 'Mobile Recharge',
    status: 'completed',
    paymentMethod: 'upi',
  },
  {
    id: 'txn_005',
    userId: 'user_001',
    type: 'send',
    amount: 50.00,
    carbonFootprint: 0.5,
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    description: 'Sent to John Doe',
    recipient: 'John Doe',
    status: 'completed',
    paymentMethod: 'qr',
  },
];

// Mock Eco Projects
export const mockEcoProjects: EcoProject[] = [
  {
    id: 'proj_001',
    name: 'Amazon Rainforest Reforestation',
    description: 'Plant 10,000 trees in the Amazon rainforest to combat deforestation and restore biodiversity.',
    category: 'trees',
    targetAmount: 50000,
    currentAmount: 38500,
    baseReturn: 8.0,
    carbonScoreBonus: 2.0,
    partnerBonus: 1.5,
    duration: 24,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    status: 'active',
  },
  {
    id: 'proj_002',
    name: 'Solar Farm Development',
    description: 'Build a 50MW solar farm to provide clean energy to 15,000 homes.',
    category: 'solar',
    targetAmount: 100000,
    currentAmount: 72000,
    baseReturn: 10.0,
    carbonScoreBonus: 3.0,
    partnerBonus: 2.0,
    duration: 36,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    status: 'active',
  },
  {
    id: 'proj_003',
    name: 'Carbon Credit Purchase',
    description: 'Purchase verified carbon credits to offset emissions from transportation and industry.',
    category: 'carbon-credits',
    targetAmount: 25000,
    currentAmount: 18000,
    baseReturn: 6.0,
    carbonScoreBonus: 1.5,
    partnerBonus: 1.0,
    duration: 12,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    status: 'active',
  },
  {
    id: 'proj_004',
    name: 'Wind Energy Initiative',
    description: 'Develop offshore wind turbines to generate renewable energy for coastal communities.',
    category: 'renewable',
    targetAmount: 150000,
    currentAmount: 45000,
    baseReturn: 12.0,
    carbonScoreBonus: 4.0,
    partnerBonus: 2.5,
    duration: 48,
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800',
    status: 'active',
  },
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'badge_001',
    name: 'First Payment',
    description: 'Make your first eco-friendly payment',
    icon: '🎉',
    requirement: 1,
    earned: true,
    earnedDate: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'badge_002',
    name: 'Carbon Saver',
    description: 'Offset 50kg of CO2',
    icon: '🌱',
    requirement: 50,
    earned: true,
    earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'badge_003',
    name: 'Eco Warrior',
    description: 'Offset 100kg of CO2',
    icon: '🌍',
    requirement: 100,
    earned: true,
    earnedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'badge_004',
    name: 'Green Investor',
    description: 'Invest in 3 eco-projects',
    icon: '💰',
    requirement: 3,
    earned: false,
  },
  {
    id: 'badge_005',
    name: 'Planet Hero',
    description: 'Offset 500kg of CO2',
    icon: '⭐',
    requirement: 500,
    earned: false,
  },
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'user_100', name: 'Emma Johnson', carbonScore: 985, totalOffset: 450.2 },
  { rank: 2, userId: 'user_101', name: 'Michael Chen', carbonScore: 962, totalOffset: 425.8 },
  { rank: 3, userId: 'user_102', name: 'Sofia Rodriguez', carbonScore: 948, totalOffset: 398.5 },
  { rank: 4, userId: 'user_103', name: 'James Wilson', carbonScore: 920, totalOffset: 375.3 },
  { rank: 5, userId: 'user_104', name: 'Olivia Brown', carbonScore: 898, totalOffset: 352.1 },
  { rank: 142, userId: 'user_001', name: 'Alex Green', carbonScore: 750, totalOffset: 125.5 },
];

// Mock Carbon Trends
export const mockCarbonTrends: CarbonTrend[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  footprint: Math.random() * 5 + 2,
  transactions: Math.floor(Math.random() * 5) + 1,
}));
