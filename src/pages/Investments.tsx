import React, { useState } from 'react';
import { TrendingUp, Leaf, Sun, Wind, DollarSign } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { mockEcoProjects } from '../services/mockData';
import { calculateInvestmentReturn } from '../utils/carbonCalculator';
import { EcoProject, Transaction } from '../types';

const ProjectCard = ({ project, onInvest }: { project: EcoProject; onInvest: (project: EcoProject) => void }) => {
  const progress = (project.currentAmount / project.targetAmount) * 100;
  const categoryIcons = {
    trees: Leaf,
    solar: Sun,
    'carbon-credits': Leaf,
    renewable: Wind,
  };
  
  const Icon = categoryIcons[project.category];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
      <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-600 capitalize">
            {project.category.replace('-', ' ')}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-green-600">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>${project.currentAmount.toLocaleString()}</span>
            <span>${project.targetAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Returns */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-600">Base Return</p>
            <p className="font-bold text-green-600">{project.baseReturn}%</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-600">Score Bonus</p>
            <p className="font-bold text-green-600">+{project.carbonScoreBonus}%</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-600">Duration</p>
            <p className="font-bold text-gray-700">{project.duration}m</p>
          </div>
        </div>

        <button
          onClick={() => onInvest(project)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Invest Now
        </button>
      </div>
    </div>
  );
};

const InvestmentModal = ({ 
  project, 
  onClose, 
  onConfirm 
}: { 
  project: EcoProject; 
  onClose: () => void; 
  onConfirm: (amount: number, useTokens: boolean) => void;
}) => {
  const [amount, setAmount] = useState('');
  const [useTokens, setUseTokens] = useState(false);
  const { user, wallet } = useUserStore();

  const investmentAmount = parseFloat(amount) || 0;
  const expectedReturn = user && wallet 
    ? calculateInvestmentReturn(
        investmentAmount,
        project.baseReturn,
        project.carbonScoreBonus,
        project.partnerBonus,
        user.carbonScore
      )
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (investmentAmount > 0) {
      onConfirm(investmentAmount, useTokens);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Invest in {project.name}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                min="10"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="useTokens"
              checked={useTokens}
              onChange={(e) => setUseTokens(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="useTokens" className="text-sm text-gray-700">
              Use carbon tokens for additional benefits (Available: {wallet?.carbonTokens || 0})
            </label>
          </div>

          {investmentAmount > 0 && (
            <div className="bg-green-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Investment Amount:</span>
                <span className="font-semibold">${investmentAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expected Return:</span>
                <span className="font-semibold text-green-600">
                  ${(investmentAmount + expectedReturn).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Net Profit:</span>
                <span className="font-semibold text-green-600">
                  +${expectedReturn.toFixed(2)} ({((expectedReturn / investmentAmount) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{project.duration} months</span>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Confirm Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Investments = () => {
  const [selectedProject, setSelectedProject] = useState<EcoProject | null>(null);
  const { user, wallet, addTransaction } = useUserStore();

  const handleInvest = (project: EcoProject) => {
    if (!user || !wallet) {
      alert('Please login to invest');
      return;
    }
    setSelectedProject(project);
  };

  const handleConfirmInvestment = (amount: number, useTokens: boolean) => {
    if (!user || !wallet || !selectedProject) return;

    if (amount > wallet.balance) {
      alert('Insufficient balance');
      return;
    }

    // Create investment transaction
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: user.id,
      type: 'investment',
      amount,
      carbonFootprint: -amount * 0.075, // Negative because it offsets carbon
      timestamp: new Date().toISOString(),
      description: `Invested in ${selectedProject.name}`,
      status: 'completed',
      paymentMethod: 'wallet',
    };

    addTransaction(transaction);

    const expectedReturn = calculateInvestmentReturn(
      amount,
      selectedProject.baseReturn,
      selectedProject.carbonScoreBonus,
      selectedProject.partnerBonus,
      user.carbonScore
    );

    alert(`Investment successful!
    Amount: $${amount}
    Expected Return: $${(amount + expectedReturn).toFixed(2)}
    Carbon Offset: ${Math.abs(transaction.carbonFootprint).toFixed(2)} kg CO₂
    ${useTokens ? 'Bonus tokens applied!' : ''}
    `);

    setSelectedProject(null);
  };

  if (!user || !wallet) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view investments</p>
          <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainability Investments</h1>
          <p className="text-gray-600">
            Invest in eco-friendly projects and earn returns while offsetting carbon
          </p>
        </div>

        {/* Investment Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <DollarSign className="h-8 w-8 mb-2 text-green-100" />
            <p className="text-green-100 text-sm mb-1">Available Balance</p>
            <p className="text-3xl font-bold">${wallet.balance.toFixed(2)}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TrendingUp className="h-8 w-8 mb-2 text-green-600" />
            <p className="text-gray-600 text-sm mb-1">Carbon Tokens</p>
            <p className="text-3xl font-bold text-gray-900">{wallet.carbonTokens}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Leaf className="h-8 w-8 mb-2 text-green-600" />
            <p className="text-gray-600 text-sm mb-1">Carbon Score Bonus</p>
            <p className="text-3xl font-bold text-green-600">+{((user.carbonScore / 1000) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEcoProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onInvest={handleInvest} />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How Investment Returns Work</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Base Return</h4>
              <p className="text-sm text-gray-700">
                Each project has a guaranteed base return percentage based on its performance and timeline.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Carbon Score Bonus</h4>
              <p className="text-sm text-gray-700">
                Your carbon score multiplies your returns - higher scores mean better returns on investments.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Partner Rewards</h4>
              <p className="text-sm text-gray-700">
                Additional bonuses from project partners and sponsors for supporting sustainable initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {selectedProject && (
        <InvestmentModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onConfirm={handleConfirmInvestment}
        />
      )}
    </div>
  );
};

export default Investments;
