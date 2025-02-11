import { Bet, Move, OutcomeStatus, RoundResults } from "../types";
import { getRandomMove } from "./move";

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
        : OutcomeStatus.LOSS
      : isWin
      ? OutcomeStatus.WIN
      : OutcomeStatus.LOSS;
    return { wager, result };
  });

  return { computerMove, wagerOutcomes };
}
