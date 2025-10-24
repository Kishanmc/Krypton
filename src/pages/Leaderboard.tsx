import React from 'react';
import { Trophy, Medal, Award, TrendingUp, Leaf } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { mockLeaderboard, mockBadges } from '../services/mockData';
import { formatCarbonAmount } from '../utils/carbonCalculator';
import { LeaderboardEntry as LeaderboardEntryType, Badge } from '../types';

const LeaderboardEntry = ({ entry, isCurrentUser }: { entry: LeaderboardEntryType; isCurrentUser: boolean }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-700" />;
    return <span className="text-gray-600 font-semibold">#{rank}</span>;
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${
      isCurrentUser 
        ? 'bg-green-50 border-2 border-green-600' 
        : 'bg-white hover:bg-gray-50'
    } transition-colors`}>
      <div className="flex items-center space-x-4 flex-1">
        <div className="w-12 flex justify-center">
          {getRankIcon(entry.rank)}
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
          {entry.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {entry.name}
            {isCurrentUser && <span className="ml-2 text-sm text-green-600">(You)</span>}
          </h3>
          <p className="text-sm text-gray-600">
            {formatCarbonAmount(entry.totalOffset)} offset
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-green-600">{entry.carbonScore}</p>
        <p className="text-xs text-gray-500">Carbon Score</p>
      </div>
    </div>
  );
};

const BadgeCard = ({ badge }: { badge: Badge }) => (
  <div className={`rounded-xl p-6 ${
    badge.earned 
      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
      : 'bg-gray-50 border-2 border-gray-200 opacity-60'
  }`}>
    <div className="text-center mb-4">
      <div className="text-5xl mb-2">{badge.icon}</div>
      <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
      <p className="text-sm text-gray-600">{badge.description}</p>
    </div>
    
    {badge.earned ? (
      <div className="bg-green-600 text-white text-center py-2 rounded-lg text-sm font-semibold">
        Earned {new Date(badge.earnedDate).toLocaleDateString()}
      </div>
    ) : (
      <div className="bg-gray-200 text-gray-700 text-center py-2 rounded-lg text-sm">
        {badge.requirement} required
      </div>
    )}
  </div>
);

const Leaderboard = () => {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view the leaderboard</p>
          <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const earnedBadges = mockBadges.filter(b => b.earned);
  const unearnedBadges = mockBadges.filter(b => !b.earned);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">
            See how you stack up against other eco-warriors
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg p-6 text-white">
            <Trophy className="h-8 w-8 mb-2" />
            <p className="text-yellow-100 text-sm mb-1">Your Rank</p>
            <p className="text-3xl font-bold">#{mockLeaderboard.find(e => e.userId === user.id)?.rank || 0}</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <Leaf className="h-8 w-8 mb-2" />
            <p className="text-green-100 text-sm mb-1">Carbon Score</p>
            <p className="text-3xl font-bold">{user.carbonScore}</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <Award className="h-8 w-8 mb-2" />
            <p className="text-blue-100 text-sm mb-1">Badges Earned</p>
            <p className="text-3xl font-bold">{earnedBadges.length}/{mockBadges.length}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  Top Eco Warriors
                </h2>
              </div>

              {/* Top 3 Podium */}
              <div className="mb-8 grid grid-cols-3 gap-4">
                {mockLeaderboard.slice(0, 3).map((entry, index) => (
                  <div 
                    key={entry.userId}
                    className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
                  >
                    <div className={`mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'w-20 h-20 bg-yellow-400 text-2xl' : 
                      index === 1 ? 'w-16 h-16 bg-gray-400 text-xl mt-4' : 
                      'w-16 h-16 bg-amber-700 text-xl mt-4'
                    }`}>
                      {entry.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{entry.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{entry.carbonScore} pts</p>
                    <div className={`mx-auto ${
                      index === 0 ? 'h-24' : index === 1 ? 'h-16' : 'h-12'
                    } bg-gradient-to-t ${
                      index === 0 ? 'from-yellow-400 to-yellow-300' :
                      index === 1 ? 'from-gray-400 to-gray-300' :
                      'from-amber-700 to-amber-600'
                    } rounded-t-lg flex items-center justify-center`}>
                      <span className="text-white text-3xl font-bold">{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rest of Leaderboard */}
              <div className="space-y-2">
                {mockLeaderboard.slice(3).map((entry) => (
                  <LeaderboardEntry
                    key={entry.userId}
                    entry={entry}
                    isCurrentUser={entry.userId === user.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 text-green-600 mr-2" />
                Your Badges
              </h2>
              
              <div className="space-y-4">
                {earnedBadges.length > 0 ? (
                  earnedBadges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No badges earned yet</p>
                )}
              </div>
            </div>

            {unearnedBadges.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Available Badges</h2>
                <div className="space-y-4">
                  {unearnedBadges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How to Improve Section */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Climb the Leaderboard</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Make Eco-Friendly Payments</h4>
              <p className="text-sm text-gray-600">
                Use QR payments at sustainable merchants
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Invest in Green Projects</h4>
              <p className="text-sm text-gray-600">
                Support sustainability initiatives
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Offset Carbon Footprint</h4>
              <p className="text-sm text-gray-600">
                Reduce your transaction carbon impact
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Earn Badges</h4>
              <p className="text-sm text-gray-600">
                Complete milestones to boost your score
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
