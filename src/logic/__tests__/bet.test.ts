import { describe, it, expect } from 'vitest';
import { placeWager } from '../bet';
import { Bet, Move } from '../../types';

describe("Bet Module", () => {
  it("should add a new wager if the position does not exist", () => {
    const initialBet: Bet = { wagers: [] };
    const updatedBet = placeWager(initialBet, 5000, Move.ROCK, 500).newBet;
    expect(updatedBet.wagers).toHaveLength(1);
    expect(updatedBet.wagers[0]).toEqual({ position: Move.ROCK, amount: 500 });
  });

  it("should update an existing wager if the position already exists", () => {
    const initialBet: Bet = { wagers: [{ position: Move.ROCK, amount: 500 }] };
    const updatedBet = placeWager(initialBet, 5000, Move.ROCK, 500).newBet;
    expect(updatedBet.wagers).toHaveLength(1);
    expect(updatedBet.wagers[0]).toEqual({ position: Move.ROCK, amount: 1000 });
  });

  it("should throw an error if more than 2 positions are wagered", () => {
    const initialBet: Bet = {
      wagers: [
        { position: Move.ROCK, amount: 500 },
        { position: Move.PAPER, amount: 500 },
      ],
    };
    expect(() => placeWager(initialBet, 5000, Move.SCISSORS, 500)).toThrowError();
  });
});