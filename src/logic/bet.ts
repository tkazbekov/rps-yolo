import { Bet, Move, Wager } from "../types";
import { decreaseBalance } from "./balance";

/**
 * Creates a new Bet object by composing the current bet with an additional wager.
 *
 * This function checks if there is already a wager for the given position in the current bet.
 * - If yes, it updates that wager by adding the new amount.
 * - If not, it adds a new wager for that position.
 *
 * If the resulting bet contains wagers for more than two distinct positions, it throws an error.
 *
 * @param {Bet} bet - The current bet, containing an array of wagers.
 * @param {Move} position - The move (position) on which to place the wager.
 * @param {number} amount - The amount to wager.
 * @returns {Bet} A new bet object with the updated wagers.
 * @throws {Error} If adding the wager results in wagers for more than two positions.
 */
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

/**
 * Places a wager by updating the current bet and decreasing the balance by the wager amount.
 *
 * This function first deducts the wager amount from the current balance using the `decreaseBalance`
 * function. Then, it updates the current bet by composing a new wager (or updating an existing one)
 * using the `composeBet` function.
 *
 * @param {Bet} currentBet - The current bet object containing existing wagers.
 * @param {number} currentBalance - The current numeric balance.
 * @param {Move} position - The move (position) on which the wager is placed.
 * @param {number} amount - The wager amount.
 * @returns {{ newBet: Bet; newBalance: number }} An object containing the updated bet and the new balance.
 * @throws {Error} If the balance is insufficient or if adding the wager results in more than two wager positions.
 */
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