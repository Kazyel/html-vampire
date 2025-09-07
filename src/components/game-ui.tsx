import { useEffect, useState } from 'react';
import { useGameContext } from '@/context/game-context';

const GameUI = () => {
  const ctx = useGameContext();

  const [playerHealth, setPlayerHealth] = useState(ctx.state.player.health);
  const [playerKills, setPlayerKills] = useState(0);
  const [playerExperience, setPlayerExperience] = useState(
    ctx.state.player.totalExp
  );
  const [playerLevel, setPlayerLevel] = useState(ctx.state.player.level);

  useEffect(() => {
    const handleHealthUpdate = () => {
      setPlayerHealth(ctx.state.player.health);
    };

    const handleExperienceUpdate = () => {
      setPlayerExperience(ctx.state.player.totalExp);
    };

    const handleKillsUpdate = () => {
      const { player } = ctx.state;
      let killCounter = 0;

      for (const weapon of player.weapons) {
        killCounter += weapon.kills;
      }

      setPlayerKills(killCounter);
    };

    const handleLevelUpdate = () => {
      setPlayerLevel(ctx.state.player.level);
    };

    ctx.events.on('healthUpdate', handleHealthUpdate);
    ctx.events.on('killUpdate', handleKillsUpdate);
    ctx.events.on('experienceUpdate', handleExperienceUpdate);
    ctx.events.on('levelUp', handleLevelUpdate);

    return () => {
      ctx.events.off('healthUpdate', handleHealthUpdate);
      ctx.events.off('experienceUpdate', handleExperienceUpdate);
      ctx.events.off('killUpdate', handleKillsUpdate);
      ctx.events.off('levelUp', handleLevelUpdate);
    };
  }, [ctx]);

  return (
    <div className="flex gap-x-5 flex-1 justify-center items-center">
      <p className="text-white/75 font-bold text-lg">
        <span className="text-red-600">Health:</span> {playerHealth}
      </p>
      <p className="text-white/75 font-bold text-lg">
        <span className="text-amber-400">Kills:</span> {playerKills}
      </p>
      <p className="text-white/75 font-bold text-lg">
        <span className="text-emerald-300">Experience:</span> {playerExperience}
      </p>
      <p className="text-white/75 font-bold text-lg">
        <span className="text-cyan-400">Level:</span> {playerLevel}
      </p>
    </div>
  );
};

export default GameUI;
