import { Bet, Move, Wager } from "../types";
import { decreaseBalance } from "./balance";

function composeBet(bet: Bet, position: Move, amount: number): Bet {
  const existingWager = bet.wagers.find((w) => w.position === position);
  let newWagers: Wager[];

  if (existingWager) {
    newWagers = bet.wagers.map((w) =>
      w.position === position ? { ...w, amount: w.amount + amount } : w
    );
  } else {
    newWagers = [...bet.wagers, { position, amount }];
  }

  if (newWagers.length > 2) {
    throw new Error("Can't have more than 2 positions with wagers");
  }

  return { wagers: newWagers };
}

export function placeWager(
  currentBet: Bet,
  currentBalance: number,
  position: Move,
  amount: number
): { newBet: Bet; newBalance: number } {
  const newBalance = decreaseBalance(currentBalance, amount);
  const newBet = composeBet(currentBet, position, amount);
  return { newBet, newBalance };
}
