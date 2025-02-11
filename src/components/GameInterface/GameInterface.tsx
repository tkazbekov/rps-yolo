import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import WagerButtonsPanel from "../WagerButtonsPanel/WagerButtonsPanel";
import { useGame } from "../../contexts/GameContext";
import "./GameInterface.css";

const GameInterface: React.FC = () => {
  const { playRound, lastComputerMove, resetGame } = useGame();

  return (
    <div className="game-interface">
      <Dashboard />
      <WagerButtonsPanel />
      <div className="action-buttons">
        {(lastComputerMove && (
          <button className="action-button" onClick={resetGame}>
            Clear
          </button>
        )) || (
          <button className="action-button" onClick={playRound}>
            Play
          </button>
        )}
      </div>
    </div>
  );
};

export default GameInterface;
