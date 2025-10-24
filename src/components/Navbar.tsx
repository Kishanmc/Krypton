import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, LayoutDashboard, CreditCard, TrendingUp, Trophy, LogIn } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Navbar = () => {
  const { isAuthenticated, user } = useUserStore();

  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">CarbonPay</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 text-white hover:text-green-100 transition-colors">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/payments" className="flex items-center space-x-1 text-white hover:text-green-100 transition-colors">
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </Link>
                <Link to="/investments" className="flex items-center space-x-1 text-white hover:text-green-100 transition-colors">
                  <TrendingUp className="h-5 w-5" />
                  <span>Invest</span>
                </Link>
                <Link to="/leaderboard" className="flex items-center space-x-1 text-white hover:text-green-100 transition-colors">
                  <Trophy className="h-5 w-5" />
                  <span>Leaderboard</span>
                </Link>
                <div className="flex items-center space-x-2 text-white bg-green-700 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-white hover:text-green-100 transition-colors bg-green-700 px-4 py-2 rounded-lg">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;