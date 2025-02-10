import { Bet, Move, WagerOutcome, OutcomeStatus, RoundResults } from "../types";

function getRandomMove(): Move {
  const moves: Move[] = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * moves.length)];
}

export function playGameRound(bet: Bet): RoundResults {
  const computerMove: Move = getRandomMove();

  const beats: Record<Move, Move> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const allowTie = bet.wagers.length === 1;

  const wagerOutcomes: WagerOutcome[] = bet.wagers.map((wager) => {
    const isTie = wager.position === computerMove;
    const isWin = beats[wager.position] === computerMove;
    const result: OutcomeStatus = isTie
      ? allowTie
        ? "tie"
        : "lose"
      : isWin
      ? "win"
      : "lose";
    return { wager, result };
  });

  return { computerMove, wagerOutcomes };
}
