import { Bet, Outcome, Move, Wager } from "../types";

function getComputerMove(): Move {
  const moves: Move[] = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * moves.length)];
}

function getOutcome(bet: Bet, computerMove: Move): Outcome {
  const beats: Record<Move, Move> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const wagers = bet.wagers;

  if (wagers.length === 0) {
    return {
      result: "loss",
      multiplier: 0,
    };
  }

  if (wagers.length === 1) {
    const wager = wagers[0];
    if (wager.position === computerMove) {
      return {
        result: "tie",
        multiplier: 1,
      };
    }
    if (beats[wager.position] === computerMove) {
      return {
        result: "win",
        winningWager: wager,
        multiplier: 14,
      };
    }
    return {
      result: "loss",
      multiplier: 0,
    };
  }

  if (wagers.length === 2) {
    let winningWager: Wager | undefined = undefined;

    for (const wager of wagers) {
      if (wager.position === computerMove) {
        continue;
      }
      if (beats[wager.position] === computerMove) {
        winningWager = wager;
        break;
      }
    }

    if (winningWager) {
      return {
        result: "win",
        winningWager,
        multiplier: 3,
      };
    } else {
      return {
        result: "loss",
        multiplier: 0,
      };
    }
  }

  return {
    result: "loss",
    multiplier: 0,
  };
}

export function playRound(bet: Bet): number {
  const computerMove = getComputerMove();
  const outcome = getOutcome(bet, computerMove);
  return outcome.multiplier;
}
