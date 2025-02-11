import React from "react";
import { useGame } from "../../contexts/GameContext";
import "./Dashboard.css";
import MatchupDisplay from "../MatchupDisplay/MatchupDisplay";
import ResultDisplay from "../ResultDisplay/ResultDisplay";

const Dashboard: React.FC = () => {
  const { lastComputerMove, lastPayout } = useGame();

  return (
    <div className="dashboard">
      <div className="dash-game">
        {lastComputerMove && lastPayout !== null ? (
          <ResultDisplay />
        ) : lastComputerMove ? (
          <MatchupDisplay />
        ) : null}
      </div>
      <div className="dash-message">
        {!lastComputerMove && <p>pick your positions</p>}
      </div>
    </div>
  );
};

export default Dashboard;
