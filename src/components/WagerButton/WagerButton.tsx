import React from "react";
import { useGame } from "../../contexts/GameContext";
import { Move } from "../../types";
import "./WagerButton.css";

interface WagerButtonProps {
  position: Move;
}

const WagerButton: React.FC<WagerButtonProps> = ({ position }) => {
  const { currentBet, increaseWager, bettingEnabled, disabledPosition } =
    useGame();

  const wagerAmount =
    currentBet.wagers.find((w) => w.position === position)?.amount || 0;

  const disabled = !bettingEnabled || disabledPosition === position;

  return (
    <button
      className={`wager-button ${position}`}
      onClick={() => increaseWager(position)}
      disabled={disabled}
    >
      <div className="button-badge-container">
        <div className="button-badge">
          <span className="badge-content">{wagerAmount}</span>
        </div>
      </div>
      <div className="button-label">{position}</div>
    </button>
  );
};

export default WagerButton;
