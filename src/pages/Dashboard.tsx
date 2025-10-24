import React from 'react';
import { Wallet, Leaf, TrendingUp, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockCarbonTrends, mockBadges } from '../services/mockData';
import { formatCarbonAmount } from '../utils/carbonCalculator';
import { Transaction } from '../types';

const StatCard = ({ icon: Icon, title, value, subtitle, trend }: {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down';
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <Icon className="h-8 w-8 text-green-600" />
      {trend && (
        <span className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        </span>
      )}
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
  </div>
);

const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex-1">
      <p className="font-medium text-gray-900">{transaction.description}</p>
      <p className="text-sm text-gray-500">
        {new Date(transaction.timestamp).toLocaleDateString()} • {transaction.paymentMethod.toUpperCase()}
      </p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900">${transaction.amount.toFixed(2)}</p>
      <p className={`text-sm ${transaction.carbonFootprint < 0 ? 'text-green-600' : 'text-orange-600'}`}>
        {transaction.carbonFootprint < 0 ? '-' : '+'}{formatCarbonAmount(Math.abs(transaction.carbonFootprint))} CO₂
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, wallet, carbonScore, transactions } = useUserStore();

  if (!user || !wallet || !carbonScore) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your dashboard</p>
          <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const earnedBadges = mockBadges.filter(b => b.earned);
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your carbon impact summary
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Wallet}
            title="Wallet Balance"
            value={`$${wallet.balance.toFixed(2)}`}
            subtitle={`${wallet.carbonTokens} Carbon Tokens`}
          />
          <StatCard
            icon={Leaf}
            title="Carbon Score"
            value={carbonScore.score.toString()}
            subtitle={carbonScore.level}
            trend={carbonScore.trend}
          />
          <StatCard
            icon={TrendingUp}
            title="Total Offset"
            value={formatCarbonAmount(user.totalCarbonOffset)}
            subtitle="Lifetime carbon offset"
            trend="up"
          />
          <StatCard
            icon={Award}
            title="Leaderboard Rank"
            value={`#${carbonScore.rank}`}
            subtitle={`${earnedBadges.length} badges earned`}
          />
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Carbon Footprint Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Carbon Footprint Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockCarbonTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="footprint" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Transaction Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockCarbonTrends.slice(0, 7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="transactions" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions & Badges */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
              <a href="/payments" className="text-green-600 text-sm font-semibold hover:text-green-700">
                View All
              </a>
            </div>
            <div className="space-y-2">
              {recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Badges Earned</h2>
            <div className="space-y-3">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3">
                  <div className="text-3xl">{badge.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{badge.name}</p>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                </div>
              ))}
              <a 
                href="/leaderboard" 
                className="block text-center text-green-600 text-sm font-semibold hover:text-green-700 pt-2"
              >
                View All Badges
              </a>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">💡 AI-Powered Eco Suggestions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Reduce 15% emissions</strong> by choosing eco-friendly merchants for your shopping
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Earn 50 more tokens</strong> by investing in the Solar Farm project
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Level up</strong> to "Planet Hero" by offsetting 25 more kg of CO₂
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
