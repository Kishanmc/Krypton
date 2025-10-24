// Carbon footprint calculation utilities
// These are mock calculations for demonstration purposes

export const calculateCarbonFootprint = (
  transactionType: string,
  amount: number
): number => {
  // Base carbon footprint rates (kg CO2 per dollar)
  const rates: Record<string, number> = {
    shopping: 0.05,
    bill: 0.07,
    recharge: 0.04,
    send: 0.01,
    receive: 0.01,
    investment: -0.075, // Negative because it offsets carbon
  };

  const rate = rates[transactionType] || 0.03;
  return parseFloat((amount * rate).toFixed(2));
};

export const calculateCarbonScore = (
  totalOffset: number,
  transactions: number,
  investments: number
): number => {
  // Score calculation:
  // - Base: 100 points
  // - Offset contribution: 5 points per kg CO2
  // - Transaction frequency bonus: up to 200 points
  // - Investment bonus: 50 points per investment
  
  const baseScore = 100;
  const offsetScore = totalOffset * 5;
  const transactionBonus = Math.min(transactions * 2, 200);
  const investmentBonus = investments * 50;
  
  const totalScore = baseScore + offsetScore + transactionBonus + investmentBonus;
  
  // Cap at 1000
  return Math.min(Math.round(totalScore), 1000);
};

export const getCarbonLevel = (score: number): string => {
  if (score >= 900) return 'Planet Hero';
  if (score >= 750) return 'Eco Warrior';
  if (score >= 600) return 'Green Champion';
  if (score >= 450) return 'Carbon Conscious';
  if (score >= 300) return 'Eco Learner';
  return 'Getting Started';
};

export const getScoreTrend = (
  currentScore: number,
  previousScore: number
): 'up' | 'down' | 'stable' => {
  const difference = currentScore - previousScore;
  if (difference > 5) return 'up';
  if (difference < -5) return 'down';
  return 'stable';
};

export const calculateTokensEarned = (
  carbonFootprint: number,
  carbonScore: number
): number => {
  // Tokens earned based on carbon saved and score
  // Negative footprint (offset) earns more tokens
  if (carbonFootprint < 0) {
    const baseTokens = Math.abs(carbonFootprint) * 10;
    const scoreMultiplier = 1 + (carbonScore / 1000);
    return Math.round(baseTokens * scoreMultiplier);
  }
  
  // Positive footprint earns minimal tokens based on score
  const scoreBonus = Math.floor(carbonScore / 100);
  return Math.max(1, scoreBonus);
};

export const formatCarbonAmount = (amount: number): string => {
  if (Math.abs(amount) >= 1000) {
    return `${(amount / 1000).toFixed(2)} tons`;
  }
  return `${amount.toFixed(2)} kg`;
};

export const calculateInvestmentReturn = (
  amount: number,
  baseReturn: number,
  carbonScoreBonus: number,
  partnerBonus: number,
  carbonScore: number
): number => {
  const baseROI = (amount * baseReturn) / 100;
  const scoreMultiplier = 1 + ((carbonScore / 1000) * (carbonScoreBonus / 100));
  const partnerROI = (amount * partnerBonus) / 100;
  
  return parseFloat((baseROI * scoreMultiplier + partnerROI).toFixed(2));
};
