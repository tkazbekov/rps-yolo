import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bet, Wager } from '../types';
import { playRound } from '../logic/game';
import { updateBalance } from '../logic/balance';

interface GameContextType {
  balance: number;
  currentBet: Bet;
  computerMove: string | null;
  multiplier: number | null;
  placeWager: (wager: Wager) => void;
  playGameRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [balance, setBalance] = useState<number>(5000);
  const [currentBet, setCurrentBet] = useState<Bet>({ wagers: [] });
  const [computerMove, setComputerMove] = useState<string | null>(null);
  const [multiplier, setMultiplier] = useState<number | null>(null);

  const placeWager = (wager: Wager) => {
    if (wager.amount > balance) {
      console.error('Insufficient balance for this wager');
      return;
    }
    setBalance(prev => prev - wager.amount);
    setCurrentBet(prevBet => ({
      ...prevBet,
      wagers: [...prevBet.wagers, wager],
    }));
  };

  const playGameRound = () => {
    if (currentBet.wagers.length === 0) {
      console.error('No wager placed');
      return;
    }

    const { computerMove, outcome } = playRound(currentBet);
    setComputerMove(computerMove);
    setMultiplier(outcome.multiplier);

    const totalWager = currentBet.wagers.reduce((sum, wager) => sum + wager.amount, 0);
    setBalance(prev => updateBalance(prev, totalWager, outcome.multiplier));
    setCurrentBet({ wagers: [] });
  };

  /**
   * I know it was said to not implement a reset, but it just makes sense to have one
   */
  const resetGame = () => {
    setBalance(5000);
    setCurrentBet({ wagers: [] });
    setComputerMove(null);
    setMultiplier(null);
  };

  const contextValue: GameContextType = {
    balance,
    currentBet,
    computerMove,
    multiplier,
    placeWager,
    playGameRound,
    resetGame,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};