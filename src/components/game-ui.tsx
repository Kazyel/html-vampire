import { useEffect, useState } from "react";
import { useGameContext } from "@/context/game-context";

export const GameUI = () => {
  const gameContext = useGameContext();

  const [playerHealth, setPlayerHealth] = useState(gameContext.player.health);

  useEffect(() => {
    const handleHealthUpdate = () => {
      setPlayerHealth(gameContext.player.health);
    };

    gameContext.subscribe("healthChange", handleHealthUpdate);
    return () => {
      gameContext.unsubscribe("healthChange", handleHealthUpdate);
    };
  }, [gameContext]);

  return <div>Player Health: {playerHealth}</div>;
};
