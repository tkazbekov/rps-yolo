import React from "react";
import GameInterface from "./components/GameInterface/GameInterface";
import "./App.css";
import { GameProvider } from "./contexts/GameContext";

const App: React.FC = () => {
  return (
    <main>
      <GameProvider>
        <GameInterface></GameInterface>
      </GameProvider>
    </main>
  );
};

export default App;
