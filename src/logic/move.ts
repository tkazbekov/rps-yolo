import { Bet, Move } from "../types";

export function getRandomMove(): Move {
  // will keep using a const enum, seems easier to read
  const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
  return moves[Math.floor(Math.random() * moves.length)];
}

export function getMissingMove(bet: Bet): Move | null {
    const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
    const wageredPositions = bet.wagers.map(w => w.position);
    const missingMoves = moves.filter(move => !wageredPositions.includes(move));
    return missingMoves.length === 1 ? missingMoves[0] : null;
  }