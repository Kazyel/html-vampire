import { useEffect, useState } from "react";
import { useGameContext } from "@/context/game-context";

const GameUI = () => {
  const ctx = useGameContext();

  const [playerHealth, setPlayerHealth] = useState(ctx.state.player.health);
  const [playerKills, setPlayerKills] = useState(0);

  useEffect(() => {
    const handleHealthUpdate = () => {
      setPlayerHealth(ctx.state.player.health);
    };

    const handleKillsUpdate = () => {
      const { player } = ctx.state;
      let killCounter = 0;

      for (const weapon of player.weapons) {
        killCounter += weapon.kills;
      }

      setPlayerKills(killCounter);
    };

    ctx.events.subscribe("healthUpdate", handleHealthUpdate);
    ctx.events.subscribe("killUpdate", handleKillsUpdate);
    return () => {
      ctx.events.unsubscribe("healthUpdate", handleHealthUpdate);
      ctx.events.unsubscribe("killUpdate", handleKillsUpdate);
    };
  }, [ctx]);

  return (
    <div className="flex gap-x-2">
      <p className="text-white/75 font-bold">Health: {playerHealth}</p>
      <p className="text-white/75 font-bold">Kills: {playerKills}</p>
    </div>
  );
};

export default GameUI;
