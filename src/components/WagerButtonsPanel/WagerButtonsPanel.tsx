import React from "react";
import { Move } from "../../types";
import WagerButton from "../WagerButton/WagerButton";
import "./WagerButtonsPanel.css";

const WagerButtonsPanel: React.FC = () => {
  return (
    <div className="wager-buttons">
      <WagerButton position={Move.ROCK} />
      <WagerButton position={Move.PAPER} />
      <WagerButton position={Move.SCISSORS} />
    </div>
  );
};

export default WagerButtonsPanel;