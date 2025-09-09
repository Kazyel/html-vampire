import type GameEngine from '@/game/core/game-engine';

export type PowerUp = {
  name: string;
  description: string;
  iconKey: string;
  applyEffect: (game: GameEngine) => void;
};
