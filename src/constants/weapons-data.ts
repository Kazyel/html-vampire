import type { WeaponData } from '@/types/drops';

export const WEAPON_DROPS_DATA: Array<WeaponData> = [
  {
    name: 'AK-47',
    description: 'A powerful assault rifle.',
    iconKey: 'weapons/ak47',
    projectileAsset: '/assets/weapons/bullet.png',
    stats: {
      damage: 30,
      pierceCount: 4,
      attackSpeed: 300,
      projectileSpeed: 1000,
      projectileDuration: 2000,
    },
  },
];
