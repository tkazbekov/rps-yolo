import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  calculatePayout,
  increaseBalance,
} from "../logic/balance";
import { playGameRound as gamePlayRound } from "../logic/game";
import { Bet, Move, OutcomeStatus, RoundOddsConfig, Wager } from "../types";
import { placeWager } from "../logic/bet";
import { getMissingMove } from "../logic/move";

interface GameContextType {
  balance: number;
  currentBet: Bet;
  currentBetAmount: number;
  increaseWager: (position: Move) => void;
  playRound: () => void;
  lastComputerMove: Move | null;
  lastPayout: number | null;
  winningWager: Wager | null;
  bettingEnabled: boolean;
  disabledPosition: Move | null;
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
  const [winningWager, setWinningWager] = useState<Wager | null>(null);
  const [bettingEnabled, setBettingEnabled] = useState<boolean>(true);

  const currentBetAmount = currentBet.wagers.reduce(
    (sum, wager) => sum + wager.amount,
    0
  );

  const disabledPosition =
    currentBet.wagers.length === 2 ? getMissingMove(currentBet) : null;

  useEffect(() => {
    if (balance < wagerAmount) {
      setBettingEnabled(false);
    }
  }, [balance]);

  useEffect(() => {
    if (lastComputerMove !== null) {
      setBettingEnabled(false);
    }
  }, [lastComputerMove]);

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
    setBettingEnabled(false);

    const { computerMove, wagerOutcomes } = gamePlayRound(currentBet);
    setLastComputerMove(computerMove);

    const winOutcome = wagerOutcomes.find(
      (outcome) => outcome.result === OutcomeStatus.WIN
    );

    const payout = calculatePayout(wagerOutcomes, oddsConfig);

    setTimeout(() => {
      setWinningWager(winOutcome ? winOutcome.wager : null);
      setLastPayout(payout);
      setBalance((prevBalance) => increaseBalance(prevBalance, payout));
      setCurrentBet({ wagers: [] });
    }, 2000);
  };

  const resetGame = () => {
    if (balance >= wagerAmount) {
      setBettingEnabled(true);
    }
    setCurrentBet({ wagers: [] });
    setLastComputerMove(null);
    setLastPayout(null);
    setWinningWager(null);
  };

  const contextValue: GameContextType = {
    balance,
    currentBet,
    currentBetAmount,
    increaseWager,
    playRound,
    lastComputerMove,
    lastPayout,
    winningWager,
    bettingEnabled,
    disabledPosition,
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
