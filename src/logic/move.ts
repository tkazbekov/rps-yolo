import { Bet, Move } from "../types";

/**
 * Returns a random move from the set of possible moves.
 *
 * This function randomly selects one move from the three possible moves (ROCK, PAPER, SCISSORS)
 * defined by the Move const enum.
 *
 * @returns {Move} A randomly selected move (Move.ROCK, Move.PAPER, or Move.SCISSORS).
 */
export function getRandomMove(): Move {
  const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
  return moves[Math.floor(Math.random() * moves.length)];
}

/**
 * Determines the missing move from a bet when exactly two wagers are present.
 *
 * This function examines the wagered positions in the provided bet, compares them to the full set
 * of possible moves, and returns the one move that is not wagered. If the bet does not contain exactly
 * two wagers, the function returns null.
 *
 * @param {Bet} bet - The bet object containing an array of wagers.
 * @returns {Move | null} The missing move if exactly two wagers exist; otherwise, null.
 */
export function getMissingMove(bet: Bet): Move | null {
  const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
  const wageredPositions = bet.wagers.map((w) => w.position);
  const missingMoves = moves.filter((move) => !wageredPositions.includes(move));
  return missingMoves.length === 1 ? missingMoves[0] : null;
}