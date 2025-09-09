import { useRef } from 'react';

import GameEngine from '@/game/core/game-engine';
import GameContext from '@/context/game-context';

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const game = useRef<GameEngine>(new GameEngine());

  return (
    <GameContext.Provider value={game.current}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
