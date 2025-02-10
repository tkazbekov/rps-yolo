import { RoundOddsConfig, WagerOutcome } from "../types";

export function decreaseBalance(
  currentBalance: number,
  amount: number
): number {
  if (amount > currentBalance) {
    throw new Error("Insufficient balance");
  }
  return currentBalance - amount;
}

export function increaseBalance(
  currentBalance: number,
  amount: number
): number {
  return currentBalance + amount;
}

export function resetBalance(initialBalance: number = 5000): number {
  return initialBalance;
}

export function calculatePayout(
  outcomes: WagerOutcome[],
  config: RoundOddsConfig
): number {
  const betType = outcomes.length === 1 ? "single" : "double";
  const odds = config[betType];

  let totalPayout = 0;
  for (let i = 0; i < outcomes.length; i++) {
    const wagerAmount = outcomes[i].wager.amount;
    const outcomeResult = outcomes[i].result;
    let multiplier = 0;
    if (outcomeResult === "win") {
      multiplier = odds.winMultiplier;
    } else if (outcomeResult === "tie") {
      multiplier = odds.tieMultiplier;
    } else {
      multiplier = odds.lossMultiplier;
    }
    totalPayout += wagerAmount * multiplier;
  }

  return totalPayout;
}
