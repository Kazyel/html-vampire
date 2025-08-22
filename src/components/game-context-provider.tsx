import { useRef } from "react";
import GameContext from "@/context/game-context";
import GlobalGameState from "@/classes/game-state";

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const gameState = useRef<GlobalGameState>(new GlobalGameState());

  return (
    <GameContext.Provider value={gameState.current}>{children}</GameContext.Provider>
  );
};
