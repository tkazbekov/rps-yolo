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

  const wagerOutcomes: WagerOutcome[] = bet.wagers.map((wager) => {
    let result: OutcomeStatus = "lose";
    if (bet.wagers.length === 1) {
      if (wager.position === computerMove) {
        result = "tie";
      } else if (beats[wager.position] === computerMove) {
        result = "win";
      } else {
        result = "lose";
      }
    } else if (bet.wagers.length === 2) {
      if (wager.position === computerMove) {
        result = "lose";
      } else if (beats[wager.position] === computerMove) {
        result = "win";
      } else {
        result = "lose";
      }
    }
    return { wager, result };
  });

  return { computerMove, wagerOutcomes };
}
