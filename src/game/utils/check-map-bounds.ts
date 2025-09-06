import type Player from '@/game/models/entities/player';

import { MAP_HEIGHT, MAP_WIDTH } from '@/constants/dimensions';

const checkMapBounds = (player: Player) => {
  if (player.x < 0) {
    player.x = 0;
  }

  if (player.x + player.width > MAP_WIDTH) {
    player.x = MAP_WIDTH - player.width;
  }

  if (player.y < 0) {
    player.y = 0;
  }

  if (player.y + player.height > MAP_HEIGHT) {
    player.y = MAP_HEIGHT - player.height;
  }
};

export default checkMapBounds;
