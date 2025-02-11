import { Bet, Move, OutcomeStatus, RoundResults } from "../types";

function getRandomMove(): Move {
  // will keep using a const enum, seems easier to read
  const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
  return moves[Math.floor(Math.random() * moves.length)];
}

export function playGameRound(bet: Bet): RoundResults {
  const computerMove: Move = getRandomMove();

  const beats: Record<Move, Move> = {
    [Move.ROCK]: Move.SCISSORS,
    [Move.PAPER]: Move.ROCK,
    [Move.SCISSORS]: Move.PAPER,
  };

  const allowTie = bet.wagers.length === 1;

  const wagerOutcomes = bet.wagers.map((wager) => {
    const isTie = wager.position === computerMove;
    const isWin = beats[wager.position] === computerMove;
    const result: OutcomeStatus = isTie
      ? allowTie
        ? OutcomeStatus.TIE
        : OutcomeStatus.LOSE
      : isWin
      ? OutcomeStatus.WIN
      : OutcomeStatus.LOSE;
    return { wager, result };
  });

  return { computerMove, wagerOutcomes };
}
