import { useGameContext } from '@/context/game-context';
import { useEffect, useState } from 'react';

const useUIState = () => {
  const ctx = useGameContext();

  const [currentPlayerHealth, setPlayerHealth] = useState(
    ctx.state.player.currentHealth
  );

  const [maxPlayerHealth, setMaxPlayerHealth] = useState(
    ctx.state.player.health
  );

  const [playerKills, setPlayerKills] = useState(0);

  const [neededExperience, setNeededExperience] = useState(
    ctx.state.player.expToLevelUp
  );

  const [currentPlayerExperience, setCurrentPlayerExperience] = useState(
    ctx.state.player.currentExp
  );

  const [totalPlayerExperience, setPlayerExperience] = useState(
    ctx.state.player.totalExp
  );
  const [playerLevel, setPlayerLevel] = useState(ctx.state.player.level);

  useEffect(() => {
    const handleHealthUpdate = () => {
      setPlayerHealth(ctx.state.player.currentHealth);
      setMaxPlayerHealth(ctx.state.player.health);
    };

    const handleExperienceUpdate = () => {
      setNeededExperience(ctx.state.player.expToLevelUp);
      setPlayerExperience(ctx.state.player.totalExp);
      setCurrentPlayerExperience(ctx.state.player.currentExp);
    };

    const handleKillsUpdate = () => {
      const { player } = ctx.state;
      let killCounter = 0;

      for (const weapon of player.inventory.weapons) {
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

  return {
    maxPlayerHealth,
    currentPlayerHealth,
    playerKills,
    neededExperience,
    currentPlayerExperience,
    totalPlayerExperience,
    playerLevel,
  };
};

export default useUIState;
