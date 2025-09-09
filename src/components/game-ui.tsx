import useUIState from '@/hooks/use-ui-state';

const GameUI = () => {
  const {
    maxPlayerHealth,
    currentPlayerHealth,
    playerKills,
    neededExperience,
    currentPlayerExperience,
    totalPlayerExperience,
    playerLevel,
  } = useUIState();

  return (
    <div className="flex gap-x-5 flex-1 justify-center items-center">
      <p className="text-white/75 font-bold text-lg">
        <span className="text-red-600">Health:</span> {currentPlayerHealth}{' '}
        {currentPlayerHealth === maxPlayerHealth
          ? null
          : `/ ${maxPlayerHealth}`}
      </p>
      <p className="text-white/75 font-bold text-lg">
        <span className="text-amber-400">Kills:</span> {playerKills}
      </p>
      <p className="text-white/75 font-bold text-lg">
        <span className="text-emerald-300">Experience:</span>{' '}
        {totalPlayerExperience}
      </p>
      <p className="text-white/75 font-bold text-lg relative">
        <span className="text-cyan-400">Level:</span> {playerLevel}
        <span
          className="absolute w-full h-[5px] -bottom-2 left-0 text-xs text-white/75"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        ></span>
        <span
          className="absolute h-[5px] -bottom-2 left-0 text-xs text-white/75"
          style={{
            width: `${(currentPlayerExperience / neededExperience) * 100}%`,
            backgroundColor: 'rgba(255, 255, 255)',
          }}
        ></span>
      </p>
    </div>
  );
};

export default GameUI;
