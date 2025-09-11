import Enemy from '../enemy';

const DEFAULT_COLOR = '#0022bb';
const DEFAULT_EXPERIENCE_DROP_VALUE = 50;
const DEFAULT_HEALTH = 15;
const DEFAULT_DAMAGE = 1;
const DEFAULT_MOVEMENT_SPEED = 50;
const DEFAULT_TYPE = 'small';

class SmallEnemy extends Enemy {
  constructor(x: number, y: number) {
    super(
      x,
      y,
      DEFAULT_COLOR,
      DEFAULT_DAMAGE,
      DEFAULT_HEALTH,
      DEFAULT_MOVEMENT_SPEED,
      DEFAULT_EXPERIENCE_DROP_VALUE,
      DEFAULT_TYPE
    );
  }
}

export default SmallEnemy;
