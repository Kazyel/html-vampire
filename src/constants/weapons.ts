import type { WeaponDrop } from '@/types/drops';

import Weapon from '@/game/models/items/weapon';
import { WEAPON_DROPS_DATA } from './weapons-data';

export const WEAPON_DROPS: Array<WeaponDrop> = WEAPON_DROPS_DATA.map(
  (weapon) => {
    return {
      data: weapon,
      createInstance: () =>
        new Weapon(
          weapon.name,
          weapon.stats.damage,
          weapon.projectileAsset,
          weapon.stats.attackSpeed,
          weapon.stats.pierceCount,
          weapon.stats.projectileSpeed,
          weapon.stats.projectileDuration
        ),
    };
  }
);
