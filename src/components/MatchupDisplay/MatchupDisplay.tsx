import React from "react";
import { useGame } from "../../contexts/GameContext";
import "./MatchupDisplay.css";

const MatchupDisplay: React.FC = () => {
  const { lastComputerMove, currentBet } = useGame();

  return (
    <h1 className="matchup">
      <span className="matchup-item">{lastComputerMove}</span>
      vs
      <span className="matchup-wagers">
        {currentBet.wagers.map((wager) => (
          <div className="matchup-item">{wager.position}</div>
        ))}
      </span>
    </h1>
  );
};

export default MatchupDisplay;
