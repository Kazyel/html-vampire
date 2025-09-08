import { useRef } from 'react';

import AssetLoader from '@/game/core/asset-loader';
import GameManager from '@/game/core/game-manager';
import GameContext from '@/context/game-context';

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const assetLoader = useRef<AssetLoader>(new AssetLoader());
  const game = useRef<GameManager>(new GameManager(assetLoader.current));

  return (
    <GameContext.Provider value={game.current}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
