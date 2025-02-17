import { BetType, OutcomeStatus, RoundOddsConfig, WagerOutcome } from "../types";

/**
 * Decreases the current balance by the given amount.
 *
 * @param {number} currentBalance - The current balance before deduction.
 * @param {number} amount - The amount to deduct from the balance.
 * @returns {number} The new balance after deduction.
 * @throws {Error} Will throw an error if the amount is greater than the current balance.
 */
export function decreaseBalance(
  currentBalance: number,
  amount: number
): number {
  if (amount > currentBalance) {
    throw new Error("Insufficient balance");
  }
  return currentBalance - amount;
}

/**
 * Increases the current balance by the specified amount.
 *
 * @param {number} currentBalance - The current balance before increment.
 * @param {number} amount - The amount to add to the balance.
 * @returns {number} The updated balance after the increment.
 */
export function increaseBalance(
  currentBalance: number,
  amount: number
): number {
  return currentBalance + amount;
}

/**
 * Resets the balance to the provided initial value.
 *
 * @param {number} [initialBalance=5000] - The starting balance. Defaults to 5000 if not provided.
 * @returns {number} The reset balance (which is equal to the initial balance).
 */
export function resetBalance(initialBalance: number = 5000): number {
  return initialBalance;
}

/**
 * Calculates the total payout based on the outcomes of wager(s) and the provided odds configuration.
 *
 * This function processes each wager outcome by multiplying the wager amount with the corresponding
 * multiplier defined in the odds configuration, then sums all individual payouts to determine the total payout.
 *
 * @param {WagerOutcome[]} outcomes - An array of wager outcomes. Each outcome contains the wager details and the outcome status.
 * @param {RoundOddsConfig} config - The odds configuration specifying multipliers for win, tie, and loss for both single and double wagers.
 * @returns {number} The total payout calculated from the wager outcomes.
 */
export function calculatePayout(
  outcomes: WagerOutcome[],
  config: RoundOddsConfig
): number {
  const betType = outcomes.length === 1 ? BetType.SINGLE : BetType.DOUBLE;
  const odds = config[betType];

  let totalPayout = 0;
  for (let i = 0; i < outcomes.length; i++) {
    const wagerAmount = outcomes[i].wager.amount;
    const outcomeResult = outcomes[i].result;
    let multiplier = 0;
    if (outcomeResult === OutcomeStatus.WIN) {
      multiplier = odds.winMultiplier;
    } else if (outcomeResult === OutcomeStatus.TIE) {
      multiplier = odds.tieMultiplier;
    } else {
      multiplier = odds.lossMultiplier;
    }
    totalPayout += wagerAmount * multiplier;
  }

  return totalPayout;
}
