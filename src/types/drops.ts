import type GameEngine from '@/game/core/game-engine';
import type Weapon from '@/game/models/items/weapon';

export type PowerUp = {
  name: string;
  description: string;
  iconKey: string;
  applyEffect: (game: GameEngine) => void;
};

export type WeaponDrop = {
  data: WeaponData;
  createInstance: () => Weapon;
};

export type WeaponData = {
  name: string;
  description: string;
  iconKey: string;
  projectileAsset: string;
  stats: WeaponStats;
};

export type WeaponStats = {
  damage: number;
  pierceCount: number;
  attackSpeed: number;
  projectileSpeed: number;
  projectileDuration: number;
};
