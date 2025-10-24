import React, { useState, useEffect } from 'react';
import { QrCode, Scan, CreditCard, Smartphone, Wallet, Send } from 'lucide-react';
import QRCode from 'qrcode';
import { useUserStore } from '../store/userStore';
import { calculateCarbonFootprint, calculateTokensEarned } from '../utils/carbonCalculator';
import { Transaction } from '../types';

const Payments = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'receive' | 'scan'>('send');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'upi' | 'card'>('wallet');
  const { user, wallet, addTransaction } = useUserStore();

  // Generate QR code for receiving payments
  useEffect(() => {
    if (activeTab === 'receive' && user) {
      const paymentData = {
        userId: user.id,
        name: user.name,
        amount: amount || 'any',
        timestamp: new Date().toISOString(),
      };
      
      QRCode.toDataURL(JSON.stringify(paymentData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#16a34a',
          light: '#ffffff',
        },
      })
        .then(setQrCodeUrl)
        .catch(console.error);
    }
  }, [activeTab, amount, user]);

  const handleSendPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !wallet) {
      alert('Please login to make payments');
      return;
    }

    const paymentAmount = parseFloat(amount);
    
    if (paymentAmount > wallet.balance) {
      alert('Insufficient balance');
      return;
    }

    // Calculate carbon footprint
    const carbonFootprint = calculateCarbonFootprint('send', paymentAmount);
    const tokensEarned = calculateTokensEarned(carbonFootprint, user.carbonScore);

    // Create transaction
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: user.id,
      type: 'send',
      amount: paymentAmount,
      carbonFootprint,
      timestamp: new Date().toISOString(),
      description: description || `Payment to ${recipient}`,
      recipient,
      status: 'completed',
      paymentMethod,
    };

    addTransaction(transaction);

    // Show success message
    alert(`Payment successful! 
    Amount: $${paymentAmount}
    Carbon Impact: ${carbonFootprint.toFixed(2)} kg CO₂
    Tokens Earned: ${tokensEarned}
    `);

    // Reset form
    setAmount('');
    setRecipient('');
    setDescription('');
  };

  const handleScanPayment = () => {
    // Mock QR scan - in production, this would use device camera
    alert('QR Scanner would open here. In production, this uses your device camera to scan merchant QR codes.');
    
    // Simulate scanned payment
    const scannedAmount = (Math.random() * 100 + 10).toFixed(2);
    setAmount(scannedAmount);
    setRecipient('Scanned Merchant');
    setActiveTab('send');
  };

  if (!user || !wallet) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to access payments</p>
          <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Payments</h1>

        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-xl p-6 mb-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 mb-1">Wallet Balance</p>
              <p className="text-4xl font-bold">${wallet.balance.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-green-100 mb-1">Carbon Tokens</p>
              <p className="text-2xl font-bold">{wallet.carbonTokens}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('send')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'send'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Send className="h-5 w-5 inline-block mr-2" />
              Send Money
            </button>
            <button
              onClick={() => setActiveTab('receive')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'receive'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <QrCode className="h-5 w-5 inline-block mr-2" />
              Receive
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'scan'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Scan className="h-5 w-5 inline-block mr-2" />
              Scan QR
            </button>
          </div>

          <div className="p-6">
            {/* Send Money Tab */}
            {activeTab === 'send' && (
              <form onSubmit={handleSendPayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                        paymentMethod === 'wallet'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Wallet className="h-8 w-8 mb-2 text-green-600" />
                      <span className="text-sm font-medium">Wallet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                        paymentMethod === 'upi'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className="h-8 w-8 mb-2 text-green-600" />
                      <span className="text-sm font-medium">UPI</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                        paymentMethod === 'card'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="h-8 w-8 mb-2 text-green-600" />
                      <span className="text-sm font-medium">Card</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter name or UPI ID"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
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
                      min="0.01"
                      required
                    />
                  </div>
                  {amount && (
                    <p className="mt-2 text-sm text-gray-600">
                      Estimated carbon impact: {calculateCarbonFootprint('send', parseFloat(amount)).toFixed(2)} kg CO₂
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="What's this payment for?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Send Payment
                </button>
              </form>
            )}

            {/* Receive Money Tab */}
            {activeTab === 'receive' && (
              <div className="text-center space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (Optional)
                  </label>
                  <div className="relative max-w-xs mx-auto">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Leave empty for any amount"
                      step="0.01"
                      min="0.01"
                    />
                  </div>
                </div>

                {qrCodeUrl && (
                  <div className="bg-white border-4 border-green-600 rounded-2xl p-6 inline-block">
                    <img src={qrCodeUrl} alt="Payment QR Code" className="w-64 h-64" />
                  </div>
                )}

                <div className="max-w-md mx-auto">
                  <p className="text-gray-600 mb-2">Scan this QR code to pay</p>
                  <p className="text-sm text-gray-500">
                    Share this code with anyone to receive payments directly to your wallet
                  </p>
                </div>
              </div>
            )}

            {/* Scan QR Tab */}
            {activeTab === 'scan' && (
              <div className="text-center space-y-6">
                <div className="bg-gray-100 rounded-xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                  <Scan className="h-24 w-24 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Position the QR code within the frame</p>
                  <button
                    onClick={handleScanPayment}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Open QR Scanner
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  In production, this would activate your device camera to scan QR codes
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <button className="bg-white rounded-lg shadow-lg p-4 text-left hover:shadow-xl transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">Pay Bills</h3>
            <p className="text-sm text-gray-600">Electricity, water, internet</p>
          </button>
          <button className="bg-white rounded-lg shadow-lg p-4 text-left hover:shadow-xl transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">Mobile Recharge</h3>
            <p className="text-sm text-gray-600">Prepaid & postpaid</p>
          </button>
          <button className="bg-white rounded-lg shadow-lg p-4 text-left hover:shadow-xl transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">Shopping</h3>
            <p className="text-sm text-gray-600">Pay at eco-friendly stores</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
