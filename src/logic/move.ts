import { Move } from "../types";

export function getRandomMove(): Move {
  // will keep using a const enum, seems easier to read
  const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
  return moves[Math.floor(Math.random() * moves.length)];
}