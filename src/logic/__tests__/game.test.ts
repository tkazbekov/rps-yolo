import { vi } from "vitest";
import { describe, it, expect } from "vitest";

vi.mock("../move", async () => {
  const actualMoveModule = await vi.importActual("../move");
  return {
    ...actualMoveModule,
    getRandomMove: vi.fn(() => Move.ROCK),
  };
});

import { playGameRound } from "../game";
import { Bet, Move, OutcomeStatus, RoundResults } from "../../types";

describe("playGameRound", () => {
  it("should return a valid computer move", () => {
    const bet: Bet = { wagers: [{ position: Move.ROCK, amount: 10 }] };
    const result: RoundResults = playGameRound(bet);
    console.log()

    expect(result.computerMove).toBe(Move.ROCK); // Now, this should always be ROCK
  });

  it("should return WIN when player's move beats the computer's move", () => {
    const bet: Bet = { wagers: [{ position: Move.PAPER, amount: 10 }] };
    const result: RoundResults = playGameRound(bet);

    expect(result.wagerOutcomes[0].result).toBe(OutcomeStatus.WIN);
  });

  it("should return LOSS when player's move is beaten by the computer's move", () => {
    const bet: Bet = { wagers: [{ position: Move.SCISSORS, amount: 10 }] };
    const result: RoundResults = playGameRound(bet);

    expect(result.wagerOutcomes[0].result).toBe(OutcomeStatus.LOSS);
  });

  it("should return TIE if allowTie is true and moves are the same", () => {
    const bet: Bet = { wagers: [{ position: Move.ROCK, amount: 10 }] };
    const result: RoundResults = playGameRound(bet);

    expect(result.wagerOutcomes[0].result).toBe(OutcomeStatus.TIE);
  });

  it("should return LOSS if allowTie is false and moves are the same", () => {
    const bet: Bet = {
      wagers: [
        { position: Move.ROCK, amount: 10 },
        { position: Move.PAPER, amount: 20 },
      ],
    };
    const result: RoundResults = playGameRound(bet);

    expect(result.wagerOutcomes[0].result).toBe(OutcomeStatus.LOSS);
  });
});
