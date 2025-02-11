import React from "react";
import GameInterface from "./components/GameInterface/GameInterface";
import "./App.css";
import { GameProvider } from "./contexts/GameContext";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <GameProvider>
      <Header></Header>
      <main className="game-main">
        <GameInterface></GameInterface>
      </main>
    </GameProvider>
  );
};

export default App;
