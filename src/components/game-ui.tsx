import { useEffect, useState } from "react";
import { useGameContext } from "@/context/game-context";

const GameUI = () => {
  const ctx = useGameContext();

  const [playerHealth, setPlayerHealth] = useState(ctx.state.player.health);

  useEffect(() => {
    const handleHealthUpdate = () => {
      setPlayerHealth(ctx.state.player.health);
    };

    ctx.events.subscribe("healthChange", handleHealthUpdate);
    return () => {
      ctx.events.unsubscribe("healthChange", handleHealthUpdate);
    };
  }, [ctx]);

  return (
    <div>
      <p className="text-white/75 font-bold">Player Health: {playerHealth}</p>
    </div>
  );
};

export default GameUI;
