import { useEffect, useState } from "react";
import { useGameContext } from "../context/game-context";

export const GameUI = () => {
  const gameContext = useGameContext();

  const [playerHealth, setPlayerHealth] = useState(gameContext.player.health);

  useEffect(() => {
    const handleHealthUpdate = () => {
      setPlayerHealth(gameContext.player.health);
    };

    gameContext.addUIListener("healthChange", handleHealthUpdate);
    return () => {
      gameContext.removeUIListener("healthChange", handleHealthUpdate);
    };
  }, [gameContext]);

  return <div>Player Health: {playerHealth}</div>;
};
