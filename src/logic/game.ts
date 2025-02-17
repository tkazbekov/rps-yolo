import { Bet, Move, OutcomeStatus, RoundResults } from "../types";
import { getRandomMove } from "./move";

/**
 * Plays a round of the game using the provided bet.
 *
 * This function randomly selects a move for the computer and then determines the outcome
 * for each wager in the bet based on standard Rock-Paper-Scissors rules:
 *
 * - For a single wager (when `bet.wagers.length === 1`):
 *    - If the wager's position matches the computer's move, the outcome is a tie.
 *    - If the wager's position beats the computer's move (using the `beats` mapping), the outcome is a win.
 *    - Otherwise, the outcome is a loss.
 *
 * - For a double wager (when there are two wagers):
 *    - Ties are treated as losses.
 *    - Each wager is evaluated individually; if a wager's position beats the computer's move, its outcome is a win.
 *    - Otherwise, the outcome is a loss.
 *
 * @param {Bet} bet - The bet object containing one or two wagers. Each wager includes a move (position) and an amount.
 * @returns {RoundResults} An object containing:
 *   - `computerMove`: the randomly selected move of the computer.
 *   - `wagerOutcomes`: an array of outcomes for each wager in the bet, where each outcome consists of the original wager and a result, which is one of:
 *       - OutcomeStatus.WIN: if the wager wins,
 *       - OutcomeStatus.TIE: if it ties (only allowed for single wagers),
 *       - OutcomeStatus.LOSS: if the wager loses.
 */
export function playGameRound(bet: Bet): RoundResults {
  const computerMove: Move = getRandomMove();

  // Define which move beats which in Rock-Paper-Scissors.
  const beats: Record<Move, Move> = {
    [Move.ROCK]: Move.SCISSORS,
    [Move.PAPER]: Move.ROCK,
    [Move.SCISSORS]: Move.PAPER,
  };

  // Allow ties only if there is a single wager.
  const allowTie = bet.wagers.length === 1;

  // Evaluate each wager in the bet.
  const wagerOutcomes = bet.wagers.map((wager) => {
    const isTie = wager.position === computerMove;
    const isWin = beats[wager.position] === computerMove;
    // Determine the outcome:
    // If it ties and ties are allowed, it's a tie; otherwise, if it wins, it's a win; else, it's a loss.
    const result: OutcomeStatus = isTie
      ? (allowTie ? OutcomeStatus.TIE : OutcomeStatus.LOSS)
      : (isWin ? OutcomeStatus.WIN : OutcomeStatus.LOSS);
    return { wager, result };
  });

  return { computerMove, wagerOutcomes };
}