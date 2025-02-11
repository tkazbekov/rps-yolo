import React from "react";
import { useGame } from "../../contexts/GameContext";
import { Move } from "../../types";

const GameInterface: React.FC = () => {
  const {
    balance,
    currentBet,
    increaseWager,
    playRound,
    lastComputerMove,
    lastPayout,
    resetGame,
  } = useGame();

  return (
    <div>
      <h2>Balance: {balance}</h2>
      <div>
        <button onClick={() => increaseWager(Move.ROCK)}>
          Bet on Rock (+500)
        </button>
        <button onClick={() => increaseWager(Move.PAPER)}>
          Bet on Paper (+500)
        </button>
        <button onClick={() => increaseWager(Move.SCISSORS)}>
          Bet on Scissors (+500)
        </button>
      </div>
      <div>
        <button onClick={playRound}>Play Round</button>
        <button onClick={resetGame}>Reset Game</button>
      </div>
      <div>
        <p>Current Wagers:</p>
        <ul>
          <li>
            Rock:{" "}
            {currentBet.wagers.find((w) => w.position === Move.ROCK)?.amount ||
              0}
          </li>
          <li>
            Paper:{" "}
            {currentBet.wagers.find((w) => w.position === Move.PAPER)?.amount ||
              0}
          </li>
          <li>
            Scissors:{" "}
            {currentBet.wagers.find((w) => w.position === Move.SCISSORS)
              ?.amount || 0}
          </li>
        </ul>
      </div>
      {lastComputerMove && (
        <div>
          <p>Computer played: {lastComputerMove}</p>
          <p>Last Payout: {lastPayout}</p>
        </div>
      )}
    </div>
  );
};

export default GameInterface;
