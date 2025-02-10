export type Move = 'rock' | 'paper' | 'scissors';

export type RoundResult = 'win' | 'loss' | 'tie';

export interface Wager {
  position: Move;
  amount: number;
}

export interface Bet {
  wagers: Wager[];
}

export interface Outcome {
  result: RoundResult;
  winningWager?: Wager;
  multiplier: number;
}

export interface GameResult {
    computerMove: Move;
    outcome: Outcome;
}