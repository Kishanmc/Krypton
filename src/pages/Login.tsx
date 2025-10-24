import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Lock, Leaf } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { mockUser, mockWallet, mockCarbonScore, mockTransactions } from '../services/mockData';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const { setUser, setWallet, setCarbonScore, setTransactions } = useUserStore();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP sending
    setShowOTP(true);
    alert('OTP sent! Use any 6-digit code to login (this is a demo)');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - accept any 6-digit OTP
    if (otp.length === 6) {
      // Set user data in store
      setUser(mockUser);
      setWallet(mockWallet);
      setCarbonScore(mockCarbonScore);
      setTransactions(mockTransactions);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Leaf className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to CarbonPay
            </h2>
            <p className="text-gray-600">
              Sign in to your eco-friendly wallet
            </p>
          </div>

          {!showOTP ? (
            /* Initial Login Form */
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="alex.green@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+1 (234) 567-8900"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Send OTP
              </button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button type="button" className="text-green-600 font-semibold hover:text-green-700">
                  Sign Up
                </button>
              </p>
            </form>
          ) : (
            /* OTP Verification Form */
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  OTP sent to {phone}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Verify & Login
              </button>

              <button
                type="button"
                onClick={() => setShowOTP(false)}
                className="w-full text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Change Phone Number
              </button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive OTP?{' '}
                <button 
                  type="button" 
                  onClick={handleSendOTP}
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Resend
                </button>
              </p>
            </form>
          )}

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 text-center">
              <strong>Demo Mode:</strong> Enter any email, phone, and 6-digit OTP to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
