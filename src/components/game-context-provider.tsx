import { useRef } from "react";
import GameManager from "@/game/core/game-manager";
import GameContext from "@/context/game-context";

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const game = useRef<GameManager>(new GameManager());

  return <GameContext.Provider value={game.current}>{children}</GameContext.Provider>;
};
