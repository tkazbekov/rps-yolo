import React from "react";
import "./Header.css";
import { useGame } from "../../contexts/GameContext";

const Header: React.FC = () => {
  const {
    balance,
    currentBetAmount,
    lastPayout,
  } = useGame();

  return (
    <header className="game-header">
      <div className="game-stats">
        <p className="game-stat">
          BALANCE: <span className="stat-value">{balance}</span>
        </p>
        <p className="game-stat">
          BET: <span className="stat-value">{currentBetAmount}</span>
        </p>
        <p className="game-stat">
          WIN: <span className="stat-value">{lastPayout}</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
