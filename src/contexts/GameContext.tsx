import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  calculatePayout,
  increaseBalance,
  resetBalance,
} from "../logic/balance";
import { playGameRound as gamePlayRound } from "../logic/game";
import { Bet, Move, RoundOddsConfig } from "../types";
import { placeWager } from "../logic/bet";

interface GameContextType {
  balance: number;
  currentBet: Bet;
  increaseWager: (position: Move) => void;
  playRound: () => void;
  lastComputerMove: Move | null;
  lastPayout: number | null;
  resetGame: () => void;
}

const oddsConfig: RoundOddsConfig = {
  single: { winMultiplier: 14, lossMultiplier: 0, tieMultiplier: 1 },
  double: { winMultiplier: 3, lossMultiplier: 0, tieMultiplier: 0 },
};

const wagerAmount = 500;

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>(5000);
  const [currentBet, setCurrentBet] = useState<Bet>({ wagers: [] });
  const [lastComputerMove, setLastComputerMove] = useState<Move | null>(null);
  const [lastPayout, setLastPayout] = useState<number | null>(null);

  const increaseWager = (position: Move) => {
    try {
      const { newBet, newBalance } = placeWager(
        currentBet,
        balance,
        position,
        wagerAmount
      );
      setCurrentBet(newBet);
      setBalance(newBalance);
    } catch (err) {
      console.error(err);
    }
  };

  const playRound = () => {
    if (currentBet.wagers.length === 0) {
      console.error("No wager placed.");
      return;
    }
    const { computerMove, wagerOutcomes } = gamePlayRound(currentBet);
    setLastComputerMove(computerMove);

    const payout = calculatePayout(wagerOutcomes, oddsConfig);
    setLastPayout(payout);

    setBalance(increaseBalance(balance, payout));
    setCurrentBet({ wagers: [] });
  };

  const resetGame = () => {
    setBalance(resetBalance());
    setCurrentBet({ wagers: [] });
    setLastComputerMove(null);
    setLastPayout(null);
  };

  const contextValue: GameContextType = {
    balance,
    currentBet,
    increaseWager,
    playRound,
    lastComputerMove,
    lastPayout,
    resetGame,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
