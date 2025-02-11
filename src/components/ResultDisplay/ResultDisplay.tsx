import React from "react";
import { useGame } from "../../contexts/GameContext";
import "./ResultDisplay.css";

const ResultDisplay: React.FC = () => {
  const { lastComputerMove, winningWager, lastPayout } = useGame();

  const isLoss = lastPayout === 0;
  const isWin = winningWager !== null;
  const isTie = lastPayout !== null && lastPayout !== 0 && !winningWager;

  return (
    <div className="result">
      {isLoss && (
        <>
          <h1 className="result-caption">{lastComputerMove} won</h1>
          <h2 className="result-payout">You lose</h2>
        </>
      )}
      {isWin && (
        <>
          <h1 className="result-caption win">{winningWager!.position} won</h1>
          <h2 className="result-payout">
            You win
            <span className="payout-value">{lastPayout?.toFixed(2)}</span>
          </h2>
        </>
      )}
      {isTie && <h1 className="result-caption">It's a tie</h1>}
    </div>
  );
};

export default ResultDisplay;
