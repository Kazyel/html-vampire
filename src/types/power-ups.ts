import type Player from '@/game/models/entities/player';

export type PowerUp = {
  name: string;
  description: string;
  iconKey: string;
  applyEffect: (player: Player) => void;
};
