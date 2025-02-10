export type Move = "rock" | "paper" | "scissors";

export interface Wager {
  position: Move;
  amount: number;
}

export interface Bet {
  wagers: Wager[];
}

export type OutcomeStatus = "win" | "tie" | "lose";

export interface WagerOutcome {
  wager: Wager;
  result: OutcomeStatus;
}

export interface RoundOddsConfig {
  single: BetOddsConfig;
  double: BetOddsConfig;
}

interface BetOddsConfig {
  winMultiplier: number;
  lossMultiplier: number;
  tieMultiplier: number;
}

export interface RoundResults {
  computerMove: Move;
  wagerOutcomes: WagerOutcome[];
}
