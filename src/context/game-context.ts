import { createContext, useContext } from "react";
import GlobalGameState from "@/classes/game-state";

const GameContext = createContext<GlobalGameState | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export default GameContext;
