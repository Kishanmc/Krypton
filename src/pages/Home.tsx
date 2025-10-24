import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Leaf, TrendingUp, Award, QrCode, Smartphone } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-xl shadow-xl p-6 transform transition-transform hover:scale-105">
    <div className="flex flex-col items-center text-center">
      <Icon className="h-16 w-16 text-green-600 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-green-600">CarbonPay</span>
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your AI-Verified Carbon Offset Digital Wallet
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              Make payments, track your carbon footprint, earn rewards, and invest in a sustainable future
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/login" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                to="/dashboard" 
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={Wallet}
              title="Digital Wallet"
              description="Secure wallet for money and carbon tokens with real-time balance tracking"
            />
            <FeatureCard
              icon={QrCode}
              title="QR Payments"
              description="Scan to pay or generate QR codes to receive payments instantly"
            />
            <FeatureCard
              icon={Leaf}
              title="Carbon Tracking"
              description="AI-powered carbon footprint calculation for every transaction"
            />
            <FeatureCard
              icon={Award}
              title="Rewards & Tokens"
              description="Earn carbon tokens for eco-friendly behavior and transactions"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Green Investments"
              description="Invest in sustainability projects and earn returns"
            />
            <FeatureCard
              icon={Smartphone}
              title="Easy Payments"
              description="UPI, cards, and wallet payments for bills, recharge, and shopping"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">2.5M</div>
              <div className="text-gray-600">Tons CO₂ Offset</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Eco Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">$5M+</div>
              <div className="text-gray-600">Green Investments</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of users making sustainable choices every day
          </p>
          <Link 
            to="/login" 
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;