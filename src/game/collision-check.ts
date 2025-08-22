import type GlobalGameState from "@/classes/game-state";
import type Enemy from "@/classes/enemy";

const checkAndApplyDamage = (enemies: Array<Enemy>, gameContext: GlobalGameState) => {
  for (const enemy of enemies) {
    const hasCollided = gameContext.player.checkEnemyCollision(enemy);

    if (hasCollided && gameContext.player.damageCooldown <= 0) {
      gameContext.player.takeDamage(enemy.damage);
      gameContext.emitEvent();
    }
  }

  gameContext.player.updateDamageCooldown(gameContext.deltaTime);
};

export default checkAndApplyDamage;
