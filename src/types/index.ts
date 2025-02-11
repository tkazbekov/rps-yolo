export enum Move {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export interface Wager {
  position: Move;
  amount: number;
}

export interface Bet {
  wagers: Wager[];
}

export const enum OutcomeStatus {
  WIN = "win",
  TIE = "tie",
  LOSS = "lose",
}

export interface WagerOutcome {
  wager: Wager;
  result: OutcomeStatus;
}

export const enum BetType {
  SINGLE = "single",
  DOUBLE = "double",
}

export type RoundOddsConfig = Record<BetType, BetOddsConfig>;

export interface BetOddsConfig {
  winMultiplier: number;
  lossMultiplier: number;
  tieMultiplier: number;
}

export interface RoundResults {
  computerMove: Move;
  wagerOutcomes: WagerOutcome[];
}
