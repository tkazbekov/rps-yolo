
import { describe, expect, it } from "vitest";
import { BetType, Move, OutcomeStatus, RoundOddsConfig, WagerOutcome } from "../../types";
import { decreaseBalance, increaseBalance, resetBalance, calculatePayout } from "../balance";

describe("Balance Functions", () => {
  describe("decreaseBalance", () => {
    it("should decrease balance correctly", () => {
      expect(decreaseBalance(100, 50)).toBe(50);
    });

    it("should throw an error when decreasing more than available balance", () => {
      expect(() => decreaseBalance(30, 50)).toThrow("Insufficient balance");
    });

    it("should return zero when decreasing entire balance", () => {
      expect(decreaseBalance(50, 50)).toBe(0);
    });
  });

  describe("increaseBalance", () => {
    it("should increase balance correctly", () => {
      expect(increaseBalance(100, 50)).toBe(150);
    });

    it("should return the same amount when increasing by zero", () => {
      expect(increaseBalance(100, 0)).toBe(100);
    });
  });

  describe("resetBalance", () => {
    it("should reset balance to default value", () => {
      expect(resetBalance()).toBe(5000);
    });

    it("should reset balance to a custom initial value", () => {
      expect(resetBalance(1000)).toBe(1000);
    });
  });

  describe("calculatePayout", () => {
    const mockConfig: RoundOddsConfig = {
      [BetType.SINGLE]: { winMultiplier: 2, tieMultiplier: 1, lossMultiplier: 0 },
      [BetType.DOUBLE]: { winMultiplier: 3, tieMultiplier: 1.5, lossMultiplier: 0 },
    };

    it("should calculate payout for a single win correctly", () => {
      const outcomes: WagerOutcome[] = [
        { wager:{ position: Move.ROCK, amount: 100 }, result: OutcomeStatus.WIN },
      ];
      expect(calculatePayout(outcomes, mockConfig)).toBe(100 * 2);
    });

    it("should calculate payout for a single tie correctly", () => {
      const outcomes: WagerOutcome[] = [
        { wager:{ position: Move.ROCK, amount: 100 }, result: OutcomeStatus.TIE },
      ];
      expect(calculatePayout(outcomes, mockConfig)).toBe(100 * 1);
    });

    it("should calculate payout for a single loss correctly", () => {
      const outcomes: WagerOutcome[] = [
        { wager:{ position: Move.ROCK, amount: 100 }, result: OutcomeStatus.LOSS },
      ];
      expect(calculatePayout(outcomes, mockConfig)).toBe(100 * 0);
    });

    it("should calculate payout for a double bet with wins correctly", () => {
      const outcomes: WagerOutcome[] = [
        { wager:{ position: Move.ROCK, amount: 100 }, result: OutcomeStatus.WIN },
        { wager:{ position: Move.ROCK, amount: 50 }, result: OutcomeStatus.WIN },
      ];
      expect(calculatePayout(outcomes, mockConfig)).toBe(100 * 3 + 50 * 3);
    });

    it("should calculate payout for a double bet with ties correctly", () => {
      const outcomes: WagerOutcome[] = [
        { wager:{ position: Move.ROCK, amount: 100 }, result: OutcomeStatus.TIE },
        { wager:{ position: Move.ROCK, amount: 50 }, result: OutcomeStatus.TIE },
      ];
      expect(calculatePayout(outcomes, mockConfig)).toBe(100 * 1.5 + 50 * 1.5);
    });

    it("should calculate payout for a mix of win, tie, and loss", () => {
      const outcomes: WagerOutcome[] = [
        { wager:{ position: Move.ROCK, amount: 100 }, result: OutcomeStatus.WIN },
        { wager:{ position: Move.ROCK, amount: 50 }, result: OutcomeStatus.TIE },
        { wager:{ position: Move.ROCK, amount: 30 }, result: OutcomeStatus.LOSS },
      ];
      expect(calculatePayout(outcomes, mockConfig)).toBe(100 * 3 + 50 * 1.5 + 30 * 0);
    });

    it("should return zero payout for all losses", () => {
      const outcomes: WagerOutcome[] = [
        { wager:{ position: Move.ROCK, amount: 100 }, result: OutcomeStatus.LOSS },
        { wager:{ position: Move.ROCK, amount: 50 }, result: OutcomeStatus.LOSS },
      ];
      expect(calculatePayout(outcomes, mockConfig)).toBe(0);
    });

    it("should return zero payout for an empty wager", () => {
      expect(calculatePayout([], mockConfig)).toBe(0);
    });
  });
});